import { API_URL } from '@/components/config/ENV';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const data = await req.json();
	const res = await fetch(`${API_URL}/auth/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (res.ok) {
		const data = await res.json();

		return new Response(JSON.stringify(data), {
			headers: {
				'Set-Cookie': `token=${data.token}; HttpOnly; Path=/; Max-Age=3600`,
				'Content-Type': 'application/json',
			},
			status: 200,
			statusText: 'OK',
		});
	}
	return NextResponse.json({ error: 'Usuario o contraseña incorrectos' });
}
