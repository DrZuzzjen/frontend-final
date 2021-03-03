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

client.login = (user) =>
	client.post('/auth/signin/', user).then((data) => {
		console.log(user);
		setAuthorizationHeader(data.token);
		return data;
	});

const signin = (user) =>
	client.login(user).then((data) => {
		return data;
	});

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
