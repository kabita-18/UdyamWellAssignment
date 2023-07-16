import React, { useState, useEffect, createContext } from 'react';
import { isAuthenticated } from '../utils';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [ currentUser, setCurrentUser ] = useState(undefined);

	useEffect(() => {
		const checkLoggedIn = async () => {
			let cuser = isAuthenticated();
			if (cuser === null) {
				localStorage.setItem('user', '');
				cuser = '';
			}

			setCurrentUser(cuser);
		};

		checkLoggedIn();
	}, []);

	

	return (
		<UserContext.Provider value={[currentUser, setCurrentUser]}>
			{children}
		</UserContext.Provider>
	);
};


export default UserContext;