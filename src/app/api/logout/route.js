import { NextResponse } from 'next/server';

export async function POST(request) {
    // Clear any session or token here
    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}