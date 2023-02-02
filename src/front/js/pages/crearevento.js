import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import MapPicker from '../component/MapPicker';
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
	const [message, setMessage] = useState(null);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	useEffect(() => {
		if (!store.currentUser) navigate('/login');
	}, [])

	const updateSelectedAddress = (address) => {
		setSelectedAddress((currenAddrees) => {
			return currenAddrees = address;
		})
		console.log(selectedAddress)
	};

	const [formData, setFormData] = useState({
		nombreevento: "",
		descripcion: "",
		integrantes: "",
		publicooprivado: "",
		valor: "",
		ubicacion: "",
		address: selectedAddress,
		is_active: true
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData)
		actions.createEvent(formData, navigate, setMessage);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (

		<>
			<Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
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
									value={selectedAddress}
									readOnly
								/>
							</Form.Field>
							<Button color='teal' fluid size='large' type="submit">Submit</Button>
							{message && <Message>{message}</Message>}
						</Form>
					</Segment>

				</Grid.Column>
			</Grid>
			<MapPicker onAddressChange={updateSelectedAddress} />
		</>

	);
};