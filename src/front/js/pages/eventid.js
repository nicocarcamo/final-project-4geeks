import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'semantic-ui-react';
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export function EventoDetalle() {
  const { store, actions } = useContext(Context);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await actions.getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error("fetchEvent no funciona");
        console.log(error);
        setError(error);
      }
    };
    

    fetchEvent();
  }, [actions, id]);
  
  if (error) return <div>Error: {error.message}</div>;
  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>Detalles del evento</h1>
      <Table celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Nombre: {event.nombreevento}</Table.Cell>
            <Table.Cell>Descripción: {event.descripcion}</Table.Cell>
            <Table.Cell>Integrantes: {event.integrantes}</Table.Cell>
            <Table.Cell>Tipo: {event.publicooprivado}</Table.Cell>
            <Table.Cell>Valor: {event.valor}</Table.Cell>
            <Table.Cell>Ubicación: {event.ubicacion}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
  }  