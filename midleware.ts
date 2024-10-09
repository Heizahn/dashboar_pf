import { NextResponse } from 'next/server';

export function middleware() {
	console.log('Middleware');
	return NextResponse.next();
}
