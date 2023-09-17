"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Footer({ pathname }: { pathname: string }) {
  return (
    <footer>
      Already have an account?{" "}
      <Link
        className="underline hover:text-blue-300"
        href={pathname === "/register" ? "/signin" : "/register"}
      >
        {pathname === "/register" ? "Login" : "Register"}
      </Link>{" "}
      here.
    </footer>
  );
}

export default function WrapperForm({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <main className="min-h-screen flex flex-col gap-4 justify-center items-center text-fluid-m">
      <header className="text-fluid-xl">
        {pathname === "/signin" ? "Sign-in" : "Register"}
      </header>
      {children}
      <Footer pathname={pathname} />
    </main>
  );
}
