// src/front/JS/components/TechnologyNews.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Squares from "./Squares"; 
import ProjectNavigation from "../components/ProjectNavigation"; 
import { motion } from "framer-motion"; // 👈 importamos framer-motion

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

const TechnologyNews = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("tecnologia");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

const fetchNews = async (searchQuery) => {
  try {
    const response = await fetch(`/api/news?q=${encodeURIComponent(searchQuery)}`);
    const data = await response.json();
    setNews(data.articles || []);
  } catch (error) {
    console.error("Error al cargar noticias:", error);
  }
};


  useEffect(() => {
    fetchNews(query);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setQuery(inputValue);
    fetchNews(inputValue);
    setInputValue("");
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

      {/* Overlay */}
      <div className="fixed inset-0 bg-cyan-950/40"></div>

      {/* Contenido */}
      <div className="relative z-10">
        <h1 className="titulo text-center text-white text-5xl mb-8">
          NEWS SEARCH ENGINE
        </h1>

        {/* Input */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center m-16 gap-2"
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

        {/* Noticias con animación */}
        <div className="md:w-8/12 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article, index) => (
            <motion.a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 hover:bg-cyan-950 p-4 rounded-lg transition duration-300"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
              )}
              <h3 className="titulo font-smooch text-2xl font-semibold">
                {article.title}
              </h3>
              <p className="titulo font-smooch text-gray-400 mt-2 line-clamp-2">
                {article.description}
              </p>
            </motion.a>
          ))}
        </div>

        <ProjectNavigation />
      </div>
    </div>
  );
};

export default TechnologyNews;
