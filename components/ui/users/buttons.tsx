'use client';

import { API_URL } from '@/components/config/ENV';
import {
	EyeIcon,
	PencilIcon,
	XCircleIcon,
	CheckCircleIcon,
	UserPlusIcon,
	UserMinusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { deleteInvoice } from '@/app/lib/actions/actions';

export function ViewUser({ id }: { id: number }) {
	return (
		<Link
			href={`/dashboard/users/${id}`}
			className='rounded-md border p-2 hover:bg-gray-100 '
		>
			<EyeIcon className='w-6' />
		</Link>
	);
}

export function UpdateUser({ id }: { id: number }) {
	return (
		<Link
			href={`/dashboard/users/${id}/edit`}
			className='rounded-md border p-2 hover:bg-gray-100'
		>
			<PencilIcon className='w-6' />
		</Link>
	);
}

export function BanedUser({ id, isBanned }: { id: number; isBanned: boolean }) {
	const router = useRouter();
	const handlerBanedUser = async () => {
		const res = confirm(`¿Estás seguro de que quieres banear a este usuario?`);

		if (!res) return null;
		const token = localStorage.getItem('token') || '';
		const response = await fetch(`${API_URL}/users/${id}/toggle-ban`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`,
			},
		});

		if (!response.ok) return alert('Error al banear el usuario');
		alert('Usuario baneado correctamente');
		return router.refresh();
	};

	return (
		<button className='rounded-md border p-2 hover:bg-gray-100' onClick={handlerBanedUser}>
			{isBanned ? <CheckCircleIcon className='w-6' /> : <XCircleIcon className='w-6' />}
		</button>
	);
}

export function AdminUser({ id, isAdmin }: { id: number; isAdmin: boolean }) {
	const router = useRouter();
	const handlerAdminUser = async () => {
		const res = confirm(`¿Estás seguro de que quieres dar admin a este usuario?`);

		if (!res) return null;
		const token = localStorage.getItem('token') || '';
		const response = await fetch(`${API_URL}/users/${id}/toggle-admin`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`,
			},
		});

		if (!response.ok) return alert('Error al dar admin a este usuario');
		alert('Usuario admin correctamente');
		return router.refresh();
	};

	return (
		<button
			type='button'
			className='rounded-md border p-2 hover:bg-gray-100'
			onClick={handlerAdminUser}
		>
			{!isAdmin ? <UserPlusIcon className='w-6' /> : <UserMinusIcon className='w-6' />}
		</button>
	);
}
