// /api/session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Session not active' }, { status: 401 });
    }

    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    console.error('Error checking session', error);
    return NextResponse.json({ error: 'Error checking session' }, { status: 500 });
  }
}
