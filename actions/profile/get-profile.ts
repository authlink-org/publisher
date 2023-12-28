"use server";

import prisma from "../prisma";

import ClerkExists from "./clerk-exists";
import CreateProfile from "./create-profile";

export default async function GetProfile(clerk: string, email: string) {
  const Exists = await ClerkExists(clerk);
  if (!Exists) {
    await CreateProfile(clerk, email);
  }
  return await prisma.profile.findFirst({
    where: {
      clerk: clerk,
    },
  });
}
