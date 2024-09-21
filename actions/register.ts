"use server";
import { prisma } from "@/db/prisma";
import { RegisterSchema } from "@/schemas";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

import * as z from "zod";

export async function Register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await hash(password, 10);

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "User already exists" };
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "USER",
    },
  });
  // redirect("/auth/login");
  return { success: "User Created" };
}
