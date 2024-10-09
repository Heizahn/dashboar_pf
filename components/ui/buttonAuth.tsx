'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ButtonAuth() {
	const [pending, setPending] = useState<boolean>(false);
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === 'loading') {
		setPending(true);
	}

	if (session) {
		router.replace('/dashboard');
		return;
	}

	return (
		<button
			onClick={() => signIn()}
			className={clsx(
				'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
				'w-full flex justify-center items-center mt-4',
			)}
			aria-disabled={pending}
		>
			<span className='flex h-10 items-center justify-center gap-2'>
				Iniciar sesión <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
			</span>
		</button>
	);
}
