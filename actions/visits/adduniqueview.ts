"use server";

import prisma from "../prisma";

import ip3country from "ip3country";
ip3country.init();

import { headers } from "next/headers";

export default async function AddUniqueView(project: string) {
  const Ip = headers().get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

  const Geo = ip3country.lookupStr(Ip);

  if (!Geo && Ip !== "::1") {
    return;
  }

  const User = await prisma.userVisit.findFirst({
    where: {
      ip: Ip,
      projectId: project,
    },
  });

  if (User) {
    const Id = User.id;
    if (User.date.toDateString() !== new Date().toDateString()) {
      await prisma.userVisit.update({
        where: {
          id: Id,
          ip: Ip,
        },
        data: {
          date: new Date(),
        },
      });
      return;
    }

    return;
  }

  await prisma.userVisit.create({
    data: {
      ip: Ip,
      country_code: Geo || "PL",
      projectId: project,
    },
  });
}
