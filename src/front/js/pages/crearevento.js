import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const CrearEvento = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Crea Tu Evento</h1>
				<div className="w-75 m-auto">
					<form className="row g-3">
						<div className="col-md-6">
							<label htmlFor="inputEmail4" className="form-label">
								Nombre Evento
							</label>
							<input type="text" className="form-control" id="inputEmail4" />
						</div>
						<div className="col-md-6">
							<label htmlFor="inputPassword4" className="form-label">
								Fecha
							</label>
							<input type="password" className="form-control" id="inputPassword4" />
						</div>
						<div className="col-12">
							<label htmlFor="inputAddress" className="form-label">
								Lugar
							</label>
							<input
								type="text"
								className="form-control"
								id="inputAddress"
								placeholder="1234 Main St"
							/>
						</div>
						<div className="col-md-6">
							<label htmlFor="inputCity" className="form-label">
								Hora
							</label>
							<input type="text" className="form-control" id="inputCity" />
						</div>
						<div className="col-md-4">
							<label htmlFor="inputState" className="form-label">
								State
							</label>
							<input type="text" className="form-control" id="inputCity" />
						</div>
						<div className="col-md-2">
							<label htmlFor="inputZip" className="form-label">
								Zip
							</label>
							<input type="text" className="form-control" id="inputZip" />
						</div>
						<div className="col-12">
							<button type="submit" className="btn btn-primary">
								Crear Evento
							</button>
						</div>
					</form>
				</div>

		</div>
	);
};
