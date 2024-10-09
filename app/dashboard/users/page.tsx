import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import Table from '@/components/ui/users/table';
import { fetchTotalUsers } from '@/components/lib/data';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
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

	const totalPages = await fetchTotalUsers();

	return (
		<>
			<div className='flex w-full items-center justify-between'>
				<h1 className='text-2xl'>Usuarios</h1>
			</div>
			<div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
				<Search placeholder='Buscar Usuario...' />
			</div>
			<Suspense key={'' + 1} fallback={<InvoicesTableSkeleton />}>
				<Table query={query} currentPage={currentPage} />
			</Suspense>
			<div className='mt-5 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div>
		</>
	);
}
