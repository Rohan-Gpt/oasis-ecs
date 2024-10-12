import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function GET() {
  const guides = await prisma.guides.findMany({
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  return NextResponse.json(guides);
}
