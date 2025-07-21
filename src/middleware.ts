
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

async function checkAuth(request: NextRequest): Promise<boolean> {
  const sessionCookie = request.cookies.get('session');

  if (!sessionCookie) {
    return false;
  }

  const checkSessionUrl = new URL('/api/auth/check-session', request.nextUrl.origin);

  try {
    const response = await fetch(checkSessionUrl.toString(), {
      headers: {
        'Cookie': `session=${sessionCookie.value}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = [
    '/dashboard',
    '/billing',
    '/wallet',
    '/analysis',
    '/builder',
  ].some(path => pathname.startsWith(path));

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (pathname.startsWith('/api/auth/check-session')) {
    return NextResponse.next();
  }

  const isLoggedIn = await checkAuth(request);

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
