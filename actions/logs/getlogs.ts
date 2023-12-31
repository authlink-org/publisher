"use server";

import prisma from "../prisma";

export default async function GetLogs(project: string) {
  const Today = new Date();
  Today.setUTCHours(1, 0, 0, 0);
  const WeekAgo = new Date();
  WeekAgo.setDate(Today.getUTCDate() - 7);

  const Logs = await prisma.log.groupBy({
    where: {
      projectId: project,
      date: {
        lte: Today,
        gte: WeekAgo,
      },
    },
    by: ["views", "validations", "skips", "date"],
    orderBy: {
      date: "desc",
    },
  });

  return Logs;
}
