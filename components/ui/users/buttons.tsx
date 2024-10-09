'use client';
import { EyeIcon, PencilIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { deleteInvoice } from '@/app/lib/actions/actions';

export function ViewUser({ id }: { id: number }) {
	return (
		<Link
			href={`/dashboard/users/${id}`}
			className='rounded-md border p-2 hover:bg-gray-100'
		>
			<EyeIcon className='w-5' />
		</Link>
	);
}

export function UpdateUser({ id }: { id: number }) {
	return (
		<Link
			href={`/dashboard/users/${id}/edit`}
			className='rounded-md border p-2 hover:bg-gray-100'
		>
			<PencilIcon className='w-5' />
		</Link>
	);
}

export function BanedUser({ id }: { id: number }) {
	return (
		<button
			className='rounded-md border p-2 hover:bg-gray-100'
			onClick={() => alert(`EL usuario con el id: ${id} \n a sido baneado`)}
		>
			<XCircleIcon className='w-5' />
		</button>
	);
}
