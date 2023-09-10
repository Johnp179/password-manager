import { prisma } from "@/lib/db-connect";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AccountValidator } from "@/lib/validators";
import { algorithm, key, iv } from "@/lib/encryption";
import { createCipheriv, createDecipheriv } from "crypto";

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  }
) {
  try {
    const { userId } = params;
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

    return NextResponse.json(accounts);
  } catch (error) {
    console.error(error);
    return NextResponse.json((error as Error).message, {
      status: 500,
    });
  }
}

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  }
) {
  try {
    const { userId } = params;
    const { name, password } = AccountValidator.parse(await req.json());
    const cipher = createCipheriv(algorithm, key, iv);
    let encryptedPassword = cipher.update(password, "utf8", "hex");
    encryptedPassword += cipher.final("hex");

    await prisma.account.create({
      data: {
        name,
        password: encryptedPassword,
        userId,
      },
    });
    return NextResponse.json("account added");
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(error, {
        status: 400,
      });
    }
    return NextResponse.json((error as Error).message, {
      status: 500,
    });
  }
}
