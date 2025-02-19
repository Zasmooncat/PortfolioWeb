import React, { useState } from 'react'
import { Link } from 'react-router'
import Navbar from '../components/navbar'

function Home() {


    return (
        <>


            <h1 className='titulo text-center text-white text-5xl mt-30'>PROJECTS</h1>
            <div className='titulo text-3xl text-white flex justify-center flex-wrap'>
                <div className='text-left m-10'>
                    <ul>
                        <li>
                            <Link className='text-white hover:text-green-400' to="/counter"> Simple Counter</Link>
                        </li>
                        <li>
                            <Link className='text-white  hover:text-green-400' to="/chrono">Chronometer</Link>
                        </li>
                        <li>
                            <Link className='text-white  hover:text-green-400' to="/todo">To Do List</Link>
                        </li>

                    </ul>
                </div>
                <div className='text-left m-10'>
                    <ul>
                        <li>
                            <Link className='text-white  hover:text-green-400' to="/cards">Random Cards</Link>
                        </li>
                        <li>
                            <Link className='text-white hover:text-green-400' to="/memegenerator"> Meme Generator</Link>
                        </li>
                        <li>
                            <Link className='text-white  hover:text-green-400' to="/chrono">Contact List</Link>
                        </li>

                    </ul>
                </div>

            </div>
        </>
    )
}

export default Home