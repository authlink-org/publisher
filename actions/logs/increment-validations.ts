"use server";

import prisma from "../prisma";

export default async function IncrementViews(project: string) {
  const Today = new Date();
  Today.setHours(1, 0, 0, 0);
  await prisma.log.updateMany({
    where: {
      projectId: project,
      date: Today,
    },
    data: {
      validations: {
        increment: 1,
      },
    },
  });
}
