// app/api/prismaDB/getUserTopics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const user_topic = url.searchParams.get('user_topic');

    if (!user_topic) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    const users = await prisma.user.findMany({
    where: {
        interests: {
        has: user_topic
        }
    },
    select: {
        email: true
    }
    });
  
    // Extract emails from the users list
    const emails = users.map(user => user.email);

    return NextResponse.json({ emails }, { status: 200 });
  } 
  catch (error) {
    console.error('Error fetching user topic count', error);
    return NextResponse.json({ error: 'Error fetching user topic count' }, { status: 500 });
  }
}
