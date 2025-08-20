import React, { useState } from "react";
import Squares from './Squares';
import ProjectNavigation from "../components/ProjectNavigation";

function Chrono() {
    const [totalCentesimas, setTotalCentesimas] = useState(0);
    const [playPause, setPlayPause] = useState(false);
    const [intervalID, setIntervalID] = useState(null);

    const formatTime = (value) => (value < 10 ? `0${value}` : value);

    const play = () => {
        if (!playPause) {
            const newIntervalID = setInterval(() => {
                setTotalCentesimas((prev) => prev + 1);
            }, 10); // 10ms = 1 centésima

            setIntervalID(newIntervalID);
            setPlayPause(true);
        } else {
            clearInterval(intervalID);
            setIntervalID(null);
            setPlayPause(false);
        }
    };

    const clickonreset = () => {
        clearInterval(intervalID);
        setTotalCentesimas(0);
        setPlayPause(false);
        setIntervalID(null);
    };

    // Cálculos basados en total de centésimas
    const centesimas = totalCentesimas % 100;
    const totalSegundos = Math.floor(totalCentesimas / 100);
    const segundos = totalSegundos % 60;
    const minutos = Math.floor(totalSegundos / 60);

    return (
        <>
            {/* Fondo animado */}
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
                <p className="titulo text-center text-white text-5xl mb-10">
                    C H R O N O M E T E R
                </p>

                <div className="flex justify-center w-full">
    <div className="grid grid-cols-3 gap-2 sm:gap-20 place-items-center max-w-xs sm:max-w-md md:max-w-lg mx-auto w-full">

        <div className="digito text-white text-7xl sm:text-6xl md:text-8xl lg:text-9xl mb-3 font-extrabold text-center">
            {formatTime(minutos)}
        </div>
        <div className="digito text-white text-7xl sm:text-6xl md:text-8xl lg:text-9xl mb-3 font-extrabold text-center">
            {formatTime(segundos)}
        </div>
        <div className="digito text-white text-7xl sm:text-6xl md:text-8xl lg:text-9xl mb-3 font-extrabold text-center">
            {formatTime(centesimas)}
        </div>
    </div>
</div>


                <div className="flex justify-center mt-10 gap-5">
                    <button
                        onClick={play}
                        className="stop text-7xl text-white hover:text-green-500 hover:cursor-pointer"
                    >
                        {playPause ? (
                            <i className="fa fa-pause hover:text-red-500"></i>
                        ) : (
                            <i className="fa fa-play hover:text-green-500"></i>
                        )}
                    </button>

                    <button
                        onClick={clickonreset}
                        className="titulo rounded-2xl text-white px-4 py-2 border-2 text-3xl hover:text-red-600 hover:cursor-pointer"
                    >
                        RESET
                    </button>
                </div>

                <div className="mt-10">
                    <ProjectNavigation />
                </div>
            </div>
        </>
    );
}

export default Chrono;
