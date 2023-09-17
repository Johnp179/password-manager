import type { Account as TAccount } from "@prisma/client";
import Account from "./account";
import { useState } from "react";
import PostModal from "./modals/post-modal";
import DeleteModal from "./modals/delete-modal";
import UpdateModal from "./modals/update-modal";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function Vault({
  accounts,
  userId,
  setLoading,
}: {
  accounts: TAccount[];
  userId: string;
  setLoading: (val: boolean) => void;
}) {
  const [modalVisibility, setModalVisibility] = useState({
    post: false,
    update: false,
    delete: false,
  });
  const [accountToAmend, setAccountToAmend] = useState({
    id: "",
    name: "",
    password: "",
  });

  function closeModal(key: "post" | "delete" | "update") {
    setModalVisibility((state) => ({
      ...state,
      [key]: false,
    }));
  }

  function openModal(key: "post" | "delete" | "update") {
    setModalVisibility((state) => ({
      ...state,
      [key]: true,
    }));
  }

  const parentVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {modalVisibility.post && (
          <PostModal
            userId={userId}
            setLoading={setLoading}
            closeModal={() => closeModal("post")}
          />
        )}
        {modalVisibility.update && (
          <UpdateModal
            accountToAmend={accountToAmend}
            setLoading={setLoading}
            closeModal={() => closeModal("update")}
          />
        )}
        {modalVisibility.delete && (
          <DeleteModal
            id={accountToAmend.id}
            setLoading={setLoading}
            closeModal={() => closeModal("delete")}
          />
        )}
      </AnimatePresence>

      <main className="relative top-20 lg:top-24 z-0">
        <motion.div
          initial="initial"
          animate="animate"
          variants={parentVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4"
        >
          {accounts.map((account) => (
            <Account
              setAccountToAmend={setAccountToAmend}
              openModal={openModal}
              key={account.id}
              account={account}
            />
          ))}
        </motion.div>
        <button
          onClick={() => openModal("post")}
          className="mt-7 p-4 block m-auto border uppercase font-bold rounded-md text-2xl hover:bg-white hover:text-black text-fluid-l"
        >
          Add Account
        </button>
      </main>
    </>
  );
}
