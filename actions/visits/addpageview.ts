"use server";

import prisma from "../prisma";

import ip3country from "ip3country";
ip3country.init();

export default async function AddPageView(project: string) {
  await prisma.project.update({
    where: {
      id: project,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}
