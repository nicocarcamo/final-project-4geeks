import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Form } from "semantic-ui-react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import backgroundUnirse from "../../img/mountain-wall-mural-peel-stick-152953_1800x1800.webp";
import "../../styles/unirseEvento.css";
import { Link } from "react-router-dom";
import {Icon} from 'semantic-ui-react'


export function UnirseEvento() {
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
    <>
      <div className="backgroundUnirse"></div>
      <div className="contentUnirse">
        <div className="ui grid m-5">
          {events.map((event) => (
            <div className="four wide column" key={event.id}>
              <div className="ui card mt-5">
                <div className="blurring dimmable image">
                  <div className="ui dimmer">
                    <div className="content">
                      <div className="center">
                        <div className="ui red button view">Ver</div>
                      </div>
                    </div>
                    <img className="center" src="src/front/img/rigo-baby.jpg" />
                  </div>
                  <span className="date  d-flex justify-content-end mx-4">
                    <i className="history icon"></i>
                    05/01/2023
                  </span>
                  <div className="content m-3">
                    <div className="meta"></div>
                    <div className="m-2">
                      <h2>{event.nombreevento}</h2>
                      <div className="description">{event.descripcion}</div>
                      <div className="description">
                        Integrantes: {event.integrantes}
                      </div>
                      <div className="description">{event.ubicacion}</div>
                    </div>
                  </div>
                  <div className="extra content">
                    <div className="ui right labeled button" tabindex="0">
                      <div className="ui red icon tiny button">
                        <i className="thumbs outline up large icon"></i>
                      </div>
                      <Link
                        to="/organizacionevento"
                        className="ui basic blue left pointing label"
                      >
                        Unirse!{" "}
                      </Link>{" "}
                    </div>
                    <div
                      className="ui left labeled right floated button"
                      tabindex="0"
                    >
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
