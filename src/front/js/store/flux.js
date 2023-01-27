const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			eventos: []

		},
		actions: {
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
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			}

		}
	};
};

export default getState;
