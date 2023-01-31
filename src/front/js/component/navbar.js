import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../img/logo2_style.png";
import "../../styles/navbar.css";

export const Navbar = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  // chequear la lógica detras de esto: si estamos logueados y nos vamos a register o login, no tenemos como volver al resto del sitio
  // if (location.pathname === "/" || location.pathname === "/register") {
  //   return null;
  // } else {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container d-flex justify-content-between">
        <Link to="/">
          <img className="logo" src={logo} />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          class="navbar-toggler"
          type="button"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          className={`navContent d-flex collapse navbar-collapse ${
            isOpen ? "show" : ""
          }`}
        >
          <div className="mx-2">
            <Link to="/login" className="link text-light">
              Login
            </Link>
          </div>
          <div className="mx-2">
            <Link to="/register" className="link text-light">
              Register
            </Link>
          </div>
          <div className="mx-2">
            <Link to="/perfil" className="link text-light">
              Perfil
            </Link>
          </div>
          <div className="mx-2">
            <Link to="/crearevento" className="link text-light">
              Crear Evento
            </Link>
          </div>
          <div className="mx-2">
            <Link to="/unirseevento" className="link text-light">
              Unirse Evento
            </Link>
          </div>
          <div className="mx-2">
            <Link to="/mievento" className="link text-light">
              Mi Evento
            </Link>
          </div>
          <div className="mx-2">
            <Link to="/inbox" className="link text-light">
              Inbox
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
// };
