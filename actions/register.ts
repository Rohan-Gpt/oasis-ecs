"use server";
import { prisma } from "@/db/prisma";
import { RegisterSchema } from "@/schemas";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

import * as z from "zod";
import { generateMembershipId } from "./generateMembershipId";

export async function Register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name, department, semester } = validatedFields.data;
  const hashedPassword = await hash(password, 10);

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "User already exists" };
  }
  const membershipId = await generateMembershipId();
  // console.log("this is the memid",membershipId)
  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "USER",
        membershipId,
        department,
        semester,
      },
    });
    // redirect("/auth/login");
    return { success: "User Created please login" };
  } catch (error) {
    return { error: "error in registering user" };
  }
}
