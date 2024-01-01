"use server";

import prisma from "../prisma";

import { auth } from "@clerk/nextjs";

export default async function ClerkExists() {
  const { userId } = await auth();
  if (!userId) return;

  const Profile = await prisma.profile.findFirst({
    where: {
      clerk: userId,
    },
  });

  return Profile ? true : false;
}
