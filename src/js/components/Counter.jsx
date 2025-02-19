import React, { useState } from 'react'
import '../../styles/counter.css'

function Counter() {

const [counter, setCounter] = useState(0)
const handleClickAdd = () => {
    setCounter(counter +1)
}
const handleClickSubtract = () => {
    setCounter(counter -1)
}

const handleClickReset = () => {
    setCounter(0)
}


    return(
        <>
        <h1 className='titulo text-center  text-white text-5xl mt-30'>CONTADOR</h1>
        <div className='container  p-2 m-auto w-80'>

            

        <p className='text-9xl text-green-400 mb-3 font-extrabold'>{counter}</p>
        <div>
        <button className=' text-white p-3 text-5xl  me-2.5 hover:text-green-300 hover:cursor-pointer' onClick={handleClickAdd}>+</button>
        <button className=' text-white p-3 text-5xl  hover:text-purple-500 hover:cursor-pointer' onClick={handleClickSubtract}>-</button>

        </div>
        <button className='titulo text-white px-3 border-3 rounded  text-3xl hover:text-red-600 hover:cursor-pointer ' onClick={handleClickReset}>RESET</button>
        </div>
        </>
    )
}

export default Counter