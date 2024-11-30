import Layout from "./layout";
import { SignOut } from "@/components/sign-out";

import { auth } from "@/auth";
import AuthNotFound from "@/db/sessionCheck"

export default async function Interests() {
  const session = await auth()
  if (!session) {
    return (<AuthNotFound/>);
  }
  
  return (
      <div className="home-page-bg">
        <p>lelole</p>
        <p className="mt-10"> lolelo </p>
        <div>
          <SignOut/>
        </div>
      </div>
    );
  }