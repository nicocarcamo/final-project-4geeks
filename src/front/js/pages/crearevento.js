import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const CrearEvento = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>CREAREVENTO!!</h1>
		</div>
	);
};
