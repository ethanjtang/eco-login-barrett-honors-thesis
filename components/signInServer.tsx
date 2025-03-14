'use server';

import { signIn } from "@/auth";

/* Helper file for sign-in button to seperate server-side actions from client-side */
export const handleSignIn = async () => {
  await signIn("", { redirectTo: '/interests' });
};
