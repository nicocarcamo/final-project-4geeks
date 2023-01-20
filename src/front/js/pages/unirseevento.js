import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const UnirseEvento = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>UNIRSEEVENTO!!</h1>

		</div>
	);
};
