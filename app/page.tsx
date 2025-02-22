'use server';

import '@/styles/globals.css';
import '@/styles/page_home.css';

import Link from "next/link";
import Image from "next/image";

import { SignIn } from '@/components/sign-in';
import { SignOut } from "@/components/sign-out";

import { auth } from "@/auth";

let user_email:string;

export default async function Home() {
  const session = await auth()

  if (session?.user?.email) {
    user_email = session.user.email;
  } 
  else {
    user_email = "No session found!";
  }

  return (
      <div className="home-page-bg flex-col-centered height-[100vh]">
        <div className="flex-row-centered gap-[2vw] mt-[10vh]">
          <div className="flex-col-centered">
            {/* GEACRE Sign-In Portal Icon Image */}
            <Image
                src="/green-leaf-logo.png"
                alt="GEACRE Sign-in Portal Logo"
                width={150}
                height={150}
            />
          </div>
          <div className="flex-col-centered">
            <h1 className="text-8xl font-normal">Green</h1>
            <h1 className="text-8xl font-light mr-auto">Login</h1>
          </div>
        </div>
        
        {/* Show Sign-In button IFF user does not have active session */}
        { !session && (
          <div className="mt-[5vh]">
            {/* Sign-In button */}
            <SignIn/>
          </div>
        )}

        {/* Show Sign-In button IFF user does not have active session */}
        { session && (
          <div className="mt-[5vh] flex-col-centered">
            <Link href="/interests" className="nav-bar-element-default"> Interests Page </Link>
            <Link href="/leaderboard" className="nav-bar-element-default"> Leaderboard Page </Link>
            <p> Session detected: {user_email} </p>
            <SignOut/>
          </div>
          
        )}
        
        <div className="flex-row-centered justify-center mt-[5vh] gap-[2vw]">
          <div className="flex-col-centered ml-3">
            <Link
            href="https://greenifyai.com/"
            className="flex-col-centered h-[20vh] gap-3 bg-white border border-gray-300 shadow-xl rounded-lg p-6" 
            // Used to open website in a new tab
            target="_blank" rel="noopener noreferrer"
            >
              <Image
                src="/green_expectations_logo.png"
                alt="Green Expectations Logo"
                width={50}
                height={50}
                className="transition hover:filer-coffee-green hover:brightness-90"
                priority
              />
              <p className="home-page-nav-text" >
                GreenifyAI
              </p>
            </Link>
          </div>
          
          <div className="flex-col-centered">
            <Link
            href="https://greenliving-ryke.onrender.com/"
            className="flex-col-centered h-[20vh] gap-3 bg-white border border-gray-300 shadow-xl rounded-lg p-6" 
            // Used to open website in a new tab
            target="_blank" rel="noopener noreferrer"
            >
              <Image
                src="/greenliving_iconv1.png"
                alt="Green Living Logo"
                width={50}
                height={50}
                className="transition hover:filer-coffee-green hover:brightness-90"
                priority
              />
              <p className="home-page-nav-text" >
                GreenLiving
              </p>
            </Link>
          </div>
        </div>
        
        <div className="mt-auto mb-[5vh]">
          {/* Footer */}
          <a className="text-sm" href="https://www.freepik.com" target="_blank" rel="noopener noreferrer">Logo designed using assets from Freepik</a>
        </div>
      </div>
    ); 
}
