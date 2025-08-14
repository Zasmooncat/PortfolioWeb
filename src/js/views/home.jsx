import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Sidebar from '../components/Sidebar'; // Asegúrate que tienes este componente creado
import { AuthContext } from '../../context/AuthContext'; // Ajusta la ruta según tu proyecto
import LiquidChrome from '../components/LiquidChrome';
import videoBackground from '../../video/movieout.5.mp4';
import zasbw from '../../img/zasbw_sinfondo.png';
import reactlogo from '../../img/react-1.webp';
import tdlogo from '../../img/icontd.webp';
import infoicon from '../../img/info.png';
import mailicon from '../../img/blue-mail-icon.png';

function Home() {
    const { user } = useContext(AuthContext); // Obtener usuario logueado

    return (
        <>
        
            <div className="flex">
                {user && <Sidebar user={user} />}

                <main className={`relative w-full h-screen ${user ? 'ml-64' : ''}`}>
                    {/* <div>
                        <LiquidChrome
                            baseColor={[0.05, 0.05, 0.05]}
                            speed={0.1}
                            amplitude={0.4}
                            interactive={true}
                        />
                    </div> */}

                    <div className="box mt-20">
                        <div className="m-auto flex flex-wrap justify-center ">
                            <Link to="/projects" className="hover:cursor-pointer">
                                <div>
                                    <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition">
                                        <p className="flex justify-center text-4xl ">REACT PROJECTS</p>
                                        <img src={reactlogo} alt="" className="react m-auto" />
                                    </div>
                                </div>
                            </Link>

                            <Link to="/videoart" className="hover:cursor-pointer">
                                <div>
                                    <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition">
                                        <p className="flex justify-center text-4xl">GENERATIVE VIDEO-ART</p>
                                        <img src={tdlogo} alt="" className="m-auto w-20" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="m-auto flex flex-wrap justify-center ">
                            <Link to="/projects" className="hover:cursor-pointer">
                                <div>
                                    <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition">
                                        <p className="flex justify-center text-4xl">INFO </p>
                                        <img src={infoicon} alt="" className="m-auto w-40 " />
                                    </div>
                                </div>
                            </Link>

                            <Link to="/contact" className="hover:cursor-pointer">
                                <div>
                                    <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 p-5 hover:text-black hover:bg-white transition">
                                        <p className="flex justify-center text-4xl">CONTACT</p>
                                        <img src={mailicon} alt="" className="m-auto w-30" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Home;
