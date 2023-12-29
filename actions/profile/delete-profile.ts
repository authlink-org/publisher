"use server";

import prisma from "../prisma";

export default async function DeleteProfile(clerk: string) {
  await prisma.profile.delete({
    where: {
      clerk: clerk,
    },
  });
}
