"use server";
import { prisma } from "@/db/prisma";
import redis from "@/lib/redis";
import { ProjectSchema } from "@/schemas";
import * as z from "zod";

// export async function GetAllProjects() {
//   console.log("am triggerd ");
//   const projects = await prisma.project.findMany({
//     include: {
//       team: {
//         select: {
//           name: true,
//         },
//       },
//     },
//     cacheStrategy: { swr: 60, ttl: 60 },
//   });
//   return projects;
// }

export async function GetAllProjects() {
  // console.log("I triggered -----------------------------------------");

  const cachedProjects = await redis.get("allProjects");

  if (cachedProjects) {
    // console.log("Returning cached projects");
    return JSON.parse(cachedProjects);
  }

  // If no cached data, fetch from the database
  const projects = await prisma.project.findMany({
    include: {
      team: {
        select: {
          name: true,
        },
      },
    },
  });
  await redis.set("allProjects", JSON.stringify(projects));

  return projects;
}

export async function createProject(values: z.infer<typeof ProjectSchema>) {
  const validatedFields = ProjectSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const technologiesArray =
    typeof values.technologies === "string"
      ? values.technologies.split(",").map((topic) => topic.trim()) // Split the string if necessary
      : values.technologies;

  try {
    await prisma.project.create({
      data: {
        title: values.title,
        description: values.description,
        technologies: technologiesArray,
        icon: values.icon,
      },
    });
    await redis.del("allProjects");

    await redis.set("allProjects", JSON.stringify(await GetAllProjects()));
    return { success: "project created succesfully" };
  } catch (err) {
    console.log(err);
    return { error: "Failed to create project" };
  }
}

export async function updateProject(values: z.infer<typeof ProjectSchema>) {
  const validatedFields = ProjectSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const technologiesArray =
    typeof values.technologies === "string"
      ? values.technologies.split(",").map((topic) => topic.trim()) // Split the string if necessary
      : values.technologies;

  try {
    await prisma.project.update({
      where: {
        id: values.id,
      },
      data: {
        title: values.title,
        description: values.description,
        technologies: technologiesArray,
        icon: values.icon,
      },
    });
    await redis.del("allProjects");

    await redis.set("allProjects", JSON.stringify(await GetAllProjects()));
    return { success: "project updated succesfully" };
  } catch (err) {
    console.log(err);
    return { error: "Failed to update project" };
  }
}

export async function deleteProject(projectId: number, title: string) {
  try {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    await redis.del("allProjects");

    await redis.set("allProjects", JSON.stringify(await GetAllProjects()));
    return { success: "project delete succesfully" };
  } catch (err) {
    console.log(err);
    return { error: "Failed to delete project" };
  }
}
