import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function GET() {
  const guides = await prisma.guides.findMany();

  return NextResponse.json(guides);
}
