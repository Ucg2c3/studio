
import { NextResponse, type NextRequest } from 'next/server';
import { adminAuth, getFirebaseAdminApp } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

// This middleware should run on the Node.js runtime because it uses the Firebase Admin SDK.
export const runtime = 'nodejs';

/**
 * Verifies the user's session cookie.
 * @param request The incoming Next.js request.
 * @returns A boolean indicating if the user is authenticated.
 */
async function checkAuth(request: NextRequest): Promise<boolean> {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) {
    return false;
  }
  try {
    // Ensure the Firebase Admin app is initialized before using auth services.
    getFirebaseAdminApp();
    // Verify the session cookie. This will throw an error if the cookie is invalid.
    await adminAuth().verifySessionCookie(sessionCookie, true);
    return true;
  } catch (error) {
    // An error during verification means the session is invalid.
    console.warn('Session cookie verification failed:', error);
    return false;
  }
}

/**
 * The main middleware function that protects routes.
 * @param request The incoming Next.js request.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that require the user to be authenticated.
  const isProtectedRoute = [
    '/dashboard',
    '/billing',
    '/wallet',
    '/analysis',
    '/builder',
  ].some(path => pathname.startsWith(path));

  // Authentication-related paths (login, register).
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  // Check the user's authentication status.
  const isLoggedIn = await checkAuth(request);

  if (isProtectedRoute && !isLoggedIn) {
    // If the user is not logged in and tries to access a protected route,
    // redirect them to the login page.
    const loginUrl = new URL('/login', request.url);
    // Optionally, you can pass the original path as a redirect parameter.
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isLoggedIn) {
    // If the user is already logged in and tries to access login or register,
    // redirect them to their dashboard.
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If none of the above conditions are met, allow the request to proceed.
  return NextResponse.next();
}

// The 'matcher' configuration tells Next.js which paths to apply the middleware to.
export const config = {
    matcher: [
      '/dashboard/:path*',
      '/billing/:path*',
      '/wallet/:path*',
      '/analysis/:path*',
      '/builder/:path*',
      '/login',
      '/register',
    ],
};
