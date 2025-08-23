// src/front/JS/components/TechnologyNews.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Squares from "./Squares"; 
import ProjectNavigation from "../components/ProjectNavigation"; 

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

const TechnologyNews = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("tecnologia"); // búsqueda inicial
  const [inputValue, setInputValue] = useState(""); // valor del input
  const navigate = useNavigate();

  // Función para cargar noticias según la query
  const fetchNews = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=es&max=9&token=${API_KEY}`
      );

      const data = await response.json();
      console.log("DATA:", data);
      setNews(data.articles || []);
    } catch (error) {
      console.error("Error al cargar noticias:", error);
    }
  };

  // Cargar noticias al inicio con la query por defecto
  useEffect(() => {
    fetchNews(query);
  }, []);

  // Handler al enviar el input
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setQuery(inputValue);
    fetchNews(inputValue);
    setInputValue(""); // limpiar el input
  };

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
       {/* Overlay para mejorar contraste */}
      <div className="fixed inset-0 bg-cyan-950/40"></div>

      {/* Contenido */}
      <div className="relative z-10">
        <h1 className="titulo text-center text-white text-5xl mb-8 pointer-events-auto">
          NEWS SEARCH ENGINE
        </h1>

        {/* Input de búsqueda */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center m-16 gap-2 pointer-events-auto"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Buscar noticias..."
            className="w-72 px-4 py-2 bg-white placeholder-gray-500 rounded-lg text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer px-4 py-2 rounded-lg transition"
          >
            Buscar
          </button>
        </form>

        <div className="md:w-8/12 mx-auto grid  md:grid-cols-2 lg:grid-cols-3">
          {news.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 hover:bg-cyan-950 p-4 transition duration-300"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover mb-4"
                />
              )}
              <h3 className="titulo font-smooch text-2xl font-semibold">{article.title}</h3>
              <p className="titulo font-smooch text-gray-400  mt-2 line-clamp-2">
                {article.description}
              </p>
            </a>
          ))}
        </div>

        <ProjectNavigation />
      </div>
    </div>
  );
};

export default TechnologyNews;
