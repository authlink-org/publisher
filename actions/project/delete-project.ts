"use server";

import prisma from "../prisma";

import { auth } from "@clerk/nextjs";

export default async function DeleteProject(id: string) {
  const { userId } = await auth();
  if (!userId) return;

  await prisma.project.delete({
    where: {
      id: id,
      profileClerk: userId,
    },
  });

  return { success: true, message: "Deleted the project." };
}
