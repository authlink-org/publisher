"use server";

import prisma from "../prisma";

export async function GetProjects(clerk: string) {
  const Projects = await prisma.project.findMany({
    where: {
      profileClerk: clerk,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Projects;
}
