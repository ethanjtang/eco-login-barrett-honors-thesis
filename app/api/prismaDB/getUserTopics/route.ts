// app/api/prismaDB/getUserTopics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserAccount } from '@/db/getUserAccount';
import { prisma } from '@/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const user_email = url.searchParams.get('user_email');

    if (!user_email) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    const user = await getUserAccount(user_email);

    if (!user) {
      return NextResponse.json({ error: 'User account not found' }, { status: 404 });
    }

    return NextResponse.json({ interests: user.interests }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user topics:', error);
    return NextResponse.json({ error: 'Error fetching user topics' }, { status: 500 });
  }
}
