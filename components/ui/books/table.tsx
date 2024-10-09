import { UpdateBook, ViewBook } from '@/components/ui/books/buttons';
import { formatDate } from '@/components/lib/utils';
import { fetchFilteredBooks } from '@/components/lib/data';
import { IBook } from '@/components/lib/definitions';

export default async function BooksTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const books = await fetchFilteredBooks(query, currentPage);
	return (
		<div className='mt-6 flow-root'>
			<div className='inline-block min-w-full align-middle'>
				<div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
					<div className='md:hidden'>
						{books.map((book: IBook) => (
							<div
								key={book.book_id}
								className='mb-2 w-full rounded-md bg-white p-4'
							>
								<div className='flex items-center justify-between border-b pb-4'>
									<div>
										<div className='mb-2 flex items-center'>
											{book.title}
										</div>
										<p className='text-sm text-gray-500'>
											{book.description.substring(0, 100)}...
										</p>
									</div>
								</div>
								<div className='flex w-full items-center justify-between pt-4'>
									<div>
										<p className='text-xl font-medium'>{book.author}</p>
										<p>{book.publication_year}</p>
									</div>
									<div className='flex justify-end gap-2'>
										<UpdateBook id={book.book_id} />
									</div>
								</div>
							</div>
						))}
					</div>
					<table className='hidden min-w-full text-gray-900 md:table'>
						<thead className='rounded-lg text-left text-sm font-normal'>
							<tr>
								<th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
									Título
								</th>
								<th scope='col' className='px-3 py-5 font-medium'>
									Autor
								</th>
								<th scope='col' className='px-3 py-5 font-medium'>
									Año de publicación
								</th>
								<th scope='col' className='px-3 py-5 font-medium'>
									Fecha en la plataforma
								</th>

								<th scope='col' className='relative py-3 pl-6 pr-3'>
									<span className='sr-only'>Editar</span>
								</th>
							</tr>
						</thead>
						<tbody className='bg-white'>
							{books.map((book: IBook) => (
								<tr
									key={book.book_id}
									className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
								>
									<td className='whitespace-nowrap px-3 py-3'>
										<div className='flex items-center gap-3'>
											{book.title}
										</div>
									</td>
									<td className='whitespace-nowrap px-3 py-3'>
										{book.author}
									</td>
									<td className='whitespace-nowrap px-3 py-3'>
										{book.publication_year < 0
											? `${book.publication_year * -1} A.C`
											: book.publication_year}
									</td>
									<td className='whitespace-nowrap px-3 py-3 uppercase'>
										{formatDate(book.createdAt)}
									</td>

									<td className='whitespace-nowrap py-3 pl-6 pr-3'>
										<div className='flex justify-end gap-3'>
											<ViewBook id={book.book_id} />
											<UpdateBook id={book.book_id} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
