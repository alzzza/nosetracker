import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get('session');
    
    if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/((?!auth|_next/static|favicon.ico).*)',
    ],
};