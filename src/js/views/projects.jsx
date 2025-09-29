import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import { motion } from "framer-motion";


// 📦 Contenedor: controla el stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // ⏱ cada tarjeta aparece con 0.2s de diferencia
      delayChildren: 0.1    // ⏱ espera 0.3s antes de empezar
    }
  }
};

// 📦 Cada tarjeta individual
const itemVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function Projects() {

  const { user } = useContext(AuthContext); // Obtener usuario logueado
  return (
    <div>
      <video
                className="fixed w-full h-full object-cover top-0"
                src="/video/movieout.5.mp4" // 👉 aquí cambias el link de tu video
                autoPlay
                loop
                muted
                playsInline
            ></video>
      {/* Overlay para mejorar contraste */}
      <div className="fixed inset-0 bg-cyan-950/40"></div>

      <div className="relative z-10 mt-5 m-3">
       <motion.div
  className={`animate-fadeIn mx-auto mt-10 
              grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
              gap-3 max-w-[1200px] px-3
              ${user ? "md:ml-55" : ""}`}
  initial="hidden"
  animate="visible"
  variants={containerVariants}
>


              
          <Link to="/counter" className="hover:cursor-pointer">
            
              <motion.div 
              variants={itemVariants}
              className="text-white mx-auto  w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
                <p className="titulo-name top-0 left-0 text-xl absolute p-5">
                  SIMPLE COUNTER
                </p>
                <p className=" text-sm text-gray-400 p-5 top-[30%] absolute mt-5 left-0">
                  Just a simple counter with add, substract and reset buttons.
                </p>
              </motion.div>
           
          </Link>


          <Link to="/chrono" className="hover:cursor-pointer">
            <motion.div 
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">
                CHRONOMETER
              </p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] bottom-2 absolute mt-5 left-0">
                Cronometer App with minutes, seconds and centiseconds
                accuracy.
              </p>
            </motion.div>
          </Link>

          <Link to="/countdown" className="hover:cursor-pointer">
            <motion.div 
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">COUNT DOWN</p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] bottom-2 absolute mt-5 left-0">
                Set the time and press start. Timer will start counting down
                to zero.
                {/* Cambié el p interno por span */}
                <span>With 10 seconds left warning and final alarm.</span>
              </p>
            </motion.div>
          </Link>

          <Link to="/calculator" className="hover:cursor-pointer">
            <motion.div
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              {/* Cambié el p interno por span */}
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">
                CALCULATOR
              </p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] bottom-2 absolute mt-5 left-0">
                Simple calculator App with basic operations for your daily
                calculations.
              </p>
            </motion.div>
          </Link>

          <Link to="/cards" className="hover:cursor-pointer">
            <motion.div 
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">
                RANDOM CARDS
              </p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] bottom-2 absolute mt-5 left-0">
                Generate a random card with a click on the button or just wait
                10 seconds and will generate automatically a new card.
              </p>
            </motion.div>
          </Link>

          <Link to="/memegenerator" className="hover:cursor-pointer">
            <motion.div 
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">
                MEME GENERATOR
              </p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] bottom-2 absolute mt-5 left-0">
                Select an image from the gallery an write the meme text.
              </p>
            </motion.div>
          </Link>

          <Link to="/calendar" className="hover:cursor-pointer">
            <motion.div 
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">
                CALENDAR
              </p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] absolute mt-5 left-0">
                Monthly calendar. You can add, remove or edit events.
              </p>
            </motion.div>
          </Link>

          <Link to="/todo" className="hover:cursor-pointer">
            <motion.div 
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">TO DO LIST</p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] bottom-2 absolute mt-5 left-0">
                Just write your task and press enter. Your task will appear in
                the list.
                {/* Cambié el p interno por span */}
                <span>You can edit, delete or mark your task as done.</span>
              </p>
            </motion.div>
          </Link>

          <Link to="/contacts" className="hover:cursor-pointer">
            <motion.div 
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              {/* Cambié el p interno por span */}
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">
                <span>CONTACT LIST</span>
              </p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] bottom-2 absolute mt-5 left-0">
                Just add your contacts and see them in the list. Login to save your contacts.
              </p>
            </motion.div>
          </Link>

          <Link to="/expenses" className="hover:cursor-pointer">
            <motion.div 
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">
                EXPENSES TRACKER
              </p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] bottom-2 absolute mt-5 left-0">
                Track your expenses and incomes, add categories and see your
                balance.
              </p>
            </motion.div>
          </Link>

          <Link to="/weather" className="hover:cursor-pointer">
            <motion.div 
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              {/* Cambié el p interno por span */}
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">
                APP WEATHER
              </p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] bottom-2 absolute mt-5 left-0">
                Select the country, enter the city name ang get the weather
                information.
              </p>
            </motion.div>
          </Link>

          <Link to="/noticias" className="hover:cursor-pointer">
            <motion.div 
            variants={itemVariants}
            className="text-white mx-auto w-70 h-70 flex flex-col items-center justify-center bg-gray-950/40 backdrop-blur-md p-5 hover:text-black hover:bg-white transition relative">
              <p className="titulo-name top-0 left-0 text-xl absolute p-5">
                NEWS SEARCH ENGINE
              </p>
              <p className=" text-sm text-gray-400 p-5 top-[30%] bottom-2 absolute mt-10 left-0">
                Search for the latest news by topic, country or keyword.
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Projects;
