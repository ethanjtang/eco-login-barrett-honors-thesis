import { NextRequest, NextResponse } from 'next/server';
import { getUserAccount } from '@/db/getUserAccount';
import { prisma } from '@/db/prisma';

/* API to fetch the topics a user is interested in, PUT used to update string[] interests for a user */
export async function PUT(request: NextRequest) {
  const { user_email, new_user_topics } = await request.json();

  if (!user_email || !Array.isArray(new_user_topics)) {
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
  }

  try {
    const user = await getUserAccount(user_email);

    if (user) {
      console.log('Original:', user.interests);
      user.interests = new_user_topics;
      console.log('Updated:', user.interests);

      // Update user in the database
      await prisma.user.update({
        where: { email: user_email },
        data: { interests: new_user_topics },
      });

      return NextResponse.json({ message: 'User topics updated successfully' });
    } else {
      console.log('User account not found, cannot update topics!');
      return NextResponse.json({ error: 'User account not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating user topics', error);
    return NextResponse.json({ error: 'Error updating user topics' }, { status: 500 });
  }
}

/* GET used to fetch string[] interests for a user */
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
