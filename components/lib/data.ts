import { unstable_noStore as noStore } from 'next/cache';
import { API_URL } from '../config/ENV';
import { cookies } from 'next/headers';

const ITEMS_PER_PAGE = 10;

export async function fetchTotalPageBooks(query: string) {
	noStore();
	const cookiesStore = cookies();
	const token = cookiesStore.get('token')?.value;
	const data = await fetch(`${API_URL}/books/total?title=${query}&author=${query}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	const total = await data.json();
	const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
	return totalPages;
}

export async function fetchFilteredBooks(query: string, currentPage: number) {
	noStore();
	const cookiesStore = cookies();
	const token = cookiesStore.get('token')?.value;

	const data = await fetch(
		`${API_URL}/books/filter?title=${query}&author=${query}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		},
	);
	const books = await data.json();
	return books;
}

export async function fetchGetCategories() {
	noStore();
	const cookiesStore = cookies();

	const token = cookiesStore.get('token')?.value;
	const data = await fetch(`${API_URL}/categories`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const categories = await data.json();
	return categories;
}

export async function fetchGetBookById(id: string) {
	noStore();
	const cookiesStore = cookies();

	const token = cookiesStore.get('token')?.value;

	const data = await fetch(`${API_URL}/books/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	const book = await data.json();
	return book;
}

export async function fetchTotalUsers() {
	noStore();

	const cookiesStore = cookies();
	const token = cookiesStore.get('token')?.value;
	const data = await fetch(`${API_URL}/users/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	const total = await data.json();
	const totalPages = Math.ceil(total.length / ITEMS_PER_PAGE);
	return totalPages;
}

export async function fetchFilteredUsers(query: string, currentPage: number) {
	noStore();
	const cookiesStore = cookies();
	const token = cookiesStore.get('token')?.value;
	const data = await fetch(
		`${API_URL}/users/search?name=${query}&email=${query}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		},
	);
	const users = await data.json();

	return users;
}

export async function fetchGetUserById(id: string) {
	noStore();
	const cookiesStore = cookies();

	const token = cookiesStore.get('token')?.value;

	const data = await fetch(`${API_URL}/users/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const user = await data.json();
	return user;
}
