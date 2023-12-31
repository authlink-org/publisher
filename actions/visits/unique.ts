"use server";

import prisma from "../prisma";

import { auth } from "@clerk/nextjs";

export default async function GetUniqueViews(id: string) {
  const { userId } = await auth();
  if (!userId) return;

  const Visits = await prisma.userVisit.count({
    where: {
      projectId: id,
      Project: {
        profileClerk: userId,
      },
    },
  });

  return Visits;
}
