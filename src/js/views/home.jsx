import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Sidebar from '../components/Sidebar'; // Asegúrate que tienes este componente creado
import { AuthContext } from '../../context/AuthContext'; // Ajusta la ruta según tu proyecto
import LiquidChrome from '../components/LiquidChrome';
import videoBackground from '../../video/movieout.5.mp4';
import reactlogo from '../../img/react-1.webp';
import tdlogo from '../../img/icontd.webp';
import infoicon from '../../img/info.png';
import mailicon from '../../img/blue-mail-icon.png';
import gearicon from '../../img/gear-vector-icon-image-style-is-a-flat-blue-and-gray-icon-symbol.png';

function Home() {
    const { user } = useContext(AuthContext); // Obtener usuario logueado

    return (
      <>
        <div className="flex ">
          <main className={`md:fixed transition-all duration-500 ease-in-out w-full h-screen ${user ? "md:ml-10" : ""}`}>
            <div>
              <LiquidChrome
                baseColor={[0.03, 0.03, 0.03]}
                speed={0.2}
                amplitude={0.4}
                interactive={true}
              />
            </div>

            <div className={`mt-5 ${
            user ? "md:ml-20" : ""
          }`}>
              <div className="m-auto flex flex-wrap justify-center  ">
                <Link to="/projects" className="hover:cursor-pointer m-2">
                  <div>
                    <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40  hover:text-black hover:bg-white transition">
                      <p className="flex justify-center text-4xl m-3">
                        REACT PROJECTS
                      </p>
                      <img src={reactlogo} alt="" className="react m-auto" />
                    </div>
                  </div>
                </Link>

                <Link to="/videoart" className="hover:cursor-pointer m-2">
                  <div>
                    <div className="text-white w-70 h-70 flex flex-col items-center justify-center bg-black/40 hover:text-black hover:bg-white transition">
                      <p className="flex justify-center m-3 text-4xl">
                        GENERATIVE VIDEO-ART
                      </p>
                      <img src={tdlogo} alt="" className="m-auto w-20" />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="m-auto flex flex-wrap justify-center ">
                <Link to="/contact" className="hover:cursor-pointer m-2">
                  <div>
                    <div className="text-white w-70 h-70 flex flex-col bg-black/40 hover:text-black hover:bg-white transition">
                      <p className="text-4xl m-3">WORKS</p>
                      <img src={gearicon} alt="" className="m-auto w-25" />
                    </div>
                  </div>
                </Link>


                <Link to="/info" className="hover:cursor-pointer m-2">
                  <div>
                    <div className="text-white w-70 h-70 flex flex-col  bg-black/40 hover:text-black hover:bg-white transition">
                      <p className=" text-4xl m-3">INFO </p>
                      <img src={infoicon} alt="" className="m-auto w-40 " />
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
