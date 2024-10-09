'use client';

import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { authenticate } from '@/components/lib/utils';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/user-context';

const loginSchema = yup.object({
	email: yup.string().email('Correo inválido').required('Correo es requerido'),
	password: yup.string().required('Contraseña es requerida'),
});

export default function LoginForm() {
	const [pending, setPending] = useState<boolean>(false);
	const router = useRouter();
	const { login } = useUserContext();

	const onSubmit = async (value: { email: string; password: string }) => {
		try {
			const response = await authenticate(value);

			login(response);

			router.replace('/dashboard');
		} catch (error) {
			if (error instanceof Error) alert(error.message);
		}
	};
	return (
		<Formik
			validationSchema={loginSchema}
			initialValues={{ email: '', password: '' }}
			onSubmit={(value) => {
				onSubmit(value);
				setPending(true);
			}}
		>
			<Form className='space-y-3'>
				<div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
					<h1 className='mb-3 text-2xl'>Inicio de sesión.</h1>
					<div className='w-full'>
						<div>
							<label
								className='mb-3 mt-5 block text-xs font-medium text-gray-900'
								htmlFor='email'
							>
								Correo
							</label>
							<div className='relative'>
								<Field
									className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
									id='email'
									type='email'
									name='email'
									placeholder='Ingrese su correo'
									required
								/>
								<AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
							</div>
							<ErrorMessage
								name='email'
								component='p'
								className='text-red-500'
							/>
						</div>
						<div className='mt-4'>
							<label
								className='mb-3 mt-5 block text-xs font-medium text-gray-900'
								htmlFor='password'
							>
								Contraseña
							</label>
							<div className='relative'>
								<Field
									className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
									id='password'
									type='password'
									name='password'
									placeholder='Ingresa la contraseña'
									required
									minLength={6}
								/>
								<KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
							</div>
							<ErrorMessage
								name='password'
								component='p'
								className='text-red-500'
							/>
						</div>
					</div>
					<LoginButton pending={pending} />
					<div className='flex h-8 items-end space-x-1'>
						{/* Add form errors here */}
						<div
							className='flex h-8 items-end space-x-1'
							aria-live='polite'
							aria-atomic='true'
						></div>
					</div>
				</div>
			</Form>
		</Formik>
	);
}

function LoginButton({ pending }: { pending: boolean }) {
	return (
		<Button type='submit' className='mt-4 w-full' aria-disabled={pending}>
			Iniciar sesión <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
		</Button>
	);
}
