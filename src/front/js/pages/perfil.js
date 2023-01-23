import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Card, Icon } from 'semantic-ui-react'


export const Perfil = () => {
	const { store, actions } = useContext(Context);

	// estos states probablemente sean necesarios para cargar la info del usuario, pueden modificarse al determinar que datos traeremos al perfil
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [following, setFollowing] = useState(0);
	const [followers, setFollowers] = useState(0);
	const [events, setEvents] = useState([]);
	const [profilePicture, setProfilePicture] = useState('');


	// useEffect(() => {
	//   // Hacer fetch de datos de usuario aquí, actualizar los states acorde

	//   // Ejemplo:
	//   // setUsername(userData.username);
	//   // setEmail(userData.email);
	//   // setFollowing(userData.following);
	//   // setFollowers(userData.followers);
	//   // setEvents(userData.events);
	//   // setProfilePicture(userData.profilePicture);
	// }, []);

	const extra = (
		<a>
			<Icon name='user' />
			16 Followers
		</a>
	)

	return (
		//   <div className="container">
		// 	<div className="row justify-content-center">
		// 	  <div className="col-6">
		// 		<img src={profilePicture} className="rounded-circle profile-picture" alt="profile-picture" />
		// 	  </div>
		// 	</div>
		// 	<div className="row justify-content-center">
		// 	  <div className="col-6">
		// 		<h2>My Profile</h2>
		// 		{/* datos con states: */}
		// 		{/* <p>Username: {username}</p>
		// 		<p>Email: {email}</p>
		// 		<p>Following: {following}</p>
		// 		<p>Followers: {followers}</p> */}

		// 		{/* datos de prueba sin states */}
		// 		<p>Username: Cristiano Ronaldo</p>
		// 		<p>Email: cristiano@ronaldo.com</p>
		// 		<p>Following: 500mm</p>
		// 		<p>Followers: 3</p>
		// 		<h3>Recent Events</h3>
		// 		<ul>
		// 			{/* mapeo para listar los eventos recientes */}
		// 		  {events.map(event => (
		// 			<li key={event.id}>{event.name}</li>
		// 		  ))}
		// 		</ul>
		// 	  </div>
		// 	</div>
		//   </div>

		<div className="container d-flex justify-content-center mt-5">
			<Card
				image='https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg'
				header='Username'
				meta='Friend'
				description='Username bio or description here'
				extra={extra}
			/>
		</div>
	);
};
