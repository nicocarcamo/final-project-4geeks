import { Link } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";


export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('logout function started');
    actions.logout();
    console.log('logout function executed');
    sessionStorage.removeItem('currentUser');
    console.log('sessionStorage removed');
    navigate("/login");
    };

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container fluid">
        <div className="navbar-nav">
          <Link to="/">
            <span className="navbar-brand mb-0 h1">MeetMeUp</span>
          </Link>
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
          <div className="">
            <Dropdown
              text="Account"
              className="text-light"
              pointing="top right"
              open={open}
              onClick={handleClick}
            >
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/perfil" text="Perfil" description={<Icon name="user" />} />
                <Dropdown.Item as={Link} to="/mievento" text="Mis Eventos" description={<Icon name="calendar alternate" />} />
                <Dropdown.Divider />
                <Dropdown.Item text="Logout" onClick={handleSubmit} description={<Icon name="sign out" />} />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
   

    </nav>
  );
};
