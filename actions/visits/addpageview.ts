"use server";

import prisma from "../prisma";

import AddUniqueView from "./adduniqueview";

import IncrementViews from "../logs/increment-views";

export default async function AddPageView(project: string) {
  AddUniqueView(project);
  IncrementViews(project);

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
