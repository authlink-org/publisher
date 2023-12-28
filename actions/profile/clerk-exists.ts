"use server";

import prisma from "../prisma";

export default async function ClerkExists(clerk: string) {
  console.log("Finding Clerk", clerk);
  const Profile = await prisma.profile.findFirst({
    where: {
      clerk: clerk,
    },
  });

  console.log("Clerk exists:", !!Profile);

  return Profile ? true : false;
}
