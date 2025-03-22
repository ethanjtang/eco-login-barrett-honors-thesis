{/* TODO: Remove console output with confirmation messages and hashed paswords! */}

import NextAuth from "next-auth"

import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod"
import { signInSchema } from "./lib/zod"

 
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";

import { saltAndHashPassword } from '@/db/authUtil';
import bcrypt from "bcrypt";

import { getUserAccount } from '@/db/getUserAccount'
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
        email: {type: 'text', label: 'Email', placeholder: 'Enter your email'},
        password: {type: 'password', label: 'Password', placeholder: 'Enter your password'},
      },
      
      authorize: async (credentials) => {
        let user = null

        if (!credentials) { 
          throw new Error("Email and password are required."); 
        }

        if (typeof credentials.email !== 'string' || 
            typeof credentials.password !== 'string') {
          throw new Error("Invalid type provided for input(s)."); 
        }

        try { 
          const { email, password } = await signInSchema.parseAsync(credentials)
      
          // logic to verify if the user exists
          user = await getUserAccount(email)
          console.log(user);
          
          if (user)
          {
            if (user.hashPassword != null)
            {
              const isValidPassword = await bcrypt.compare(password, user.hashPassword);
              if (isValidPassword) {
                // Return the user object if the password is valid
                return user
              }
              else
              {
                return null;
              }
            }
            else
            {
              {/* Extra logic to indicate user has account but used different authentication method */}
              return null;
            }
          }

          // logic to salt and hash password
          const hashPassword = await saltAndHashPassword(credentials.password)
          
          // Create the new user
          const newUser = await prisma.user.create({
            data: { email, hashPassword, accountType: 'user' },
          });
          console.log('New user created');
          user = await getUserAccount(credentials.email);
          return user
        }
        catch (error) {
          console.error("Error: ", error);
          return null;
        }
      },
    }),
  ],
})
