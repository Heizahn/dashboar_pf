import FormUserEdit from '@/components/ui/users/edit-form';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { fetchGetUserById } from '@/components/lib/data';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { UserSkeleton } from '@/components/ui/users/skeleton';
import { revalidatePath } from 'next/cache';

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	revalidatePath('/dashboard/users/' + id);
	const user = await fetchGetUserById(id);

	if (!user) {
		notFound();
	}

	return (
		<main>
			<Suspense>
				<Breadcrumbs
					breadcrumbs={[
						{ label: 'Usuarios', href: '/dashboard/users' },
						{
							label: `Usuario ${user.name}`,
							href: `/dashboard/users/${id}`,
							active: true,
						},
					]}
				/>
			</Suspense>
			<Suspense fallback={<UserSkeleton />}>
				<FormUserEdit user={user} isView={true} />
			</Suspense>
		</main>
	);
}
