// signInServer.ts
'use server';

import { signIn } from "@/auth";

export const handleSignIn = async () => {
  await signIn("", { redirectTo: '/interests' });
};
