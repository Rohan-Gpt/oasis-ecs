"use server";
import { prisma } from "@/db/prisma";
import redis from "@/lib/redis";
import { WorkshopSchema } from "@/schemas";
import { format } from "date-fns";
import * as z from "zod";

export async function GetAllWorkshops() {
  const cachedWorkshops = await redis.get("allWorkshops");

  if (cachedWorkshops) {
    return JSON.parse(cachedWorkshops);
  }
  const Workshops = await prisma.schedule.findMany();
  await redis.set("allWorkshops", JSON.stringify(Workshops));
  return Workshops;
}

export async function createWorkshop(values: z.infer<typeof WorkshopSchema>) {
  const validatedFields = WorkshopSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const date = format(new Date(values.date), "MMM d, yyyy");
  console.log(values);
  try {
    await prisma.schedule.create({
      data: {
        date,
        time: values.time,
        topic: values.topic,
        host: values.host,
        type: values.type,
      },
    });
    redis.del("allWorkshops");

    await redis.set("allWorkshops", JSON.stringify(await GetAllWorkshops()));
    return { success: "Workshop created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Internal Server Error" };
  }
}

export async function UpdateWorkshop(values: z.infer<typeof WorkshopSchema>) {
  const validatedFields = WorkshopSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const date = format(new Date(values.date), "MMM d, yyyy");
  try {
    await prisma.schedule.update({
      where: {
        id: values.id,
      },
      data: {
        date,
        time: values.time,
        topic: values.topic,
        host: values.host,
        type: values.type,
      },
    });
    redis.del("allWorkshops");

    await redis.set("allWorkshops", JSON.stringify(await GetAllWorkshops()));

    return { success: "Workshop updated successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Internal Server Error" };
  }
}

export async function DeleteWorkshop(id: number, topic: string) {
  try {
    await prisma.schedule.delete({
      where: {
        id,
        topic,
      },
    });
    redis.del("allWorkshops");

    await redis.set("allWorkshops", JSON.stringify(await GetAllWorkshops()));
    return { success: "Workshop deleted successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Internal Server Error" };
  }
}
