import { type NextRequest, NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;

	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
