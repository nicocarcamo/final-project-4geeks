import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">MeetMeUp</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-secondary">Login</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/register">
						<button className="btn btn-secondary">Register</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/perfil">
						<button className="btn btn-secondary">Perfil</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/crearevento">
						<button className="btn btn-secondary">Crear Evento</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/unirseevento">
						<button className="btn btn-secondary">Unirse Evento</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/inbox">
						<button className="btn btn-secondary">Inbox</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/">
						<button className="btn btn-secondary">Home</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
