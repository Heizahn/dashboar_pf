'use client';
import { useUserContext } from '@/components/context/user-context';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ButtonLogin() {
	const { isLoggedIn } = useUserContext();

	if (isLoggedIn)
		return (
			<Link
				href='/dashboard'
				className='flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base'
			>
				<span>Dashboard</span> <ArrowRightIcon className='w-5 md:w-6' />
			</Link>
		);
	else
		return (
			<Link
				href='/login'
				className='flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base'
			>
				<span>Iniciar sesión</span> <ArrowRightIcon className='w-5 md:w-6' />
			</Link>
		);
}
