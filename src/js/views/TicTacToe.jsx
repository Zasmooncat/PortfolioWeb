import React from "react";
import TicTacToe from "../components/TicTacToe";
import LiquidChrome from "../components/LiquidChrome";
import Squares from "../components/Squares";
const TicTacToeView = () => {
    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full z-0">
    <Squares
        speed={0.2}
        squareSize={70}
        direction="diagonal"
        borderColor="#fff3"
        hoverFillColor="#911"
    />
</div>
            <div className="relative z-10 flex justify-center items-center h-screen">
                <TicTacToe />
            </div>
        </>
    );
};

export default TicTacToeView;
