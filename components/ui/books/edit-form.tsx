'use client';

import { PhotoIcon, TagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IBook, ICategory, ValuesFormBook } from '@/components/lib/definitions';
import { useState } from 'react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createBookSchema } from '@/components/lib/definitions';
import { API_URL } from '@/components/config/ENV';
import { useRouter } from 'next/navigation';

export default function EditBookForm({
	book,
	categories,
	isView,
}: {
	book: IBook;
	categories: ICategory[];
	isView: boolean;
}) {
	const [photoUrl, setPhotoUrl] = useState<string>(book.photoUrl);
	const [categoriesSelected, setCategoriesSelected] = useState<ICategory[]>(book.categories);
	const [errorImgUrl, setErrorImgUrl] = useState(false);
	const [errorCategories, setErrorCategories] = useState(false);
	const router = useRouter();

	const handlerSubmitBook = async (values: ValuesFormBook) => {
		const bookEdith = {
			...values,
			categories: categoriesSelected.map((category) => {
				return { id: category.id };
			}),
			photoUrl,
		};

		if (JSON.stringify(bookEdith) === JSON.stringify(book)) {
			const res = confirm(
				'No se han modificado los datos \n ¿Desea salir de la página?',
			);
			if (res) {
				return router.push('/dashboard/books');
			}

			return;
		}

		const token = localStorage.getItem('token') || '';

		const res = await fetch(`${API_URL}/books/${book.book_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`,
			},
			body: JSON.stringify(bookEdith),
		});

		if (res.ok) {
			alert('Libro editado correctamente');
			router.push('/dashboard/books/' + book.book_id);
		} else {
			alert('Error al editar libro');
		}
	};

	return (
		<Formik
			initialValues={{
				title: book.title,
				author: book.author,
				publication_year: book.publication_year,
				description: book.description,
			}}
			validationSchema={() => {
				if (!photoUrl) {
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
				<div className='rounded-md bg-gray-50 p-4 md:p-6'>
					<div className='mb-4'>
						<label htmlFor='customer' className='mb-2 block text-sm font-medium'>
							Categoría
						</label>
						{!isView && (
							<div className='relative'>
								<select
									id='category'
									name='category'
									className=' block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500'
									defaultValue=''
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
												(category: ICategory) =>
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
									{categories.map((category: ICategory) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
								<TagIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
							</div>
						)}
						<div className='flex flex-wrap gap-4 mt-3'>
							{categoriesSelected.map((category: ICategory) => (
								<div
									key={category.id}
									className={` ${
										isView
											? 'bg-gray-50 px-4 py-2 border border-gray-200 rounded-lg'
											: 'bg-white px-4 py-2 rounded-lg'
									}`}
								>
									<button
										type='button'
										disabled={isView}
										onClick={() => {
											setCategoriesSelected(
												categoriesSelected.filter(
													(cate) => cate.id !== category.id,
												),
											);

											if (categoriesSelected.length === 1) {
												setErrorCategories(true);
											}
										}}
									>
										{category.name}
									</button>
								</div>
							))}
						</div>
						{errorCategories && (
							<p className='text-red-500 text-base'>
								Al menos una categoría es requerida
							</p>
						)}
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<div>
							{/* Title */}
							<div className='mb-4'>
								<label
									htmlFor='title'
									className='mb-2 block text-sm font-medium'
								>
									Título
								</label>
								<Field
									disabled={isView}
									type='text'
									name='title'
									id='title'
									className=' block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500'
									placeholder='Ingrese el título'
								/>
								<ErrorMessage
									name='title'
									component='p'
									className='text-red-500'
								/>
							</div>
							<div className='mt-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
								{/* Author */}
								<div>
									<label
										htmlFor='author'
										className='mb-2 block text-sm font-medium'
									>
										Autor
									</label>
									<Field
										disabled={isView}
										type='text'
										name='author'
										id='author'
										className=' block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500'
										placeholder='Ingrese el autor'
									/>
									<ErrorMessage
										name='author'
										component='p'
										className='text-red-500'
									/>
								</div>

								{/* Publication Year */}
								<div className='mb-4'>
									<label
										htmlFor='publication_year'
										className='mb-2 block text-sm font-medium'
									>
										Año de publicación
									</label>
									<Field
										disabled={isView}
										type='text'
										name='publication_year'
										id='publication_year'
										className=' block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500'
										placeholder='Ingrese el año de publicación'
									/>
									<ErrorMessage
										name='publication_year'
										component='p'
										className='text-red-500'
									/>
								</div>
							</div>
							{/* Description */}
							<div className='mb-4'>
								<label
									htmlFor='description'
									className='mb-2 block text-sm font-medium'
								>
									Descripción
								</label>
								<Field
									disabled={isView}
									as='textarea'
									name='description'
									id='description'
									className='resize-none  block w-full rounded-md border border-gray-200 py-4 px-10 text-sm placeholder:text-gray-500'
									rows={6}
									placeholder='Ingrese la descripción'
								/>
								<ErrorMessage
									name='description'
									component='p'
									className='text-red-500'
								/>
							</div>
						</div>

						{/* Image */}
						<div className='mb-4 '>
							<label className='mb-2 block text-sm font-medium'>
								Portada del libro
							</label>
							<div className='relative mt-2 rounded-md border border-gray-200 py-2 md:px-10 text-sm outline-2 w-full h-full flex flex-col justify-center items-center '>
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
														? 'grid grid-cols-1 gap-6 md:grid-cols-2'
														: 'flex items-center justify-center'
												}`}
											>
												<div className='relative w-52 h-72 object-contain bg-white rounded-md'>
													<Image
														src={photoUrl}
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
												{!isView && (
													<div className='flex items-center justify-center'>
														<button
															className=' bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2'
															type='button'
															onClick={() => open()}
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
										La portada es requerida
									</p>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex justify-end gap-4'>
					{!isView ? (
						<>
							<Link
								href={`/dashboard/books/${book.book_id}`}
								className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
							>
								Cancelar
							</Link>
							<Button type='submit'>Guardar Cambios</Button>
						</>
					) : (
						<>
							<Link
								href={`/dashboard/books/`}
								className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
							>
								Atrás
							</Link>
							<Button type='button'>
								<Link href={`/dashboard/books/${book.book_id}/edit`}>
									Editar Libro
								</Link>
							</Button>
						</>
					)}
				</div>
			</Form>
		</Formik>
	);
}
