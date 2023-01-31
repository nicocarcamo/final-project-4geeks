
const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			message: null,
			eventCreatedMessage: null,
			events: [],
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

			login: async (formData, navigate) => {
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
							error: null
						})
						sessionStorage.setItem('currentUser', JSON.stringify(json))
						navigate('/perfil')
					} else {
						setStore({
							currentUser: null,
							error: json
						})
						if (sessionStorage.getItem('currentUser')) sessionStorage.removeItem('currentUser')
					}
				}
				catch (err) {
					console.error(err)
					setStore({ loginMessage: "Error logging in" });
				}
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

