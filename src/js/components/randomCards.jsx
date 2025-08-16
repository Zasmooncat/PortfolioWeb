import React, { useEffect, useState } from "react";
import Squares from "./Squares"; // Ajusta la ruta si está en otra carpeta
import ProjectNavigation from "../components/ProjectNavigation"; // Ajusta la ruta

function RandomCards() {
    const [count, setCount] = useState(10);
    const [valor, setValor] = useState("A");
    const [palo, setPalo] = useState({ palo: "♦", color: "red" });

    const palos = [
        { palo: "♦", color: "red" },
        { palo: "♥", color: "red" },
        { palo: "♠", color: "black" },
        { palo: "♣", color: "black" }
    ];

    const valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];

    const generateCard = () => {
        const nuevoPalo = palos[Math.floor(Math.random() * palos.length)];
        const nuevoValor = valores[Math.floor(Math.random() * valores.length)];
        setPalo(nuevoPalo);
        setValor(nuevoValor);
        setCount(10);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => {
                if (prevCount > 0) {
                    return prevCount - 1;
                } else {
                    generateCard();
                    return 10;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
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

            {/* ✅ Contenido */}
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="titulo text-center text-white text-5xl mt-10">
                    RANDOM CARDS
                </h1>

                <div className="carta container mx-auto mt-10">
                    <div className="w-70 h-100 rounded-3xl bg-white relative">
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
                            style={{ color: palo.color }}
                        >
                            {palo.palo}
                        </div>
                    </div>
                </div>

                <div className="cuenta-atras text-center text-white text-7xl mt-5">
                    {count}
                </div>

                <button
                    onClick={generateCard}
                    className="titulo container rounded mx-auto w-70 text-white px-2 border-2 text-3xl hover:text-red-600 hover:cursor-pointer mt-5 mb-10"
                >
                    GENERATE CARD
                </button>
            </div>

            {/* ✅ Botones de navegación siempre visibles */}
            <ProjectNavigation />
        </div>
    );
}

export default RandomCards;
