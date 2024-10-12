import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { withOptimize } from "@prisma/extension-optimize";

// Define the extended PrismaClient type
const ExtendedPrismaClient = new PrismaClient()
  .$extends(withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY as string }))
  .$extends(withAccelerate());

// Use this extended type for globalForPrisma
const globalForPrisma = globalThis as unknown as {
  prisma: typeof ExtendedPrismaClient;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient()
    .$extends(withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY as string }))
    .$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export const prisma = new PrismaClient()
//   .$extends(withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY as string }))
//   .$extends(withAccelerate());
