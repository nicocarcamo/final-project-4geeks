import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>LOGIN!!</h1>
	
		</div>
	);
};
