import FormView from '@/components/ui/books/edit-form';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchGetBookById, fetchGetCategories } from '@/components/lib/data';
import { Suspense } from 'react';
import { BookSkeleton } from '@/components/ui/books/skeleton';

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;

	const book = await fetchGetBookById(id);
	const categories = await fetchGetCategories();

	if (!book) {
		notFound();
	}

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Libros', href: '/dashboard/books/' },
					{
						label: `Libro ${book.title}`,
						href: `/dashboard/books/${id}`,
						active: true,
					},
				]}
			/>{' '}
			<Suspense fallback={<BookSkeleton />}>
				<FormView book={book} categories={categories} isView={true} />
			</Suspense>
		</main>
	);
}
