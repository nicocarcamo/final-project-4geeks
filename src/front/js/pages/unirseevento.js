import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Card, Button, Grid, Image, Header, Segment } from "semantic-ui-react";

export const UnirseEvento = () => {
  const { store, actions } = useContext(Context);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/rigo-baby.jpg" /> Eventos disponibles
        </Header>
        <Segment>
          <Card.Group>
            {store.eventos && Array.isArray(store.eventos) ? (
              store.eventos.map((evento, index) => {
                return (
                  <Card key={index}>
                    <Card.Content>
                      <Card.Header>{evento.nombreevento}</Card.Header>
                      <Card.Meta>{evento.ubicacion}</Card.Meta>
                      <Card.Description>
                        {evento.descripcion} - {evento.integrantes} integrantes
                        - {evento.publicooprivado}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        color="teal"
                        onClick={() => actions.unirseEvento(evento.id)}
                      >
                        Unirse al evento
                      </Button>
                    </Card.Content>
                  </Card>
                );
              })
            ) : (
              <p>No hay eventos disponibles</p>
            )}
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
