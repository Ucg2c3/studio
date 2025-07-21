
'use server';

import { getFirebaseAdminApp, adminAuth } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Ensure this route is always run dynamically

/**
 * API route to verify a user's session cookie.
 * This is called by the middleware to offload the Firebase Admin SDK dependency.
 */
export async function GET(request: NextRequest) {
  try {
    getFirebaseAdminApp(); // Ensure Firebase Admin is initialized

    const sessionCookie = cookies().get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    // Verify the session cookie. This will throw an error if invalid.
    await adminAuth().verifySessionCookie(sessionCookie, true);

    return NextResponse.json({ isAuthenticated: true }, { status: 200 });
  } catch (error) {
    // If verification fails, the user is not authenticated.
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
