import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import { Context } from "../store/appContext";

export function UnirseEvento() {

    const { store, actions } = useContext(Context);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        actions.getEvents().then(data => setEvents(data));
    }, []);
    
    const handleSubmit = e => {
        e.preventDefault();
        fetch(process.env.BACKEND_URL + "/api/crearevento", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombreevento: nombreevento,
                descripcion: descripcion,
                integrantes: integrantes,
                publicooprivado: publicooprivado,
                valor: valor,
                ubicacion: ubicacion,
                is_active: is_active
            }),
        })
            // .then(res => res.json())
            // .then(data => {
            //     console.log(data)
            //     // updatearla lista
            //     fetch(process.env.BACKEND_URL + "/api/crearevento", {
            //         method: 'GET',
            //         headers: { 'Content-Type': 'application/json' },
            //     })
            //         .then(res => res.json())
            //         .then(data => setEvents(data))
            //         .catch(err => console.log(err));
            // })
            // .catch(err => console.log(err));
    };


    return (
        <div>
            <h1>Unirse a evento</h1>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre del evento</Table.HeaderCell>
                        <Table.HeaderCell>Descripcion</Table.HeaderCell>
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
                            <Table.Cell>{event.integrantes}</Table.Cell>
                            <Table.Cell>{event.publicooprivado}</Table.Cell>
                            <Table.Cell>{event.valor}</Table.Cell>
                            <Table.Cell>{event.ubicacion}</Table.Cell>
                            <Table.Cell>{event.activo}</Table.Cell>
                            <Table.Cell>
                                <Button color='teal' fluid size='large' type="submit" onClick={handleSubmit}>Unirse</Button>
                            </Table.Cell>
                        </Table.Row>))}
                </Table.Body>

            </Table>
        </div>
    )
}

