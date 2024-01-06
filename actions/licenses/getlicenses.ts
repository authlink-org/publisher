"use server";

import prisma from "../prisma";

import { auth } from "@clerk/nextjs";

export default async function GetLicenses(project: string) {
  const { userId } = await auth();
  if (!userId) return;

  const Licenses = await prisma.license.findMany({
    where: {
      projectId: project,
      Project: {
        profileClerk: userId,
      },
    },
  });

  return Licenses;
}
