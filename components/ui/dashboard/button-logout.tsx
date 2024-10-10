'use client';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useUserContext } from '@/components/context/user-context';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ButtonLogout() {
	const { logout } = useUserContext();
	const router = useRouter();

	const handlerLogout = () => {
		fetch('/api/auth/logout', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				logout();
				router.push('/');
				toast.success(data.message);
			});
	};
	return (
		<button
			className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
			type='button'
			onClick={handlerLogout}
		>
			<PowerIcon className='w-6' />
			<div className='hidden md:block'>Cerrar sesión</div>
		</button>
	);
}
