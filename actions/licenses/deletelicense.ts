"use server";

import { auth } from "@clerk/nextjs";
import { LicenseValidator } from "../validators";

import prisma from "../prisma";

export default async function DeleteLicense(project: string, license: string) {
  const { userId } = auth();
  if (!userId) return;

  await prisma.license.delete({
    where: {
      id: license,
      projectId: project,
    },
  });

  return {
    success: true,
    message: "Deleted license.",
  };
}
