// ===============================
// src/components/Calendar.jsx
// ===============================
import React, { useState, useEffect, useContext } from "react";
import Squares from "./Squares";
import ProjectNavigation from "../components/ProjectNavigation";
import { supabase } from "../../supabase/client";
import { AuthContext } from "../../context/AuthContext";

const Calendar = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [newEvent, setNewEvent] = useState({ title: "", description: "" });
    const [showModal, setShowModal] = useState(false); 
    const [modalDate, setModalDate] = useState(null);
    const [loading, setLoading] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fecha de hoy (string bonito)
    const today = new Date();
    const todayFormatted = today.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const todayStr = todayFormatted.charAt(0).toUpperCase() + todayFormatted.slice(1);

    // ✅ Función para formatear fecha: "19 Agosto 2025"
    const formatDate = (year, month, day) => {
        const d = new Date(year, month, day);
        const formatted = d.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        const result = formatted.charAt(0).toUpperCase() + formatted.slice(1);
        return result;
    };

    // ✅ Función para convertir fecha formateada a formato ISO (YYYY-MM-DD)
    const formatDateForDB = (year, month, day) => {
        const validYear = parseInt(year);
        const validMonth = parseInt(month);
        const validDay = parseInt(day);
        
        const yyyy = validYear;
        const mm = String(validMonth + 1).padStart(2, '0');
        const dd = String(validDay).padStart(2, '0');
        
        return `${yyyy}-${mm}-${dd}`;
    };

    // ✅ Cargar eventos desde Supabase solo si hay usuario
    const loadEvents = async () => {
        if (!isAuthenticated || !user) {
            setEvents([]); // Limpiar eventos si no hay usuario
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('calendar_events')
                .select('*')
                .eq('user_id', user.id)
                .order('event_date', { ascending: true });

            if (error) {
                console.error('Error cargando eventos:', error);
                return;
            }

            // Convertir fechas de BD a formato display
            const formattedEvents = data.map(event => {
                const eventDate = new Date(event.event_date + 'T00:00:00');
                const formattedDate = eventDate.toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });
                
                return {
                    ...event,
                    date: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
                };
            });

            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error cargando eventos:', error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Cargar eventos al montar componente o cambiar usuario
    useEffect(() => {
        loadEvents();
    }, [user, isAuthenticated]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // ✅ Guardar evento - Supabase si hay usuario, memoria si no
    const handleAddEvent = async () => {
        if (!modalDate || newEvent.title.trim() === "") {
            return;
        }

        try {
            setLoading(true);

            if (isAuthenticated && user) {
                // MODO SUPABASE - Usuario logueado
                const cleanDate = modalDate.trim();
                const dateParts = cleanDate.split(' ').filter(part => part.length > 0);
                
                let day, monthName, year;
                
                if (dateParts.length === 5 && dateParts[1] === 'de' && dateParts[3] === 'de') {
                    day = parseInt(dateParts[0]);
                    monthName = dateParts[2].toLowerCase();
                    year = parseInt(dateParts[4]);
                } else if (dateParts.length === 4) {
                    day = parseInt(dateParts[1]);
                    monthName = dateParts[2].toLowerCase();
                    year = parseInt(dateParts[3]);
                } else if (dateParts.length === 3) {
                    day = parseInt(dateParts[0]);
                    monthName = dateParts[1].toLowerCase();
                    year = parseInt(dateParts[2]);
                } else {
                    console.error('Formato de fecha no reconocido:', dateParts);
                    return;
                }

                const monthNames = [
                    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
                ];
                
                const cleanMonthName = monthName.replace(/[,]/g, '').toLowerCase();
                const monthIndex = monthNames.indexOf(cleanMonthName);

                if (monthIndex === -1 || isNaN(day) || isNaN(year) || day < 1 || day > 31 || year < 1900) {
                    console.error('Error parsing date - invalid values:', { day, monthName: cleanMonthName, monthIndex, year });
                    alert('Error: No se pudo procesar la fecha seleccionada');
                    return;
                }

                const dbDate = formatDateForDB(year, monthIndex, day);

                const { data, error } = await supabase
                    .from('calendar_events')
                    .insert([
                        {
                            user_id: user.id,
                            event_date: dbDate,
                            title: newEvent.title,
                            description: newEvent.description
                        }
                    ])
                    .select()
                    .single();

                if (error) {
                    console.error('Error guardando evento:', error);
                    return;
                }

                // Agregar el nuevo evento al estado local
                const newEventFormatted = {
                    ...data,
                    date: modalDate
                };

                setEvents([...events, newEventFormatted]);
            } else {
                // MODO LOCAL - Sin usuario (solo en memoria)
                const localEvent = {
                    id: Date.now(), // ID temporal único
                    date: modalDate,
                    title: newEvent.title,
                    description: newEvent.description,
                    event_date: new Date().toISOString().split('T')[0], // Para compatibilidad
                    user_id: null
                };

                setEvents([...events, localEvent]);
            }

            setNewEvent({ title: "", description: "" });
            setShowModal(false);
            setModalDate(null);

        } catch (error) {
            console.error('Error guardando evento:', error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Eliminar evento - Supabase si hay usuario, memoria si no
    const handleDeleteEvent = async (eventId, eventIndex = null) => {
        try {
            setLoading(true);

            if (isAuthenticated && user) {
                // MODO SUPABASE
                const { error } = await supabase
                    .from('calendar_events')
                    .delete()
                    .eq('id', eventId)
                    .eq('user_id', user.id);

                if (error) {
                    console.error('Error eliminando evento:', error);
                    return;
                }

                setEvents(events.filter(event => event.id !== eventId));
            } else {
                // MODO LOCAL - eliminar por ID temporal
                setEvents(events.filter(event => event.id !== eventId));
            }

        } catch (error) {
            console.error('Error eliminando evento:', error);
        } finally {
            setLoading(false);
        }
    };

    const getEventsForDay = (formattedDate) => {
        return events.filter((ev) => ev.date === formattedDate);
    };

    return (
      <>
        {/* Fondo animado */}
        <div className="fixed top-0 left-0 w-full h-full z-[-1]">
          <Squares
            speed={0.2}
            squareSize={70}
            direction="diagonal"
            borderColor="#fff3"
            hoverFillColor="#911"
          />
        </div>
        {/* Overlay para mejorar contraste */}
        <div className="fixed inset-0 bg-cyan-950/40"></div>

        <div className="relative z-10">
          <p className="titulo font-smooch text-center mt-5 text-white text-5xl mb-5">
            CALENDAR
          </p>

          {/* Indicador de modo */}
          {!user && (
            <div className="text-center mb-4">
              <p className="text-cyan-500 text-sm inline-block px-4 py-2 rounded-lg">
                Login to save events.
              </p>
            </div>
          )}

          <div className="p-6 md:ml-50 text-white rounded-lg shadow-lg w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
            {/* Calendario */}
            <div className="flex-2">
              {/* Header */}
              <div className="flex md:ml-98 items-center mb-4">
                <button
                  onClick={handlePrevMonth}
                              className="bg-gradient-to-br from-cyan-300 via-cyan-600 to-cyan-900  hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-900 text-cyan-900 font-bold hover:text-cyan-100 transition duration-300 shadow-lg hover:shadow-xl text-2xl py- px-2 rounded cursor-pointer"

                >
                  ←
                </button>
                <h2 className="text-gray-300 mx-auto z-5 text-xl p-2 rounded-xl md:mx-5">
                  {currentDate.toLocaleString("default", { month: "long" })}{" "}
                  {year}
                </h2>
                <button
                  onClick={handleNextMonth}
                              className="bg-gradient-to-br from-cyan-300 via-cyan-600 to-cyan-900  hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-900 text-cyan-900 font-bold hover:text-cyan-100 transition duration-300 shadow-lg hover:shadow-xl text-2xl py- px-2 rounded cursor-pointer"

                >
                  →
                </button>
              </div>

              {/* Días de la semana */}
              <div className="grid grid-cols-7 text-center z-5 mt-8">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} className="titulo font-smooch uppercase text-2xl">
                    {d}
                  </div>
                ))}
              </div>

              {/* Celdas */}
              <div className="grid grid-cols-7 gap-2 mt-8">
                {Array.from({ length: firstDay - 1 }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const formattedDate = formatDate(year, month, day);
                  const dayEvents = getEventsForDay(formattedDate);

                  let cellClasses = `relative h-15 md:h-20 p-2 cursor-pointer bg-linear-to-br from-cyan-900/80 rounded to-gray-900/50 `;
                  if (formattedDate === todayStr) {
                    cellClasses += "bg-cyan-400/80 ";
                  } else if (selectedDate === formattedDate) {
                    cellClasses += "bg-gray-400 ";
                  } else {
                    cellClasses += "bg-gray-700/40 hover:bg-gray-400 ";
                  }

                  return (
                    <div
                      key={day}
                      className={cellClasses}
                      onClick={(e) => {
                        if (e.target.dataset.plus) return;
                        setSelectedDate(formattedDate);
                      }}
                    >
                      <span className="text-sm absolute md:text-xl md:font-bold">
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <div className="absolute bottom-1 left-1 text-xs text-gray-400">
                          <span className="text-cyan-500">✦</span> {dayEvents.length}
                        </div>
                      )}

                      {selectedDate === formattedDate && (
                        <button
                          data-plus="true"
                          onClick={() => {
                            setModalDate(formattedDate);
                            setShowModal(true);
                          }}
                          className="absolute bottom-1 right-1 text-white w-2 h-2 md:w-5 md:h-5 md:text-xl hover:text-cyan-500 flex items-center justify-center"
                        >
                          +
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Eventos */}
            <div className="flex-1 md:mt-24 bg-linear-to-br from-cyan-800/40 to-gray-700/30 rounded-2xl p-2">
              <div className="flex justify-center titulo-name font-michroma text-cyan-200 mb-3 mt-2">
                <h1>EVENTOS</h1>
              </div>
              {selectedDate && (
                <div>
                  <h3 className="font-light text-white text-sm text-center mb-3">
                    {selectedDate}
                  </h3>
                  {getEventsForDay(selectedDate).length === 0 ? (
                    <p className="text-gray-400 flex justify-center md:mt-45 text-gray-400">
                      No hay eventos
                    </p>
                  ) : (
                    getEventsForDay(selectedDate).map((ev, idx) => (
                      <div
                        key={ev.id || idx}
                        className="bg-linear-to-r from-cyan-800/40 to-gray-900/50 p-3 rounded mb-2 border-l-4 border-cyan-500 relative"
                      >
                        <p className="font-bold">{ev.title}</p>
                        <p className="text-sm">{ev.description}</p>
                        <button
                          onClick={() => handleDeleteEvent(ev.id, idx)}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
                          title="Eliminar evento"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Modal para añadir evento */}
          {showModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-md">
                <h3 className="text-2xl uppercase titulo font-smooch text-gray-300 text-center mb-4">
                  Añadir evento el día {modalDate}
                </h3>
                
                <input
                  type="text"
                  placeholder="Título"
                  className="w-full mb-2 p-2 rounded bg-neutral-700 text-white"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  disabled={loading}
                />
                <textarea
                  placeholder="Descripción"
                  className="w-full mb-2 p-2 rounded bg-neutral-700 text-white"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  disabled={loading}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-700"
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="px-4 py-2 rounded text-white bg-cyan-500 hover:bg-cyan-700"
                    disabled={loading || !newEvent.title.trim()}
                  >
                    {loading ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <ProjectNavigation />
      </>
    );
};

export default Calendar;