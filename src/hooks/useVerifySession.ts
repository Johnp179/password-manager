import { Session } from "next-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function useVerifySession(session: Session) {
  const router = useRouter();

  useEffect(() => {
    const { expiryDate } = session;
    const interval = setInterval(async () => {
      if (Date.now() > Date.parse(expiryDate)) {
        const data = await signOut({ redirect: false, callbackUrl: "/signin" });
        router.push(data.url);
      }
    }, 5 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [session, router]);
}
