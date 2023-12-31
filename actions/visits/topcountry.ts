"use server";

import prisma from "../prisma";
import { auth } from "@clerk/nextjs";

export default async function GetTopCountry(id: string, max: number = 1) {
  if (max > 25) {
    return;
  }

  const { userId } = await auth();
  if (!userId) return;

  const Visits = await prisma.userVisit.groupBy({
    where: {
      projectId: id,
      Project: {
        profileClerk: userId,
      },
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
