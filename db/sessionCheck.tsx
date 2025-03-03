'use client';

import { SignIn_Sm } from "@/components/sign-in";

export default function AuthNotFound() {
  return (
    <div className="flex-col-centered bg-white border border-gray-300 shadow-lg rounded-lg px-4 py-4 mt-6">
      <p className="page-title mb-6">
        Unauthorized Access
      </p>
      <p className="page-caption mb-2">
        We are unable to detect an active user session.
      </p>
      <p className="page-caption mb-6">
        Please sign in to view the contents of this page.
      </p>
      <div className="hoverable-div">
          <SignIn_Sm/>
      </div>
    </div>
  );
}