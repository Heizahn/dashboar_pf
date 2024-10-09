import { BanedUser, UpdateUser, ViewUser } from '@/components/ui/users/buttons';
import { formatDate } from '@/components/lib/utils';
import { IUserTable } from '@/components/lib/definitions';
import { fetchFilteredUsers } from '@/components/lib/data';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default async function BooksTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const users = await fetchFilteredUsers(query, currentPage);

	return (
		<div className='mt-6 flow-root'>
			<div className='inline-block min-w-full align-middle'>
				<div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
					<div className='md:hidden'>
						{users.map((user: IUserTable) => (
							<div
								key={user.user_id}
								className='mb-2 w-full rounded-md bg-white p-4'
							>
								<div className='flex items-center justify-between border-b pb-4'>
									<div>
										<div className='mb-2 flex items-center'>
											{user.name}
										</div>
										<p className='text-sm text-gray-500'>{user.email}</p>
									</div>
								</div>
								<div className='flex w-full items-center justify-between pt-4'>
									<div>
										<p className='text-xl font-medium'>{user.photoUrl}</p>
									</div>
								</div>
							</div>
						))}
					</div>
					<table className='hidden min-w-full text-gray-900 md:table'>
						<thead className='rounded-lg text-left text-sm font-normal'>
							<tr>
								<th scope='col' className='relative py-3 pl-6 pr-3'></th>
								<th scope='col' className='px-3 py-5 font-medium text-center'>
									Nombre
								</th>
								<th scope='col' className='px-3 py-5 font-medium text-center'>
									Correo
								</th>
								<th scope='col' className='px-3 py-5 font-medium text-center'>
									Usuario confirmado
								</th>
								<th scope='col' className='px-3 py-5 font-medium text-center'>
									Usuario Baneado
								</th>
								<th scope='col' className='px-3 py-5 font-medium text-center'>
									Fecha de registro
								</th>
								<th scope='col' className='relative py-3 pl-1 pr-1'>
									<span className='sr-only'>Editar</span>
								</th>
							</tr>
						</thead>
						<tbody className='bg-white'>
							{users.map((user: IUserTable) => (
								<tr
									key={user.user_id}
									className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
								>
									<td className='whitespace-nowrap py-3 '>
										<div className='flex items-center justify-center'>
											<div className='relative object-contain w-12 h-12 rounded-full'>
												<Image
													src={user.photoUrl}
													alt='Foto de usuario'
													fill={true}
													priority={true}
													sizes='100'
													style={{
														objectFit: 'cover',
														objectPosition: 'center',
														borderRadius: '9999px',
													}}
												/>
											</div>
										</div>
									</td>
									<td className='whitespace-nowrap px-3 py-3 text-center'>
										{user.name}
									</td>
									<td className='whitespace-nowrap px-3 py-3 text-center'>
										{user.email}
									</td>
									<td className='whitespace-nowrap px-3 py-3 text-center'>
										<div className='w-full flex items-center justify-center'>
											{user.isConfirmed ? (
												<CheckIcon className='w-6 h-6 text-green-700' />
											) : (
												<XMarkIcon className='w-6 h-6 text-red-700' />
											)}
										</div>
									</td>
									<td className='whitespace-nowrap px-3 py-3 text-center'>
										<div className='w-full flex items-center justify-center'>
											{user.isBanned ? <p>Si</p> : <p>No</p>}
										</div>
									</td>
									<td className='whitespace-nowrap py-3 p-3 uppercase text-center'>
										{formatDate(user.registration_date)}
									</td>
									<td className='whitespace-nowrap py-3'>
										<div className='flex justify-end gap-3'>
											<ViewUser id={user.user_id} />
											<UpdateUser id={user.user_id} />
											<BanedUser id={user.user_id} />
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
