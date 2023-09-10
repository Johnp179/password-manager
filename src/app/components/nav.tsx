"use client";
import useVerifySession from "@/hooks/useVerifySession";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function Nav({ session }: { session: Session }) {
  useVerifySession(session);

  return (
    <nav className="absolute p-4 top-0 left-0 w-full flex justify-between uppercase text-4xl">
      <h1>Welcome {session.user.name}</h1>
      <button className="uppercase" onClick={() => signOut()}>
        Sign Out
      </button>
    </nav>
  );
}
