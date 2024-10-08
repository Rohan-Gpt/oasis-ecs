"use server";
import { prisma } from "@/db/prisma";
import { ProjectSchema } from "@/schemas";
import * as z from "zod";
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
    return { success: "project delete succesfully" };
  } catch (err) {
    console.log(err);
    return { error: "Failed to delete project" };
  }
}
