"use server";

import prisma from "../prisma";

import { generateUsername } from "unique-username-generator";

import { auth } from "@clerk/nextjs";

export default async function CreateProfile() {
  const { userId } = await auth();
  if (!userId) return;

  await prisma.profile.create({
    data: {
      clerk: userId,
      username: generateUsername(),
    },
  });
}
