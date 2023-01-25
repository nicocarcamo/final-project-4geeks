import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const UnirseEvento = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Únete a un evento</h1>
			<div className="list-group w-50 mx-auto">
				<a
					href="#"
					className="list-group-item list-group-item-action active"
					aria-current="true"
				>
					<div className="d-flex w-100 justify-content-between">
						<h5 className="mb-1">Partida de cartas magic</h5>
						<small>Creado hace 3 días</small>
					</div>
					<p className="mb-1">Formatos modern, commander y legacy</p>
					<small>Av. Salvador 432, 24/1/2023, 22:00Hrs</small>
				</a>
				<a href="#" className="list-group-item list-group-item-action">
					<div className="d-flex w-100 justify-content-between">
						<h5 className="mb-1">Salida en bici</h5>
						<small className="text-muted">Creado hace 2 días</small>
					</div>
					<p className="mb-1">Vamos en bici hasta Pirque y volvemos, ritmo tranquilo.</p>
					<small className="text-muted">Departamental con Vespucio, 28/1/2023, 8:30Hrs</small>
				</a>
				<a href="#" className="list-group-item list-group-item-action">
					<div className="d-flex w-100 justify-content-between">
						<h5 className="mb-1">Torneo de Catán</h5>
						<small className="text-muted">Creado hace 3 horas</small>
					</div>
					<p className="mb-1">Costo de inscripción $5.000, 3 partidas garantizadas</p>
					<small className="text-muted">Cafe de juegos de mesa "El Dado", 27/1/2023, 18:00Hrs</small>
				</a>
			</div>


		</div>
	);
};
