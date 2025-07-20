
import { NextResponse, type NextRequest } from 'next/server';

// This is the crucial change: force the middleware to run on the Node.js runtime.
export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  // Import and initialize Firebase Admin SDK within the function
  const { admin, getFirebaseAdminApp } = await import('@/lib/firebase-admin');
  getFirebaseAdminApp();
  
  const session = request.cookies.get('session')?.value;

  // If no session cookie, redirect to login for protected routes
  if (!session) {
    if (isProtectedRoute(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // Verify the session cookie
  try {
    const decodedIdToken = await admin.auth().verifySessionCookie(session, true);
    
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-User-Id', decodedIdToken.uid);
    requestHeaders.set('X-User-Email', decodedIdToken.email || '');

    // User is authenticated
    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
      // If user is logged in, redirect from login/register to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });

  } catch (error) {
    // Session cookie is invalid. Clear it and redirect to login for protected routes.
    const response = isProtectedRoute(request.nextUrl.pathname)
      ? NextResponse.redirect(new URL('/login', request.url))
      : NextResponse.next();
      
    response.cookies.delete('session');
    return response;
  }
}

function isProtectedRoute(pathname: string): boolean {
    const protectedPaths = ['/dashboard', '/billing', '/wallet', '/analysis', '/builder'];
    return protectedPaths.some(path => pathname.startsWith(path));
}

export const config = {
  matcher: [
    // Match all routes except for static assets and special Next.js paths
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
