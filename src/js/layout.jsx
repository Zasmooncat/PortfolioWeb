import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext, { Context } from "./store/appContext";
import Home from "./views/home";
import Navbar from "./components/navbar";
import Counter from "./components/Counter";
import Chrono from "./components/chrono";
import Todo from "./components/todo";
import RandomCards from "./components/randomCards";
import MemeGenerator from "./components/memeGenerator";
import CountDown from "./components/countDown";
import Calculator from "./components/calculator";
import AppWeather from "./components/appWeather";


const Layout = () => {
    const { store } = useContext(Context);
    const basename = import.meta.env.VITE_BASENAME || "";
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    if (!backendUrl) return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
            <img 
                className="video-background" 
                src="src/img/TDMovieOut.3.png"
                alt="Background"
            />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/counter" element={<Counter />} />
                    <Route path="/chrono" element={<Chrono />} />
                    <Route path="/countdown" element={<CountDown />} />
                    <Route path="/todo" element={<Todo />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/cards" element={<RandomCards />} />
                    <Route path="/memegenerator" element={<MemeGenerator />} />
                    <Route path="/weather" element={<AppWeather />} />
                    <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);