import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Nodemailer from "next-auth/providers/nodemailer"
 
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import MyPrismaClient from "@/db/prismaClient";


// For Microsoft Edge compatibility issues
import authConfig from "./auth.config"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {type: 'text', label: 'Username', placeholder: 'Enter your username'},
        password: {type: 'password', label: 'Password', placeholder: 'Enter your password'},
      },
      
      authorize: async (credentials) => {
        if (!credentials) { 
          throw new Error("Username and password are required."); 
        }

        if (typeof credentials.username !== 'string' || 
            typeof credentials.password !== 'string') {
          throw new Error("Username and/or password are invalid type."); 
        }

        let user = null
 
        // logic to salt and hash password
        const pwHash = await saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
        user = await getUser(credentials.username, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
})

async function getUser(input_user: string, input_hashed_password: string) {
  try
  {
    const dbUser = await MyPrismaClient.user.findUnique({
      where: {
        username: input_user,
      },
    });
  
    if (dbUser) 
    {
      if (dbUser.hashPassword == input_hashed_password)
      {
        return dbUser;
      }
    }
  }  
  catch (error) 
  { 
    console.error("Error fetching user:", error); 
  } 
  finally { 
    return undefined;
  }
}

async function saltAndHashPassword(password: string) {
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(`Hash generated: ${hash}`);
    return hash;
  } 
  catch (error) {
    if (error instanceof Error)
    {
      console.error(error.message);
    }
    else
    {
      console.error("An unexpected error occurred");
    }
    return undefined;
  }
}
