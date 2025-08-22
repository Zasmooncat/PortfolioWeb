// src/js/components/VideoArt.jsx
import React from "react";
import { motion } from "framer-motion";

// Lista de videos en la carpeta public/video
const videos = [
    "/video/acid_palmeras.mov",
    "/video/liquid_red.mov",
    "/video/ondas_greenish.mov",
    "/video/red_hole.mov",
    "/video/dithercolors.mov",
    "/video/noeglitch.mov",
    "/video/pinkgreenwaves.mov",
    "/video/jewelMooncat.mov",
    "/video/branch_clouds.mov",
    
];

// Variants para animación fade-in con stagger
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const VideoArt = () => {
    return (
        <>
            {/* Video de fondo */}
            <video
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
                src="/video/movieout.5.mp4"
                autoPlay
                loop
                muted
                playsInline
            ></video>

            {/* Overlay para contraste */}
            <div className="fixed inset-0 bg-cyan-950/40 z-10"></div>

            {/* Grid de videos */}
            <motion.div
                className="relative z-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {videos.map((video, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="w-full rounded-lg shadow-lg overflow-hidden"
                    >
                        <video
                            src={video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

export default VideoArt;
