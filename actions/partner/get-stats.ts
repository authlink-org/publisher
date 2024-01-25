"use server";

import { auth } from "@clerk/nextjs";
import prisma from "../prisma";

export default async function GetStats(Project: string) {
  const { userId } = await auth();
  if (!userId) return [];

  const Logs = await prisma.polarAdPostback.findMany({
    where: {
      source: Project,
    },
  });

  return Logs;
}
