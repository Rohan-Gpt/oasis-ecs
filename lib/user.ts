import { prisma } from "@/db/prisma";

export async function getUserByEmail(email: string) {
  try {
    const reponse = await prisma.user.findFirst({ where: { email } });
  } catch (err) {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const reponse = await prisma.user.findFirst({ where: { id } });
  } catch (err) {
    return null;
  }
}
