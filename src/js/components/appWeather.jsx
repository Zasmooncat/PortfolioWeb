import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudShowersHeavy, faCloudRain, faBolt, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';



const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?&appid=08f90cb685ac696606f04d9cafa1ddc4&units=metric&lang=es";

const AppWeather = () => {
    const [searchWeather, setSearchWeather] = useState({ city: "", country: "" });
    const [weather, setWeather] = useState(null);
    const [lastCountry, setLastCountry] = useState("");

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
        <div className="container m-auto">
            <h1 className="titulo text-center text-white text-7xl">El Tiempo</h1>
            <div className="seccion1 bg-black rounded-4xl p-2 border-2 w-[95%] md:w-[50%] lg:w-[30%] border-white">
                <form className="flex flex-col m-auto" onSubmit={handleSubmit}>
                    <div className="form-group flex flex-col">
                        <label htmlFor="country">País:</label>
                        <select className="form-control bg-white rounded-4xl p-2 mx-4" id="country" name="country" onChange={handleChange} value={searchWeather.country}>
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
                            <option value="CN">Canadá</option>
                            <option value="AU">Australia</option>
                            <option value="JP">Japón</option>
                        </select>
                    </div>
                    <div className="form-group mx-4">
                        <label htmlFor="city">Ciudad:</label>
                        <input type="text" className="form-control bg-white rounded-4xl w-[100%] p-2 " id="city" name="city" placeholder="Escribe el nombre de la ciudad" onChange={handleChange} value={searchWeather.city} />
                    </div>
                    <button className="boton bg-gray-800 text-white hover:text-green-200 hover:bg-gray-950 border-2 my-6 mx-4 p-2 rounded-4xl">Consultar</button>
                </form>
            </div>
            <div className="seccion2 w-[95%] md:w-[50%] lg:w-[30%] bg-black rounded-4xl p-9 border-2 border-white">
                {!weather ? (
                    <div className=" flex justify-center bg-black text-white">Consulta el tiempo en tu ciudad</div>
                ) : weather.cod === "404" ? (
                    <p className="error-message">No existe ninguna ciudad con ese nombre en {lastCountry}</p>
                ) : (
                    <>
                    <div className="flex">

                        <div className="tempPanel flex flex-col justify-center items-center">
                            <p className="temp mx-5 text-red-500 text-6xl">{Math.ceil(weather?.main?.temp)}ºC</p>
                            <div className="">
                                <p className="tempicon">
                                <FontAwesomeIcon icon={weatherIcons[weatherDescription] || faSun} className="mx-2 flex justify-center text-8xl m-8 text-white" />

                                </p>
                            </div>
                        </div>
                        <div>
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
    );
};

export default AppWeather;
