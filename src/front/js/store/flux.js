const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		eventos: [],
		crearEvento: async (evento) => {
		  try {
			const resp = await fetch(
			  process.env.BACKEND_URL + "/api/crearevento",
			  {
				method: "POST",
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
		},
		unirseEvento: async (eventoId) => {
		  try {
			const resp = await fetch(
			  process.env.BACKEND_URL + `/api/unirseevento/${eventoId}`,
			  {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
			  }
			);
			const data = await resp.json();
			setStore((store) => {
			  store.eventos = store.eventos.map((evento) => {
				if (evento.id === eventoId) {
				  evento.integrantes = data.integrantes;
				}
				return evento;
			  });
			  return store;
			});
		  } catch (error) {
			console.log("Error joining event", error);
		  }
		},
	  },
	};
  };
  
  export default getState;