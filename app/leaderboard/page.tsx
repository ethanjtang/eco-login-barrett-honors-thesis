import Layout from "./layout";

import { auth } from "@/auth";
import AuthNotFound from "@/db/sessionCheck"

export default async function Leaderboard() {
  const session = await auth()
  if (!session) {
    return (<AuthNotFound/>);
  }  
  
  return (
      <div className="home-page-bg">
        <p>lelole</p>
        <p className="mt-10"> lolelo </p>
      </div>
    );
  }