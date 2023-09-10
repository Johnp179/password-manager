import { prisma } from "@/lib/db-connect";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const Validator = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

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
    const { name, email, password } = Validator.parse(await req.json());

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
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
    const user = await prisma.user.delete({
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
