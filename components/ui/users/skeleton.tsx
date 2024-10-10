export function UserSkeleton() {
	return (
		<>
			<div className='animate-pulse p-4 md:p-6'>
				{/* Image Skeleton */}
				<div className='mb-4'>
					<div className='h-8 w-32 bg-gray-200 rounded-md mb-2'></div>
					<div className='relative mt-2 h-24 w-24 bg-gray-300 rounded-full'></div>
					<div className='mt-2 h-10 w-36 bg-gray-200 rounded-md'></div>
				</div>

				{/* Email Skeleton */}
				<div className='my-4'>
					<div className='h-8 w-32 bg-gray-200 rounded-md mb-2'></div>
					<div className='h-10 w-full bg-gray-300 rounded-md'></div>
				</div>

				{/* Name Skeleton */}
				<div className='mb-4'>
					<div className='h-8 w-32 bg-gray-200 rounded-md mb-2'></div>
					<div className='h-10 w-full bg-gray-300 rounded-md'></div>
				</div>

				{/* User Confirmed Skeleton */}
				<div className='flex flex-col gap-4 mb-4'>
					<div className='flex items-center justify-between'>
						<div className='h-8 w-32 bg-gray-200 rounded-md'></div>
						<div className='h-8 w-8 bg-gray-300 rounded-md'></div>
					</div>
					<div className='flex items-center justify-between'>
						<div className='h-8 w-32 bg-gray-200 rounded-md'></div>
						<div className='h-8 w-20 bg-gray-300 rounded-md'></div>
					</div>
					<div className='flex items-center justify-between'>
						<div className='h-8 w-32 bg-gray-200 rounded-md'></div>
						<div className='h-8 w-16 bg-gray-300 rounded-md'></div>
					</div>
				</div>

				{/* Buttons Skeleton */}
				<div className='flex justify-end gap-4 mt-6'>
					<div className='h-10 w-24 bg-gray-300 rounded-lg'></div>
					<div className='h-10 w-36 bg-gray-300 rounded-lg'></div>
				</div>
			</div>
		</>
	);
}
