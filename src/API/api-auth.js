import client from './client';

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
