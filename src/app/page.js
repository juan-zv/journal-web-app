"use client";

import HomeClient from "./HomeClient";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <HomeClient></HomeClient>
    </div>
  );
}
