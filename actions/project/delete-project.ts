"use server";

import prisma from "../prisma";

export default async function DeleteProject(clerk: string, id: string) {
  await prisma.project.delete({
    where: {
      id: id,
      profileClerk: clerk,
    },
  });

  return { success: true, message: "Deleted the project." };
}
