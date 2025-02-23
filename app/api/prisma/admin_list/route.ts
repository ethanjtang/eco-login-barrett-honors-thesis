import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const admins = await prisma.user.findMany({
      where: {
        accountType: 'admin',
      },
      select: {
        email: true,
      },
    });

    return NextResponse.json({ admins }, { status: 200 });
  } catch (error) {
    console.error('Error fetching admin users', error);
    return NextResponse.json({ error: 'Error fetching admin users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (existingUser.accountType === 'admin') {
      return NextResponse.json({ error: 'User is already an admin' }, { status: 409 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { accountType: 'admin' },
    });

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (error) {
    console.error('Error creating new admin user', error);
    return NextResponse.json({ error: 'Error creating new admin user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (existingUser.accountType !== 'admin') {
      return NextResponse.json({ error: 'User is not an admin' }, { status: 409 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { accountType: 'user' },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error removing admin user', error);
    return NextResponse.json({ error: 'Error removing admin user' }, { status: 500 });
  }
}
