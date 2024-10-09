import { BanknotesIcon, UserGroupIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const iconMap = {
	collected: BanknotesIcon,
	Users: UserGroupIcon,
	BookOpenIcon,
};

export default async function CardWrapper() {
	return (
		<>
			{/* NOTE: comment in this code when you get to this point in the course */}

			<Card title='Donaciones Totales' value={0} type='collected' />
			<Card title='Libros Totales' value={0} type='BookOpenIcon' />
			<Card title='Usuarios Totales' value={0} type='Users' />
		</>
	);
}

export function Card({
	title,
	value,
	type,
}: {
	title: string;
	value: number | string;
	type: 'BookOpenIcon' | 'Users' | 'collected';
}) {
	const Icon = iconMap[type];

	return (
		<div className='rounded-xl bg-gray-50 p-2 shadow-sm'>
			<div className='flex p-4'>
				{Icon ? <Icon className='h-5 w-5 text-gray-700' /> : null}
				<h3 className='ml-2 text-sm font-medium'>{title}</h3>
			</div>
			<p
				className='
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'
			>
				{value}
			</p>
		</div>
	);
}
