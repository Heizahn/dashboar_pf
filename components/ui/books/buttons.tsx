import { EyeIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { deleteInvoice } from '@/app/lib/actions/actions';

export function CreateBook() {
	return (
		<Link
			href='/dashboard/books/create'
			className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
		>
			<span className='hidden md:block'>Subir Libro</span>{' '}
			<PlusIcon className='h-5 md:ml-4' />
		</Link>
	);
}

export function UpdateBook({ id }: { id: number }) {
	return (
		<Link
			href={`/dashboard/books/${id}/edit`}
			className='rounded-md border p-2 hover:bg-gray-100'
		>
			<PencilIcon className='w-5' />
		</Link>
	);
}

export function ViewBook({ id }: { id: number }) {
	return (
		<Link
			href={`/dashboard/books/${id}`}
			className='rounded-md border p-2 hover:bg-gray-100'
		>
			<EyeIcon className='w-5' />
		</Link>
	);
}
