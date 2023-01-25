import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

export const CrearEvento = () => {
	const { store, actions } = useContext(Context);

	const [formData, setFormData] = useState({
	  nombreevento: "",
	  descripcion: "",
	  integrantes: "",
	  publicooprivado: "",
	  valor: "",
	  ubicacion: "",
	  is_active: true
	});
	const [message, setMessage] = useState(null);
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  try {
		const res = await fetch(`${process.env.BACKEND_URL}/api/crearevento`, {
		  method: "POST",
		  body: JSON.stringify(formData),
		  headers: {
			"Content-Type": "application/json"
		  }
		});
		const json = await res.json();
		setMessage(json.message);
	  } catch (err) {
		  setMessage(err.response && err.response.data.message);
	  }
	};
  
	const handleChange = (e) => {
	  setFormData({ ...formData, [e.target.name]: e.target.value });
	};
  

	return (
		<Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
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
			  <Button color='teal' fluid size='large' type="submit">Submit</Button>
			</Form>
		  </Segment>
		</Grid.Column>
	  </Grid>
	);
};