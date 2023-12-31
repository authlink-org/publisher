"use server";

import prisma from "../prisma";

import { auth } from "@clerk/nextjs";

export async function GetProjects(clerk: string) {
  const { userId } = await auth();
  if (!userId) return;

  const Projects = await prisma.project.findMany({
    where: {
      profileClerk: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Projects;
}
