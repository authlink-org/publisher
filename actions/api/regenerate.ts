"use server";

import { auth } from "@clerk/nextjs";
import prisma from "../prisma";

import { v4 } from "uuid";

export default async function RegenerateAPIKey(project: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, message: "Invalid p->call to entry" };

  const New = v4();
  await prisma.project.update({
    where: {
      id: project,
      profileClerk: userId,
    },
    data: {
      api_key: {
        set: New,
      },
    },
  });

  return { success: true, message: "Regenerated", api: New };
}
