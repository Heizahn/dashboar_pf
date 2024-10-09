import Form from '@/components/ui/books/create-form.jsx';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { fetchGetCategories } from '@/components/lib/data';

export default async function Page() {
	const categories = await fetchGetCategories();

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Libros', href: '/dashboard/books' },
					{
						label: 'Subir Libro',
						href: '/dashboard/books/create',
						active: true,
					},
				]}
			/>
			<Form categories={categories} />
		</main>
	);
}
