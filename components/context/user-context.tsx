'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { DecodedToken } from '../lib/utils';
import jwt from 'jsonwebtoken';

import { IUser } from '../lib/definitions';

interface UserContextProps {
	user: IUser | null;
	isLoggedIn: boolean;
	setUser: (user: IUser | null) => void;
	setLoggedIn: (isLoggedIn: boolean) => void;
	login: (token: string) => void;
	logout: () => void;
}

const UserContext = createContext<UserContextProps>({
	user: null,
	isLoggedIn: false,
	setUser: () => {},
	setLoggedIn: () => {},
	login: () => {},
	logout: () => {},
});

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoggedIn, setLoggedIn] = useState(false);

	const login = (token: string) => {
		if (!token) return;

		localStorage.setItem('token', token);
		const user = DecodedToken(token);
		setUser(user);
		setLoggedIn(true);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setLoggedIn(false);
		setUser(null);
	};

	useEffect(() => {
		const token = localStorage.getItem('token') || '';
		if (token) {
			const decodedToken = jwt.decode(token) as jwt.JwtPayload;

			const TimeExp = decodedToken?.exp || 0;

			if (TimeExp * 1000 > Date.now()) {
				login(token);
			} else {
				logout();
			}
		}
	}, []);

	return (
		<UserContext.Provider
			value={{ user, isLoggedIn, setUser, setLoggedIn, login, logout }}
		>
			{children}
		</UserContext.Provider>
	);
}

export const useUserContext = () => useContext(UserContext);
