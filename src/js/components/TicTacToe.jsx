import React, { useState } from "react";
import { FaTimes, FaDotCircle } from "react-icons/fa";
import ProjectNavigation from "./ProjectNavigation";

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const winner = calculateWinner(board);

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div className="text-white flex flex-col items-center">
            <h2 className="titulo text-center text-white text-5xl mb-10">Tic Tac Toe</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
                {board.map((value, i) => (
                    <button
                        key={i}
                        onClick={() => handleClick(i)}
                        className="w-25 h-25 bg-black border-2 flex items-center justify-center hover:bg-gradient-to-b from-black to-neutral-600 transition"
                    >
                        {value === "X" && <FaTimes className="text-red-500 text-6xl" />}
                        {value === "O" && <FaDotCircle className="text-cyan-500 text-6xl" />}
                    </button>
                ))}
            </div>
            {winner ? (
    <p className="text-xl font-bold mb-2 flex items-center gap-2">
        Ganador:
        {winner === "X" ? (
            <FaTimes className="text-red-500 text-3xl" />
        ) : (
            <FaDotCircle className="text-cyan-500 text-3xl" />
        )}
    </p>
) : (
    <p className="mb-2 text-xl flex items-center gap-2">
        Turno:
        {isXNext ? (
            <FaTimes className="text-red-500 text-3xl" />
        ) : (
            <FaDotCircle className="text-cyan-500 text-3xl" />
        )}
    </p>
)}

            <button
                onClick={resetGame}
                className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded font-bold mt-4"
            >
                Reiniciar
            </button>
            <ProjectNavigation />
        </div>
        
    );
};

export default TicTacToe;
