import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import "../../styles/eventid.css";

import ImagenUploaded from "../component/ImageUpload";

export function EventoDetalle() {
  const { store, actions } = useContext(Context);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  //icon importation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);

  useEffect(() => {
    actions
      .getEventById(id)
      .then((data) => setEvent(data))
      .catch((error) => console.error(error));
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!event) return <div>Loading...</div>;

  const handleEventSelection = () => {
    actions.addIntegrante(
      id,
      store.currentUser.username,
      store.currentUser.access_token
    );
  };

  // function DeleteEvent(props) {
  //   const [eventId, setEventId] = useState(props.eventId);

  //   const handleDelete = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.BACKEND_URL}/api/eventos/${eventId}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Error deleting event");
  //       }
  //       console.log("Event deleted successfully");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  // }

  return (
    <div id="album" className="d-flex justify-content-center my-5">
      <div className="backgroundCrearE"></div>
      <div className="ui compact segment p-4 colorFondoMiEvento">
        <div className="ui card colorFondoMiEventoUI">
          <span className="d-flex justify-content-end mx-4">
            <i className="history icon"></i>
            Creado el: {event.fechaCreacion}
          </span>
          <img src={event.image_url} />
          <div className="content m-3">
            <div className="m-2">
              <h2>{event.nombreevento}</h2>
              <h3>{event.descripcion}</h3>
              <h3>Tipo: {event.publicooprivado}</h3>
              <h3>N° Asistentes: {event.integrantes}</h3>
              <h3>Fecha: {event.fechaEvento}</h3>
              <h3>Dirección: {event.ubicacion}</h3>
            </div>
          </div>
        </div>
        {/* <div>
          <button onClick={handleDelete}>Delete Event</button>
        </div> */}
        <Link
          to="/unirseevento"
          className="my-4 d-flex justify-content-end text-white"
        >
          Volver a eventos
          <i className="calendar icon red"> </i>
        </Link>
      </div>
      <div className="extra content">
        {/* <div className="ui left labeled right floated button">
          <a className="ui basic green right pointing label">Compartir!</a>
          <div className="ui red icon tiny button">
            <i className="external share large icon"></i>
          </div>
        </div> */}
      </div>
    </div>
  );
}
