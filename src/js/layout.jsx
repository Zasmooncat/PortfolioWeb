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
import Projects from "./views/projects";
import Contact from "./views/contact";
import VideoArt from "./views/videoart";
import TicTacToeView from "./views/TicTacToe";
import TechnologyNews from "./components/TechnologyNews";
import ContactList from "./components/ContactList";





const Layout = () => {
    const { store } = useContext(Context);
    const basename = import.meta.env.VITE_BASENAME || "";
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
    

    if (!backendUrl) return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>

            
            
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/videoart" element={<VideoArt />} />
                    <Route path="/counter" element={<Counter />} />
                    <Route path="/chrono" element={<Chrono />} />
                    <Route path="/countdown" element={<CountDown />} />
                    <Route path="/todo" element={<Todo />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/cards" element={<RandomCards />} />
                    <Route path="/memegenerator" element={<MemeGenerator />} />
                    <Route path="/weather" element={<AppWeather />} />
                    <Route path="*" element={<h1>Not found!</h1>} />
                    <Route element={<TicTacToeView />} path="/tictactoe" />
                    <Route path="/noticias" element={<TechnologyNews />} />
                    <Route path="/contacts" element={<ContactList />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);