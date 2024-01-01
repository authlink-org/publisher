"use server";

import { auth } from "@clerk/nextjs";
import prisma from "../prisma";

export default async function DeleteProfile() {
  const { userId } = await auth();

  if (!userId) return;

  await prisma.profile.delete({
    where: {
      clerk: userId,
    },
  });
}
