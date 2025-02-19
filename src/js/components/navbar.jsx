import React from "react";
import { Link, NavLink } from "react-router-dom";



const Navbar = () => {
    return (

        <>
            <nav className=" bg-black py-3">
<div className="container mx-auto">
    <img src="" alt="" />
    <ul>
        <li className=" text-white hover:text-green-400 cursor-pointer">
            <NavLink to='/'>HOME</NavLink> 
        </li>
    </ul>
          
</div>

            </nav>


        </>
    )
}

export default Navbar

