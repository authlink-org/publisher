"use server";

import IsUserValid from "../clerk/is-user-valid";
import prisma from "../prisma";

import ClerkExists from "./clerk-exists";
import CreateProfile from "./create-profile";

export default async function GetProfile(clerk: string) {
  IsUserValid(clerk);

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
