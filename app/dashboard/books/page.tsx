import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import Table from '@/components/ui/books/table';
import { CreateBook } from '@/components/ui/books/buttons';
import { fetchTotalPageBooks } from '@/components/lib/data';
import { BooksTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || '';

	const currentPage = Number(searchParams?.page) || 1;

	const totalPages = await fetchTotalPageBooks(query);

	return (
		<>
			<div className='flex w-full items-center justify-between'>
				<h1 className='text-2xl'>Libros</h1>
			</div>
			<div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
				<Search placeholder='Buscar Libro...' />
				<CreateBook />
			</div>
			<Suspense key={'' + 1} fallback={<BooksTableSkeleton />}>
				<Table query={query} currentPage={currentPage} />
			</Suspense>
			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</>
	);
}
