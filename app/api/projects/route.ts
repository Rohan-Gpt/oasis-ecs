import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: {
      team: {
        select: {
          name: true,
        },
      },
    },
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  return NextResponse.json(projects);
}
