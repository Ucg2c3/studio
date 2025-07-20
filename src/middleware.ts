
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('session');
    const isLoggedIn = !!sessionCookie?.value;

    const { pathname } = request.nextUrl;

    const isProtectedRoute = ['/dashboard', '/billing', '/wallet', '/analysis', '/builder'].some(path => pathname.startsWith(path));
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

    if (!isLoggedIn && isProtectedRoute) {
        // Not logged in and trying to access a protected route, redirect to login
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect_to', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isLoggedIn && isAuthRoute) {
        // Logged in and trying to access login/register, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // For all other cases, just continue
    return NextResponse.next();
}

export const config = {
  // The matcher is crucial for performance. It ensures the middleware only runs
  // on pages and not on static assets or internal Next.js paths.
  matcher: [
    '/dashboard/:path*',
    '/billing/:path*',
    '/wallet/:path*',
    '/analysis/:path*',
    '/builder/:path*',
    '/login',
    '/register',
    // You can add other paths here if needed
  ],
};
