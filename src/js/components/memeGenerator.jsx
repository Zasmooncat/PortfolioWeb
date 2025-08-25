import React, { useState, useEffect } from "react";
import ProjectNavigation from "../components/ProjectNavigation";
import Squares from "./Squares";


const imageNames = [
  "chill.jpeg",
  "disociado.jpg",
  "dog.webp",
  "fire.webp",
  "fray.jpg",
  "geek.jpg",
  "Grumpy-Cat.jpg",
  "images.jpeg",
  "impaktado.jpg",
  "mirada.gif",
  "ninyawtf.webp",
  "ninyofist.webp",
  "sheldon.jpeg",
  "so.webp",
  "think.webp",
  "willy.jpeg",
  "wtf.jpg",
  "ylosabes.webp"
  // Agrega más nombres según las imágenes que tengas
];

const MemeGenerator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? imageNames.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === imageNames.length - 1 ? 0 : prev + 1
    );
  };

  const currentImageUrl = `/img/memeimg/${imageNames[currentIndex]}`;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <Squares
          speed={0.2}
          squareSize={70}
          direction="diagonal"
          borderColor="#fff3"
          hoverFillColor="#471"
        />
      </div>

      <div className="fixed inset-0 bg-cyan-950/40"></div>

      <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4">
        <h1 className="font-smooch titulo text-center text-white text-5xl mb-4">
          MEME GENERATOR
        </h1>

        {/* Carousel Container */}
        <div className="bg-gray-800/60 rounded-xl p-8 max-w-4xl w-full">

          {/* Image Carousel */}
          <div className="mb-8">
            {/* Mobile Navigation - Buttons above image */}
            <div className="flex justify-between gap-4 mb-4 md:hidden">
              <button
                onClick={handlePrev}
                className="text-white bg-gray-700/70 hover:bg-gray-600 px-2 py-1 flex rounded-full transition-colors"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="text-white bg-gray-700/70 hover:bg-gray-600 px-2 py-1 flex rounded-full transition-colors"
              >
                ▶
              </button>
            </div>

            {/* Desktop Navigation - Buttons on sides */}
            <div className="hidden md:flex items-center justify-center">
              <button
                onClick={handlePrev}
                className="text-white mx-4 text-2xl bg-gray-700/70 hover:bg-gray-600 px-4 py-3 rounded-full transition-colors"
              >
                ◀
              </button>

              <div className="relative">
                <img
                  src={currentImageUrl}
                  alt="Meme template"
                  className="w-96 h-96 object-cover rounded-lg border-2 border-white"
                  onError={(e) => {
                    console.log("Error loading image:", currentImageUrl);
                    e.target.src = "https://via.placeholder.com/400x400/666/fff?text=Image+Not+Found";
                  }}
                />

                {/* Top Text Overlay */}
                {topText && (
                  <div className="absolute top-4 left-0 right-0 px-4">
                    <p className="selected-meme-img text-white text-2xl md:text-3xl font-bold uppercase text-center drop-shadow-[0px_0px_8px_rgba(0,0,0,1)] leading-tight">
                      {topText}
                    </p>
                  </div>
                )}

                {/* Bottom Text Overlay */}
                {bottomText && (
                  <div className="absolute bottom-4 left-0 right-0 px-4">
                    <p className="selected-meme-img text-white text-2xl md:text-3xl font-bold uppercase text-center drop-shadow-[0px_0px_8px_rgba(0,0,0,1)] leading-tight">
                      {bottomText}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                className="text-white mx-4 text-2xl bg-gray-700/70 hover:bg-gray-600 px-4 py-3 rounded-full transition-colors"
              >
                ▶
              </button>
            </div>

            {/* Mobile Image - Full width */}
            <div className="md:hidden relative w-full">
              <img
                src={currentImageUrl}
                alt="Meme template"
                className="w-full aspect-square object-cover rounded-lg border-2 border-white"
                onError={(e) => {
                  console.log("Error loading image:", currentImageUrl);
                  e.target.src = "https://via.placeholder.com/400x400/666/fff?text=Image+Not+Found";
                }}
              />

              {/* Top Text Overlay - Mobile */}
              {topText && (
                <div className="absolute top-4 left-0 right-0 px-4">
                  <p className="text-white text-2xl md:text-3xl font-bold uppercase text-center drop-shadow-[0px_0px_8px_rgba(0,0,0,1)] leading-tight">
                    {topText}
                  </p>
                </div>
              )}

              {/* Bottom Text Overlay - Mobile */}
              {bottomText && (
                <div className="absolute bottom-4 left-0 right-0 px-4">
                  <p className="text-white text-2xl md:text-3xl font-bold uppercase text-center drop-shadow-[0px_0px_8px_rgba(0,0,0,1)] leading-tight">
                    {bottomText}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex flex-col">
              <label className="text-gray-300 mb-2 text-sm">Top Text</label>
              <input
                className="bg-gray-200 w-64 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="Enter top text..."
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 mb-2 text-sm">Bottom Text</label>
              <input
                className="bg-gray-200 w-64 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="Enter bottom text..."
              />
            </div>
          </div>

          {/* Image Counter */}
          <div className="text-center mt-6">
            <span className="text-gray-400 text-sm">
              {currentIndex + 1} / {imageNames.length}
            </span>
          </div>

        </div>

        <ProjectNavigation />
      </div>
    </>
  );
};

export default MemeGenerator;