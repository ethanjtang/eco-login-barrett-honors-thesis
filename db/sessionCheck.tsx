'use client';

import { SignIn_Sm } from "@/components/sign-in";

export default function AuthNotFound() {
  return (
    <div className="flex-col-centered mt-6">
      <p className="page-title">
        Unauthorized Access
      </p>
      <p className="page-caption">
        User session not active, please sign in to view this page.
      </p>
      <div>
        <SignIn_Sm />
      </div>
    </div>
  );
}