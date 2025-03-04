import React, { useState } from 'react';

function Todo() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const inputOnChange = (e) => {
        setTodo(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setTodos([...todos, todo]);
            setTodo(''); // Limpiar el input después de agregar el todo
        }
    };

    const deleteTask = (index) => {
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    };

    const editTask = (index) => {
        setEditIndex(index); // Guardamos el índice de la tarea que se está editando
        setEditText(todos[index]); // Cargamos el texto de la tarea en el campo de edición
    };

    const saveEdit = () => {
        const updatedTodos = todos.map((task, index) => {
            if (index === editIndex) {
                return editText; // Reemplazamos la tarea con el texto editado
            }
            return task;
        });
        setTodos(updatedTodos);
        setEditIndex(null); // Limpiamos el índice de edición
        setEditText(''); // Limpiamos el texto de edición
    };

    const handleKeyDown = (e)=>{
        if (e.key === "Enter"){
            saveEdit()
        }
    }

    return (
        <div>
            <h1 className='titulo text-center text-white text-5xl mt-30'>TO DO LIST</h1>
            <div className="flex flex-row justify-center">
                <label className="text-white titulo text-2xl me-3 mt-5">New Task </label>
                <input
                    type="text"
                    value={todo}
                    onChange={inputOnChange}
                    onKeyPress={handleKeyPress}
                    className="bg-black border-1 border-white mt-5 text-green-200 px-2 mb-7"
                />
            </div>
            <div className="todos flex justify-center flex-wrap">
                <ol className='text-white flex flex-wrap justify-center'>
                    {todos.map((todo, index) => (
                        <div key={index} className='todos-wrapper inline-flex'>
                            <div className='div-todo border-2 rounded-2xl m-3 w-70 h-70 bg-amber-50 relative'>
                                
                                {/* Iconos en la parte superior */}
                                <div className="iconos absolute top-0 right-0 p-2 ">
                                <button
                                        className="boton text-amber-800 hover:text-red-700"
                                        onClick={() => editTask(index)}
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                        className="boton mx-2 text-red-500 hover:text-red-700"
                                        onClick={() => deleteTask(index)}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                    
                                </div>
                                
                                {/* Texto o campo de edición debajo de los iconos */}
                                <li className='text-black flex justify-between p-2 my-1 w-full pt-7'>
                                    {editIndex === index ? (
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onBlur={saveEdit}
                                            onKeyDown={handleKeyDown} // Guardamos el cambio al salir del campo
                                            className="text-black px-2 py-1 rounded-md"
                                            autoFocus
                                        />
                                    ) : (
                                        <span>{todo}</span>
                                    )}
                                </li>
                            </div>
                        </div>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Todo;
