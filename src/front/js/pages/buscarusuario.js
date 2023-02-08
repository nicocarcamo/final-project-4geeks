import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Form } from "semantic-ui-react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import backgroundBuscarU from "../../img/mountain-wall-mural-peel-stick-152953_1800x1800.webp";
import "../../styles/buscarUsuarios.css";
import {Icon} from 'semantic-ui-react'

export function BuscarUsuarios() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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
      .getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
    actions
      .getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch((error) => console.error(error));
  }, []);

  const handleProfileSelection = (user) => {
    //   setSelectedUser(user);
    setSelectedUser(user);
    navigate(`/perfil/${user.id}`);
  };

  return (
    <div className="bodyContentBuscarUsuarios">
      <div className="backgroundBuscarU"></div>
      <div className="contentBuscar">
        <h1>Buscar usuarios</h1>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nombre de Usuario</Table.HeaderCell>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>Apellido</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Perfil</Table.HeaderCell>
              {/* <Table.HeaderCell>Ubicacion</Table.HeaderCell>
            <Table.HeaderCell>Activo</Table.HeaderCell>
            <Table.HeaderCell>Unirse</Table.HeaderCell> */}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.firstname}</Table.Cell>
                <Table.Cell>{user.lastname}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                {/* <Table.Cell>{event.valor}</Table.Cell>
              <Table.Cell>{event.ubicacion}</Table.Cell>
              <Table.Cell>{event.activo}</Table.Cell> */}
                <Table.Cell>
                  <Button
                    onClick={() => handleProfileSelection(user)}
                    color="blue"
                  >
                    Ver detalles
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
