import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  } else {
    return (
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container">
          <div className="navbar-nav">
            <Link to="/">
              <span className="navbar-brand mb-0 h1">MeetMeUp</span>
            </Link>
            <div className="mx-2">
              <Link to="/" className="text-light">
                Login
              </Link>
            </div>
            <div className="mx-2">
              <Link to="/register" className="text-light">
                Register
              </Link>
            </div>
            <div className="mx-2">
              <Link to="/home" className="text-light">
                Home
              </Link>
            </div>
            <div className="mx-2">
              <Link to="/perfil" className="text-light">
                Perfil
              </Link>
            </div>
            <div className="mx-2">
              <Link to="/crearevento" className="text-light">
                Crear Evento
              </Link>
            </div>
            <div className="mx-2">
              <Link to="/unirseevento" className="text-light">
                Unirse Evento
              </Link>
            </div>
            <div className="mx-2">
              <Link to="/inbox" className="text-light">
                Inbox
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};
