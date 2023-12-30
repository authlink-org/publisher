"use server";

import prisma from "../prisma";

export default async function GetTopCountry(id: string, max: number = 1) {
  if (max > 10) {
    return;
  }

  const Visits = await prisma.userVisit.groupBy({
    where: {
      projectId: id,
    },
    by: "country_code",
    _count: {
      country_code: true,
    },
    orderBy: {
      _count: {
        country_code: "desc",
      },
    },
    take: max,
  });

  return Visits;
}
