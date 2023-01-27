const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		eventos: [],
	},

		actions: 
		{
			getEvento: async (evento) => {
			try {
				const resp = await fetch(
				process.env.BACKEND_URL + "/api/crearevento",
				{
					method: "GET",
					body: JSON.stringify(evento),
					headers: {
					"Content-Type": "application/json",
					},
				}
				);
	
				const data = await resp.json();
				setStore((store) => {
				store.eventos.push(data);
	
				return store;
				});
			} catch (error) {
				console.log("Error creating event", error);
			}
	}
	}}
};

  export default getState;