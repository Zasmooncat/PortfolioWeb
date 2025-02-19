import React, { useState, useEffect } from "react";

// Importa todas las imágenes de la carpeta
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
    const [selectedImage, setSelectedImage] = useState(null);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");

    // Cargar imágenes al montar el componente
    useEffect(() => {
        loadImages().then(setMemeImages);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <p className="titulo text-center text-white text-5xl mt-30 mb-10">MEME GENERATOR</p>

            <div className="inputs container m-auto flex flex-col items-center gap-3">
                
                <label className="text-white">Select image</label>
            </div>

            {/* Muestra todas las imágenes */}
            <div className="meme-images w-[50%] flex flex-wrap gap-4 justify-center mt-5">
                {memeImages.map((image, index) => (
                    <img 
                        key={index} 
                        src={image} 
                        alt={`Meme ${index}`} 
                        className="w-32 h-32 object-cover cursor-pointer border-2 border-transparent hover:border-white transition"
                        onClick={() => setSelectedImage(image)} 
                    />

                    
                ))}
            </div>

            <div className="container m-auto">

            {/* Input para el texto superior */}
            <input 
                    className="bg-black border-2 border-white placeholder-gray-500 px-3 py-1 rounded text-white" 
                    type="text" 
                    placeholder="Text 1 top" 
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                />
                {/* Input para el texto inferior */}
                <input 
                    className="bg-black border-2 border-white placeholder-gray-500 px-3 py-1 rounded text-white" 
                    type="text" 
                    placeholder="Text 2 bottom" 
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                />
            </div>

            
            {selectedImage && (
                <div className="selected-meme-img relative w-[600px] h-[600px] bg-black my-10 overflow-hidden flex justify-center items-center">
                    {/* Texto top */}
                    <p className="absolute top-5 w-[90%] text-center text-white text-5xl font-bold uppercase break-words leading-tight drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">
                        {topText}
                    </p>
                    {/* Texto bottom */}
                    <p className="absolute bottom-5 w-[90%] text-center text-white text-6xl font-bold uppercase drop-shadow-[0px_0px_4px_rgba(0,0,0,1)] break-words leading-tight">
                        {bottomText}
                    </p>

                    {/* Imagen seleccionada */}
                    <img src={selectedImage} alt="Selected meme" className="w-full h-full object-cover rounded-3xl" />
                </div>
            )}
        </div>
    );
};

export default MemeGenerator;
