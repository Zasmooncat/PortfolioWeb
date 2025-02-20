import React, { useState } from "react";

const Calculator = () => {
    const [input, setInput] = useState("");

    const handleClick = (value) => {
        if (value === "C") {
            setInput("");
        } else if (value === "=") {
            try {
                setInput(eval(input).toString()); // eval() es peligroso, pero lo usamos para simplicidad
            } catch {
                setInput("Error");
            }
        } else if (value === "←") {
            setInput(input.slice(0, -1));
        } else {
            setInput(input + value);
        }
    };

    return (
        <>
            <p className="titulo text-center text-white text-5xl mt-10 mb-10">C A L C U L A T O R</p>
            <div className="calculator-box container m-auto mb-20 w-110 h-170 rounded-4xl bg-black border-2 border-white relative">
                <div className="display mt-20 w-[90%] ">
                    <p className="digitos m-5 text-end text-white text-5xl absolute top-8 right-6">{input || "0"}</p>
                </div>
                <div className="buttons-section absolute bottom-5 p-4">
                    {[
                        ["C", "()", "%", "/"],
                        ["7", "8", "9", "*"],
                        ["4", "5", "6", "-"],
                        ["1", "2", "3", "+"],
                        ["←", "0", ".", "="]
                    ].map((row, rowIndex) => (
                        <div key={rowIndex} className="flex justify-between mt-5">
                            {row.map((symbol) => (
                                <button
                                    key={symbol}
                                    className={`border-2 border-white rounded-full w-20 h-20 mx-2 text-3xl 
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
        </>
    );
};

export default Calculator;
