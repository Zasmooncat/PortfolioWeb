import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudShowersHeavy, faCloudRain, faBolt, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';
import ProjectNavigation from "../components/ProjectNavigation";
import Squares from "./Squares"; // Asegúrate que la ruta es correcta



const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?&appid=08f90cb685ac696606f04d9cafa1ddc4&units=metric&lang=es";

 

const AppWeather = () => {
    const [searchWeather, setSearchWeather] = useState({ city: "", country: "" });
    const [weather, setWeather] = useState(null);
    const [lastCountry, setLastCountry] = useState("");

    useEffect(() => {
    window.scrollTo(0, 0);
}, []);

    const handleChange = (event) => {
        setSearchWeather({ ...searchWeather, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (searchWeather.city.trim() === "" || searchWeather.country.trim() === "") {
                console.log("campos vacíos");
                return;
            }

            setLastCountry(searchWeather.country);
            const url = `${URL_BASE}&q=${searchWeather.city},${searchWeather.country}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === "404" || !data.weather) {
                console.log("Ciudad o país no encontrados");
                setWeather({ cod: "404" });
                return;
            }

            setWeather(data);
        } catch (error) {
            console.error("Error al consultar el clima:", error.message);
        } finally {
            setSearchWeather({ city: "", country: "" });
        }
    };

    const weatherIcons = {
        "soleado": faSun,
		"cielo claro": faSun,
		"algo de nubes": faCloudSun,
		"nubes dispersas": faCloudSun,
		"muy nuboso": faCloud,
        "nubes": faCloud,
		"lluvia ligera": faCloudRain,
		"lluvioso": faCloudRain,
        "nieve": faSnowflake,
        "niebla": faSmog
    };

    const weatherDescription = weather?.weather?.[0]?.description?.toLowerCase();
    const weatherIconClass = weatherIcons[weatherDescription] || "fas fa-question";

    return (

        <>
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
                <Squares
                    speed={0.2}
                    squareSize={70}
                    direction="diagonal"
                    borderColor="#fff3"
                    hoverFillColor="#911"
                />
            </div>

             {/* Overlay para mejorar contraste */}
      <div className="fixed inset-0 bg-cyan-950/40 z-10"></div>

        <div className="container  m-auto relative z-20">
            <h1 className="titulo font-smooch text-center text-white text-5xl">EL TIEMPO</h1>
            <div className="seccion1 rounded-xl bg-gradient-to-b from-gray-400/50 to-gray-800/50 p-8 w-[95%] md:w-[50%] lg:w-[30%] z-50">
                <form className="flex flex-col m-auto" onSubmit={handleSubmit}>
                    <div className="form-group flex flex-col">
                       
                        <select className="form-control bg-white  p-2 m-4" id="country" name="country" onChange={handleChange} value={searchWeather.country}>
                            <option value="">Selecciona el país</option>
                            <option value="ES">España</option>
                            <option value="GB">Reino Unido</option>
                            <option value="FR">Francia</option>
                            <option value="DE">Alemania</option>
                            <option value="IT">Italia</option>
                            <option value="PT">Portugal</option>
                            <option value="NL">Países Bajos</option>
                            <option value="MX">México</option>
                            <option value="CO">Colombia</option>
                            <option value="VE">Venezuela</option>
                            <option value="BR">Brasil</option>
                            <option value="US">Estados Unidos</option>
                            <option value="CA">Canadá</option>
                            <option value="AU">Australia</option>
                            <option value="JP">Japón</option>
                        </select>
                    </div>
                    <div className="form-group mx-4">
                        
                        <input type="text" className="form-control bg-white w-[100%] p-2 " id="city" name="city" placeholder="Escribe el nombre de la ciudad" onChange={handleChange} value={searchWeather.city} />
                    </div>
                    <button className="boton bg-gray-800 text-white hover:text-cyan-200 hover:bg-gray-950 border-2 my-6 mx-4 p-2 rounded-4xl">Consultar</button>
                </form>
            </div>
            <div className="seccion2 w-[95%] md:w-[50%] lg:w-[30%] bg-black rounded-4xl p-4 ">
                {!weather ? (
                    <div className=" flex justify-center bg-black text-white">Consulta el tiempo en tu ciudad</div>
                ) : weather.cod === "404" ? (
                    <p className="error-message">No existe ninguna ciudad con ese nombre en {lastCountry}</p>
                ) : (
                    <>
                    <div className="flex flex-row justify-center">

                        <div className="tempPanel z-5 flex flex-col justify-center items-center mb-20">
                            <p className="temp  mx-5 text-red-500 text-6xl">{Math.ceil(weather?.main?.temp)}ºC</p>
                            <div className="">
                                <p className="tempicon">
                                <FontAwesomeIcon icon={weatherIcons[weatherDescription] || faSun} className="mx-2 flex justify-center text-8xl m-8 text-white" />

                                </p>
                            </div>
                        </div>
                        <div className="z-50">
                            <h2 className="infotitulo text-white text-4xl mb-4">{weather?.name || "des"}</h2>
                            <div className="info">
                                <p className="my-1 text-white">{weatherDescription || "sin información"}</p>
                                <p className="my-1 text-white"><span>Temp-max:</span> {Math.ceil(weather?.main?.temp_max)}ºC</p>
                                <p className="my-1 text-white"><span>Temp-min:</span> {Math.ceil(weather?.main?.temp_min)}ºC</p>
                                <p className="my-1 text-white"><span>Sensación térmica:</span> {Math.ceil(weather?.main?.feels_like)}ºC</p>
                                <p className="my-1 text-white"><span>Humedad:</span> {Math.ceil(weather?.main?.humidity)}%</p>
                                <p className="my-1 text-white"><span>Viento:</span> {Math.ceil(weather?.wind?.speed)}km/h</p>
                            </div>
                        </div>
                    </div>
                    
                    </>
                    
                )}
            </div>
        </div>
            <ProjectNavigation />
                </>
    );
};

export default AppWeather;
