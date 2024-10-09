import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const tokenCookie = req.cookies.get('token')?.value;
	const tokenLocal = req.headers.get('Authorization')?.split(' ')[1];

	if (!tokenCookie || !tokenLocal) {
		return new Response(JSON.stringify({ message: 'Sesión cerrada exitosamente' }), {
			status: 200,
			headers: {
				'Set-Cookie': `token=; HttpOnly; Path=/; Max-Age=0`,
				'Content-Type': 'application/json',
			},
		});
	}

	if (tokenCookie === tokenLocal) {
		return new Response(JSON.stringify({ message: 'Sesión cerrada exitosamente' }), {
			status: 200,
			headers: {
				'Set-Cookie': `token=; HttpOnly; Path=/; Max-Age=0`,
				'Content-Type': 'application/json',
			},
		});
	}
}
