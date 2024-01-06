"use server";

import { auth } from "@clerk/nextjs";

import prisma from "../prisma";

export default async function ResetAuth(project: string, license: string) {
  const { userId } = auth();
  if (!userId) return;

  await prisma.license.update({
    where: {
      id: license,
      projectId: project,
    },
    data: {
      auth: "Not claimed",
    },
  });

  return {
    success: true,
    message: "Reset auth.",
  };
}
