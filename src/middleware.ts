
import { NextResponse, type NextRequest } from 'next/server';
import { admin, getFirebaseAdminApp } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

async function verifySession(session: string | undefined) {
    if (!session) return null;
    try {
        getFirebaseAdminApp(); // Ensure app is initialized
        const decodedIdToken = await admin.auth().verifySessionCookie(session, true);
        return decodedIdToken;
    } catch (error) {
        console.error('Session cookie verification failed in middleware:', error);
        return null;
    }
}

function isProtectedRoute(pathname: string): boolean {
    const protectedPaths = ['/dashboard', '/billing', '/wallet', '/analysis', '/builder'];
    return protectedPaths.some(path => pathname.startsWith(path));
}

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    const decodedToken = await verifySession(session);

    const isProtected = isProtectedRoute(request.nextUrl.pathname);
    const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');

    if (!decodedToken && isProtected) {
        // Not logged in and trying to access a protected route, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (decodedToken && isAuthRoute) {
        // Logged in and trying to access login/register, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // For all other cases, just continue
    return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except for static assets and special Next.js paths
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
