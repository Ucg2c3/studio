
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

async function checkAuth(request: NextRequest): Promise<boolean> {
  const sessionCookie = request.cookies.get('session');

  if (!sessionCookie) {
    return false;
  }

  // The check is offloaded to an API route to avoid using firebase-admin in middleware
  const checkSessionUrl = new URL('/api/auth/check-session', request.nextUrl.origin);

  try {
    const response = await fetch(checkSessionUrl.toString(), {
      headers: {
        'Cookie': `session=${sessionCookie.value}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error checking auth status in middleware:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // These are routes that require authentication
  const isProtectedRoute = [
    '/dashboard',
    '/billing',
    '/wallet',
    '/analysis',
    '/builder',
  ].some(path => pathname.startsWith(path));
  
  // These are routes for unauthenticated users
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  
  // Allow the session check API route to be accessed
  if (pathname.startsWith('/api/auth/check-session')) {
    return NextResponse.next();
  }

  const isLoggedIn = await checkAuth(request);

  if (isProtectedRoute && !isLoggedIn) {
    // Redirect to login but keep the original path for redirection after login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isLoggedIn) {
    // If a logged-in user tries to access login/register, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// The matcher defines which routes the middleware will run on.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth/login (to allow setting the cookie)
     * - api/auth/logout (to allow clearing the cookie)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth/login|api/auth/logout).*)',
  ],
};
