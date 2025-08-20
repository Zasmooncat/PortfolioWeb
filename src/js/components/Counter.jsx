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
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <Squares
                    speed={0.2}
                    squareSize={70}
                    direction="diagonal"
                    borderColor="#fff3"
                    hoverFillColor="#911"
                />
            </div>

            {/* Contenido */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full mt-10">
                <h1 className="titulo text-white text-5xl mb-8 pointer-events-auto">CONTADOR</h1>
                <p className="text-9xl text-green-500 mb-6 font-extrabold pointer-events-auto">{counter}</p>

                <div className="mb-6 pointer-events-auto">
                    
                    <button
                        className="text-white p-3 text-5xl hover:text-purple-500 hover:cursor-pointer"
                        onClick={handleClickSubtract}
                    >
                        -
                    </button>
                    <button
                        className="text-white p-3 text-5xl ms-4 hover:text-green-300 hover:cursor-pointer"
                        onClick={handleClickAdd}
                    >
                        +
                    </button>
                </div>

                <button
                    className="titulo text-white px-6 py-2 border-2 rounded text-3xl hover:text-red-600 hover:cursor-pointer pointer-events-auto"
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
