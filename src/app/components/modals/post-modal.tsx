import { useState } from "react";
import WrapperModal from "./wrapper-modal";
import ModalForm from "./modal-form";
import { postRequest } from "@/lib/api-requests";
import type { NewAccount } from "@/lib/validators";

export default function PostModal({
  userId,
  closeModal,
  setLoading,
}: {
  userId: string;
  closeModal: () => void;
  setLoading: (val: boolean) => void;
}) {
  const [visible, setVisible] = useState(true);

  function apiRequest(data: NewAccount) {
    return postRequest(`/api/account/${userId}`, data);
  }
  return (
    <WrapperModal visible={visible} closeModal={closeModal}>
      <ModalForm
        setVisible={setVisible}
        closeModal={closeModal}
        setLoading={setLoading}
        apiRequest={apiRequest}
      />
    </WrapperModal>
  );
}
