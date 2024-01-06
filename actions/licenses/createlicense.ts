"use server";

import { auth } from "@clerk/nextjs";
import { LicenseValidator } from "../validators";

import prisma from "../prisma";

export default async function CreateLicense(project: string, expire: Date) {
  const { userId } = auth();
  if (!userId) return;

  const Response = LicenseValidator.safeParse({
    date: expire,
  });
  if (!Response.success) {
    return {
      success: false,
      message: Response.error.issues[0].message,
    };
  }

  await prisma.license.create({
    data: {
      projectId: project,
      expire: expire,
    },
  });

  return {
    success: true,
    message: "Generated a new license.",
  };
}
