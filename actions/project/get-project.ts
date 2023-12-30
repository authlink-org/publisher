"use server";

import prisma from "../prisma";

export async function GetProject(clerk: string, id: string) {
  const Project = await prisma.project.findFirst({
    where: {
      id: id,
      profileClerk: clerk,
    },
  });

  return Project;
}
