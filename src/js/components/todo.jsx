import React, { useState, useEffect, useContext } from "react";
import Squares from "./Squares";
import ProjectNavigation from "../components/ProjectNavigation";
import { AuthContext } from "../../context/AuthContext";
import { supabase } from "../../supabase/client";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // =========================
  // 🔹 Cargar tareas de Supabase solo si hay usuario
  // =========================
  useEffect(() => {
    if (!user) {
      setTodos([]); // limpiar lista si logout
      setLoading(false);
      return;
    }

    fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching todos:", error.message);
    } else {
      setTodos(data || []);
    }
    setLoading(false); // ✅ aseguramos que loading se apaga
  };

  // =========================
  // 🔹 Añadir tarea con botón
  // =========================
  const handleAddTodo = async () => {
    if (todo.trim() !== "") {
      if (user) {
        // Guardar en Supabase
        const { data, error } = await supabase
          .from("todos")
          .insert([{ text: todo, user_id: user.id }])
          .select();

        if (error) {
          console.error("Error inserting todo:", error.message);
        } else {
          setTodos([data[0], ...todos]);
        }
      } else {
        // Solo local
        const newTask = {
          id: Date.now(),
          text: todo,
          completed: false,
          created_at: new Date().toISOString(),
        };
        setTodos([newTask, ...todos]);
      }
      setTodo("");
    }
  };

  // =========================
  // 🔹 Añadir tarea
  // =========================
  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && todo.trim() !== "") {
      if (user) {
        // Guardar en Supabase
        const { data, error } = await supabase
          .from("todos")
          .insert([{ text: todo, user_id: user.id }])
          .select();

        if (error) {
          console.error("Error inserting todo:", error.message);
        } else {
          setTodos([data[0], ...todos]);
        }
      } else {
        // Solo local
        const newTask = {
          id: Date.now(),
          text: todo,
          completed: false,
          created_at: new Date().toISOString(),
        };
        setTodos([newTask, ...todos]);
      }
      setTodo("");
    }
  };

  // =========================
  // 🔹 Borrar tarea
  // =========================
  const deleteTask = async (id) => {
    if (user) {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) {
        console.error("Error deleting todo:", error.message);
        return;
      }
    }
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // =========================
  // 🔹 Editar tarea
  // =========================
  const editTask = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = async (id) => {
    if (user) {
      const { error } = await supabase
        .from("todos")
        .update({ text: editText })
        .eq("id", id);

      if (error) {
        console.error("Error updating todo:", error.message);
        return;
      }
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: editText } : t))
    );
    setEditIndex(null);
    setEditText("");
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") saveEdit(id);
  };

  const Spinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-cyan-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-cyan-300 rounded-full animate-spin" style={{animationDirection:'reverse', animationDuration:'1.5s'}}></div>
      </div>
    </div>
  );

  // =========================
  // 🔹 Marcar como realizada
  // =========================
  const toggleComplete = async (id, current) => {
    if (user) {
      const { error } = await supabase
        .from("todos")
        .update({ completed: !current })
        .eq("id", id);

      if (error) {
        console.error("Error toggling todo:", error.message);
        return;
      }
    }
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !current } : t
      )
    );
  };

  // =========================
  // 🔹 Render
  // =========================
  return (
    <div className="relative min-h-screen w-full overflow-y-auto">
      {/* Fondo */}
      <div className="fixed top-0 left-0 w-full h-full">
        <Squares
          speed={0.2}
          squareSize={70}
          direction="diagonal"
          borderColor="#fff3"
          hoverFillColor="#079"
        />
      </div>
            <div className="fixed inset-0 bg-cyan-950/40 "></div>


      {/* Contenido */}
      <div
        className={`relative z-10 flex flex-col items-center pb-10 ${
          user ? "md:ml-10" : ""
        }`}
      >
        <h1 className="titulo font-smooch text-center text-white text-5xl mt-8">
          TO DO LIST
        </h1>

        {!user && (
            <div className="text-center mb-4">
              <p className="text-cyan-500 text-sm inline-block px-4 py-2 rounded-lg">
                Login to save tasks.
              </p>
            </div>
          )}

        {/* Input nueva tarea */}
        <div className="flex w-96 justify-center">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="New Task"
            onKeyPress={handleKeyPress}
            className="bg-neutral-900 border border-gray-500 w-80 placeholder:text-gray-400 rounded-xl mt-7 text-cyan-200 p-2 mb-10"
          />
        </div>
        <button
          onClick={handleAddTodo}
          className="bg-gradient-to-br from-cyan-300 via-cyan-600 to-cyan-900  hover:from-cyan-400 hover:via-cyan-700 hover:to-cyan-900 text-cyan-900 font-bold hover:text-cyan-100 transition duration-300 shadow-lg hover:shadow-xl text-2xl py-2 px-4 rounded-full cursor-pointer"
        >
          <p className="">+</p>
        </button>

        {/* ✅ SPINNER O GRID DE TAREAS */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="todos flex flex-wrap gap-3 justify-center mt-8">
            {todos.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p className="text-cyan-700">No hay tareas pendientes</p>
                
              </div>
            ) : (
              todos.map((task, index) => (
                <div
                  key={task.id}
                  className={`rounded-2xl p-4 text-white relative w-80 h-48 md:w-90 bg-linear-to-br from-neutral-800/80 to-neutral-600/40
                    
                    ${
                      task.completed
                        ? "bg-cyan-950/70"
                        : "bg-neutral-400/90"
                    }
                  `}
                >
                  {/* Fecha creación */}
                  <div className="absolute top-2 left-2 text-xs text-gray-400">
                    {new Date(task.created_at).toLocaleDateString()}
                  </div>

                  {/* Botones */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      className={`hover:text-green-300 ${
                        task.completed ? "text-green-500" : "text-gray-400"
                      }`}
                      onClick={() => toggleComplete(task.id, task.completed)}
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button
                      className="text-gray-400 hover:text-yellow-200"
                      onClick={() => editTask(index)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-600"
                      onClick={() => deleteTask(task.id)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>

                  {/* Texto / edición */}
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEdit(task.id)}
                      onKeyDown={(e) => handleKeyDown(e, task.id)}
                      className="text-white px-2 py-1 rounded-md w-full mt-5"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`block mt-6 ${
                        task.completed ? "text-gray-500" : "text-white"
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ✅ Botones fijos en las esquinas */}
      <ProjectNavigation />
    </div>
  );
}

export default Todo;