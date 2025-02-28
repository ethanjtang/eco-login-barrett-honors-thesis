'use client';

import { useState, useEffect } from 'react';
import Layout from "./layout";
import AuthNotFound from "@/db/sessionCheck";
import AdminDash from "@/app/leaderboard/AdminDash";
import AdminList from "@/app/leaderboard/AdminList";
import UserDash from "@/app/leaderboard/UserDash";
import "@/styles/globals.css";

export default function Leaderboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuper, setIsSuper] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");

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

  if (!userEmail) {
    return (
      <div className="home-page-bg">
        <AuthNotFound />
      </div>
    );
  }

  return (
    <div className="home-page-bg">
      <h1 className="page-title">Leaderboard Page</h1>
      <p className="page-caption">
        This is a placeholder for the leaderboard page, where users will be able to see scores of other users.
      </p>
      <UserDash />
      {isAdmin && (
        <div>
          <AdminDash />
          <p> Admin List: </p>
          <AdminList isSuper={isSuper} userEmail={userEmail} />
        </div>
      )}
    </div>
  );
}
