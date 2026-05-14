import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
        await jwtVerify(token, secret);
        
        // Token is valid, allow the request to proceed
        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/api/tasks/:path*',
        // Add any other protected API paths here
    ],
};
