// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
    return (
        <nav>

            <Link to="/">Home</Link>


            <Link to="/adduserform">Add User Form</Link>

            <Link to="/usertable">User Table</Link>


        </nav>
    );
}

export default Navbar;
