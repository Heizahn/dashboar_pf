import ButtonLogin from '@/components/ui/dashboard/button-login';
import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col p-6'>
			<div className='flex h-20 shrink-0 items-center  justify-start rounded-lg bg-gray-100/80 p-4 md:h-52'>
				<h1 className='text-2xl'>Booknity Logo</h1>
			</div>
			<div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
				<div className='flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20'>
					<p className='text-xl text-gray-800 md:text-3xl md:leading-normal'>
						<strong>Bienvenido al Dashboard de Booknity.</strong> Este es el{' '}
						<Link href='/dashboard' className='text-blue-500'>
							Lugar para administrar los libros de la comunidad.
						</Link>
						, hecho con Next.js.
					</p>

					<ButtonLogin />
				</div>
				<div className='flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12'>
					<h1 className='text-5xl font-bold'>
						<span className='text-blue-500'>¡Bienvenido!</span>
					</h1>
				</div>
			</div>
		</main>
	);
}
