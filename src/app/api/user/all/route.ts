import { prisma } from "@/lib/db-connect";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function DELETE() {
  const count = await prisma.user.deleteMany({});
  return NextResponse.json(count);
}
