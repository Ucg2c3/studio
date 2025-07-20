
import { NextResponse, type NextRequest } from 'next/server';
import { adminAuth, getFirebaseAdminApp } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

async function checkAuth(request: NextRequest): Promise<boolean> {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) {
    return false;
  }
  try {
    getFirebaseAdminApp(); // Ensure admin app is initialized
    await adminAuth().verifySessionCookie(sessionCookie, true);
    return true;
  } catch (error) {
    // Session cookie is invalid.
    return false;
  }
}

export async function middleware(request: NextRequest) {
    const isLoggedIn = await checkAuth(request);
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
