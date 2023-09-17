import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db-connect";
import { algorithm, key, iv } from "@/lib/encryption";
import { createDecipheriv } from "crypto";
import Container from "./components/container";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  const userId = session.user.id;
  let accounts = await prisma.account.findMany({
    where: {
      userId,
    },
  });
  accounts = accounts.map((account) => {
    const decipher = createDecipheriv(algorithm, key, iv);
    let decryptedPassword = decipher.update(account.password, "hex", "utf8");
    decryptedPassword += decipher.final("utf8");
    return {
      ...account,
      password: decryptedPassword,
    };
  });

  return (
    <div className="min-h-screen">
      <Container
        session={session}
        userId={session.user.id!}
        accounts={accounts}
      />
    </div>
  );
}
