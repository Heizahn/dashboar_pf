import UserLogged from '@/components/config/user-logged';
import SideNav from '@/components/ui/dashboard/side-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<UserLogged>
			<div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
				<div className='w-full flex-none md:w-64'>
					<SideNav />
				</div>
				<div className='flex-grow p-6 pt-0 md:overflow-y-auto md:p12'>
					<div className='w-full pt-6'>{children}</div>
				</div>
			</div>
		</UserLogged>
	);
}
