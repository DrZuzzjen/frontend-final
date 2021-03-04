// importamos la libreria de axios
import axios from 'axios';

// Destructuring
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

const removeAuthorizationHeader = (token) => {
	delete client.defaults.headers.common['Authorization'];
};

// this methods

client.login = (user) =>
	client.post('/auth/signin', user).then((data) => {
		console.log(user);
		setAuthorizationHeader(data.token);
		return data;
	});

client.logout = () =>
	new Promise((resolve) => {
		removeAuthorizationHeader();
		resolve();
	});

client.create = () =>
	new Promise((resolve) => {
		removeAuthorizationHeader();
		resolve();
	});

export const configuraClient = (accessToken) => {
	if (accessToken) {
		setAuthorizationHeader(accessToken);
	}
};

client.interceptors.response.use(
	(response) => response.data,
	(error) => {
		if (!error.response) {
			return Promise.reject({ message: error.message });
		}
		return Promise.reject({
			message: error.response.statusText,
			...error.response.data
		});
	}
);

export default client;

// import client from './client';

// const signin = (user) =>
// 	client
// 		.login(user)
// 		.then((data) => {
// 			return data;
// 		})
// 		.catch((e) => {
// 			console.log(e);
// 		});
