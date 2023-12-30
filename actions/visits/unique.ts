"use server";

import prisma from "../prisma";

export default async function GetUniqueViews(id: string) {
  const Visits = await prisma.userVisit.count({
    where: {
      projectId: id,
    },
  });

  return Visits;
}
