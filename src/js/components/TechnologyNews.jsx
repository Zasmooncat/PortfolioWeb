// src/front/JS/components/TechnologyNews.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Squares from "./Squares"; // Asegúrate que la ruta es correcta
import ProjectNavigation from "../components/ProjectNavigation"; // Asegúrate que la ruta es correcta

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

const TechnologyNews = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=tecnología OR robótica OR internet&lang=es&token=${API_KEY}`
        );
        
        const data = await response.json();
        console.log("DATA:", data);
        setNews(data.articles || []);
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-y-auto">
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

      {/* Contenido */}
      <div className="relative z-10 ">
        <h1 className="titulo text-center text-white text-5xl mb-8 pointer-events-auto">TECNOLOGY NEWS</h1>
        <div className="md:w-10/12 mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-800/50 hover:bg-neutral-800 p-4 rounded-xl transition duration-300 shadow-lg"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-sm mt-2 line-clamp-2">{article.description}</p>
            </a>
          ))}
        </div>
      <ProjectNavigation />
      </div>

     
    </div>
    
  );
};

export default TechnologyNews;
