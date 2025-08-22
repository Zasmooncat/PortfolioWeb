// ===============================
// src/js/layout.jsx (fragmento que compartiste)
// Ajuste: importar Navbar con el nombre de archivo correcto (mayúsculas)
// ===============================
import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext, { Context } from "./store/appContext";
import { AuthProvider, AuthContext } from '../context/AuthContext';
import Navbar from "./components/navbar"; // ← corregido
import Sidebar from "./components/Sidebar";
import Info from "./views/info";
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
import ExpensesTracker from "./components/ExpensesTracker";
import Calendar from "./components/Calendar";
import Works from "./views/works"; // Asegúrate de que la ruta es correcta
import { useLocation } from "react-router-dom";


// Componente interno que usa el AuthContext
const AppContent = () => {
  const { user, username, loading } = useContext(AuthContext);
  const location = useLocation(); 
  const hideSidebarRoutes = ["/videoart","/info"];
  console.log("🖥️ AppContent render - user:", user?.email || "null");
  console.log("🖥️ AppContent render - username:", username);
  console.log("🖥️ AppContent render - loading:", loading);

  // Timeout de seguridad: si lleva más de 10 segundos cargando, mostrar contenido
  const [timeoutReached, setTimeoutReached] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.log("⏰ Timeout de 10 segundos alcanzado, forzando carga");
      setTimeoutReached(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);



  return (
    <div className="App">
      <Navbar />

      {/* Mostrar sidebar solo si el usuario está logueado */}
      {user && !hideSidebarRoutes.includes(location.pathname) && <Sidebar />}

      {/* Ajustar el margen del contenido principal si hay sidebar */}
      <main className={`min-h-screen transition-all duration-300 `}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/info" element={<Info />} />
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
          <Route path="/expenses" element={<ExpensesTracker />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/works" element={<Works />} />
          <Route path="*" element={<h1 className="text-white p-8">Not found!</h1>} />
        </Routes>
      </main>
    </div>
  );
};

const Layout = () => {
  const { store } = useContext(Context);
  const basename = import.meta.env.VITE_BASENAME || "";
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

  // Componente de error si no hay backend URL
  const BackendURL = () => (
    <div className="alert alert-danger">
      Backend URL not found. Please configure your VITE_BACKEND_URL environment variable.
    </div>
  );

  if (!backendUrl) return <BackendURL />;

  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default injectContext(Layout);

