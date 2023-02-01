import React from 'react';
import { Card, Header, Image } from 'semantic-ui-react';

export const EventoDetalle = (props) => {
  const { event } = props;

  return (
    <Card>
      {/* <Image src={event.imageUrl} wrapped ui={false} /> */}
      <Card.Content>
        <Header as='h3'>{event.nombreevento}</Header>
        <Card.Description>
          <p>{event.descripcion}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>Integrantes: {event.integrantes}</p>
        <p>Visibilidad: {event.publicooprivado}</p>
        <p>Valor: {event.valor}</p>
        <p>Ubicación: {event.ubicacion}</p>
      </Card.Content>
    </Card>
  );
};

