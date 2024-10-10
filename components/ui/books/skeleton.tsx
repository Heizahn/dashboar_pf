export function BookSkeleton() {
	return (
		<div className='animate-pulse rounded-md bg-gray-50 p-4 md:p-6'>
			<div className='mb-4'>
				<div className='h-8 w-32 bg-gray-200 rounded-md mb-2'></div>
				<div className='h-10 w-full bg-gray-300 rounded-md'></div>
				<div className='flex flex-wrap gap-4 mt-3'>
					{[...Array(3)].map((_, index) => (
						<div
							key={index}
							className='bg-white px-4 py-2 rounded-lg h-10 w-24 bg-gray-200'
						></div>
					))}
				</div>
			</div>

			<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				<div>
					{/* Title Skeleton */}
					<div className='mb-4'>
						<div className='h-8 w-32 bg-gray-200 rounded-md mb-2'></div>
						<div className='block w-full bg-gray-300 rounded-md h-10'></div>
					</div>

					<div className='mt-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
						{/* Author Skeleton */}
						<div>
							<div className='h-8 w-32 bg-gray-200 rounded-md mb-2'></div>
							<div className='block w-full bg-gray-300 rounded-md h-10'></div>
						</div>

						{/* Publication Year Skeleton */}
						<div className='mb-4'>
							<div className='h-8 w-32 bg-gray-200 rounded-md mb-2'></div>
							<div className='block w-full bg-gray-300 rounded-md h-10'></div>
						</div>
					</div>

					{/* Description Skeleton */}
					<div className='mb-4'>
						<div className='h-8 w-32 bg-gray-200 rounded-md mb-2'></div>
						<div className='block w-full bg-gray-300 rounded-md h-20'></div>
					</div>
				</div>

				{/* Image Skeleton */}
				<div className='mb-4'>
					<div className='h-8 w-32 bg-gray-200 rounded-md mb-2'></div>
					<div className='relative mt-2 flex flex-col justify-center items-center w-full h-full bg-gray-300 rounded-md'>
						<div className='relative w-52 h-72 bg-gray-300 rounded-md'></div>
						<div className='h-10 w-36 bg-gray-300 rounded-md mt-3'></div>
					</div>
				</div>
			</div>

			{/* Buttons Skeleton */}
			<div className='mt-6 flex justify-end gap-4'>
				<div className='h-10 w-24 bg-gray-300 rounded-lg'></div>
				<div className='h-10 w-36 bg-gray-300 rounded-lg'></div>
			</div>
		</div>
	);
}
