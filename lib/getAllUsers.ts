import { cache } from "react";
import { prisma } from "@/db/prisma";

export const getAllUsers = cache(async () => {
    const users = await prisma.user.findMany({
        select:{
          membershipId: true,
        }
      });
    return users;
})
