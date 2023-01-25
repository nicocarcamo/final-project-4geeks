import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="mt-5">
			<Container text>
				<Header
					as='h1'
					content='MeetMeUp'
				//   inverted
				//   style={{
				// 	fontSize: mobile ? '2em' : '4em',
				// 	fontWeight: 'normal',
				// 	marginBottom: 0,
				// 	marginTop: mobile ? '1.5em' : '3em',
				//   }}
				/>
				<Header
					as='h2'
					content='Encuentra juegos cerca tuyo.'
				//   inverted
				//   style={{
				// 	fontSize: mobile ? '1.5em' : '1.7em',
				// 	fontWeight: 'normal',
				// 	marginTop: mobile ? '0.5em' : '1.5em',
				//   }}
				/>
				<Link to="/register" className="text-light">
				<Button primary size='huge'>
					Comienza
					<i className="fa-solid fa-arrow-right ms-2"></i>
				</Button>
				</Link>

			</Container>
			<div className="alert alert-primary text-center mt-5">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
		</div>
	);
};
