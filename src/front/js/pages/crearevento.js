import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import MapPicker from "../component/MapPicker";
import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment,
} from "semantic-ui-react";
import backgroundCrearE from "../../img/mountain-wall-mural-peel-stick-152953_1800x1800.webp";
import "../../styles/crearEvento.css";

export const CrearEvento = () => {
  const [message, setMessage] = useState(null);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

	useEffect(() => {
		if (!store.currentUser) navigate('/login');
	}, [])

	const [formData, setFormData] = useState({
		nombreevento: "",
		descripcion: "",
		integrantes: "",
		publicooprivado: "",
		valor: "",
		ubicacion: "",
		is_active: true
	});


  const handleSubmit = (e) => {
    e.preventDefault();
    actions.createEvent(formData, navigate, setMessage);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="backgroundCrearE"> <img src={backgroundCrearE}/></div>
      <Grid
        textAlign="center"
        style={{ height: "90vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/rigo-baby.jpg" /> Create Nuevo Evento
          </Header>
          <Segment>
            <Form size="large" onSubmit={handleSubmit}>
              <Form.Field>
                <Form.Input
                  name="nombreevento"
                  placeholder="Nombre del Evento"
                  label="Nombre del Evento"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  name="descripcion"
                  placeholder="Descripcion"
                  label="Descripcion"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  name="integrantes"
                  placeholder="Cantidad de Integrantes"
                  label="Cantidad de Integrantes"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  name="publicooprivado"
                  placeholder="Público o Privado"
                  label="Público o Privado"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  name="ubicacion"
                  placeholder="Ubicacion"
                  label="Ubicacion"
                  onChange={handleChange}
                />
              </Form.Field>
              <Button color="teal" fluid size="large" type="submit">
                Submit
              </Button>
              {message && <Message>{message}</Message>}
            </Form>
          </Segment>
          <MapPicker />
        </Grid.Column>
      </Grid>
	  <MapPicker />
    </div>
  );
};
