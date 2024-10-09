import FormView from '@/components/ui/books/edit-form';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchGetBookById, fetchGetCategories } from '@/components/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;

	const book = await fetchGetBookById(id);
	const categories = await fetchGetCategories();
	console.log(book);

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
			<FormView book={book} categories={categories} isView={true} />
		</main>
	);
}
