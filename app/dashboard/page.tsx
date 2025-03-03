'use client';

import { useState, useEffect } from 'react';
import Layout from "./layout";
import AuthNotFound from "@/db/sessionCheck";
import AdminDash from "@/app/dashboard/AdminDash";
import AdminList from "@/app/dashboard/AdminList";
import UserDash from "@/app/dashboard/UserDash";
import "@/styles/globals.css";

export default function Leaderboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuper, setIsSuper] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("No session found!");
  const [view, setView] = useState('user'); // Added state to manage the view

  useEffect(() => {
    const fetchSessionAndUserType = async () => {
      const response = await fetch('/api/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { session, error } = await response.json();

      if (error || !session?.user?.email) {
        setUserEmail("No session found!");
        return;
      }
      setUserEmail(session.user.email);

      try {
        const userTypeResponse = await fetch(`/api/prisma/user_type?email=${session.user.email}`);
        const data = await userTypeResponse.json();

        if (data.accountType === 'admin' || data.accountType === 'super') {
          setIsAdmin(true);
        }
        if (data.accountType === 'super') {
          setIsSuper(true);
        }
      } catch (error) {
        console.error('Error fetching user type', error);
      }
    };

    fetchSessionAndUserType();
  }, []);

  if (userEmail == "No session found!") {
    return (
      <div className="auth-fail-page-bg">
        <div>
          <AuthNotFound/>
        </div>
      </div>
    );
  }
  else
  {
    return (
      <div className="default-page-bg height-[100vh]">
        <div className="flex-col-centered bg-white border border-gray-300 shadow-lg rounded-lg px-4 py-4 mt-4">
          <p className="page-title mt-2 mb-4"> Dashboard </p>
          <p className="page-caption">
            View and manage account information.
          </p>
        </div>
        <div className="flex-col-centered h-[60vh] w-[60vw] mt-4 mb-20 bg-white border border-gray-300 shadow-lg rounded-lg">
          {isAdmin && (
            <div className="hoverable-div">
              <button className="bg-greenify-button-green mt-6 mb-4 rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-xl h-10 w-18 px-4 py-2 hover:bg-coffee-green"
                      onClick={() => setView(view === 'user' ? 'admin' : 'user')}>
                      {view === 'user' ? 'Admin View' : 'User View'}
              </button>
          </div>
          )}
          <div>
            {/* Format user page if user is not admin type */}
            {!isAdmin && (<div className="mb-8"></div>)}
            {view === 'user' && <UserDash />}
          </div>
          <div>
            {view === 'admin' && isAdmin && (
              <div className="flex-row-centered mb-20">
                <div className="mr-10">
                  <AdminDash/>
                </div>
                <div>
                  <AdminList isSuper={isSuper} userEmail={userEmail}/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
