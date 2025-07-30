import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const projects = [
    "/counter",
    "/chrono",
    "/countdown",
    "/todo",
    "/calculator",
    "/cards",
    "/memegenerator",
    "/weather",
    "/contacts",
    "/noticias",
    "/tictactoe",
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

    return (
        <>
            {!hidePrev && (
                <button
                    onClick={goPrev}
                    className="fixed bottom-4 left-4 z-50 bg-black border text-white px-2 py-2 rounded shadow hover:bg-green-700"
                >
                    <FaCaretLeft className="text-2xl" />
                </button>
            )}

            <button
                onClick={goNext}
                className="fixed bottom-4 right-4 z-50 bg-black border text-white px-2 py-2 rounded shadow hover:bg-green-700"
            >
                <FaCaretRight className="text-2xl" />
            </button>
        </>
    );
}

export default ProjectNavigation;
