import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext, { Context } from "./store/appContext";
import { supabase } from "../supabase/client"; // ajusta la ruta
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar"; // si usas uno

import Home from "./views/home";
import Projects from "./views/projects";
import Contact from "./views/contact";
import VideoArt from "./views/videoart";
import Counter from "./components/Counter";
import Chrono from "./components/chrono";
import Todo from "./components/todo";
import RandomCards from "./components/randomCards";
import MemeGenerator from "./components/memeGenerator";
import CountDown from "./components/countDown";
import Calculator from "./components/calculator";
import AppWeather from "./components/appWeather";
import TicTacToeView from "./views/TicTacToe";
import TechnologyNews from "./components/TechnologyNews";
import ContactList from "./components/ContactList";
import { AuthProvider } from '../context/AuthContext';

const Layout = () => {
    const { store } = useContext(Context);
    const basename = import.meta.env.VITE_BASENAME || "";
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    // Función para obtener usuario y perfil
    const getUserAndProfile = async () => {
        const {
            data: { user: currentUser },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
            console.error("Error obteniendo usuario:", userError.message);
            setUser(null);
            setProfile(null);
            return;
        }

        setUser(currentUser);

        if (currentUser) {
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', currentUser.id)
                .single();

            if (profileError) {
                console.error("Error obteniendo perfil:", profileError.message);
                setProfile(null);
            } else {
                setProfile(profileData);
            }
        } else {
            setProfile(null);
        }
    };

    useEffect(() => {
        getUserAndProfile();

        // Opcional: escuchar cambios de sesión para refrescar usuario y perfil
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            getUserAndProfile();
        });

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    if (!backendUrl) return <BackendURL />;

    return (
        <AuthProvider>
            <BrowserRouter basename={basename}>
                <Navbar username={profile?.username} />
                {/* <Sidebar username={profile?.username} /> si usas uno */}
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
                    <Route path="/tictactoe" element={<TicTacToeView />} />
                    <Route path="/noticias" element={<TechnologyNews />} />
                    <Route path="/contacts" element={<ContactList />} />
                    <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default injectContext(Layout);
