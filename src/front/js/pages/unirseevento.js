import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export function UnirseEvento() {
const { store, actions } = useContext(Context);
const navigate = useNavigate()
const [events, setEvents] = useState([]);
const [currentUser, setCurrentUser] = useState(null);
const [selectedEvent, setSelectedEvent] = useState(null);

useEffect(() => {
    if (!store.currentUser) navigate('/login');
}, [])

useEffect(() => {
    actions.getEvents()
    .then(data => setEvents(data))
    .catch(error => console.error(error));
  actions.getCurrentUser()
    .then(user => setCurrentUser(user))
    .catch(error => console.error(error));
}, []);

const handleEventSelection = (event) => {
  // setSelectedEvent(event);
  navigate(`/crearevento/${event.id}`);
};

return (
  <div class="ui grid m-5">
  {events.map(event => (
    <div class="four wide column" key={event.id}>
      <div class="ui card mt-5">
        <div class="blurring dimmable image">
          <div class="ui dimmer">
            <div class="content">
              <div class="center">
                <div class="ui red button view">Ver</div>
              </div>
            </div>
            <img class="center" src="src/front/img/rigo-baby.jpg" />
          </div>
          <span class="date  d-flex justify-content-end mx-4">
                <i class="history icon"></i>
                05/01/2023
              </span>
          <div class="content m-3">
            <div class="meta">

            </div>
            <div class="m-2">
              <h2>{event.nombreevento}</h2>
              <div class="description">{event.descripcion}</div>
              <div class="description">Integrantes: {event.integrantes}</div>
              <div class="description">{event.ubicacion}</div>
            </div>
          </div>
          <div class="extra content">
            <div class="ui right labeled button" tabindex="0">
              <div class="ui red icon tiny button">
                <i class="thumbs outline up large icon"></i>
              </div>
              <a class="ui basic blue left pointing label">Unirse!</a>
            </div>
            <div class="ui left labeled right floated button" tabindex="0">
            <Button onClick={() => handleEventSelection(event)} color="green">
                Ver detalles
              </Button> 
              <div class="ui red icon tiny button">
                <i class="external share large icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}
