import React, { useState } from "react";
import ProjectNavigation from "../components/ProjectNavigation";
import Squares from "./Squares"; // Ajusta la ruta si está en otra carpeta

const Calculator = () => {
    const [input, setInput] = useState("");
    const [isOpeningParen, setIsOpeningParen] = useState(true); // nuevo estado para alternar paréntesis

    const handleClick = (value) => {
        if (value === "C") {
            setInput("");
        } else if (value === "=") {
            try {
                setInput(eval(input).toString()); // ⚠️ eval solo para demo
            } catch {
                setInput("Error");
            }
        } else if (value === "←") {
            setInput(input.slice(0, -1));
        } else if (value === "()") {
            const paren = isOpeningParen ? "(" : ")";
            setInput(input + paren);
            setIsOpeningParen(!isOpeningParen); // alternar el estado
        } else {
            setInput(input + value);
        }
    };

    return (
        <>
            {/* Fondo animado */}
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
                <Squares
                    speed={0.2}
                    squareSize={70}
                    direction="diagonal"
                    borderColor="#fff3"
                    hoverFillColor="#911"
                />
            </div>
            <div className="fixed inset-0 bg-cyan-950/40 z-0 pointer-events-none"></div>

            <p className="titulo font-smooch relative pb-4 z-20 text-center text-white text-5xl ">
                C A L C U L A T O R
            </p>

            {/* Contenedor calculadora */}
            <div className="m-auto w-[90%] md:w-1/2 lg:w-1/4 rounded-4xl relative flex flex-col gap-4">
                
                {/* Display */}
                <div className="bg-gradient-to-br from-cyan-800/30 to-gray-800/20 rounded p-4 h-24 flex items-end justify-end">
                    <p className="digitos text-white text-4xl md:text-5xl break-all">
                        {input || "0"}
                    </p>
                </div>

                {/* Grid de botones */}
                <div className="grid grid-cols-4 gap-3">
                    {[
                        ["C", "()", "%", "/"],
                        ["7", "8", "9", "*"],
                        ["4", "5", "6", "-"],
                        ["1", "2", "3", "+"],
                        ["←", "0", ".", "="],
                    ].map((row, rowIndex) =>
                        row.map((symbol) => (
                            <button
                                key={`${rowIndex}-${symbol}`}
                                className={`border border-gray-500 rounded text-2xl md:text-3xl h-14 md:h-20 
                                    bg-gradient-to-br from-neutral-900 to-neutral-700/40
                                    ${
                                        symbol === "="
                                            ? "bg-cyan-800 text-white hover:bg-cyan-400"
                                            : symbol === "C"
                                            ? "bg-gray-800 text-red-400 hover:bg-red-500"
                                            : ["←","0","1","2","3","4","5","6","7","8","9","."]
                                                .includes(symbol)
                                            ? "bg-black text-white hover:bg-gray-800"
                                            : "bg-gray-800 text-cyan-400 hover:bg-gray-700"
                                    }`}
                                onClick={() => handleClick(symbol)}
                            >
                                {symbol === "←" ? (
                                    <i className="fas fa-backspace"></i>
                                ) : (
                                    symbol
                                )}
                            </button>
                        ))
                    )}
                </div>
            </div>

            <ProjectNavigation />
        </>
    );
};

export default Calculator;
