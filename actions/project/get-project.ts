"use server";

import prisma from "../prisma";
import { auth } from "@clerk/nextjs";

export async function GetProject(clerk: string, id: string) {
  const { userId } = await auth();
  if (!userId) return;

  const Project = await prisma.project.findFirst({
    where: {
      id: id,
      profileClerk: userId,
    },
  });

  return Project;
}
