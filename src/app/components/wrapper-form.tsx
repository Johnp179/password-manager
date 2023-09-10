"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function WrapperForm({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <main className="min-h-screen flex flex-col gap-7 justify-center items-center text-fluid-m">
      <div className="uppercase text-fluid-l">
        {pathname === "/signin" ? "sign-in" : "register"}
      </div>
      {children}
    </main>
  );
}
