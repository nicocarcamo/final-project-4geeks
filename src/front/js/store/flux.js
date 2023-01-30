
const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			message: null,
			eventCreatedMessage: null,
			events: [],
			loginMessage: null,
			isLoggedIn: false,
		},

		actions: {
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getEvents: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/crearevento", {
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					})
					const data = await resp.json()
					setStore({ events: data })
					return data;
				} catch (error) {
					console.log("Error loading events from backend", error)
				}
			},
			createEvent: async (formData) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/crearevento`, {
						method: "POST",
						body: JSON.stringify(formData),
						headers: {
							"Content-Type": "application/json"
						}
					});
					const json = await res.json();
					setStore({ event: json, eventCreatedMessage: "Event created successfully!" });
				} catch (err) {
					setStore({ message: err.response && err.response.data.message });
				}
			},
			login: async (formData) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/login`, {
					  method: "POST",
					  body: JSON.stringify(formData),
					  headers: {
						"Content-Type": "application/json"
					  }
					});
					const json = await res.json();
					if (json.status === 'success') {
					  setStore({ loginMessage: "Logged in successfully!" });
					} else {
					  setStore({ loginMessage: "Incorrect email/password" });
					}
				  } catch (err) {
					setStore({ loginMessage: "Error logging in" });
				  }
			}
		}
	};
};

export default getState;

