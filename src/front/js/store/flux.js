
const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			message: null,
			eventCreatedMessage: null,
			events: [],
			event: "",
			loginMessage: null,
			registerMessage: null,
			currentUser: null,
			email: '',
			username: '',
			firstname: '',
			lastname: '',
			password: '',
			perfil: null,
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
			createEvent: async (formData, navigate, setMessage) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/crearevento`, {
						method: "POST",
						body: JSON.stringify(formData),
						headers: {
							"Content-Type": "application/json"
						}
					});
					const json = await res.json();
					setMessage("Event created successfully!" );
					navigate('/unirseevento')
				} catch (err) {
					setMessage("Error creating event.");
				}
			},

			getEventById: async (eventId) => {
				return (dispatch) => {
					dispatch({ type: 'FETCH_EVENT_START' });	
					return fetch(`${process.env.BACKEND_URL}/crearevento/${eventId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					})
					.then((response) => {
						if (!response.ok) {
						throw Error(response.statusText);
						}
						return response.json();
					})
					.then((data) => {
						dispatch({ type: 'FETCH_EVENT_SUCCESS', payload: data });
					})
					.catch((error) => {
						dispatch({ type: 'FETCH_EVENT_ERROR', payload: error });
					});
				};
			},
							

			register: async (formData, navigate, setMessage) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/register`, {
					  method: "POST",
					  body: JSON.stringify(formData),
					  headers: {
						"Content-Type": "application/json"
					  }
					});
					const json = await res.json();
					setMessage("User created successfully, please log in!");
					console.log("User created successfully!")
					navigate('/login')
				  } catch (err) {
					setMessage("Username/email already exists");
				  }
			},

			login: async (formData, navigate, setMessage) => {
				const { currentUser } = getStore();
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						body: JSON.stringify(formData),
						headers: {
							"Content-Type": "application/json"
						}
					});
					const json = await res.json();
					if (json.status == 'success') {
						setStore({
							currentUser: json,
							email: '',
							password: '',
							error: null,
							isAuthenticated: true
						})
						sessionStorage.setItem('currentUser', JSON.stringify(json))
						navigate('/perfil')
					} else {
						setMessage("Username/Password Incorrect.")
						setStore({
							currentUser: null,
							error: json,
							isAuthenticated: false
						})
						if (sessionStorage.getItem('currentUser')) sessionStorage.removeItem('currentUser')
					}
				}
				catch (err) {
					console.error(err)
					setStore({ loginMessage: "Error logging in", isAuthenticated: false });
				}
			},

			logout: () => {
                setStore({
                    currentUser: null
                })
                sessionStorage.removeItem('currentUser');
            },

			getCurrentUser: async () => {
				const jwtToken = localStorage.getItem("jwtToken");
				const { currentUser } = getStore();

				try {
					const res = await fetch(
						`${process.env.BACKEND_URL}/api/currentuser`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								"Authorization": `Bearer ${currentUser?.access_token}`
							},
						}
					);
					const json = await res.json();
					setStore({ events: data.filter((event) => event.createdBy === currentUser._id) });
					return data;
				} catch (err) {
					console.log("Error getting current user", err);
				}
			},

			
			getProfile: () => {
				const { currentUser } = getStore();

				fetch(`${process.env.BACKEND_URL}/api/perfil`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${currentUser?.access_token}`
					}

				})
					.then(response => response.json())
					.then(data => {
						setStore({
							profile: data
						})

					})
			},
		}
	};
};

export default getState;

