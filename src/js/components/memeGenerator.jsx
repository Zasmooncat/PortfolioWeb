import React, { useState, useEffect } from "react";
import ProjectNavigation from "../components/ProjectNavigation";
import Squares from "./Squares";

const images = import.meta.glob("/img/memeimg/*.{png,jpg,jpeg,gif,webp}");

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

        <div className="fixed inset-0 bg-cyan-950/40 "></div>

        <div className="relative min-h-screen w-full">
          <p className="titulo text-center text-white text-5xl mt-10 mb-10">
            MEME GENERATOR
          </p>

          <div className="grid grid-cols-1 gap-10 bg-gray-800/60 md:grid-cols-2 md:relative justify-items-center md:h-180 md:w-280 mx-auto rounded-xl overflow-hidden">
            <div className="  flex flex-col items-center md:mt-20">
              <p className="text-gray-400 mt-2">Select Image</p>
              {/* Miniaturas del slider */}
              <div className="flex items-center  mt-5">
                <button
                  onClick={handlePrev}
                  className="text-white mx-3 text-xl rounded-full bg-gray-700/50 px-3 py-2 rounded hover:bg-black"
                >
                  ◀
                </button>

                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Meme preview"
                    className="w-40 h-40 grayscale-70 object-cover border-2 border-white rounded"
                  />
                )}

                <button
                  onClick={handleNext}
                  className="text-white mx-3 text-xl rounded-full bg-gray-700/50 px-3 py-2 rounded hover:bg-black"
                >
                  ▶
                </button>
              </div>

              {/* Inputs */}
              <div className="inputs flex flex-col mt-12 gap-5">
                <div className="">
                  <input
                    className="bg-gray-200  w-60 placeholder-gray-500 px-3 py-1 rounded "
                    type="text"
                    id="top"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Text top"
                  />
                </div>

                <div className="flex flex-col">
                  <input
                    className="bg-gray-200 w-60 placeholder-gray-500 px-3 py-1 rounded"
                    type="text"
                    id="bottom"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Text bottom"
                  />
                </div>
              </div>
            </div>

            <div className="w-[80%] h-150 md:w-1/2  md:absolute md:right-4  ">
              {selectedImage && (
                <div className="selected-meme-img relative w-full  md:w-150   m-auto overflow-hidden mt-5 ">
                  <p className=" absolute top-5 w-[100%]  text-center text-white text-6xl font-bold uppercase  drop-shadow-[0px_0px_6px_rgba(0,0,0,1)]">
                    {topText}
                  </p>
                  <p className="absolute bottom-5 w-[100%] text-center text-white text-6xl font-bold uppercase drop-shadow-[0px_0px_6px_rgba(0,0,0,1)] ">
                    {bottomText}
                  </p>
                  <img
                    src={selectedImage}
                    alt="Selected meme"
                    className=" w-full h-110 md:h-170 object-cover  "
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
