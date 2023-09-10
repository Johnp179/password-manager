"use client";

import type { Account as TAccount } from "@prisma/client";
import Account from "./account";
import { useState } from "react";
import PostModal from "./modals/post-modal";
import DeleteModal from "./modals/delete-modal";
import UpdateModal from "./modals/update-modal";
import { BallTriangle } from "react-loader-spinner";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
function LoadingModal() {
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#fff"
        ariaLabel="ball-triangle-loading"
      />
    </div>
  );
}

export default function Vault({
  accounts,
  userId,
}: {
  accounts: TAccount[];
  userId: string;
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
  const [loading, setLoading] = useState(false);

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
      {loading && <LoadingModal />}
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

      <section className="relative top-20 z-0">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={parentVariants}
          className="grid grid-cols-3 gap-4"
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
          className="mt-7 p-4 block m-auto border uppercase font-bold rounded-md text-2xl"
        >
          Add Account
        </button>
      </section>
    </>
  );
}
