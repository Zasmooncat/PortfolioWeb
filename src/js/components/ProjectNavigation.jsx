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

    // Configuración swipe
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            console.log("👉 Swipe left detected → siguiente");
            goNext();
        },
        onSwipedRight: () => {
            console.log("👈 Swipe right detected → anterior");
            goPrev();
        },
        preventScrollOnSwipe: true, // recomendado
        trackTouch: true,
        trackMouse: false, // si quieres probar en desktop ponlo en true
    });

    return (
        <div
            {...handlers}
            className="fixed inset-0 z-40" // <- ocupa toda la pantalla para detectar swipe
        >
            {!hidePrev && (
                <button
                    onClick={goPrev}
                    className="fixed bottom-4 left-4 z-50 bg-black border text-white px-2 py-2 rounded shadow hover:bg-cyan-700"
                >
                    <FaCaretLeft className="text-2xl" />
                </button>
            )}

            <button
                onClick={goNext}
                className="fixed bottom-4 right-4 z-50 bg-black border text-white px-2 py-2 rounded shadow hover:bg-cyan-700"
            >
                <FaCaretRight className="text-2xl" />
            </button>
        </div>
    );
}

export default ProjectNavigation;
