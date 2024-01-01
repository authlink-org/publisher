"use server";

import IsUserValid from "../clerk/is-user-valid";
import prisma from "../prisma";

import ClerkExists from "./clerk-exists";
import CreateProfile from "./create-profile";

import { auth } from "@clerk/nextjs";

export default async function GetProfile() {
  const { userId } = auth();
  if (!userId) return;

  const Exists = await ClerkExists();
  if (!Exists) {
    await CreateProfile();
  }
  return await prisma.profile.findFirst({
    where: {
      clerk: userId,
    },
  });
}
