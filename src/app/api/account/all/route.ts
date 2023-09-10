import { prisma } from "@/lib/db-connect";
import { NextResponse } from "next/server";
import env from "@/lib/parse-env";

const { scryptSync, createCipheriv, createDecipheriv } = require("crypto");
const algorithm = "aes-192-cbc";
const key = scryptSync(env.ENCRYPTION_KEY_BASE, env.SALT, 24); //key
const iv = scryptSync(env.IVBASE, env.SALT, 16); // Initialization vector.

export async function GET() {
  try {
    let accounts = await prisma.account.findMany();
    accounts = accounts.map((account) => {
      const decipher = createDecipheriv(algorithm, key, iv);
      let decryptedPassword = decipher.update(account.password, "hex", "utf8");
      decryptedPassword += decipher.final("utf8");
      return {
        ...account,
        password: decryptedPassword,
      };
    });

    return NextResponse.json(accounts);
  } catch (error) {
    console.error(error);
    return NextResponse.json((error as Error).message, {
      status: 500,
    });
  }
}
