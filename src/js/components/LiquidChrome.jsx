import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

export const LiquidChrome = ({
  baseColor = [0.1, 0.1, 0.1],
  speed = 0.1,
  amplitude = 0.1,
  frequencyX = 1,
  frequencyY = 1,
  interactive = true,
  ...props
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const programRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new Renderer({ antialias: true });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 10.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 20.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
          return vec4(color, 1.0);
      }

      void main() {
          vec4 col = vec4(0.0);
          int samples = 0;
          for (int i = -1; i <= 1; i++){
              for (int j = -1; j <= 1; j++){
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
                  col += renderImage(vUv + offset);
                  samples++;
              }
          }
          gl_FragColor = col / float(samples);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height,
          ]),
        },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0, 0]) },
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;

    function resize() {
      if (!renderer || !program) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      const resUniform = program.uniforms.uResolution.value;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / gl.canvas.height;
    }

    window.addEventListener("resize", resize);
    resize();

    function handleMouseMove(event) {
      if (!program) return;
      const x = event.clientX / window.innerWidth;
      const y = 1 - event.clientY / window.innerHeight;
      const mouseUniform = program.uniforms.uMouse.value;
      mouseUniform[0] = x;
      mouseUniform[1] = y;
    }

    function handleTouchMove(event) {
      if (!program) return;
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const x = touch.clientX / window.innerWidth;
        const y = 1 - touch.clientY / window.innerHeight;
        const mouseUniform = program.uniforms.uMouse.value;
        mouseUniform[0] = x;
        mouseUniform[1] = y;
      }
    }

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
    }

    function update(t) {
      if (!renderer || !mesh || !program) return;
      animationIdRef.current = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }
    animationIdRef.current = requestAnimationFrame(update);

    // Añadir el canvas con transición inicial
    if (gl.canvas) {
      gl.canvas.style.transition = 'opacity 2s ease-in';
      gl.canvas.style.opacity = '0';
      container.appendChild(gl.canvas);
      
      // Fade in suave
      setTimeout(() => {
        if (gl.canvas) {
          gl.canvas.style.opacity = '1';
        }
      }, 10);
    }

    // Cleanup suave mejorado
    return () => {
      // 1. Cancelar animación primero
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      // 2. Remover event listeners
      window.removeEventListener("resize", resize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
      }

      // 3. Fade out suave del canvas antes de limpiar WebGL
      if (gl.canvas && gl.canvas.parentElement) {
        gl.canvas.style.transition = 'opacity 0.2s ease-out';
        gl.canvas.style.opacity = '0';
        
        // Cleanup WebGL después del fade out
        setTimeout(() => {
          try {
            // Limpiar recursos WebGL
            if (meshRef.current) {
              // Limpiar geometría si tiene método de cleanup
              if (meshRef.current.geometry && meshRef.current.geometry.dispose) {
                meshRef.current.geometry.dispose();
              }
              meshRef.current = null;
            }

            if (programRef.current) {
              // Limpiar programa de shaders si tiene método de cleanup
              if (programRef.current.dispose) {
                programRef.current.dispose();
              }
              programRef.current = null;
            }

            // Perder contexto WebGL de forma controlada
            const loseContextExt = gl.getExtension("WEBGL_lose_context");
            if (loseContextExt) {
              loseContextExt.loseContext();
            }

            // Remover canvas del DOM
            if (gl.canvas.parentElement) {
              gl.canvas.parentElement.removeChild(gl.canvas);
            }
          } catch (error) {
            console.warn("Error durante cleanup de WebGL:", error);
            // Fallback: remover canvas inmediatamente
            if (gl.canvas && gl.canvas.parentElement) {
              gl.canvas.parentElement.removeChild(gl.canvas);
            }
          }

          // Limpiar referencia del renderer al final
          if (rendererRef.current) {
            rendererRef.current = null;
          }
        }, 200); // Esperar el tiempo del fade out
      }
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen z-[-1]"
      style={{
        transition: 'opacity 0.3s ease-out',
        willChange: 'opacity' // Optimización para animaciones suaves
      }}
      {...props}
    />
  );
};

export default LiquidChrome;