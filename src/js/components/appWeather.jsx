import React, { useState } from "react";




const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?&appid=08f90cb685ac696606f04d9cafa1ddc4&units=metric&lang=es"
const GEO_DB_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/countries";



const AppWeather = () => {

    const [searchWeather, setSearchWeather] = useState({
        city: "",
        country: ""
    })

    const [weather, setWeather] = useState(null)
    const [cities, setCities] = useState([])
    const [lastCountry, setLastCountry] = useState("");

    const handleChange = (event) => {
        setSearchWeather({
            ...searchWeather,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (searchWeather.city.trim() === "" || searchWeather.country.trim() === "") {
                console.log("campos vacíos");


                return;
            }

            setLastCountry(searchWeather.country);

            const url = `${URL_BASE}&q=${searchWeather.city},${searchWeather.country}`;
            console.log("URL generada:", url);

            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === "404" || !data.weather) {
                console.log("Ciudad o país no encontrados");
                setWeather({ cod: "404" }); // Establece el estado para manejar el error
                return;
            }

            setWeather(data); // Establece el clima si la respuesta es correcta
        } catch (error) {
            console.error("Error al consultar el clima:", error.message);
        } finally {
            // Resetea los campos después de realizar la consulta
            setSearchWeather({
                city: "",
                country: ""
            });
        }


    };

    const weatherIcons = {
        "soleado": <i class="fas fa-sun"></i>,
        "cielo claro": <i class="fas fa-sun"></i>,
        "algo de nubes": <i class="fas fa-cloud-sun"></i>,
        "nubes dispersas": <i class="fas fa-cloud-sun"></i>,
        "muy nuboso": <i class="fas fa-cloud"></i>,
        "lluvia ligera": <i class="fas fa-cloud-rain"></i>,
        "lluvioso": <i class="fas fa-cloud-rain"></i>,
    };

    const weatherDescription = Array.isArray(weather?.weather) && weather?.weather[0]?.description.toLowerCase();
    const weatherIcon = weatherIcons[weatherDescription] || <i class="fas fa-cloud-sun"></i>; // Por defecto, muestra una nube.

    const windIcons = {
        "soleado": <i class="fas fa-sun"></i>,
        "cielo claro": <i class="fas fa-sun"></i>,
        "algo de nubes": <i class="fas fa-cloud-sun"></i>,
        "nubes dispersas": <i class="fas fa-cloud-sun"></i>,
        "muy nuboso": <i class="fas fa-cloud"></i>,
        "lluvia ligera": <i class="fas fa-cloud-rain"></i>,
        "lluvioso": <i class="fas fa-cloud-rain"></i>,
    };

    const windDescription = weather?.wind?.dg;
    const wIcon = windIcons[windDescription] || <i class="fas fa-cloud-sun"></i>;



    return (
        <>
            
            <div className="container m-auto">
                
                    <div className="container m-auto">
                        <h1 className="titulo text-center text-white text-5xl">El Tiempo</h1>
                    </div>
                    <div className="seccion1 bg-black rounded-4xl p-5">
                        <form className="flex flex-col m-auto"
                            onSubmit={handleSubmit}>

                            <div className="form-group flex flex-col">
                                <label htmlFor="country">País:</label>
                                <select className="form-control bg-white rounded-4xl p-2"
                                    id="country"
                                    name="country"
                                    onChange={handleChange}
                                    value={searchWeather.country}
                                >
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
                            <div className="form-group">
                                <label htmlFor="city">Ciudad:</label>
                                <input
                                    type="text"
                                    className="form-control bg-white rounded-4xl w-[100%] p-2"
                                    id="city"
                                    name="city"
                                    placeholder="Escribe el nombre de la ciudad"
                                    onChange={handleChange}
                                    value={searchWeather.city} />
                            </div>
                            <button className="boton bg-cyan-100 w-100 mt-6 p-2 rounded-4xl">Consultar</button>
                        </form>
                    </div>
                    <div className="seccion2 bg-black rounded-4xl p-7">

                        {!weather ?

                            <div className=" w-100 flex justify-center bg-black text-white" >
                                Consulta el tiempo en tu ciudad
                            </div>
                            :
                            weather.cod === "404" ? <p className="error-message">No existe ninguna ciudad con ese nombre en {lastCountry}</p> :
                                <>
                                    <div className="tempPanel col-6 animate__animated animate__fadeIn d-flex flex-column">
                                        <p className="temp p-2 mx-5 d-flex justify-content-center">
                                            {Math.ceil(weather?.main?.temp)}ºC
                                        </p>
                                        <div className="m-auto">
                                            <p className="tempicon">

                                                <i icon={weatherIcon} className="mx-2" />
                                            </p>
                                        </div>
                                    </div>
                                    <div className=" ">

                                        <div>
                                            <h2 className="infotitulo text-white text-4xl mb-4">{weather?.name || "des"}</h2>

                                        </div>

                                        <div className="info">

                                            <p className="my-1 text-white">
                                                {weatherDescription || "sin información"}

                                            </p>
                                            <p className="my-1 text-white">
                                                <span>Temp-max:</span> {Math.ceil(weather?.main?.temp_max)}ºC
                                            </p>
                                            <p className="my-1 text-white">
                                                <span>Temp-min:</span> {Math.ceil(weather?.main?.temp_min)}ºC
                                            </p>
                                            <p className="my-1 text-white">
                                                <span>Sensación térmica:</span> {Math.ceil(weather?.main?.feels_like)}ºC
                                            </p>
                                            <p className="my-1 text-white">
                                                <span>Humedad:</span> {Math.ceil(weather?.main?.humidity)}%
                                            </p>

                                            <p className="my-1 text-white">
                                                <span>Viento:</span> {Math.ceil(weather?.wind?.speed)}km/h
                                            </p>



                                        </div>



                                    </div>
                                </>
                        }

                    </div>
               
            </div>
        </>
    );
}

export default AppWeather;