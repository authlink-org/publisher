"use server";

import prisma from "../prisma";

export default async function ClerkExists(clerk: string) {
  const Profile = await prisma.profile.findFirst({
    where: {
      clerk: clerk,
    },
  });

  return Profile ? true : false;
}
