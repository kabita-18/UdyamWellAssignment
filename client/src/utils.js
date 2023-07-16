import { loginUser, signupUser } from './api';

export const login = async (userData, setCurrentUser) => {
	const response = await loginUser(userData);

	const token = response.data.token;
	if (token) {
		localStorage.setItem('user', JSON.stringify(response.data));
		setCurrentUser(response.data)
	}

	return response.data;
};

export const signup = async (userData, setCurrentUser) => {
	const response = await signupUser(userData);
	const token = response.data.token;
	if (token) {
		localStorage.setItem('user', JSON.stringify(response.data));
		setCurrentUser(response.data)
	}
	return response.data;
};
export const isAuthenticated = () => {
	const user = localStorage.getItem('user');
	if (!user) {
		return undefined
	}
	return JSON.parse(user);
};