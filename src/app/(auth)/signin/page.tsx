"use client";

import DnaLoading from "@/app/components/dna-loading";
import WrapperForm from "@/app/components/wrapper-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import Footer from "../components/footer";

function ErrorDialog() {
  return (
    <div className="py-5 px-8 bg-red-400 rounded-md uppercase">
      <h1 className="font-bold text-black">Invalid email or password</h1>
    </div>
  );
}

export default function Sigin() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const resp = await signIn("credentials", {
      redirect: false,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    });

    if (resp?.error) {
      setLoading(false);
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
      setError(true);
      return;
    }
    router.push("/");
  }

  return (
    <WrapperForm>
      {error && <ErrorDialog />}
      <form
        onSubmit={submit}
        className="flex flex-col p-7 bg-slate-700 space-y-5 rounded-md h-64"
      >
        <label>
          Email
          <input
            name="email"
            ref={emailRef}
            type="text"
            className="text-black block"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            ref={passwordRef}
            type="password"
            className="text-black block"
          />
        </label>
        <div className="flex justify-center items-center">
          {loading ? (
            <DnaLoading height={60} width={60} />
          ) : (
            <button className="border py-1 px-2 rounded-sm uppercase hover:bg-neutral-200 hover:text-black">
              Login
            </button>
          )}
        </div>
      </form>
      <Footer pathname="/signin" />
    </WrapperForm>
  );
}
