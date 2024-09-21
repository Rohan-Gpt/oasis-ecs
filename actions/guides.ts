"use server";
import { prisma } from "@/db/prisma";
import { GuideSchema } from "@/schemas";
import * as z from "zod";

export async function createGuide(values: z.infer<typeof GuideSchema>) {
  const validatedFields = GuideSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const topicsArray =
    typeof values.topics === "string"
      ? values.topics.split(",").map((topic) => topic.trim()) // Split the string if necessary
      : values.topics;

  try {
    await prisma.guides.create({
      data: {
        title: values.title,
        description: values.description,
        week: values.week,
        difficulty: values.difficulty,
        modules: values.modules,
        duration: values.duration,
        guideLink: values.guideLink,
        topics: topicsArray,
        icon: "",
      },
    });
    return { success: "guide created succesfully" };
  } catch (err) {
    console.log(err);
    return { error: "Failed to create guide" };
  }
}
