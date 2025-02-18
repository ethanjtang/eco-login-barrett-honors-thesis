// app/api/prismaDB/updateUserTopics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserAccount } from '@/db/getUserAccount';
import { prisma } from '@/db/prisma';

export async function POST(request: NextRequest) {
  const { user_email, new_user_topics } = await request.json();

  if (!user_email || !Array.isArray(new_user_topics)) {
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
  }

  try {
    console.log('Updating db...1');
    const user = await getUserAccount(user_email);
    console.log('Updating db...2');

    if (user) {
      console.log('Updating db...3');
      console.log('Original:', user.interests);
      user.interests = new_user_topics;
      console.log('Updating db...4');
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
    console.log('Updating db...5');
  } catch (error) {
    console.error('Error updating user topics LELOLELOLELOLE:', error);
    return NextResponse.json({ error: 'Error updating user topics' }, { status: 500 });
  }
}
