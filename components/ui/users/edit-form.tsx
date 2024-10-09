'use client';

import { PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { editUserSchema, IUserTable } from '@/components/lib/definitions';
import { API_URL } from '@/components/config/ENV';
import { useRouter } from 'next/navigation';

export default function EditBookForm({ user, isView }: { user: IUserTable; isView: boolean }) {
	const [photoUrl, setPhotoUrl] = useState<string>(user.photoUrl);
	const [errorImgUrl, setErrorImgUrl] = useState(false);
	const [isBanned, setIsBanned] = useState(user.isBanned);
	const router = useRouter();

	const handlerSubmit = async (values: IUserTable) => {
		const userEdit = {
			...values,
			isBanned,
			photoUrl,
		};

		if (JSON.stringify(userEdit) === JSON.stringify(user)) {
			const res = confirm(
				'No se han modificado los datos \n ¿Desea salir de la página?',
			);
			if (res) {
				return router.push('/dashboard/books');
			}

			return;
		}

		const token = localStorage.getItem('token') || '';
		const res = await fetch(`${API_URL}/users/${user.user_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`,
			},
			body: JSON.stringify(userEdit),
		});

		if (res.ok) {
			alert('Usuario editado correctamente');
			router.push('/dashboard/users/' + user.user_id);
		} else {
			alert('Error al guardar cambios');
		}
	};

	return (
		<Formik
			initialValues={user}
			validationSchema={() => {
				if (!photoUrl) {
					setErrorImgUrl(true);
				}

				return editUserSchema;
			}}
			onSubmit={handlerSubmit}
		>
			<Form>
				<div className='rounded-md bg-gray-50 p-4 md:p-6'>
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<div>
							{/* Image */}
							<div className='mb-4 '>
								<label className='mb-2 block text-sm font-medium'>
									Foto de Perfil
								</label>
								<div className='relative mt-2 rounded-xl border border-gray-200 py-2 md:px-10 text-sm outline-2'>
									<CldUploadWidget
										uploadPreset='portdas'
										onSuccess={({ info }) => {
											if (info)
												if (
													typeof info !== 'string' &&
													info.secure_url !== undefined
												) {
													setPhotoUrl(info.secure_url);

													setErrorImgUrl(false);
												}
										}}
									>
										{({ open }) => {
											return (
												<div
													className={`${
														!isView
															? 'grid grid-cols-1 place gap-6 md:grid-cols-2'
															: 'flex items-center justify-center'
													}`}
												>
													<div className='relative w-24 h-24 object-contain bg-white rounded-full'>
														<Image
															src={photoUrl}
															alt='Portada del libro'
															fill={true}
															priority={true}
															sizes='100'
															style={{
																objectFit: 'cover',
																objectPosition: 'center',
																borderRadius: '9999px',
															}}
														/>
													</div>
													{!isView && (
														<div className='flex items-center justify-center'>
															<button
																name='photoUrl'
																type='button'
																onClick={() => open()}
																className=' bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2'
															>
																<PhotoIcon className='h-6 w-6 ' />
																Cambiar Portada
															</button>
														</div>
													)}
												</div>
											);
										}}
									</CldUploadWidget>
									{errorImgUrl && (
										<p className='text-red-500 text-base mt-4'>
											La foto es requerida
										</p>
									)}
								</div>
							</div>
						</div>
						<div>
							{/* Corre Electronico */}
							<div>
								<label
									htmlFor='email'
									className='mb-2 block text-sm font-medium'
								>
									Corre electrónico
								</label>
								<Field
									disabled={isView}
									type='text'
									name='email'
									id='email'
									className=' block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500'
									placeholder='Ingrese el autor'
								/>
								<ErrorMessage
									name='email'
									component='p'
									className='text-red-500'
								/>
							</div>
							<div className='mt-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
								{/* Title */}
								<div className='mb-4'>
									<label
										htmlFor='name'
										className='mb-2 block text-sm font-medium'
									>
										Nombre
									</label>
									<Field
										disabled={isView}
										type='text'
										name='name'
										id='name'
										className=' block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500'
										placeholder='Ingrese el título'
									/>
									<ErrorMessage
										name='name'
										component='p'
										className='text-red-500'
									/>
								</div>
							</div>
						</div>

						{/* user Confirmed */}
						<div className=' mb-4 flex flex-col gap-4'>
							{/* Mail Confirmed */}
							<div className='flex flex-row items-center  justify-between w-fit'>
								<label
									htmlFor='isConfirmed'
									className=' text-sm font-medium flex items-center'
								>
									Correo confirmado
								</label>
								<p className='text-gray-500 ml-14'>
									{user.isConfirmed ? 'Si' : 'No'}
								</p>
							</div>
							{/* user Baneado */}
							<div className='flex flex-row items-center justify-between w-fit'>
								<label
									htmlFor='isBanned'
									className=' block text-sm font-medium'
								>
									{isView ? 'Usuario Baneado' : 'Banear Usuario'}
								</label>

								<div>
									{!isView ? (
										<div className='flex flex-row items-center gap-4 ml-20'>
											<p className='text-gray-500'>
												{user.isBanned ? 'Si' : 'No'}
											</p>
											<button
												className=''
												type='button'
												onClick={() => {
													const res = confirm(
														`¿Estás seguro de que quieres ${
															isBanned ? 'desbanear' : 'banear'
														} el usuario?`,
													);
													if (res) {
														setIsBanned(!isBanned);
													} else {
														return;
													}
												}}
											>
												{isBanned ? (
													<span className='rounded-md border px-2 py-1 bg-green-700 text-white'>
														Desbanear Usuario
													</span>
												) : (
													<span className='rounded-md border px-2 py-1 bg-red-700 text-white'>
														Banear Usuario
													</span>
												)}
											</button>
										</div>
									) : (
										<p className='text-gray-500 ml-16'>
											{user.isBanned ? 'Si' : 'No'}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex justify-end gap-4'>
					{!isView ? (
						<>
							<Link
								href={`/dashboard/users/${user.user_id}`}
								className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
							>
								Atrás
							</Link>
							<Button type='submit'>Guardar Cambios</Button>
						</>
					) : (
						<>
							<Link
								href={`/dashboard/users/`}
								className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
							>
								Atrás
							</Link>
							<Button type='button'>
								<Link href={`/dashboard/users/${user.user_id}/edit`}>
									Editar Usuario
								</Link>
							</Button>
						</>
					)}
				</div>
			</Form>
		</Formik>
	);
}
