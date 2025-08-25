// ===============================
// src/js/views/Home.jsx
// ===============================
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import videoBackground from '/video/movieout.5.mp4';
import reactlogo from '/img/react-1.webp';
import tdlogo from '/img/iconTD.webp';
import infoicon from '/img/info.png';
import gearicon from '/img/gear-vector-icon-image-style-is-a-flat-blue-and-gray-icon-symbol.png';

function Home() {
  const { user } = useContext(AuthContext);

  // 🔥 Variantes para animar hijos en secuencia
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.051,
      },
    },
  };

// 🎬 Variants para cada capa
const videoVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 } // ⚡️ rápido
  }
};


const contentVariants = {
  hidden: { opacity: 0, y: 0 }, // aparece desde abajo
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 } // más suave y tardío
  }
};


  return (
    <div className="bg-black">
      <motion.main
        className={`md:fixed transition-all duration-500 ease-in-out w-full h-screen ${
          user ? 'md:ml-10' : ''
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 🎬 Video con fade-in */}
        <motion.video
          className="fixed w-full h-full object-cover top-0"
          src={videoBackground}
          autoPlay
          loop
          muted
          playsInline
          variants={videoVariants}
        />

        {/* Overlay para contraste */}
        <motion.div
          className="fixed inset-0 bg-cyan-950/40"
          variants={videoVariants}
        />

        {/* Contenido */}
        <div className={`mt-5 relative z-10 ${user ? 'md:ml-18' : ''}`}>
          <div className="m-auto flex flex-wrap justify-center">
            <Link to="/projects" className="hover:cursor-pointer m-2">
              <motion.div
                variants={contentVariants}
                
                className="text-white w-70 h-70 flex flex-col items-center justify-center bg-gray-950/10 backdrop-blur-sm hover:text-black hover:bg-white transition"
              >
                <p className="titulo-name font-michroma flex justify-center text-xl m-3">
                  REACT DEMO PROJECTS
                </p>
                <img src={reactlogo} alt="" className="react m-auto" />
              </motion.div>
            </Link>

            <Link to="/videoart" className="hover:cursor-pointer m-2">
              <motion.div
                variants={contentVariants}
                
                className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm hover:text-black hover:bg-white transition"
              >
                <p className="titulo-name font-michroma flex justify-center m-3 text-xl">
                  GENERATIVE VIDEO-ART
                </p>
                <img src={tdlogo} alt="" className="m-auto w-20" />
              </motion.div>
            </Link>
          </div>

          <div className="m-auto flex flex-wrap justify-center ">
            <Link to="/works" className="hover:cursor-pointer m-2">
              <motion.div
                variants={contentVariants}
              
                className="text-white w-70 h-70 flex flex-col bg-black/10 backdrop-blur-sm hover:text-black hover:bg-white transition"
              >
                <p className="titulo-name font-michroma text-xl m-3">WORKS</p>
                <img src={gearicon} alt="" className="m-auto w-25" />
              </motion.div>
            </Link>

            <Link to="/info" className="hover:cursor-pointer m-2">
              <motion.div
                variants={contentVariants}
               
                className="text-white w-70 h-70 flex flex-col bg-black/10 backdrop-blur-sm hover:text-black hover:bg-white transition"
              >
                <p className="titulo-name font-michroma text-xl m-3">INFO </p>
                <img src={infoicon} alt="" className="m-auto w-40 " />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

export default Home;
