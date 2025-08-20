import React, { useState, useEffect } from "react";
import ProjectNavigation from "../components/ProjectNavigation";
import Squares from "./Squares";

const images = import.meta.glob("/src/img/memeimg/*.{png,jpg,jpeg,gif,webp}");

const loadImages = async () => {
    const imageUrls = [];
    for (const path in images) {
        const module = await images[path]();
        imageUrls.push(module.default);
    }
    return imageUrls;
};

const MemeGenerator = () => {
    const [memeImages, setMemeImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");

    useEffect(() => {
        loadImages().then(setMemeImages);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? memeImages.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === memeImages.length - 1 ? 0 : prev + 1
        );
    };

    const selectedImage = memeImages[currentIndex];

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
        <div className="relative min-h-screen w-full">
          <p className="titulo text-center text-white text-5xl mt-10 mb-10">
            MEME GENERATOR
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center items-center md:w-3/5 mx-auto">
            <div className="left w-[50%] flex flex-col items-center">
              <p className="text-gray-400">Select Image</p>
              {/* Miniaturas del slider */}
              <div className="flex items-center  mt-5">
                <button
                  onClick={handlePrev}
                  className="text-white text-2xl bg-black/50 px-3 py-2 rounded hover:bg-black"
                >
                  ◀
                </button>

                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Meme preview"
                    className="w-32 h-32 grayscale-70 object-cover border-2 border-white rounded"
                  />
                )}

                <button
                  onClick={handleNext}
                  className="text-white text-2xl bg-black/50 px-3 py-2 rounded hover:bg-black"
                >
                  ▶
                </button>
              </div>

              {/* Inputs */}
              <div className="inputs flex flex-col mt-5 gap-5">
                <div className="">
                  <input
                    className="bg-black border-2 w-60 border-white placeholder-gray-500 px-3 py-1 rounded text-white"
                    type="text"
                    id="top"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Text top"
                  />
                </div>

                <div className="flex flex-col">
                  <input
                    className="bg-black border-2 w-60 border-white placeholder-gray-500 px-3 py-1 rounded text-white"
                    type="text"
                    id="bottom"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Text bottom"
                  />
                </div>
              </div>
            </div>

            <div className="">
              {selectedImage && (
                <div className="selected-meme-img relative w-[500px] h-[600px] overflow-hidden flex justify-center items-center border-4 border-white mb-20">
                  <p className="absolute top-5 w-[90%] text-center text-white text-6xl font-bold uppercase break-words leading-tight drop-shadow-[0px_0px_6px_rgba(0,0,0,1)]">
                    {topText}
                  </p>
                  <p className="absolute bottom-5 w-[90%] text-center text-white text-6xl font-bold uppercase drop-shadow-[0px_0px_6px_rgba(0,0,0,1)] break-words leading-tight">
                    {bottomText}
                  </p>
                  <img
                    src={selectedImage}
                    alt="Selected meme"
                    className=" w-full h-full object-cover  "
                  />
                </div>
              )}
            </div>
          </div>

          <ProjectNavigation />
        </div>
      </>
    );
};

export default MemeGenerator;
