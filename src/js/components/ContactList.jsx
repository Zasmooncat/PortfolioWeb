import React, { useState } from 'react'
import '../../styles/counter.css'
import Squares from './Squares';
import ProjectNavigation from "../components/ProjectNavigation";

function ContactList() {
    return (
        <>
            {/* Fondo */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <Squares
                    speed={0.2}
                    squareSize={70}
                    direction="diagonal"
                    borderColor="#fff3"
                    hoverFillColor="#911"
                />
            </div>

            {/* Contenido */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full mt-30">
                <h1 className="titulo text-white text-5xl mb-8 pointer-events-auto">CONTACT LIST</h1>
            </div>
                <ProjectNavigation/>
        </>
    );
}

export default ContactList;
