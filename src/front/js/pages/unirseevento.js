import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Context } from '../store/appContext';

export const UnirseEvento = () => {
  const [eventos, setEventos] = useState([]);
  const getEvento = async () => {
    try {
        const resp = await fetch(
        process.env.BACKEND_URL + "/api/crearevento",
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }
        );

        const data = await resp.json();
        setStore((store) => {
        store.eventos.push(data);

        return store;
        });
    } catch (error) {
        console.log("Error, no se puede crear evento", error);
    }
}

useEffect(() => {
    getEvento();
}, [])

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Descripcion</Table.HeaderCell>
                    <Table.HeaderCell>Integrantes</Table.HeaderCell>
                    <Table.HeaderCell>Valor</Table.HeaderCell>
                    <Table.HeaderCell>Ubicacion</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {eventos.map((crearevento) => (
                    <Table.Row key={crearevento.id}>
                        <Table.Cell>{crearevento.nombreevento}</Table.Cell>
                        <Table.Cell>{crearevento.descripcion}</Table.Cell>
                        <Table.Cell>{crearevento.integrantes}</Table.Cell>
                        <Table.Cell>{crearevento.valor}</Table.Cell>
                        <Table.Cell>{crearevento.ubicacion}</Table.Cell>
                        {/* <Table.Cell>
                            <Button onClick={() => actions.joinEvent(crearevento.id)}>Join</Button>
                        </Table.Cell> */}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}
