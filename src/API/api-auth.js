import axios from 'axios';

const { REACT_APP_API_BASE_URL: baseURL } = process.env;

// importamos un cliente que vamos a utilizar para hacer las peticiones a nuestro end points
const client = axios.create({
	baseURL
	// baseURL: process.env.REACT_APP_API_BASE_URL,
});

const setAuthorizationHeader = (token) => {
	client.defaults.headers.common[
		'Authorization'
	] = `Bearer ${token}`;
};

// const removeAuthorizationHeader = (token) => {
// 	delete client.defaults.headers.common['Authorization'];
// };

client.login = (credentials) =>
	client.post('/auth/signin/', credentials).then((auth) => {
		setAuthorizationHeader(auth.token);
		return auth;
	});

const signin = async (user) => {
	try {
		let response = await fetch('/auth/signin/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(user)
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

const signout = async () => {
	try {
		let response = await fetch('/auth/signout/', {
			method: 'GET'
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

export { signin, signout };
