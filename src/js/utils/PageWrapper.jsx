import React from "react";
import Squares from "./Squares";

const PageWrapper = ({
  children,
  onPrev,
  onNext,
  showPrev = true,
  showNext = true,
}) => {
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

      {/* Contenido principal con scroll */}
      <div className="relative z-10 h-screen overflow-y-auto p-6 pointer-events-auto">
        {children}
      </div>

      {/* Botón Prev */}
      {showPrev && (
        <button
          onClick={onPrev}
          className="fixed bottom-4 left-4 z-50 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Prev
        </button>
      )}

      {/* Botón Next */}
      {showNext && (
        <button
          onClick={onNext}
          className="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Next
        </button>
      )}
    </>
  );
};

export default PageWrapper;
