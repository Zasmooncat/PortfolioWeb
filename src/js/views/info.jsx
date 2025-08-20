// src/js/components/Info.jsx
import React from "react";

const Info = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-700 pb-6 mb-6">
          <div>
            <h1 className="text-4xl font-bold">Miguel Angel Pardo Bargues</h1>
            <p className="text-lg text-gray-400">Desarrollador Web Fullstack Diseño UI UX</p>
          </div>
          <div className="mt-4 md:mt-0 text-gray-300">
            <p>Email: zasmomoxipol@gmail.com</p>
            <p>Tel: +34 635 863 012</p>
            <p>Valencia, España</p>
            <p>
              <a href="https://github.com/zasmooncat" className="hover:text-green-400">
                GitHub
              </a>{" "}
              |{" "}
              <a href="https://linkedin.com/in/zasmooncat" className="hover:text-green-400">
                LinkedIn
              </a>
            </p>
          </div>
        </header>

        {/* About */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Sobre mí</h2>
          <p className="text-gray-300 leading-relaxed">
            Breve descripción personal: tu perfil, motivación y objetivos. Aquí
            puedes hablar de tu pasión por la tecnología, proyectos personales o
            lo que te define como profesional.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Experiencia</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">Puesto de trabajo</h3>
              <p className="text-gray-400 italic">Empresa | 2020 - 2022</p>
              <p className="text-gray-300">
                Breve descripción de tus funciones, proyectos destacados y logros
                obtenidos.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Otro puesto de trabajo</h3>
              <p className="text-gray-400 italic">Otra empresa | 2018 - 2020</p>
              <p className="text-gray-300">
                Explica responsabilidades y resultados, de manera clara y concisa.
              </p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Educación</h2>
          <div>
            <h3 className="text-xl font-bold">Título / Curso</h3>
            <p className="text-gray-400 italic">Institución | Año</p>
            <p className="text-gray-300">Descripción breve de los estudios.</p>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Habilidades</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-300">
            <li className="bg-gray-700 rounded-lg px-3 py-1">React</li>
            <li className="bg-gray-700 rounded-lg px-3 py-1">JavaScript</li>
            <li className="bg-gray-700 rounded-lg px-3 py-1">Python</li>
            <li className="bg-gray-700 rounded-lg px-3 py-1">SQL</li>
            <li className="bg-gray-700 rounded-lg px-3 py-1">Git/GitHub</li>
            <li className="bg-gray-700 rounded-lg px-3 py-1">TailwindCSS</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Info;
