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
  });

  return NextResponse.json(projects);
}
