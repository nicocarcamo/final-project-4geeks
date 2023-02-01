import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export function BuscarUsuarios() {
const { store, actions } = useContext(Context);
const navigate = useNavigate()
const [users, setUsers] = useState([]);
const [currentUser, setCurrentUser] = useState(null);
const [selectedEvent, setSelectedEvent] = useState(null);

useEffect(() => {
    if (!store.currentUser) navigate('/login');
}, [])

useEffect(() => {
    actions.getUsers()
    .then(data => setUsers(data))
    .catch(error => console.error(error));
  actions.getCurrentUser()
    .then(user => setCurrentUser(user))
    .catch(error => console.error(error));
}, []);

const handleProfileSelection = (user) => {
//   setSelectedUser(user);
  navigate(`/perfil/${user.id}`);
};

return (
    <div>
      <h1>Buscar usuarios</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Perfil</Table.HeaderCell>
            {/* <Table.HeaderCell>Ubicacion</Table.HeaderCell>
            <Table.HeaderCell>Activo</Table.HeaderCell>
            <Table.HeaderCell>Unirse</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.firstname}</Table.Cell>
              <Table.Cell>{user.lastname}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              {/* <Table.Cell>{event.valor}</Table.Cell>
              <Table.Cell>{event.ubicacion}</Table.Cell>
              <Table.Cell>{event.activo}</Table.Cell> */}
              <Table.Cell>
              <Button onClick={() => handleProfileSelection(user)} color="blue">
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