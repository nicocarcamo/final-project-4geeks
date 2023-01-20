import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Inbox = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>INBOX!!</h1>
		</div>
	);
};
