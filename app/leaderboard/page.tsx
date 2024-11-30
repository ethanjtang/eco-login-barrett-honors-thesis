import Layout from "./layout";

import { auth } from "@/auth";
import AuthNotFound from "@/db/sessionCheck"

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
  
  return (
      <div className="home-page-bg ml-[2vh]">
        <h1 className="page-title">
          Leaderboard Page
        </h1>
        <p className="page-caption">
          This is a placeholder for the leaderboard page, where users will be able to see scores of other users.
        </p>
      </div>
    );
  }