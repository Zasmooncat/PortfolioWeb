import React, { useState } from 'react';
import Squares from './Squares';
import ProjectNavigation from "../components/ProjectNavigation";

function Todo() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const inputOnChange = (e) => setTodo(e.target.value);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && todo.trim() !== '') {
            setTodos([...todos, todo]);
            setTodo('');
        }
    };

    const deleteTask = (index) => {
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    };

    const editTask = (index) => {
        setEditIndex(index);
        setEditText(todos[index]);
    };

    const saveEdit = () => {
        setTodos((prevTodos) =>
            prevTodos.map((task, i) => (i === editIndex ? editText : task))
        );
        setEditIndex(null);
        setEditText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") saveEdit();
    };

    return (
        <div className="relative min-h-screen w-full overflow-y-auto">
            {/* Fondo */}
            <div className="fixed top-0 left-0 w-full h-full z-0">
                <Squares
                    speed={0.2}
                    squareSize={70}
                    direction="diagonal"
                    borderColor="#fff3"
                    hoverFillColor="#911"
                />
            </div>

            {/* Contenido */}
            <div className="relative z-10 flex flex-col items-center pb-40">
                <h1 className="titulo text-center text-white text-5xl mt-15">TO DO LIST</h1>

                <div className="flex flex-row justify-center">
                    <label className="text-white titulo text-2xl me-3 mt-5">New Task </label>
                    <input
                        type="text"
                        value={todo}
                        onChange={inputOnChange}
                        onKeyPress={handleKeyPress}
                        className="bg-black border border-white mt-5 text-green-200 px-2 mb-7"
                    />
                </div>

                {/* Grid de tareas */}
                <div className="todos grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                    {todos.map((todo, index) => (
                        <div key={index} className="border-2 rounded-2xl bg-amber-50 p-4 relative w-70 h-70">
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    className="text-amber-800 hover:text-red-700"
                                    onClick={() => editTask(index)}
                                >
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => deleteTask(index)}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onBlur={saveEdit}
                                    onKeyDown={handleKeyDown}
                                    className="text-black px-2 py-1 rounded-md w-full"
                                    autoFocus
                                />
                            ) : (
                                <span className="block text-black mt-6">{todo}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ✅ Botones fijos en las esquinas */}
            <ProjectNavigation />
        </div>
    );
}

export default Todo;
