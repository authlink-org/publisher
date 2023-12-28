"use server";

import prisma from "../prisma";

import { generateUsername } from "unique-username-generator";

export default async function CreateProfile(clerk: string, email: string) {
  await prisma.profile.create({
    data: {
      clerk: clerk,
      username: generateUsername(),
      views: 0,
    },
  });
}
