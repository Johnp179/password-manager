import { prisma } from "@/lib/db-connect";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import envVars from "@/lib/parse-env";
import { AccountValidator } from "@/lib/validators";

const { scryptSync, createCipheriv, createDecipheriv } = require("crypto");
const algorithm = "aes-192-cbc";
const key = scryptSync(envVars.ENCRYPTION_KEY_BASE, envVars.SALT, 24); //key
const iv = scryptSync(envVars.IVBASE, envVars.SALT, 16); // Initialization vector.

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id } = params;
    const { name, password } = AccountValidator.parse(await req.json());
    const cipher = createCipheriv(algorithm, key, iv);
    let encryptedPassword = cipher.update(password, "utf8", "hex");
    encryptedPassword += cipher.final("hex");
    const user = await prisma.account.update({
      data: {
        name,
        password: encryptedPassword,
      },
      where: {
        id,
      },
    });
    return NextResponse.json(user);
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

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id } = params;
    const user = await prisma.account.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json((error as Error).message, {
      status: 500,
    });
  }
}
