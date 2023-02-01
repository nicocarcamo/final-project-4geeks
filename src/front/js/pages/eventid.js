// import React, { useState, useEffect, useContext } from 'react';
// import { Table } from 'semantic-ui-react';
// import { Context } from "../store/appContext";
// import { useParams } from "react-router-dom";

// export function EventoDetalle() {
//   const { store, actions } = useContext(Context);
//   const [error, setError] = useState(null);
//   const [event, setEvent] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {

//     actions.getEventById(id)
//     .then(data => setEvent(data))
//     .catch(error => console.error(error))

//   }, []);
  
//   if (error) return <div>Error: {error.message}</div>;
//   if (!event) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Detalles del evento</h1>
//       <Table celled>
//         <Table.Body>
//           <Table.Row>
//             <Table.Cell>Nombre: {event.nombreevento}</Table.Cell>
//             <Table.Cell>Descripción: {event.descripcion}</Table.Cell>
//             <Table.Cell>Integrantes: {event.integrantes}</Table.Cell>
//             <Table.Cell>Tipo: {event.publicooprivado}</Table.Cell>
//             <Table.Cell>Valor: {event.valor}</Table.Cell>
//             <Table.Cell>Ubicación: {event.ubicacion}</Table.Cell>
//           </Table.Row>
//         </Table.Body>
//       </Table>
//     </div>
//   );
//   } 


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export function EventoDetalle() {
  const { store, actions } = useContext(Context);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  // const navigate = useNavigate()

  useEffect(() => {
    actions.getEventById(id)
      .then(data => setEvent(data))
      .catch(error => console.error(error))
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!event) return <div>Loading...</div>;

  const handleEventSelection = () => {
    actions.addIntegrante(id, store.currentUser.username, store.currentUser.access_token);
  };

  return (
    <Card className="mt-5 d-flex justify-content-center" style={{ width: "50%", paddingTop: "40px" }}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='src/front/img/rigo-baby.jpg'
        />
        <Card.Meta><h1>{event.nombreevento}</h1></Card.Meta>
        <Card.Meta><h3>{event.descripcion}</h3></Card.Meta>
        <Card.Description>
          <p>Integrantes: {event.integrantes}</p>
          <p>Tipo: {event.publicooprivado}</p>
          <p>Valor: {event.valor}</p>
        </Card.Description>
        <Card.Description>
          Ubicación: {event.ubicacion}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' className="mr-4" onClick={handleEventSelection}>
            Unirse!
          </Button>
          <Link to="/unirseevento">
            <Button basic color='red'>
              No, gracias</Button>
          </Link>
        </div>
      </Card.Content>
    </Card>
  );
}  