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
				console.log("Error, no se puede crear evento", error);
			}
	}
	}}
};

  export default getState;