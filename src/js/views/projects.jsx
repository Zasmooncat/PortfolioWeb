import React, { useState } from 'react'
import { Link } from 'react-router'
import Navbar from '../components/navbar'

function Projects() {


    return (
        <>


            <h1 className='titulo text-center text-white text-5xl mt-30 m-3 text-decoration-line: underline'>REACT PROJECTS</h1>

            <div className='mt-5 m-3 flex flex-wrap gap-5 justify-center'>

                <Link className='hover:bg-green-900 md:w-[15%]  hover:border-green-400 w-full border-2 border-white p-6 rounded-2xl transition-colors bg-linear-to-t from-gray-950 to-gray-700' to="/counter">
                    <div >

                        <p className='mt-4 titulo text-5xl text-white'>
                            Simple Counter
                        </p>
                        <p className='text-gray-300 mt-4'>
                            Just a simple counter with add, substract and reset buttons.
                        </p>
                    </div>
                </Link>

                <Link className='hover:bg-green-900 md:w-[15%] hover:border-green-400 w-full border-2 border-white p-6 rounded-2xl transition-colors bg-linear-to-t from-gray-950 to-gray-700' to="/chrono">
                    <div>
                        <p className='mt-4 titulo text-5xl text-white'>

                            Chronometer
                        </p>
                        <p className='text-gray-300 mt-4'>
                            Cronometer App with minutes, seconds and centiseconds accuracy.
                            <p>

                                Play/pause and reset buttons included.
                            </p>
                        </p>
                    </div>
                </Link>

                <Link className='hover:bg-green-900 md:w-[15%] hover:border-green-400 w-full border-2 border-white p-6 rounded-2xl transition-colors bg-linear-to-t from-gray-950 to-gray-700' to="/countdown">
                    <div>
                        <p className='mt-4 titulo text-5xl text-white'>

                            Count Down
                        </p>
                        <p className='text-gray-300 mt-4'>
                            Set the time and press start. Timer will start counting down to zero.
                            <p>
                                With 10 seconds left warning and final alarm.
                            </p>

                        </p>
                    </div>
                </Link>
                <Link className='hover:bg-green-900 hover:border-green-400 md:w-[15%] w-full border-2 border-white p-6 rounded-2xl transition-colors bg-linear-to-t from-gray-950 to-gray-700' to="/todo">
                    <div>
                        <p className='mt-4 titulo text-5xl text-white'>

                            To Do List
                        </p>
                        <p className='text-gray-300 mt-4'>
                            Just write your task and press enter. Your task will appear in the list.
                            <p>
                                You can edit, delete or mark your task as done.
                            </p>
                        </p>
                    </div>
                </Link>

                <Link className='hover:bg-green-900 hover:border-green-400 md:w-[15%] w-full border-2 border-white p-6 rounded-2xl transition-colors bg-linear-to-t from-gray-950 to-gray-700' to="/calculator">
                    <div>
                        <p className='mt-4 titulo text-5xl text-white'>

                            Calculator
                        </p>
                        <p className='text-gray-300 mt-4'>
                            Simple calculator App with basic operations for your daily calculations.
                            
                        </p>
                    </div>
                </Link>

               
                <Link className='hover:bg-green-900 hover:border-green-400 md:w-[15%] w-full border-2 border-white p-6 rounded-2xl transition-colors bg-linear-to-t from-gray-950 to-gray-700' to="/cards">
                    <div>
                        <p className='mt-4 titulo text-5xl text-white'>

                            Random Cards
                        </p>
                        <p className='text-gray-300 mt-4'>
                            Generate a random card with a click on the button or just wait 10 seconds and will generate automatically a new card.
                            
                        </p>
                    </div>
                </Link>


                <Link className='hover:bg-green-900 hover:border-green-400 md:w-[15%] w-full border-2 border-white p-6 rounded-2xl transition-colors bg-linear-to-t from-gray-950 to-gray-700' to="/memegenerator">
                    <div>
                        <p className='mt-4 titulo text-5xl text-white'>

                            Meme Generator
                        </p>
                        <p className='text-gray-300 mt-4'>
                            Select an image from the gallery an write the meme text.
                            
                        </p>
                    </div>
                </Link>
                

                
                <Link className='hover:bg-green-900 hover:border-green-400 md:w-[15%] w-full border-2 border-white p-6 rounded-2xl transition-colors bg-linear-to-t from-gray-950 to-gray-700' to="/weather">
                    <div>
                        <p className='mt-4 titulo text-5xl text-white'>

                           App Weather
                        </p>
                        <p className='text-gray-300 mt-4'>
                            Select the country, enter the city name ang get the weather information.
                        </p>
                    </div>
                </Link>
               

               


            </div>



        </>
    )
}

export default Projects