"use server";

import { auth } from "@clerk/nextjs";
import { z } from "zod";

import prisma from "../prisma";

export default async function UpdateFreeLicenseTime(
  project: string,
  hours: number
) {
  const { userId } = await auth();
  if (!userId) return;

  const Validator = z.object({
    hours: z
      .number({
        required_error: "Hours must be set",
        invalid_type_error: "Hours must be a number.",
      })
      .min(1, "Hours cannot be less than 1.")
      .max(72, "Hours cannot be more than 72."),
  });

  const Result = Validator.safeParse({
    hours: hours,
  });

  if (!Result.success) {
    return {
      success: false,
      message: Result.error.issues[0].message,
    };
  }

  await prisma.project.update({
    where: {
      profileClerk: userId,
      id: project,
    },
    data: {
      freeLicenseHours: hours,
    },
  });

  return {
    success: true,
    message: "Edited license hours.",
  };
}
