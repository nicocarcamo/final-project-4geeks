
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import {Icon} from 'semantic-ui-react'

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

  const ImageView = () => {
    const [imageUrl] = ImagenUploaded();

    return (
      <div>
        <img
          src={`https://res.cloudinary.com/ddx94eu6o/image/upload/${imageUrl}`}
          alt="Subida de imagen"
        />
      </div>
    );
  };

  return (
    <div id="album" class="d-flex justify-content-center my-5">
       <div className="backgroundCrearE"></div>
      <div class="ui piled compact segment p-4">
        <div class="floating ui red label">9</div>
        <div class="ui card">
          <div class="blurring dimmable image">
            <div class="ui inverted dimmer">
              <div class="content">
                <div class="center">
                  <div class="ui red button view">Ver</div>
                </div>
              </div>
            </div>
            <img class="center" src="src/front/img/rigo-baby.jpg" />
          </div>
          {/* <span class="date  d-flex justify-content-end mx-4">
                <i class="calendar alternate icon"></i>
                05/01/2023
              </span> */}
          <div class="content m-3">
            <div class="meta">

            </div>
            <div class="m-2">
              <h2>{event.nombreevento}</h2>
              <div class="description">{event.descripcion}</div>
              <div class="description">Fecha: {event.publicooprivado}</div>
              <div class="description">Hora: {event.integrantes}</div>
              <div class="description">Lugar: {event.ubicacion}</div>

              <div class="description">{event.valor}</div>
              <Link to="/unirseevento" class="my-4 d-flex justify-content-end">
              <i class="backward icon teal"> </i>
                Volver a eventos
              </Link>
            </div>
          </div>
          <div class="extra content">
            <div class="ui right labeled button" tabindex="0">
              <div class="ui red icon tiny button">
                <i class="add square up large icon"></i>
              </div>
            <Link to="/organizacionevento" class="ui basic blue left pointing label">
Unirse!            </Link>
            </div>
            <div class="ui left labeled right floated button" tabindex="0">
              <a class="ui basic green right pointing label">Compartir!</a>
              <div class="ui red icon tiny button">
                <i class="external share large icon"></i>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
