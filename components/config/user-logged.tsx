'use client';

import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

export default function UserLogged({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const token = localStorage.getItem('token') || '';
	const decodeToken = jwt.decode(token) as jwt.JwtPayload;
	const TimeExp = decodeToken?.exp || 0;

	return TimeExp * 1000 > Date.now() ? <>{children}</> : <>{router.push('/login')}</>;
}
