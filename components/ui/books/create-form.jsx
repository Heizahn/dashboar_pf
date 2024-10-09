'use client';

import Link from 'next/link';
import { PhotoIcon, TagIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { createBookSchema } from '@/components/lib/definitions';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { API_URL } from '@/components/config/ENV';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CreateBookForm({ categories }) {
	const defaultImgUrl =
		'https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg';
	const [imgUrl, setImgUrl] = useState();
	const [errorImgUrl, setErrorImgUrl] = useState(false);
	const [categoriesSelected, setCategoriesSelected] = useState([]);
	const [errorCategories, setErrorCategories] = useState(false);
	const router = useRouter();

	const handlerSubmitBook = async (values) => {
		const token = localStorage.getItem('token') || '';
		const res = await fetch(`${API_URL}/books`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`,
			},
			body: JSON.stringify({
				title: values.title,
				author: values.author,
				publication_year: values.publication_year,
				description: values.description,
				categories: categoriesSelected,
				photoUrl: imgUrl,
			}),
		});

		if (res.ok) {
			alert('Libro subido correctamente');
			router.push('/dashboard/books');
		} else {
			alert('Error al subir libro');
		}
	};

	return (
		<Formik
			initialValues={{
				title: '',
				author: '',
				publication_year: '',
				description: '',
				categories: [],
				frontPage: '',
			}}
			validationSchema={() => {
				if (!imgUrl) {
					setErrorImgUrl(true);
				}

				if (categoriesSelected.length === 0) {
					setErrorCategories(true);
				}
				return createBookSchema;
			}}
			onSubmit={handlerSubmitBook}
		>
			<Form>
				<div className='rounded-md bg-gray-100 p-4 md:p-6'>
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<div className='mb-4'>
							<label htmlFor='title' className='mb-2 block text-sm font-medium'>
								Titulo
							</label>
							<div className='relative mt-2 rounded-md'>
								<div className='relative'>
									<Field
										id='title'
										name='title'
										type='text'
										placeholder='Don Quijote de la Mancha'
										className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
									/>
									<ErrorMessage
										name='title'
										component='p'
										className='text-red-500'
									/>
								</div>
							</div>
						</div>
						<div className='mb-4'>
							<label htmlFor='author' className='mb-2 block text-sm font-medium'>
								Autor
							</label>
							<div className='relative mt-2 rounded-md'>
								<div className='relative'>
									<Field
										id='author'
										name='author'
										type='text'
										placeholder='Miguel de Cervantes'
										className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
									/>
									<ErrorMessage
										name='author'
										component='p'
										className='text-red-500'
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<div className='mb-4 row-span-2 '>
							<label
								htmlFor='description'
								className='mb-2 block text-sm font-medium'
							>
								Portada del libro
							</label>
							<div className='relative mt-2 rounded-md border border-gray-200 py-2 md:px-10 text-sm outline-2 w-full h-full flex flex-col justify-center items-center '>
								<CldUploadWidget
									uploadPreset='portdas'
									onSuccess={(event) => {
										setImgUrl(event.info.secure_url);
										setErrorImgUrl(false);
									}}
								>
									{({ open }) => {
										return (
											<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
												<div className='relative w-52 h-72 object-contain bg-white rounded-md'>
													<Image
														src={imgUrl || defaultImgUrl}
														alt='Portada del libro'
														fill={true}
														priority={true}
														sizes='100'
														style={{
															objectFit: 'fill',
															objectPosition: 'center',
															borderRadius: '0.375rem',
														}}
													/>
												</div>
												<div className='flex items-center justify-center'>
													<button
														className=' bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2'
														type='button'
														onClick={() => open()}
													>
														<PhotoIcon className='h-6 w-6 ' />
														Subir Portada
													</button>
												</div>
											</div>
										);
									}}
								</CldUploadWidget>
								{errorImgUrl && (
									<p className='text-red-500 text-base mt-4'>
										La portada es requerida
									</p>
								)}
							</div>
						</div>
						<div>
							<div className='mb-4'>
								<label
									htmlFor='description'
									className='mb-2 block text-sm font-medium'
								>
									Descripción
								</label>
								<div className='relative mt-2 rounded-md'>
									<div className='relative'>
										<Field
											as='textarea'
											id='description'
											name='description'
											placeholder='Libro de la vida de Don Quijote de la Mancha, escrito por Miguel de Cervantes, publicado en 1605. El libro es considerado uno de los primeros libros de ficción de la literatura española. Fue escrito en el siglo XVI y es considerado una de las obras más importantes de la literatura española. Es muy popular entre los lectores, escritores y en la educación de la lengua española como una obra de referencia para el aprendizaje de la gramática y la sintaxis.'
											className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 resize-none'
											rows={6}
										/>
										<ErrorMessage
											name='description'
											component='p'
											className='text-red-500'
										/>
									</div>
								</div>
							</div>

							<div className='mb-4'>
								<label
									htmlFor='publication_year'
									className='mb-2 block text-sm font-medium'
								>
									Año de publicación
								</label>
								<div className='relative mt-2 rounded-md'>
									<div className='relative'>
										<Field
											as='input'
											type='number'
											id='publication_year'
											name='publication_year'
											placeholder='2022'
											className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
											min={-10000}
											max={new Date().getFullYear()}
										/>
										<ErrorMessage
											name='publication_year'
											component='p'
											className='text-red-500'
										/>
									</div>
								</div>
							</div>

							<div className='mb-4'>
								<label
									htmlFor='customer'
									className='mb-2 block text-sm font-medium'
								>
									Categoría
								</label>
								<div className='relative'>
									<Field
										as='select'
										id='category'
										name='category'
										className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500'
										defaultValue=''
										onChange={(e) => {
											const res = categoriesSelected.some(
												(category) =>
													category.id === Number(e.target.value),
											);
											if (res) {
												alert('La categoría ya ha sido seleccionada');
												e.target.value = '';
												return;
											}
											setCategoriesSelected([
												...categoriesSelected,
												categories.filter(
													(category) =>
														category.id === Number(e.target.value),
												)[0],
											]);
											setErrorCategories(false);

											e.target.value = '';
										}}
									>
										<option value='' disabled>
											Seleccione una categoría
										</option>
										{categories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.name}
											</option>
										))}
									</Field>
									<TagIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
								</div>
								{errorCategories && (
									<p className='text-red-500 text-base'>
										Al menos una categoría es requerida
									</p>
								)}
								<div className='flex flex-wrap gap-4 mt-3'>
									{categoriesSelected.map((category) => (
										<div
											key={category.id}
											className='bg-white px-4 py-2 rounded-lg '
										>
											<p>{category.name}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex justify-end gap-4'>
					<Link
						href='/dashboard/books'
						className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
					>
						Cancelar
					</Link>
					<Button type='submit'>Subir Libro</Button>
				</div>
			</Form>
		</Formik>
	);
}
