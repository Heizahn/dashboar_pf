import { type NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;

	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url));
	}
	const secretWords = process.env.NEXT_PUBLIC_JWT_SECRET || '';
	const secretKey = new Uint8Array(secretWords.split('').map((x) => x.charCodeAt(0)));

	try {
		const { payload } = await jwtVerify(token, secretKey);
		if (!payload) return NextResponse.redirect(new URL('/login', request.url));

		const { exp } = payload;

		if (!exp) return NextResponse.redirect(new URL('/login', request.url));

		if (exp * 1000 < Date.now())
			return NextResponse.redirect(new URL('/login', request.url));

		return NextResponse.next();
	} catch (error) {
		if (error instanceof Error) console.log(error.message);
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
