
import { NextResponse, type NextRequest } from 'next/server';
import * as admin from 'firebase-admin';

// This is the crucial change: force the middleware to run on the Node.js runtime.
export const runtime = 'nodejs';

// --- Helper function to initialize Firebase Admin ---
// This pattern ensures that initialization only happens once.
function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }
  
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

  if (!serviceAccount) {
    throw new Error('Firebase service account key is not set in environment variables.');
  }

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// --- Main Middleware Function ---
export async function middleware(request: NextRequest) {
  initializeFirebaseAdmin(); // Ensure Firebase Admin is ready
  
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
    
    // User is authenticated
    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
      // If user is logged in, redirect from login/register to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Add user info to headers for access in server components/API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-User-Id', decodedIdToken.uid);
    requestHeaders.set('X-User-Email', decodedIdToken.email || '');

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });

  } catch (error) {
    console.error('Session cookie verification failed:', error);
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
