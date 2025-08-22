// src/js/components/Info.jsx
import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import fotocyan from "../../img/zasfotocyan.png";

const Info = () => {
  return (
    <div className="absolute top-0 inset-0 overflow-y-auto text-white bg-black">
      {/* Video de fondo */}
      <video
        className="fixed w-full h-full object-cover"
        src="/video/movieout.5.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay */}
      <div className="fixed inset-0 bg-cyan-950/40"></div>

      {/* Contenido con animación */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 p-4 md:pt-12 md:px-6 mt-10 min-h-screen"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-black/50 to-neutral-900/50 shadow-lg p-4 md:p-10">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex flex-col md:flex-row md:items-center border-b border-gray-700 pb-6 mb-6"
          >
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-4xl titulo-name font-bold">
                <p>Miguel Angel</p>
                <p>Pardo Bargues</p>
              </h1>
              <p className="text-base md:text-lg mt-2 italic text-cyan-300">
                Web designer/developer.
              </p>
            </div>
            <div className="text-sm md:text-base md:ms-33 text-gray-300">
              <p>Email: zasmomoxipol@gmail.com</p>
              <p>Tel: +34 635 863 012</p>
              <p>Valencia, España</p>
              <p className="mt-2">
                <a
                  href="https://github.com/zasmooncat"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  GitHub
                </a>{" "}
                |{" "}
                <a
                  href="https://linkedin.com/in/zasmooncat"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </motion.header>

          {/* seccion foto y descripcion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col md:flex-row gap-6"
          >
            {/* foto */}
            <section className="flex-shrink-0">
              <img
                src={fotocyan}
                alt="foto"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto md:mx-0 opacity-70 rounded-lg"
              />
            </section>

            {/* About */}
            <section className="flex-1">
              <h2 className="titulo-name text-cyan-200 font-semibold mb-4">
                ABOUT ME
              </h2>

              <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8">
                Always looking for new ways to express my creativity and sharing
                my work with the world. Web design and development bring me the
                opportunity to investigate a new world of possibilities to share
                my art through useful and functional applications. I love
                learning new ways to improve my skills and create better user
                experiences, that combines art, design and technology.
              </p>

              {/* lista de links */}
              <ul className="grid grid-cols-1 list-disc ms-4 sm:grid-cols-2 gap-4 titulo-name">
                <li className="text-white hover:text-cyan-400 cursor-pointer leading-relaxed p-2 bg-black/20 rounded-lg transition-colors duration-300">
                  <Link to="/projects" className="block">
                    REACT DEMOS
                  </Link>
                </li>
                <li className="text-white hover:text-cyan-400 cursor-pointer leading-relaxed p-2 bg-black/20 rounded-lg transition-colors duration-300">
                  <Link to="/videoart" className="block">
                    VIDEO
                  </Link>
                </li>
                <li className="text-white hover:text-cyan-400 cursor-pointer leading-relaxed p-2 bg-black/20 rounded-lg transition-colors duration-300">
                  <Link to="/works" className="block">
                    WORKS
                  </Link>
                </li>
                <li className="text-white hover:text-cyan-400 cursor-pointer leading-relaxed p-2 bg-black/20 rounded-lg transition-colors duration-300">
                  <a
                    href="https://www.dropbox.com/scl/fi/4ohnt8lsh0shs4iur3xsq/Miguel-Angel-Pardo-Bargues-FlowCV-Resume-20250822.pdf?rlkey=tvwh7cmqwpz9ixvis16nflabx&st=50edsntw&dl=0"
                    className="block"
                  >
                    RESUME
                  </a>
                </li>
              </ul>
            </section>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Info;
