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
        console.log('formatDate input:', { year, month, day }, 'output:', result); // Debug temporal
        return result;
    };

    // ✅ Función para convertir fecha formateada a formato ISO (YYYY-MM-DD)
    const formatDateForDB = (year, month, day) => {
        // Asegurar que los valores sean números válidos
        const validYear = parseInt(year);
        const validMonth = parseInt(month);
        const validDay = parseInt(day);
        
        // Crear fecha usando UTC para evitar problemas de zona horaria
        const d = new Date(Date.UTC(validYear, validMonth, validDay));
        
        // Formatear manualmente para evitar problemas con toISOString
        const yyyy = validYear;
        const mm = String(validMonth + 1).padStart(2, '0'); // +1 porque los meses van de 0-11
        const dd = String(validDay).padStart(2, '0');
        
        return `${yyyy}-${mm}-${dd}`;
    };

    // ✅ Cargar eventos desde Supabase
    const loadEvents = async () => {
        if (!isAuthenticated || !user) return;

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

    // ✅ Guardar evento en Supabase
    const handleAddEvent = async () => {
        if (!modalDate || newEvent.title.trim() === "" || !isAuthenticated || !user) {
            return;
        }

        try {
            setLoading(true);

            console.log('Original modalDate:', modalDate); // Debug completo

            // Limpiar y dividir la fecha
            const cleanDate = modalDate.trim();
            const dateParts = cleanDate.split(' ').filter(part => part.length > 0);
            console.log('Cleaned date parts:', dateParts); // Debug
            
            // Manejar diferentes formatos posibles
            let day, monthName, year;
            
            if (dateParts.length === 5 && dateParts[1] === 'de' && dateParts[3] === 'de') {
                // Formato: "31 de agosto de 2025"
                day = parseInt(dateParts[0]);
                monthName = dateParts[2].toLowerCase();
                year = parseInt(dateParts[4]);
            } else if (dateParts.length === 4) {
                // Formato: "Miércoles, 20 Agosto 2025" (con día de semana)
                day = parseInt(dateParts[1]);
                monthName = dateParts[2].toLowerCase();
                year = parseInt(dateParts[3]);
            } else if (dateParts.length === 3) {
                // Formato: "20 Agosto 2025"
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
            
            // Remover comas y caracteres especiales del nombre del mes
            const cleanMonthName = monthName.replace(/[,]/g, '').toLowerCase();
            const monthIndex = monthNames.indexOf(cleanMonthName);

            console.log('Parsed values:', { day, monthName: cleanMonthName, monthIndex, year }); // Debug

            // Validar que los valores sean correctos
            if (monthIndex === -1 || isNaN(day) || isNaN(year) || day < 1 || day > 31 || year < 1900) {
                console.error('Error parsing date - invalid values:', { day, monthName: cleanMonthName, monthIndex, year });
                alert('Error: No se pudo procesar la fecha seleccionada');
                return;
            }

            const dbDate = formatDateForDB(year, monthIndex, day);
            console.log('DB date:', dbDate); // Debug

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
            setNewEvent({ title: "", description: "" });
            setShowModal(false);
            setModalDate(null);

        } catch (error) {
            console.error('Error guardando evento:', error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Eliminar evento de Supabase
    const handleDeleteEvent = async (eventId) => {
        if (!isAuthenticated || !user) return;

        try {
            setLoading(true);

            const { error } = await supabase
                .from('calendar_events')
                .delete()
                .eq('id', eventId)
                .eq('user_id', user.id);

            if (error) {
                console.error('Error eliminando evento:', error);
                return;
            }

            // Remover del estado local
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

    // Si no está autenticado, mostrar mensaje
    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-white">
                    <h2 className="text-2xl mb-4">Debes iniciar sesión para ver el calendario</h2>
                    <p>Por favor, inicia sesión para acceder a tus eventos.</p>
                </div>
            </div>
        );
    }

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

        <p className="titulo text-center mt-5 text-white text-5xl mb-5">
          CALENDAR
        </p>

        {loading && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-50">
            Cargando...
          </div>
        )}

        <div className="p-6 md:ml-50 text-white rounded-lg shadow-lg w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Calendario */}
          <div className="flex-2">
            {/* Header */}
            <div className="flex md:ml-98 items-center mb-4">
              <button
                onClick={handlePrevMonth}
                className="hover:text-green-500 border py-1 px-2 rounded"
              >
                ←
              </button>
              <h2 className="text-gray-300 text-xl bg-neutral-900 p-2 rounded-xl  mx-5">
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {year}
              </h2>
              <button
                onClick={handleNextMonth}
                className="hover:text-green-500 border py-1 px-2 rounded"
              >
                →
              </button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 text-center mt-8">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="titulo uppercase text-2xl">
                  {d}
                </div>
              ))}
            </div>

            {/* Celdas */}
            <div className="grid grid-cols-7 gap-2 mt-8 ">
              {Array.from({ length: firstDay - 1 }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const formattedDate = formatDate(year, month, day);
                const dayEvents = getEventsForDay(formattedDate);

                // aplicar clases según si es hoy o está seleccionada
                let cellClasses = `relative h-10 md:h-20 p-2 cursor-pointer bg-linear-to-br from-neutral-900 to-neutral-700/40 `;
                if (formattedDate === todayStr) {
                  cellClasses += "bg-green-400/80 "; // hoy
                } else if (selectedDate === formattedDate) {
                  cellClasses += "bg-gray-400 ";
                } else {
                  cellClasses += "bg-neutral-700/80 hover:bg-gray-400 ";
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
                      <div className="absolute bottom-1 text-xs text-green-400">
                        🟢
                      </div>
                    )}

                    {/* Botón + fijo en la celda seleccionada */}
                    {selectedDate === formattedDate && (
                      <button
                        data-plus="true"
                        onClick={() => {
                          setModalDate(formattedDate);
                          setShowModal(true);
                        }}
                        className="absolute bottom-1 right-1 text-white w-2 h-2 md:w-5 md:h-5 md:text-xl hover:text-green-500 flex items-center justify-center"
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
          <div className="flex-1 md:mt-24 bg-linear-to-br from-neutral-900 to-neutral-500/30 rounded-2xl p-2">
            {selectedDate && (
              <div>
                <h3 className="font-light text-gray-300 text-sm text-center mb-3">
                  Eventos <p className="text-white">{selectedDate}</p>
                </h3>
                {getEventsForDay(selectedDate).length === 0 ? (
                  <p className="text-gray-400 flex justify-center md:mt-45 text-gray-400">
                    No hay eventos
                  </p>
                ) : (
                  getEventsForDay(selectedDate).map((ev, idx) => (
                    <div
                      key={ev.id || idx}
                      className="bg-linear-to-r from-neutral-900 to-neutral-700 p-3 rounded mb-2 border-l-4 border-green-500 relative"
                    >
                      <p className="font-bold">{ev.title}</p>
                      <p className="text-sm">{ev.description}</p>
                      <button
                        onClick={() => handleDeleteEvent(ev.id)}
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
              <h3 className="text-2xl uppercase titulo text-gray-300  text-center mb-4">
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
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddEvent}
                  className="px-4 py-2 rounded text-white bg-green-500 hover:bg-green-700 disabled:opacity-50"
                  disabled={loading || !newEvent.title.trim()}
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        )}

        <ProjectNavigation />
      </>
    );
};

export default Calendar;