// ===============================
// src/views/Works.jsx
// ===============================
import React from "react";
import { motion } from "framer-motion";
import ProjectNavigation from "../components/ProjectNavigation";


const projects = [
  {
    title: "LowFreqMx",
    description:
      `Website for the music label Low Freq Mx.

Freelance project which includes info, videos, contact and artist rooster with booking options.

React, Tailwind, FormSubmit, Vercel, GoDaddy.`,
    link: "https://lowfreqmx.com",
    type: "Website",
  },
  {
    title: "Zepda Eco Logistics",
    description:`4geeks Academy final course project.

Platform to connect companies that offer logistics resources with those that need them.

React, Bootstrap

Python, Flask, SQL-Alchemy, JWT, bcrypt`,
    link: "https://github.com/4GeeksAcademy/ZEPDA_eco-logistics_finalProject",
    type: "GitHub Repo",
  },
];

export default function Works() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Fondo decorativo */}
      <video
        className="fixed w-full h-full object-cover"
        src="../src/video/movieout.5.mp4" // 👉 aquí cambias el link de tu video
        autoPlay
        loop
        muted
        playsInline
      ></video>
        {/* Overlay para mejorar contraste */}
                    <div className="fixed inset-0 bg-cyan-950/40 "></div>


      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 pt-15 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Título */}
        <h1 className="text-4xl titulo-name font-bold mb-12 tracking-tight text-center">
          Works
        </h1>

        {/* Grid de proyectos */}
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-zinc-900/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h2 className="text-3xl titulo font-semibold mb-3">
                  {project.title}
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from--500 to-cyan-600 text-white font-medium hover:opacity-90 transition"
              >
                Ver {project.type}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
