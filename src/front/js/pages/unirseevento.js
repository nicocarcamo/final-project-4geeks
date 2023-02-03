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

useEffect(() => {
  actions.getEvents()
    .then(data => {
      const eventsWithUsernames = data.map(event => {
        event.username = store.users.find(user => user.id === event.user_id).username;
        return event;
      });
      setEvents(eventsWithUsernames);
    })
    .catch(error => console.error(error));
  actions.getCurrentUser()
    .then(user => setCurrentUser(user))
    .catch(error => console.error(error));
}, []);


const handleEventSelection = (event) => {
  navigate(`/crearevento/${event.id}`);
};

return (
    <div>
      <h1>Unirse a evento</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre del evento</Table.HeaderCell>
            <Table.HeaderCell>Descripcion</Table.HeaderCell>
            <Table.HeaderCell>Creador del evento</Table.HeaderCell>
            <Table.HeaderCell>Integrantes</Table.HeaderCell>
            <Table.HeaderCell>Publico/Privado</Table.HeaderCell>
            <Table.HeaderCell>Valor</Table.HeaderCell>
            <Table.HeaderCell>Ubicacion</Table.HeaderCell>
            <Table.HeaderCell>Activo</Table.HeaderCell>
            <Table.HeaderCell>Unirse</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {events.map(event => (
            <Table.Row key={event.id}>
            
              <Table.Cell>{event.nombreevento}</Table.Cell>
              <Table.Cell>{event.descripcion}</Table.Cell>
              <Table.Cell>{event.username}</Table.Cell>
              <Table.Cell>{event.integrantes}</Table.Cell>
              <Table.Cell>{event.publicooprivado}</Table.Cell>
              <Table.Cell>{event.valor}</Table.Cell>
              <Table.Cell>{event.ubicacion}</Table.Cell>
              <Table.Cell>{event.activo}</Table.Cell>
              <Table.Cell>
              <Button onClick={() => handleEventSelection(event)} color="blue">
  Ver detalles
</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
