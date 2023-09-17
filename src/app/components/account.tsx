import type { Account } from "@prisma/client";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Password from "./password";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const childVariants: Variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

export default function Account({
  account,
  setAccountToAmend,
  openModal,
}: {
  account: Account;
  setAccountToAmend: (val: Omit<Account, "userId">) => void;
  openModal: (key: "delete" | "update") => void;
}) {
  const { id, name, password } = account;

  function handleDeleteClick() {
    openModal("delete");
    setAccountToAmend({
      id,
      name,
      password,
    });
  }

  function handleUpdateClick() {
    openModal("update");
    setAccountToAmend({
      id,
      name,
      password,
    });
  }

  return (
    <motion.form
      variants={childVariants}
      className="flex flex-col p-5 border rounded-md text-fluid-m"
    >
      <label>
        Name
        <input
          type="text"
          className="block text-black outline-none w-full"
          value={name}
          readOnly
        />
      </label>
      <label>
        Password
        <Password password={password} />
      </label>
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          type="button"
          onClick={handleDeleteClick}
          className="border p-2 rounded-md  hover:bg-white hover:text-black"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={handleUpdateClick}
          className="border p-2 rounded-md  hover:bg-white hover:text-black"
        >
          <PencilSquareIcon className="w-6 h-6" />
        </button>
      </div>
    </motion.form>
  );
}
