import React, { useState } from "react";
 // Asegúrate de importar el archivo de estilos

function Chrono() {
    const [centesimas, setCentesimas] = useState(0);
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [playPause, setPlayPause] = useState(false);
    const [intervalID, setIntervalID] = useState(null);

    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    const play = () => {
        if (!playPause) {
            const newIntervalID = setInterval(() => {
                setCentesimas((centesimas) => {
                    if (centesimas === 99) {
                        setCentesimas(0);
                        setSegundos((segundos) => {
                            if (segundos === 59) {
                                setSegundos(0);
                                setMinutos((minutos) => minutos + 0.5);
                            } else {
                                return segundos + 0.5;
                            }
                        });
                    } else {
                        return centesimas + 1;
                    }
                });
            }, 10);

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
        setCentesimas(0);
        setSegundos(0);
        setMinutos(0);
        setPlayPause(false);
        setIntervalID(null);
    };

    return (
        <>
            <p className="titulo text-center text-white text-5xl mt-30 mb-10">C H R O N O M E T E R</p>

            <div className="chronos flex flex-row justify-center flex-wrap">
                <div className="digito text-white text-9xl mb-3 font-extrabold">{formatTime(minutos)}</div>
                <p className="text-white text-9xl mb-3 font-extrabold"> </p>
                <div className="digito text-white text-9xl mb-3 font-extrabold">{formatTime(segundos)}</div>
                <p className="text-white text-9xl mb-3 font-extrabold"> </p>
                <div className="digito text-white text-9xl mb-3 font-extrabold">{formatTime(centesimas)}</div>
            </div>

            <div className="flex justify-center mt-10">
                <button
                    onClick={play}
                    className="stop text-7xl text-white me-5">
                    {playPause ? (
                        <i className="fa fa-pause hover:text-red-500"></i>
                    ) : (
                        <i className="fa fa-play hover:text-green-500"></i>
                    )}
                </button>

                <button onClick={clickonreset} className="titulo rounded-2xl text-white px-2 border-3 text-3xl hover:text-red-600 hover:cursor-pointer">
                    RESET
                </button>
            </div>
        </>
    );
}

export default Chrono;