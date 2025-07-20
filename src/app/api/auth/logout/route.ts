
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
    try {
        const response = NextResponse.json({ success: true });
        // Instruct the browser to clear the cookie
        response.cookies.set('session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0, // Expire immediately
            path: '/',
        });
        return response;
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
