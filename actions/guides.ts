"use server";
import { prisma } from "@/db/prisma";
import redis from "@/lib/redis";
import { GuideSchema } from "@/schemas";
import * as z from "zod";

export async function GetAllGuides() {
  // console.log("I triggered -----------------------------------------");

  // Try to fetch the guides from Redis
  const cachedGuides = await redis.get("allGuides");

  if (cachedGuides) {
    // console.log("Returning cached guides");
    return JSON.parse(cachedGuides); // Parse the cached data before returning
  }

  // If no cached data, fetch from the database
  const guides = await prisma.guides.findMany();

  // Store the fetched data in Redis with an expiration time of 1 hour (3600 seconds)
  await redis.set("allGuides", JSON.stringify(guides));

  return guides;
}

// export async function GetAllGuides() {
//   console.log("i triggerd -----------------------------------------");
//   const guides = await prisma.guides.findMany({
//     cacheStrategy: { swr: 3600, ttl: 60 },
//   });
//   return guides;
// }

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
    await redis.del("allGuides");

    // Optionally, cache the new data immediately if needed
    await redis.set("allGuides", JSON.stringify(await GetAllGuides()));
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
    await redis.del("allGuides");

    // Optionally, cache the new data immediately if needed
    await redis.set("allGuides", JSON.stringify(await GetAllGuides()));
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
    await redis.del("allGuides");

    // Optionally, cache the new data immediately if needed
    await redis.set("allGuides", JSON.stringify(await GetAllGuides()));
    return { success: "guide delete succesfully" };
  } catch (err) {
    console.log(err);
    return { error: "Failed to delete guide" };
  }
}
