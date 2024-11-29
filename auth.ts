import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"
 
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/db/prisma"

// For Microsoft Edge compatibility issues
import authConfig from "./auth.config"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
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
