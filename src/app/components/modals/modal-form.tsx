import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { NewAccount } from "@/lib/validators";
import type { Account } from "@prisma/client";
import Password from "../password";
import { z } from "zod";
import { AccountValidator } from "@/lib/validators";

export default function ModalForm({
  accountToAmend,
  closeModal,
  setLoading,
  apiRequest,
  setVisible,
}: {
  accountToAmend?: Omit<Account, "userId">;
  closeModal: () => void;
  setLoading: (val: boolean) => void;
  apiRequest: (data: NewAccount) => Promise<any>;
  setVisible: (val: boolean) => void;
}) {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [clientError, setClientError] = useState(false);
  const [serverError, setServerError] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  function onChange() {
    if (!submitted) return;
    if (nameRef.current!.value !== "" && passwordRef.current!.value !== "") {
      return setClientError(false);
    }
    return setClientError(true);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newAccount: NewAccount = {
      name: nameRef.current!.value,
      password: passwordRef.current!.value,
    };

    try {
      setSubmitted(true);
      AccountValidator.parse(newAccount);
      setLoading(true);
      setVisible(false);
      await apiRequest(newAccount);
      closeModal();
      router.refresh();
      setLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return setClientError(true);
      }
      setServerError(error as any);
    }
  }

  if (serverError) {
    throw serverError;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
      <label>
        Name
        <input
          type="text"
          ref={nameRef}
          defaultValue={accountToAmend?.name}
          onChange={onChange}
          className="text-black block"
        />
      </label>
      <label>
        Password
        <Password
          password={accountToAmend?.password}
          reference={passwordRef}
          onChange={onChange}
        />
      </label>
      <div
        className={`uppercase text-red-600 text-center ${
          clientError ? "visible" : "invisible"
        }`}
      >
        Please fill out both fields
      </div>
      <div className="flex justify-center items-center">
        <button className="border p-2 uppercase rounded-md text-bold hover:bg-white hover:text-black">
          Submit
        </button>
      </div>
    </form>
  );
}
