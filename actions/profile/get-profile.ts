"use server";

import prisma from "../prisma";

import ClerkExists from "./clerk-exists";
import CreateProfile from "./create-profile";

export default async function GetProfile(clerk: string) {
  const Exists = await ClerkExists(clerk);
  if (!Exists) {
    await CreateProfile(clerk);
  }
  return await prisma.profile.findFirst({
    where: {
      clerk: clerk,
    },
  });
}
