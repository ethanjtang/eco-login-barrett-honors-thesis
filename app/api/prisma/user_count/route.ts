// app/api/prisma/user_count
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function GET(request: NextRequest) {
  try {
    // Define the categories A-E
    const categories = ["Renewable Energy", "Sustainable Transportation", "Energy Efficiency", "Waste Reduction", "Water Conservation"];
    const counts = [];

    // Count the number of users interested in each category
    for (const category of categories) {
      const count = await prisma.user.count({
        where: {
          interests: {
            has: category,
          },
        },
      });
      counts.push(count);
    }

    // Return the counts array in the order of A-E
    return NextResponse.json({ counts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user interests counts', error);
    return NextResponse.json({ error: 'Error fetching user interests counts' }, { status: 500 });
  }
}
