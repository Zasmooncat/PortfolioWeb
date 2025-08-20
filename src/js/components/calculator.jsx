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
             <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
                <Squares
                    speed={0.2}
                    squareSize={70}
                    direction="diagonal"
                    borderColor="#fff3"
                    hoverFillColor="#911"
                />
            </div>

            <p className="titulo text-center text-white text-5xl mt-10">C A L C U L A T O R</p>

            <div className="m-auto w-full  md:w-1/2 lg:w-1/4 h-180 rounded-4xl relative">
                <div className=" bg-linear-to-br from-neutral-900 to-neutral-400/40  rounded p-4 mt-10 mb-5 h-35 relative">
                    <p className="digitos  text-end text-white text-5xl absolute top-10 right-3">{input || "0"}</p>
                </div>

                <div className="buttons-section absolute bottom-20 mr-3">
                    {[
                        ["C", "()", "%", "/"],
                        ["7", "8", "9", "*"],
                        ["4", "5", "6", "-"],
                        ["1", "2", "3", "+"],
                        ["←", "0", ".", "="]
                    ].map((row, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-4 gap-4 mb-4">
                            {row.map((symbol) => (
                                <button
                                    key={symbol}
                                    className={`border border-gray-500 rounded w-20 h-20 mx-2 text-3xl h-10 md:h-20 p-2 cursor-pointer bg-linear-to-br from-neutral-900 to-neutral-700/40
                                        ${symbol === "=" ? "bg-green-800 text-white" : 
                                        symbol === "C" ? "bg-gray-800 text-red-400" : 
                                        ["←", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(symbol) ? "bg-black text-white" : "bg-gray-800 text-green-400"}`}
                                    onClick={() => handleClick(symbol)}
                                >
                                    {symbol === "←" ? <i className="fas fa-backspace"></i> : symbol}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <ProjectNavigation />
        </>
    );
};

export default Calculator;
