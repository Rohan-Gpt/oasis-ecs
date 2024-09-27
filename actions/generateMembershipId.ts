import { prisma } from "@/db/prisma"

export async function generateMembershipId(): Promise<string> {
  const counter = await prisma.membershipCounter.upsert({
    where: { id: 1 },
    update: { count: { increment: 1 } },
    create: { id: 1, count: 1 },
  })

  const paddedCount = counter.count.toString().padStart(4, '0')
  return `OASIS/GNIT/${paddedCount}`
}