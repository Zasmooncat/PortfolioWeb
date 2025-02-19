import React, { useState } from 'react';

function Todo() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

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
            <div className="todos">
                <ol className='text-white'>
                    {todos.map((todo, index) => (
                        <div className='todos-wrap flex justify-center' >

                        <div key={index} className='div-todo border-1 border-white bg-black w-1/6 relative'>
                            <li className='text-white flex justify-between ps-2 my-1 w-1/2'>
                            {todo}
                                <button className="boton absolute right-2 text-white ps-4 hover:text-red-500" onClick={() => deleteTask(index)}>
                                    <i className="fas fa-times"></i>
                                </button>
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