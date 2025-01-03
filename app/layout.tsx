import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import UserProvider from '@/components/context/user-context';
import './globals.css';
import ToastProvider from '@/components/context/toast';

const roboto = Roboto({ weight: ['300', '400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<UserProvider>
				<body className={`${roboto} antialiased`}>
					<ToastProvider>{children}</ToastProvider>
				</body>
			</UserProvider>
		</html>
	);
}
