import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        accountType: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ accountType: user.accountType }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user type', error);
    return NextResponse.json({ error: 'Error fetching user type' }, { status: 500 });
  }
}
