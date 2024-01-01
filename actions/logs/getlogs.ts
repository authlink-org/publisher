"use server";

import prisma from "../prisma";

import { auth } from "@clerk/nextjs";

export default async function GetLogs(project: string) {
  const { userId } = await auth();

  const Today = new Date();
  Today.setUTCHours(1, 0, 0, 0);
  const WeekAgo = new Date();
  WeekAgo.setDate(Today.getUTCDate() - 7);

  const Logs = await prisma.log.groupBy({
    where: {
      projectId: project,
      Project: {
        profileClerk: userId,
      },
      date: {
        lte: Today,
        gte: WeekAgo,
      },
    },
    by: ["views", "validations", "skips", "date"],
    orderBy: {
      date: "asc",
    },
  });

  return Logs;
}
