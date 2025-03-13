'use server';

import '@/styles/globals.css';
import '@/styles/page_home.css';

import Link from "next/link";
import Image from "next/image";

import { SignIn } from '@/components/sign-in';
import { SignOut_Sm } from '@/components/sign-out'

import { auth } from "@/auth";

let user_email:string;

export default async function Home() {

  {/* Check current user session using auth library */}
  const session = await auth()

  if (session?.user?.email) {
    user_email = session.user.email;
  } 
  else {
    user_email = "No session found!";
  }

  {/* Page layout */}
  return (
      <div className="home-page-bg flex-col-centered height-[100vh]">
        {/* Web Application Title */}
        <div className="flex-row-centered gap-[2vw] mt-[2vh]">
          <div className="flex-col-centered">
            {/* GEACRE Sign-In Portal Icon Image */}
            <Image
                src="/green-leaf-logo.png"
                alt="EcoLogin Logo"
                width={150}
                height={150}
            />
          </div>
          <div className="flex flex-col justify-start">
            <h1 className="text-8xl font-normal"> Eco </h1>
            <h1 className="text-8xl font-light mr-auto"> Login </h1>
          </div>
        </div>

        <div className="flex-col-centered h-[35vh] w-[60vw] gap-3 mt-[3vh] bg-white border border-gray-300 shadow-lg rounded-lg py-4">
            {/* Show Sign-In button IFF user does not have active session */}
            { !session && (
              <div className="flex-col-centered">
                <p className="text-2xl mb-[1vh]"> Please <strong> Sign-In </strong>  to learn more </p>
                <p className="text-2xl mb-[3vh]"> about sustainable living! </p>
                {/* Sign-In button */}
                <div className="hoverable-div">
                  <SignIn/>
                </div>
              </div>
            )}

            {/* Show navigation buttons IFF user has an active session */}
            { session && (
              <div className="flex-col-centered">
                <div className="flex-row-centered">
                  <p className="text-2xl mb-[3vh]"> Welcome, <strong>{user_email}</strong>! </p>
                  <div className="hoverable-div ml-3 mb-4">
                    <SignOut_Sm/>
                  </div>
                </div>
      
            <div className="hoverable-div">
              <Link href="/interests" className="bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.16] transition-transform transition-colors flex items-center justify-center text-white text-2xl h-18 w-35 px-6 py-3 hover:bg-coffee-green mb-[3vh]"> Interests </Link>
            </div>
            <div className="hoverable-div">
              <Link href="/dashboard" className="bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.16] transition-transform transition-colors flex items-center justify-center text-white text-2xl h-18 w-35 px-6 py-3 hover:bg-coffee-green"> Dashboard </Link>
            </div>
          </div>
          )}
        </div>

        {/* Navigation to original GreenifyAI site and ASU Capstone project deployment */}
        <div className="flex-row-centered justify-center mt-[2vh] mb-[8vh] gap-[2vw]">
          <div className="flex-col-centered ml-3">
            <Link
            href="https://greenifyai.com/"
            className="flex-col-centered hoverable-div h-[20vh] gap-3 bg-white border border-gray-300 shadow-xl rounded-lg p-6" 
            // Used to open website in a new tab
            target="_blank" rel="noopener noreferrer"
            >
              <Image
                src="/green_expectations_logo.png"
                alt="GreenifyAI Logo"
                width={50}
                height={50}
                className=""
                priority
              />
              <p className="home-page-nav-text">
                GreenifyAI
              </p>
            </Link>
          </div>
          
          <div className="flex-col-centered">
            <Link
            href="https://greenliving-ryke.onrender.com/"
            className="flex-col-centered hoverable-div h-[20vh] gap-3 bg-white border border-gray-300 shadow-xl rounded-lg p-6" 
            // Used to open website in a new tab
            target="_blank" rel="noopener noreferrer"
            >
              <Image
                src="/greenliving_iconv1.png"
                alt="SustainABLE Logo"
                width={50}
                height={50}
                className=""
                priority
              />
              <p className="home-page-nav-text" >
                SustainABLE
              </p>
            </Link>
          </div>
        </div>
      </div>
    ); 
}
