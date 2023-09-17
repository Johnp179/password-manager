import useVerifySession from "@/hooks/useVerifySession";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function Nav({
  session,
  setLoading,
}: {
  session: Session;
  setLoading: (val: boolean) => void;
}) {
  useVerifySession(session);

  function logout() {
    setLoading(true);
    signOut();
  }

  return (
    <nav className="absolute p-4 top-0 left-0 w-full flex justify-between uppercase text-fluid-xl">
      <h1>Welcome {session.user.name}</h1>
      <button className="uppercase" onClick={logout}>
        Sign Out
      </button>
    </nav>
  );
}
