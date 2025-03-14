"use server";

import { signOut } from "@/auth";

/* Helper file for sign-out button to seperate server-side actions from client-side */
export async function handleSignOut() {
  await signOut({ redirectTo: '/' });
}
