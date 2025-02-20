
import Layout from "./layout";

import { auth } from "@/auth";
import { getUserAccount, isAdminAccount } from "@/db/getUserAccount"
import AuthNotFound from "@/db/sessionCheck"
import AdminDash from "@/app/leaderboard/AdminDash"
import UserDash from "@/app/leaderboard/UserDash"

import { prisma } from "@/db/prisma"

import "@/styles/globals.css"

export default async function Leaderboard() {
  
  const session = await auth()
  if (!session) {
    return (
      <div className="ml-[2vw]">
        <AuthNotFound/>
      </div>
    );
  }

  let user_account;
  let admin_user;
  let user_email:string;

  if (session?.user?.email) {
    user_email = session.user.email;
    admin_user = await isAdminAccount(user_email);
  } 
  else {
  user_email = "No session found!";
  }
  
  return (
      <div className="home-page-bg ml-[2vh]">
        <h1 className="page-title">
          Leaderboard Page
        </h1>
        <p className="page-caption">
          This is a placeholder for the leaderboard page, where users will be able to see scores of other users.
        </p>
        {session && (
        <UserDash/>
        )}
        {admin_user && (
        <AdminDash/>
        )}
      </div>
    );
  }