
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card, Header, Button, Grid, Image } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';


export const PerfilId = () => {
	const { store, actions } = useContext(Context);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		if (!store.currentUser) navigate('/login');
	}, [])

	useEffect(() => {

		actions.getUser(id)
		.then(data => setUser(data))
		.catch(error => console.error(error))
	
	  }, []);
	  
	  if (error) return <div>Error: {error.message}</div>;
	  if (!user) return <div>Loading...</div>;
	

	const extra = (
		<a>
			<i className="fa-solid fa-location-dot me-1"></i>
			16 Events near you!
		</a>
	)

	return (
		<>
			<Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="teal" textAlign="center">
						<Image src="/rigo-baby.jpg" /> Mi perfil
					</Header>
					<div className="container d-flex justify-content-center mt-5">
						<Card
							image={"https://robohash.org/" + id + ".png"}
							// image="https://xsgames.co/randomusers/avatar.php?g=pixel"
							header={store.users?.username}
							meta={store.users?.firstname + ' ' + store.users?.lastname}
							description={store.users?.email}
							// extra={extra}
						/>
					</div>
					{/* <Button color='teal' size='medium' type='submit' className='mt-2'>
						Edit Profile
					</Button> */}
				</Grid.Column>
			</Grid>
		</>
	);
};