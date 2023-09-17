"use client";
import { Session } from "next-auth";
import { useState } from "react";
import LoadingModal from "./modals/loading-modal";
import type { Account as TAccount } from "@prisma/client";
import Nav from "./nav";
import Vault from "./vault";
export default function Container({
  session,
  accounts,
  userId,
}: {
  session: Session;
  accounts: TAccount[];
  userId: string;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {loading && <LoadingModal />}
      <Nav session={session} setLoading={setLoading} />
      <Vault userId={userId} accounts={accounts} setLoading={setLoading} />
    </div>
  );
}
