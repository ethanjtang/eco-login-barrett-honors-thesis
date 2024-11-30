import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/db/prisma";

import { saltAndHashPassword } from '@/db/authUtil';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const hashPassword = await saltAndHashPassword(password);

    // Create the new user
    const newUser = await prisma.user.create({
      data: { email, username, hashPassword },
    });

    res.status(201).json(newUser);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
