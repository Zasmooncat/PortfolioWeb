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
    const [showAddModal, setShowAddModal] = useState(false); 
    const [showEventsModal, setShowEventsModal] = useState(false);
    const [modalDate, setModalDate] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);
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

    // ✅ Manejar click en día del calendario
    const handleDayClick = (formattedDate) => {
        setSelectedDate(formattedDate);
        setModalDate(formattedDate);
        const dayEvents = getEventsForDay(formattedDate);
        
        if (dayEvents.length > 0) {
            // Si hay eventos, mostrar modal de eventos
            setShowEventsModal(true);
        } else {
            // Si no hay eventos, mostrar modal de añadir
            setShowAddModal(true);
        }
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
            setShowAddModal(false);
            setModalDate(null);

        } catch (error) {
            console.error('Error guardando evento:', error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Editar evento
    const handleEditEvent = async (eventId) => {
        if (!editingEvent || editingEvent.title.trim() === "") return;

        try {
            setLoading(true);

            if (isAuthenticated && user) {
                const { error } = await supabase
                    .from('calendar_events')
                    .update({
                        title: editingEvent.title,
                        description: editingEvent.description
                    })
                    .eq('id', eventId)
                    .eq('user_id', user.id);

                if (error) {
                    console.error('Error editando evento:', error);
                    return;
                }
            }

            // Actualizar en el estado local
            setEvents(events.map(event => 
                event.id === eventId 
                    ? { ...event, title: editingEvent.title, description: editingEvent.description }
                    : event
            ));

            setEditingEvent(null);

        } catch (error) {
            console.error('Error editando evento:', error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Eliminar evento - Supabase si hay usuario, memoria si no
    const handleDeleteEvent = async (eventId) => {
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
            }

            setEvents(events.filter(event => event.id !== eventId));

        } catch (error) {
            console.error('Error eliminando evento:', error);
        } finally {
            setLoading(false);
        }
    };

    const getEventsForDay = (formattedDate) => {
        return events.filter((ev) => ev.date === formattedDate);
    };

    const closeAllModals = () => {
        setShowAddModal(false);
        setShowEventsModal(false);
        setEditingEvent(null);
        setNewEvent({ title: "", description: "" });
        setModalDate(null);
        setSelectedDate(null);
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
          <p className="titulo font-smooch text-center mt-2 text-white text-5xl mb-1">
            CALENDAR
          </p>

          {/* Indicador de modo */}
          {!user && (
            <div className="text-center mb-4">
              <p className="text-cyan-500 text-sm inline-block rounded-lg">
                Login to save events.
              </p>
            </div>
          )}

          <div className="px-5 text-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-center items-center mb-4">
              <button
                onClick={handlePrevMonth}
                className="bg-gradient-to-br from-cyan-300 via-cyan-600 to-cyan-900 hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-900 text-cyan-900 font-bold hover:text-cyan-100 transition duration-300 shadow-lg hover:shadow-xl text-2xl py-2 px-3 rounded cursor-pointer"
              >
                ◀
              </button>
              <h2 className="text-gray-300 mx-5 text-xl p-2 rounded-xl">
                {currentDate.toLocaleString("default", { month: "long" })} {year}
              </h2>
              <button
                onClick={handleNextMonth}
                className="bg-gradient-to-br from-cyan-300 via-cyan-600 to-cyan-900 hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-900 text-cyan-900 font-bold hover:text-cyan-100 transition duration-300 shadow-lg hover:shadow-xl text-2xl py-2 px-3 rounded cursor-pointer"
              >
                ▶
              </button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 text-center mt-8">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="titulo font-smooch uppercase text-2xl">
                  {d}
                </div>
              ))}
            </div>

            {/* Celdas */}
            <div className="grid grid-cols-7 gap-2 mt-8 mb-20">
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
                } else {
                  cellClasses += "bg-gray-700/40 hover:bg-gray-400 ";
                }

                return (
                  <div
                    key={day}
                    className={cellClasses}
                    onClick={() => handleDayClick(formattedDate)}
                  >
                    <span className="text-sm absolute md:text-xl md:font-bold">
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-1 right-1 text-xs text-gray-400">
                        <span className="text-cyan-500">✦</span> {dayEvents.length}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal para añadir evento */}
          {showAddModal && (
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
                  className="w-full mb-4 p-2 rounded bg-neutral-700 text-white"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  disabled={loading}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={closeAllModals}
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

          {/* Modal para ver/editar eventos */}
          {showEventsModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-lg max-h-96 overflow-y-auto">
                <h3 className="text-2xl uppercase titulo font-smooch text-gray-300 text-center mb-4">
                  Eventos del {modalDate}
                </h3>
                
                <div className="space-y-3 mb-4">
                  {getEventsForDay(modalDate).map((event) => (
                    <div key={event.id} className="bg-neutral-800 p-3 rounded border-l-4 border-cyan-500">
                      {editingEvent && editingEvent.id === event.id ? (
                        // Modo edición
                        <div className="space-y-2">
                          <input
                            type="text"
                            className="w-full p-2 rounded bg-neutral-700 text-white"
                            value={editingEvent.title}
                            onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                            disabled={loading}
                          />
                          <textarea
                            className="w-full p-2 rounded bg-neutral-700 text-white"
                            value={editingEvent.description}
                            onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                            disabled={loading}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditEvent(event.id)}
                              className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-sm"
                              disabled={loading}
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingEvent(null)}
                              className="px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 text-white text-sm"
                              disabled={loading}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Modo visualización
                        <div>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-bold text-white">{event.title}</p>
                              <p className="text-sm text-gray-300">{event.description}</p>
                            </div>
                            <div className="flex gap-2 ml-2">
                              <button
                                onClick={() => setEditingEvent({id: event.id, title: event.title, description: event.description})}
                                className="text-yellow-400 hover:text-yellow-600 text-sm"
                                title="Editar"
                                disabled={loading}
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-red-400 hover:text-red-600 text-sm"
                                title="Eliminar"
                                disabled={loading}
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Botón para añadir nuevo evento */}
                <button
                  onClick={() => {
                    setShowEventsModal(false);
                    setShowAddModal(true);
                  }}
            className="bg-gradient-to-br  from-cyan-300 via-cyan-600 to-cyan-900  hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-900 text-cyan-900 font-bold hover:text-cyan-100 transition duration-300 shadow-lg hover:shadow-xl text-2xl py-2 px-4 rounded-full cursor-pointer"
                  disabled={loading}
                >
                  +
                </button>

                <div className="flex justify-center">
                  <button
                    onClick={closeAllModals}
            className="bg-gradient-to-br  from-cyan-300 via-cyan-600 to-cyan-900  hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-900 text-cyan-900  hover:text-cyan-100 transition duration-300 shadow-lg hover:shadow-xl py-2 px-4 rounded-xl cursor-pointer"
                    disabled={loading}
                  >
                    OK
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