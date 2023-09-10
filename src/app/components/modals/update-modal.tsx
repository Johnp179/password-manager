import WrapperModal from "./wrapper-modal";
import ModalForm from "./modal-form";
import { updateRequest } from "@/lib/api-requests";
import type { NewAccount } from "@/lib/validators";
import { useState } from "react";
import type { Account } from "@prisma/client";

export default function UpdateModal({
  accountToAmend,
  closeModal,
  setLoading,
}: {
  accountToAmend: Omit<Account, "userId">;
  closeModal: () => void;
  setLoading: (val: boolean) => void;
}) {
  const [visible, setVisible] = useState(true);

  function apiRequest(data: NewAccount) {
    return updateRequest(`/api/account/amend/${accountToAmend.id}`, data);
  }

  return (
    <WrapperModal visible={visible} closeModal={closeModal}>
      <ModalForm
        accountToAmend={accountToAmend}
        setVisible={setVisible}
        closeModal={closeModal}
        setLoading={setLoading}
        apiRequest={apiRequest}
      />
    </WrapperModal>
  );
}
