import { API_URL } from '../config/ENV';
import jwt from 'jsonwebtoken';
import { IUser } from './definitions';

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export const authenticate = async (values: { email: string; password: string }) => {
	const response = await fetch('/api/auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	});

	if (response.ok) {
		const data = await response.json();
		return data.token;
	}

	throw new Error('Usuario o contraseña incorrectos');
};

export function DecodedToken(token: string) {
	const decodedToken = jwt.decode(token) as jwt.JwtPayload;

	const user: IUser = {
		userId: decodedToken?.id,
		fullName: decodedToken?.name,
		email: decodedToken?.email,
		photoUrl: decodedToken?.photoUrl,
		isAdmin: decodedToken?.isAdmin,
		token,
	};

	return user;
}

export async function getDataGraph(token: string) {
	const response = await fetch(`${API_URL}/admin/graph`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();

	return data;
}

export function formatDate(date: string) {
	const dateObj = new Date(date);
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};
	const formatter = new Intl.DateTimeFormat('es-ES', options);
	return formatter.format(dateObj);
}
