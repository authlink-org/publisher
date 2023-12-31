"use server";

import prisma from "../prisma";

import { auth } from "@clerk/nextjs";

export default async function DeleteProject(clerk: string, id: string) {
  const { userId } = await auth();
  if (!userId) return;

  await prisma.project.delete({
    where: {
      id: id,
      profileClerk: clerk,
    },
  });

  return { success: true, message: "Deleted the project." };
}
