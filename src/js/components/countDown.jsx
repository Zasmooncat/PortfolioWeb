import React, { useState, useEffect } from "react";

const CountDown = () => {
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);
    const [timer, setTimer] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [displayHours, setDisplayHours] = useState("00");
    const [displayMins, setDisplayMins] = useState("00");
    const [displaySecs, setDisplaySecs] = useState("00");
    const [isPaused, setIsPaused] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isTenSecondsLeft, setIsTenSecondsLeft] = useState(false);

    useEffect(() => {
        let blinkTimer;
        let clickSoundInterval;
        if (isFinished) {
            // Reproducir sonido de notificación
            const notificationSound = new Audio("src/audio/notification.wav");
            notificationSound.play();

            // Iniciar parpadeo
            blinkTimer = setInterval(() => {
                setDisplayHours((prev) => (prev === "00" ? "" : "00"));
                setDisplayMins((prev) => (prev === "00" ? "" : "00"));
                setDisplaySecs((prev) => (prev === "00" ? "" : "00"));
            }, 500);
        }

        if (isTenSecondsLeft) {
            // Reproducir sonido 'click.wav' cada segundo
            clickSoundInterval = setInterval(() => {
                const clickSound = new Audio("src/audio/click.wav");
                clickSound.play();
            }, 1000);
        }

        return () => {
            clearInterval(blinkTimer);
            clearInterval(clickSoundInterval);
        };
    }, [isFinished, isTenSecondsLeft]);

    const formatTime = (value) => (value < 10 ? `0${value}` : value);

    const toggleCountDown = () => {
        if (isRunning) {
            if (isPaused) {
                startTimer(remainingTime);
                setIsPaused(false);
            } else {
                clearInterval(timer);
                setTimer(null);
                setIsPaused(true);
            }
            return;
        }

        const h = parseInt(hours) || 0;
        const m = parseInt(mins) || 0;
        const s = parseInt(secs) || 0;

        let totalSeconds = h * 3600 + m * 60 + s;
        if (totalSeconds <= 0) return;

        setHours(0);
        setMins(0);
        setSecs(0);
        setIsFinished(false);

        setRemainingTime(totalSeconds);
        setDisplayHours(formatTime(Math.floor(totalSeconds / 3600)));
        setDisplayMins(formatTime(Math.floor((totalSeconds % 3600) / 60)));
        setDisplaySecs(formatTime(totalSeconds % 60));
        setIsRunning(true);
        setIsPaused(false);

        startTimer(totalSeconds);
    };

    const startTimer = (totalSeconds) => {
        const newTimer = setInterval(() => {
            totalSeconds -= 1;
            setRemainingTime(totalSeconds);
            setDisplayHours(formatTime(Math.floor(totalSeconds / 3600)));
            setDisplayMins(formatTime(Math.floor((totalSeconds % 3600) / 60)));
            setDisplaySecs(formatTime(totalSeconds % 60));

            if (totalSeconds <= 10 && totalSeconds > 0) {
                setIsTenSecondsLeft(true); // Activar el parpadeo
            }

            if (totalSeconds <= 0) {
                clearInterval(newTimer);
                setTimer(null);
                setIsRunning(false);
                setIsFinished(true);
                setIsTenSecondsLeft(false); // Desactivar el parpadeo
            }
        }, 1000);
        setTimer(newTimer);
    };

    const resetCountDown = () => {
        clearInterval(timer);
        setTimer(null);
        setIsRunning(false);
        setIsPaused(false);
        setRemainingTime(0);
        setDisplayHours("00");
        setDisplayMins("00");
        setDisplaySecs("00");
        setIsFinished(false);
        setIsTenSecondsLeft(false);
    };

    const handleHoursChange = (e) => {
        const value = e.target.value;
        setHours(value);
        setDisplayHours(formatTime(value));
    };

    const handleMinsChange = (e) => {
        const value = e.target.value;
        setMins(value);
        setDisplayMins(formatTime(value));
    };

    const handleSecsChange = (e) => {
        const value = e.target.value;
        setSecs(value);
        setDisplaySecs(formatTime(value));
    };

    return (
        <div className="container m-auto">
            <p className="titulo text-center text-white text-5xl mt-30 mb-10">COUNT DOWN</p>
            <label htmlFor="number" className="text-white me-3">Set Start Point</label>
            <div>
                <input
                    placeholder="hours"
                    type="number"
                    className="bg-black border-2 border-white rounded text-white w-15 m-1 px-1"
                    value={hours || ""}
                    onChange={handleHoursChange}
                />
                <input
                    placeholder="min"
                    type="number"
                    className="bg-black border-2 border-white rounded text-white w-15 m-1 px-1"
                    value={mins || ""}
                    onChange={handleMinsChange}
                />
                <input
                    placeholder="sec"
                    type="number"
                    className="bg-black border-2 border-white rounded text-white w-15 m-1 px-1"
                    value={secs || ""}
                    onChange={handleSecsChange}
                />
            </div>
            <div>
                <button
                    className="titulo text-white px-3 border-3 rounded text-3xl hover:text-red-600 hover:cursor-pointer"
                    onClick={toggleCountDown}
                >
                    {isRunning ? (isPaused ? "RESUME" : "PAUSE") : "START"}
                </button>
                <button
                    className="titulo text-white px-3 border-3 rounded text-3xl hover:text-red-600 hover:cursor-pointer ml-3"
                    onClick={resetCountDown}
                >
                    RESET
                </button>
            </div>
            <div className="flex">
                <div className={`digito hours text-9xl mb-3 font-extrabold ${isTenSecondsLeft ? "animate-blink text-red-600" : "text-white"}`}>
                    {displayHours}
                </div>
                <p className="text-white text-9xl mb-3 ">:</p>
                <div className={`digito mins text-9xl mb-3 font-extrabold ${isTenSecondsLeft ? "animate-blink text-red-600" : "text-white"}`}>
                    {displayMins}
                </div>
                <p className="text-white text-9xl mb-3">:</p>
                <div className={`digito secs text-9xl mb-3 font-extrabold ${isTenSecondsLeft ? "animate-blink text-red-600" : "text-white"}`}>
                    {displaySecs}
                </div>
            </div>
        </div>
    );
};

export default CountDown;
