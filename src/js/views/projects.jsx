import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import LiquidChrome from '../components/LiquidChrome'
import TicTacToe from "../components/TicTacToe";

function Projects() {
    return (
        <>

            <LiquidChrome
                baseColor={[0.05, 0.05, 0.05]}
                speed={0.1}
                amplitude={0.4}
                interactive={true}
            />

            <div className="relative z-10 mt-5 m-3">
                {/* GRID PARA ALINEAR */}
                <div className="mx-auto w-10/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <Link to="/counter" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">SIMPLE COUNTER</p>
                            <p className="text-gray-400 p-5 top-[30%] absolute left-0">
                                Just a simple counter with add, substract and reset buttons.
                            </p>
                        </div>
                    </Link>

                    <Link to="/chrono" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">
                                CHRONO <p></p>METER
                            </p>
                            <p className="text-gray-400 p-5 top-[30%] bottom-2 absolute left-0">
                                Cronometer App with minutes, seconds and centiseconds accuracy.
                            </p>
                        </div>
                    </Link>

                    <Link to="/countdown" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">COUNT DOWN</p>
                            <p className="text-gray-400 p-5 top-[30%] bottom-2 absolute left-0">
                                Set the time and press start. Timer will start counting down to zero.
                                <p>With 10 seconds left warning and final alarm.</p>
                            </p>
                        </div>
                    </Link>

                    <Link to="/todo" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">TO DO LIST</p>
                            <p className="text-gray-400 p-5 top-[30%] bottom-2 absolute left-0">
                                Just write your task and press enter. Your task will appear in the list.
                                <p>You can edit, delete or mark your task as done.</p>
                            </p>
                        </div>
                    </Link>

                    <Link to="/calculator" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">
                                CALCU <p>LATOR</p>
                            </p>
                            <p className="text-gray-400 p-5 top-[30%] bottom-2 absolute left-0">
                                Simple calculator App with basic operations for your daily calculations.
                            </p>
                        </div>
                    </Link>

                    <Link to="/cards" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">RANDOM CARDS</p>
                            <p className="text-gray-400 p-5 top-[30%] bottom-2 absolute left-0">
                                Generate a random card with a click on the button or just wait 10 seconds and will generate automatically a new card.
                            </p>
                        </div>
                    </Link>

                    <Link to="/memegenerator" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">MEME GENERATOR</p>
                            <p className="text-gray-400 p-5 top-[30%] bottom-2 absolute left-0">
                                Select an image from the gallery an write the meme text.
                            </p>
                        </div>
                    </Link>

                    <Link to="/weather" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">APP <p>WEATHER</p></p>
                            <p className="text-gray-400 p-5 top-[30%] bottom-2 absolute left-0">
                                Select the country, enter the city name ang get the weather information.
                            </p>
                        </div>
                    </Link>

                    <Link to="/contacts" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">
                                <p>CONTACT LIST</p>
                            </p>
                            <p className="text-gray-400 p-5 top-[30%] bottom-2 absolute left-0">
                                Select the country, enter the city name ang get the weather information.
                            </p>
                        </div>
                    </Link>

                    <Link to="/noticias" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">TECHNOLOGY NEWS</p>
                            <p className="text-gray-400 p-5 top-[30%] bottom-2 absolute left-0">
                                Select the country, enter the city name ang get the weather information.
                            </p>
                        </div>
                    </Link>
                    <Link to="/tic-tac-toe" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">
                            <p className="top-0 left-0 text-4xl absolute p-5">TIC TAC TOE</p>
                            <p className="text-gray-400 p-5 top-[30%] absolute left-0">
                                Classic X and O game. Play against a friend!
                            </p>
                        </div>
                    </Link>
                    <Link to="/" className="hover:cursor-pointer">
                        <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition relative">

                        </div>
                    </Link>


                </div>
            </div>
        </>
    )
}

export default Projects;
