import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
// import "../../styles/home.css";
import { Container, Button } from 'semantic-ui-react'
import { Carrusel } from "./carruselhome";
import {Icon} from 'semantic-ui-react'


export const Home = () => {
	  //icon importation
	  const [isLoggedIn, setIsLoggedIn] = useState(false);
	  const styleLink = document.createElement("link");
	  styleLink.rel = "stylesheet";
	  styleLink.href = 
	  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
	  document.head.appendChild(styleLink);

	const { store, actions } = useContext(Context);
	
	useEffect(() => {
		if (!store.currentUser) navigate('/login');
	  }, [])
	
	return (
		<div className="text-center mt-5">
			<h1>MeetMeUp Home</h1>
			<Container className="my-4">
				<Carrusel />
			</Container>
			<Container className="px-5 my-2">
				<Button fluid href="/unirseevento">Unirse a Evento</Button>
			</Container>
			<Container className="px-5 my-2">
				<Button fluid href="/crearevento">Crear Evento</Button>
			</Container>
			<Container className="px-5 my-2">
				<Button fluid href="/miseventos">Mis eventos</Button>
			</Container>
			<div className="alert alert-primary">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
		</div>
	);
};
