"use server";

import { ProjectValidator } from "../validators";

import prisma from "../prisma";

import { auth } from "@clerk/nextjs";

export default async function CreateProject(
  title: string,
  description: string,
  monetization_method: string,
  image_url?: string,
  youtube_url?: string
) {
  const { userId } = await auth();
  if (!userId) return;

  const ValidationResult = ProjectValidator.safeParse({
    title: title,
    description: description,
    image_url: image_url,
    youtube_url: youtube_url,
    monetization_method: monetization_method,
  });

  if (!ValidationResult.success) {
    return {
      success: false,
      message: ValidationResult.error.issues[0].message,
    };
  }

  await prisma.project.create({
    data: {
      title: title,
      description: description,
      image_url: image_url,
      youtube_url: youtube_url,
      monetization_method: monetization_method,
      profileClerk: userId,
    },
  });

  return {
    success: true,
    message: "Your project has been created.",
  };
}
