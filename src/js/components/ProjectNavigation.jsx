// src/components/ProjectNavigation.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const projects = [
    "/counter",
    "/chrono",
    "/countdown",
    "/calculator",
    "/cards",
    "/memegenerator",
    "/weather",
    "/todo",
    "/contacts",
    "/expenses",
    "/calendar",
    "/noticias",
    // ...otros
];

function ProjectNavigation({ hidePrev = false }) {
    const navigate = useNavigate();
    const location = useLocation();

    const currentIndex = projects.indexOf(location.pathname);

    const goNext = () => {
        const nextIndex = (currentIndex + 1) % projects.length;
        navigate(projects[nextIndex]);
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            navigate(projects[currentIndex - 1]);
        }
    };

    // Configuración para gestos de swipe
    const handlers = useSwipeable({
        onSwipedLeft: () => goNext(),   // swipe hacia la izquierda → siguiente
        onSwipedRight: () => goPrev(), // swipe hacia la derecha → anterior
        preventDefaultTouchmoveEvent: true,
        trackMouse: false, // solo táctil
    });

    return (
        <div {...handlers} className="w-full h-full">
            {!hidePrev && (
                <button
                    onClick={goPrev}
                    className="fixed bottom-5 md:bottom-20 left-10 z-50  text-white px-2 py-2 hover:text-cyan-700"
                >
                    <FaCaretLeft className="text-2xl" />
                </button>
            )}

            <button
                onClick={goNext}
                className="fixed bottom-5 md:bottom-20 right-10 z-50 text-white px-2 py-2  hover:text-cyan-700"
            >
                <FaCaretRight className="text-2xl" />
            </button>
        </div>
    );
}

export default ProjectNavigation;
