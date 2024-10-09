'use client';
import LatestUsers from '@/components/ui/dashboard/latest-users';
import BarGraphs from '@/components/ui/dashboard/bar-graphs';
import { useEffect, useState, Suspense } from 'react';
import { CardSkeleton, LatestBooksSkeleton } from '@/components/ui/skeletons';
import { getDataGraph } from '@/components/lib/utils';

interface DashboardData {
	labels: string[];
	dataset: { data: number[] }[];
	ultimosUsuarios: { name: string; email: string; registration_date: string }[];
}

export default function Page() {
	const [data, setData] = useState<DashboardData>();
	useEffect(() => {
		const token = localStorage.getItem('token') || '';

		getDataGraph(token).then((res) => setData(res));
	}, []);

	if (!data)
		return (
			<>
				<CardSkeleton />
				<LatestBooksSkeleton />
			</>
		);

	return (
		<main>
			<div className=''>
				<Suspense fallback={<CardSkeleton />}>
					<BarGraphs labels={data?.labels} dataset={data?.dataset} />
				</Suspense>
			</div>
			<div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
				<Suspense fallback={<LatestBooksSkeleton />}>
					<LatestUsers latestUsers={data?.ultimosUsuarios} />
				</Suspense>
			</div>
		</main>
	);
}
