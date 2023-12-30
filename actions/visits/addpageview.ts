"use server";

import prisma from "../prisma";

import ip3country from "ip3country";
ip3country.init();

import { headers } from "next/headers";

export default async function AddPageView(project: string) {
  const Ip = headers().get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

  const Geo = ip3country.lookupStr(Ip);

  if (!Geo) {
    console.log("Geo doesnt exist");
    return;
  }

  const User = await prisma.userVisit.findFirst({
    where: {
      ip: Ip,
    },
  });

  if (User) {
    console.log("User exists");
    if (User.date.toDateString() !== new Date().toDateString()) {
      console.log("User visited 1 day or more ago");
      await prisma.userVisit.update({
        where: {
          ip: Ip,
        },
        data: {
          date: new Date(),
        },
      });
      console.log("Updated user visit date");
      return;
    }

    return;
  }

  console.log("Generating unique user visit");
  await prisma.userVisit.create({
    data: {
      ip: Ip,
      country_code: Geo,
      projectId: project,
    },
  });
}
