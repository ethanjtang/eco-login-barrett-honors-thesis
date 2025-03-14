import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

/* API to fetch the number of users subscribed to a sustainability-related topic */
export async function GET(request: NextRequest) {
  try {
    // Categories hardcoded, a future update should refactor to allow dynamic add/remove/update for categories
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

    // Return the counts array
    return NextResponse.json({ counts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user interests counts', error);
    return NextResponse.json({ error: 'Error fetching user interests counts' }, { status: 500 });
  }
}
