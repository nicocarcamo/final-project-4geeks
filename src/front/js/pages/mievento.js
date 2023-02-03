import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import backgroundMyEvents from "../../img/mountain-wall-mural-peel-stick-152953_1800x1800.webp";
import "../../styles/misEventos.css";

export function MiEvento({ evento }) {
  const { store, actions } = useContext(Context);
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.currentUser) navigate("/login");
  }, []);

  useEffect(() => {
    actions
      .getEvents()
      .then((data) => setEvents(data))
      .catch((error) => console.error(error));
    actions
      .getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bodyContentMisEventos">
      <div className="backgroundMyEvents"></div>

      <div className="container mt-5 contentMyEvents">
        <h1 className="text-center">Mis eventos</h1>
        <div className="row">
          {events
            .filter((event) => event.user_id === currentUser?.id)
            .map((event) => (
              <div className="col-md-4" key={event.id}>
                <Card>
                  <Card.Content>
                    <Card.Header>{event.titulo}</Card.Header>
                    <Card.Meta>{event.fecha}</Card.Meta>
                    <Card.Description>{event.descripcion}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button as={Link} to={`/evento/${event.id}`} color="blue">
                      Ver detalles
                    </Button>
                    <Button
                      color="red"
                      onClick={() =>
                        actions
                          .deleteEvent(event.id)
                          .then(() =>
                            setEvents(events.filter((e) => e.id !== event.id))
                          )
                      }
                    >
                      Eliminar
                    </Button>
                  </Card.Content>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
