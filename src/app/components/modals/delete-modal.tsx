import { FormEvent, useRef, useState } from "react";
import { deleteRequest } from "@/lib/api-requests";
import { useRouter } from "next/navigation";
import WrapperModal from "./wrapper-modal";

export default function DeleteModal({
  id,
  closeModal,
  setLoading,
}: {
  id: string;
  closeModal: () => void;
  setLoading: (val: boolean) => void;
}) {
  const router = useRouter();
  const [error, setError] = useState<any>(null);
  const [visible, setVisible] = useState(true);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setVisible(false);
    try {
      await deleteRequest(`/api/account/amend/${id}`);
      closeModal();
      router.refresh();
      setLoading(false);
    } catch (error) {
      setError(error as any);
    }
  }

  if (error) {
    throw error;
  }

  return (
    <WrapperModal closeModal={closeModal} visible={visible}>
      <form onSubmit={handleSubmit}>
        <h1 className="p-4 uppercase">Are you sure you wish to remove?</h1>
        <button className="block my-4 mx-auto uppercase border p-2 text-xl rounded-md">
          yes
        </button>
      </form>
    </WrapperModal>
  );
}
