"use server";
import { prisma } from "@/db/prisma";
import { GuideSchema } from "@/schemas";
import * as z from "zod";

export async function GetAllGuides() {
  console.log("i triggerd");
  const guides = await prisma.guides.findMany({
    cacheStrategy: { swr: 60, ttl: 60 },
  });
  return guides;
}

export async function createGuide(values: z.infer<typeof GuideSchema>) {
  const validatedFields = GuideSchema.safeParse(values);
  console.log(validatedFields);
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
        icon: values.icon,
      },
    });
    return { success: "guide created succesfully" };
  } catch (err) {
    // console.log(err);
    return { error: "Failed to create guide" };
  }
}

export async function updateGuide(values: z.infer<typeof GuideSchema>) {
  const validatedFields = GuideSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const topicsArray =
    typeof values.topics === "string"
      ? values.topics.split(",").map((topic) => topic.trim()) // Split the string if necessary
      : values.topics;

  try {
    await prisma.guides.update({
      where: {
        id: values.id,
      },
      data: {
        title: values.title,
        description: values.description,
        week: values.week,
        difficulty: values.difficulty,
        modules: values.modules,
        duration: values.duration,
        guideLink: values.guideLink,
        topics: topicsArray,
        icon: values.icon,
      },
    });
    return { success: "guide updated succesfully" };
  } catch (err) {
    console.log(err);
    return { error: "Failed to update guide" };
  }
}

export async function deleteGuide(guideId: string, title: string) {
  try {
    await prisma.guides.delete({
      where: {
        id: guideId,
      },
    });
    return { success: "guide delete succesfully" };
  } catch (err) {
    console.log(err);
    return { error: "Failed to delete guide" };
  }
}
