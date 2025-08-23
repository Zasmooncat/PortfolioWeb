import React, { useEffect, useState } from "react";
import Squares from "./Squares"; // Ajusta la ruta si está en otra carpeta
import ProjectNavigation from "../components/ProjectNavigation"; // Ajusta la ruta
import traseraCard from "/img/carta.png"; // Asegúrate de que la ruta es correcta

function RandomCards() {
    const [count, setCount] = useState(10);
    const [valor, setValor] = useState("A");
    const [palo, setPalo] = useState({ palo: "♦", color: "red" });
    const [isFlipping, setIsFlipping] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);

    const palos = [
        { palo: "♦", color: "red" },
        { palo: "♥", color: "red" },
        { palo: "♠", color: "black" },
        { palo: "♣", color: "black" }
    ];

    const valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];

    const generateCard = (isInitial = false) => {
        setIsFlipping(true);
        
        // En la mitad de la animación (cuando la carta esté "de lado"), cambiamos los valores
        setTimeout(() => {
            if (!isInitial) {
                // Solo generar nuevos valores si no es la carga inicial
                const nuevoPalo = palos[Math.floor(Math.random() * palos.length)];
                const nuevoValor = valores[Math.floor(Math.random() * valores.length)];
                setPalo(nuevoPalo);
                setValor(nuevoValor);
            }
        }, 300); // Mitad de la animación (600ms / 2)
        
        // Terminamos la animación
        setTimeout(() => {
            setIsFlipping(false);
            if (isInitial) {
                setIsInitialRender(false);
            }
        }, 600); // Duración total de la animación
        
        if (!isInitial) {
            setCount(10);
        }
    };

    useEffect(() => {
        // Animación inicial al montar el componente
        const initialTimer = setTimeout(() => {
            generateCard(true);
        }, 100); // Pequeño delay para que se vea el montaje

        const interval = setInterval(() => {
            setCount(prevCount => {
                if (prevCount > 0) {
                    return prevCount - 1;
                } else {
                    generateCard(false);
                    return 10;
                }
            });
        }, 1000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* ✅ Fondo animado */}
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
                <Squares
                    speed={0.2}
                    squareSize={70}
                    direction="diagonal"
                    borderColor="#fff3"
                    hoverFillColor="#911"
                />
            </div>
            
            {/* Overlay para mejorar contraste */}
            <div className="fixed inset-0 bg-cyan-950/40"></div>

            {/* ✅ Contenido */}
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="titulo text-center text-white text-5xl mt-10">
                    RANDOM CARDS
                </h1>

                {/* ✅ Contenedor de la carta con animación 3D */}
                <div className="carta container mx-auto mt-10 perspective-1000">
                    <div 
                        className={`card-flip-container ${isFlipping ? 'flipping' : ''} ${isInitialRender ? 'initial-state' : ''}`}
                        style={{
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.3s ease-in-out',
                            transform: isFlipping ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                            opacity: isInitialRender ? 0 : 1
                        }}
                    >
                        {/* Cara frontal de la carta */}
                        <div 
                            className="w-70 h-100 rounded-3xl bg-white relative card-face card-front"
                            style={{
                                backfaceVisibility: 'hidden',
                                position: 'absolute',
                                width: '100%'
                            }}
                        >
                            <div
                                className="palo-alto absolute left-4 top-4 text-5xl"
                                style={{ color: palo.color }}
                            >
                                {palo.palo}
                            </div>
                            <div
                                className="valor text-center mt-32 text-9xl"
                                style={{ color: palo.color }}
                            >
                                {valor}
                            </div>
                            <div
                                className="palo-bajo absolute right-4 bottom-4 text-5xl"
                                style={{ 
                                    color: palo.color,
                                    transform: 'rotate(180deg)' 
                                }}
                            >
                                {palo.palo}
                            </div>
                        </div>

                        {/* Cara trasera de la carta (reverso) */}
                        <div 
                            className="w-70 h-100 rounded-3xl border-6 border-white relative card-face card-back flex items-center justify-center"
                            style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(-180deg)',
                                position: 'absolute',
                                width: '100%'
                            }}
                        >
                            <img className="" src={traseraCard} alt="" />
                        </div>
                    </div>
                </div>

                <div className="cuenta-atras text-center text-white text-7xl mt-5">
                    {count}
                </div>

                <button
                    onClick={() => generateCard(false)}
                    disabled={isFlipping} // Deshabilitar durante la animación
                    className={`titulo rounded mx-auto w-70 text-white px-2 py-1 bg-linear-to-b from-cyan-400 via-cyan-600 to-cyan-950 text-2xl mt-5 mb-10 transition-all duration-200 ${
                        isFlipping 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-linear-to-b hover:from-cyan-600 hover:via-cyan-800 hover:to-cyan-950/50 hover:cursor-pointer  '
                    }`}
                >
                    {isFlipping ? 'FLIPPING...' : 'GENERATE NEW CARD'}
                </button>
            </div>

            {/* ✅ Botones de navegación siempre visibles */}
            <ProjectNavigation />

            {/* ✅ CSS para la perspectiva 3D */}
            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                
                .card-flip-container {
                    position: relative;
                    width: 280px; /* w-70 equivalent */
                    height: 400px; /* h-100 equivalent */
                    margin: 0 auto;
                    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
                }
                
                .card-flip-container.initial-state {
                    opacity: 0;
                    transform: scale(0.8) rotateY(-20deg);
                }
                
                .card-face {
                    position: absolute !important;
                    width: 100% !important;
                    height: 100% !important;
                    backface-visibility: hidden !important;
                }
                
                .card-back {
                    transform: rotateY(-180deg) !important;
                }
                
                /* Animación adicional para el efecto de "profundidad" */
                .flipping {
                    transform: rotateY(180deg) scale(0.80) !important;
                }
                
                .flipping.initial-state {
                    transform: rotateY(-180deg) scale(0.95) !important;
                    opacity: 1 !important;
                }
                
                /* Sombra dinámica durante el flip */
                .card-flip-container::after {
                    content: '';
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80%;
                    height: 20px;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 50%;
                    transition: all 0.1s ease-in-out;
                    opacity: 0.5;
                }
                
                .flipping::after {
                    width: 60% !important;
                    opacity: 0.8 !important;
                }
                
                .initial-state::after {
                    opacity: 0 !important;
                }
            `}</style>
        </div>
    );
}

export default RandomCards;