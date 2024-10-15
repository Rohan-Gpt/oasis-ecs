"use server";

import { prisma } from "@/db/prisma";
import { currentUser } from "@/lib/getSession";
import redis from "@/lib/redis";
import { CreateTeamSchema } from "@/schemas/index";
import { GetAllProjects } from "./project";

export async function createTeam(
  teamName: string,
  membershipId: string[],
  projectId: number
) {
  console.log("inside createTeam");
  console.log("Input Data:", { teamName, membershipId });

  const parsedData = CreateTeamSchema.safeParse({ teamName, membershipId });
  console.log("Parsed Data:", parsedData);

  if (!parsedData.success) {
    console.error("Validation Error:", parsedData.error);
    return { error: "atleast 1 member is requierd" };
  }

  const user = await currentUser();
  if (!user?.email) {
    console.error("Current user email not found");
    return { error: "Current user email not found" };
  }

  const leader = await prisma.user.findUnique({
    where: { email: user.email },
    select: { id: true },
  });

  if (!leader?.id) {
    console.error("Leader ID not found for the current user");
    return { error: "Leader ID not found for the current user" };
  }

  const existingMembers = await prisma.user.findMany({
    where: { membershipId: { in: parsedData.data.membershipId } },
    select: { id: true, membershipId: true },
  });

  // Extract IDs of existing members and check for non-existent ones
  const existingMemberIds = existingMembers.map((member) => member.id);
  const nonExistingMemberIds = parsedData.data.membershipId.filter(
    (id) => !existingMembers.some((member) => member.membershipId === id)
  );

  if (nonExistingMemberIds.length > 0) {
    console.error("Some membership IDs do not exist:", nonExistingMemberIds);
    return {
      error: `Some membership IDs do not exist: ${nonExistingMemberIds.join(
        ", "
      )}`,
    };
  }

  try {
    const team = await prisma.team.create({
      data: {
        name: parsedData.data.teamName,
        leader: {
          connect: { id: leader.id },
        },
        projects: {
          connect: { id: projectId },
        },
        members: {
          connect: existingMembers.map((member) => ({ id: member.id })),
        },
      },
    });
    await prisma.project.update({
      where: { id: projectId },
      data: {
        chosen: true,
        team: {
          connect: { id: team.id },
        },
      },
    });
    await redis.del("allProjects");

    await redis.set("allProjects", JSON.stringify(await GetAllProjects()));
    return { success: "Team created successfully", team };
  } catch (error) {
    console.error("Error creating team:", error);
    return { error: "An error occurred while creating the team" };
  }
}
