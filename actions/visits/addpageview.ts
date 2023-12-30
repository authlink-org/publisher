"use server";

import prisma from "../prisma";
import geoip from "geoip-country";

import { headers } from "next/headers";

const Day = 24 * 1000 * 60 * 60;

export default async function AddPageView(project: string) {
  const Ip = headers().get("x-forwarded-for") || "127.0.0.1";
  console.log(Ip);

  const Geo = geoip.lookup(Ip);

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
    if (User.date.getTime() > new Date().getTime() - Day) {
      console.log("User visited >24 hours ago");
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
      country_code: Geo.country,
      projectId: project,
    },
  });
}
