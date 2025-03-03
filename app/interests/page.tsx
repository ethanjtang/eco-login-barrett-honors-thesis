// Interests.tsx

'use client';

import { useState, useEffect } from 'react';
import Layout from "./layout";
import { SignOut } from "@/components/sign-out";
import TopicsList from "@/app/interests/topics";
import AuthNotFound from "@/db/sessionCheck";
import "@/styles/globals.css";
import * as dbUtils from "@/db/getUserAccount";
import { SignIn_Sm } from "@/components/sign-in";

const sus_topics = ["Renewable Energy", "Sustainable Transportation", "Energy Efficiency", "Waste Reduction", "Water Conservation"];

export default function Interests() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/session');
        const data = await response.json();

        if (data.error) {
          setSession(null);
        } else {
          setSession(data.session);
        }
      } catch (error) {
        console.error('Error checking session', error);
        setSession(null);
      }
    };

    fetchSession();
  }, []);

  if (!session) {
    return (
      <div className="auth-fail-page-bg">
        <div>
          <AuthNotFound/>
        </div>
      </div>
    );
  }

  const user_email = session.user?.email;

  return (
    <div className="default-page-bg height-[100vh]">
      <div className="flex-col-centered bg-white border border-gray-300 shadow-lg rounded-lg px-4 py-4">
        <p className="page-title mt-2 mb-4">Interests</p>
        <p className="page-caption">
          View and change your current sustainability topic subscriptions.
        </p>
      </div>
      <div className="flex-col-centered w-[60vw] mt-6 mb-20 bg-white border border-gray-300 shadow-lg rounded-lg">
        <div>
          {user_email && 
          <TopicsList userEmail={user_email}/>}
        </div>
      </div>
    </div>
  );
}
