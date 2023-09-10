import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const modalVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const formVariants: Variants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
  },
  exit: {
    scaleY: 0,
  },
};

export default function WrapperModal({
  children,
  closeModal,
  visible,
}: {
  children: ReactNode;
  closeModal: () => void;
  visible: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={modalVariants}
      className={`fixed h-full w-full bg-opacity-80 bg-stone-800 z-10 flex justify-center items-center ${
        visible ? "" : "hidden"
      }`}
    >
      <motion.div
        drag
        dragElastic={false}
        dragConstraints={ref}
        variants={formVariants}
        dragMomentum={false}
        className="text-3xl border bg-black border-zinc-300 rounded-lg"
      >
        <header className="flex justify-end bg-zinc-300 rounded-t-md">
          <button onClick={closeModal}>
            <XMarkIcon className="w-12 h-12 text-black" />
          </button>
        </header>
        {children}
      </motion.div>
    </motion.div>
  );
}
