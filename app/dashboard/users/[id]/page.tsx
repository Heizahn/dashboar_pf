import FormUserEdit from '@/components/ui/users/edit-form';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { fetchGetUserById } from '@/components/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const user = await fetchGetUserById(id);
	if (!user) {
		notFound();
	}

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Usuarios', href: '/dashboard/users' },
					{ label: `Usuario ${user.name}`, href: `/dashboard/users/${id}` },
					{
						label: 'Editar Usuario',
						href: `/dashboard/users/${id}/edit`,
						active: true,
					},
				]}
			/>
			<FormUserEdit user={user} isView={true} />
		</main>
	);
}
