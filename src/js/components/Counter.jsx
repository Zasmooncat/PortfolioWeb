import React, { useState } from 'react'
import '../../styles/counter.css'
import Squares from './Squares';
import ProjectNavigation from "../components/ProjectNavigation";

function Counter() {
    const [counter, setCounter] = useState(0);

    const handleClickAdd = () => setCounter(counter + 1);
    const handleClickSubtract = () => setCounter(counter - 1);
    const handleClickReset = () => setCounter(0);

    return (
      <>
        {/* Fondo */}
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

        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full mt-10">
          <h1 className="titulo font-smooch text-white text-5xl mb-8 pointer-events-auto">
            CONTADOR
          </h1>
          <div className="bg-linear-to-br from-gray-600/20 to-gray-800/40 w-40 md:w-2/11 flex justify-center items-center py-10 rounded-2xl">
            <p className="text-9xl rounded-2xl drop-shadow-lg/50 text-cyan-500 font-extrabold pointer-events-auto">
              {counter}
            </p>
          </div>

          <div className="mb-6 pointer-events-auto">
            <button
              className="text-white p-3 text-5xl hover:text-cyan-600 hover:cursor-pointer"
              onClick={handleClickSubtract}
            >
              -
            </button>
            <button
              className="text-white p-3 text-5xl ms-4 hover:text-cyan-300 hover:cursor-pointer"
              onClick={handleClickAdd}
            >
              +
            </button>
          </div>

          <button
            className="titulo font-smooch bg-gradient-to-br from-cyan-300 via-cyan-600 to-cyan-900 py-2 font-semibold px-6 rounded-2xl cursor-pointer hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-900 text-cyan-100 hover:text-cyan-100 transition duration-100 shadow-lg hover:shadow-xl text-2xl py-2 px-4  mb-10 pointer-events-auto"
            onClick={handleClickReset}
          >
            RESET
          </button>
        </div>

        {/* Botones de navegación SIEMPRE en esquinas */}
        <ProjectNavigation />
      </>
    );
}

export default Counter;
