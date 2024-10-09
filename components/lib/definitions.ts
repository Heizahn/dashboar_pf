// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
import * as yup from 'yup';

export interface IUser {
	userId: number;
	fullName: string;
	email: string;
	photoUrl: string;
	isAdmin: boolean;
	token?: string;
	isConfirmed?: boolean;
	isBanned?: boolean;
}

export interface IUserTable {
	photoUrl: string;
	user_id: number;
	name: string;
	email: string;
	registration_date: string;
	isConfirmed: boolean;
	isBanned: boolean;
}

export interface IBookDTO {
	title: string;
	author: string;
	publication_year: number;
	description: string;
	categories: ICategory[];
	photoUrl: string;
}

export interface ValuesFormBook {
	title: string;
	author: string;
	publication_year: number;
	description: string;
}

export interface IBook extends IBookDTO {
	book_id: number;
	createdAt: string;
}

export interface ICategory {
	id: number;
	name?: string;
}

export const createBookSchema = yup.object({
	title: yup.string().required('Título es requerido'),
	author: yup.string().required('Autor es requerido'),
	publication_year: yup
		.number()
		.min(-10000)
		.max(new Date().getFullYear())
		.required('Año de publicación es requerido'),
	description: yup.string().required('Descripción es requerido'),
	categories: yup.array(),
});

export const editUserSchema = yup.object({
	email: yup.string().email().required('Correo no puede estar en blanco'),
	name: yup.string().required('EL nombre no puede estar en blanco'),
	isBanned: yup.boolean(),
});
