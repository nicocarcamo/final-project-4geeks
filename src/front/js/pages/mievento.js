import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import backgroundMyEvents from "../../img/mountain-wall-mural-peel-stick-152953_1800x1800.webp";
import "../../styles/misEventos.css";
import { Icon } from "semantic-ui-react";
import { ImagenUploaded } from "../component/ImageUpload";

export function MiEvento({ evento }) {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  //icon importation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);

  useEffect(() => {
    if (!store.currentUser) navigate("/login");
  }, []);

  useEffect(() => {
    actions
      .getEvents()
      .then((data) => setEvents(data))
      .catch((error) => console.error(error));
    actions
      .getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch((error) => console.error(error));
  }, []);

  const handleEventSelection = (event) => {
    // setSelectedEvent(event);
    navigate(`/crearevento/${event.id}`);
  };

  return (
    <div className="contentMyEvents">
      <div className="backgroundMyEvents"></div>
      <div className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <span className="d-flex justify-content-end mx-4">
              <i className="history icon"></i>
              Creado el: {event.fechaCreacion}
            </span>
            <img src={event.image_url} />
            <div className="content m-3">
              <div className="meta"></div>
              <div className="m-2">
                <h2>{event.nombreevento}</h2>
                <h3>{event.descripcion}</h3>
                <h3>Tipo: {event.publicooprivado}</h3>
                <h3>N° Asistentes: {event.integrantes}</h3>
                <h3>Fecha: {event.fechaEvento}</h3>
                <h3>Dirección: {event.ubicacion}</h3>
              </div>
            </div>
            <div className="extra content d-flex">
              <div className="ui left labeled right floated button">
                <Button
                  onClick={() => handleEventSelection(event)}
                  color="green"
                >
                  Ver detalles
                </Button>
                <div className="ui red icon tiny button">
                  <i className="external share large icon"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
