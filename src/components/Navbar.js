import React from 'react'
import { Link, useLocation } from "react-router-dom";
import "../style/loginPage.css"

const Navbar = () => {
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar navbarBg">
            <div className="container-fluid">
                <Link className="navbar-brand textBolder" to="/">myNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} textBold`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} textBold`} to="/about">About</Link>
                        </li>
                    </ul>
                    {
                        !localStorage.getItem('token') ? <form className='d-flex'>
                            <Link className='btn btn-sm btn-primary mx-2' to='/login' role='button'>Login</Link>
                            <Link className='btn btn-sm btn-primary mx-2' to='/signup' role='button'>Try myNotebook Free</Link>
                        </form>
                            : <Link className='btn btn-primary mx-2' to='/login' onClick={handleLogout} role='button'>LogOut</Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar