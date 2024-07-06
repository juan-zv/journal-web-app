"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn("tiktok")}>Sign in with TikTok</button>
    </div>
  );
}
