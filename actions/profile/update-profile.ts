"use server";

import prisma from "../prisma";
import { ZodError, z } from "zod";

import IsNameTaken from "./is-name-taken";
import ClerkExists from "./clerk-exists";

import { ProfileValidator } from "../validators";

import { auth } from "@clerk/nextjs";

export default async function UpdateProfile(
  // new values
  username: string,
  aboutme?: string,
  linkvertise_api?: string,
  workink_api?: string
) {
  const { userId } = await auth();
  if (!userId) return;
  console.log("Updating profile.");
  const Taken = await IsNameTaken(userId, username);
  if (Taken) {
    return { success: false, message: "Username is already taken." };
  }

  try {
    ProfileValidator.parse({
      username: username,
      aboutme: aboutme,
      linkvertise_api: linkvertise_api,
      workink_api: workink_api,
    });

    await prisma.profile
      .update({
        where: {
          clerk: userId,
        },
        data: {
          username: username,
          aboutme: aboutme,
          linkvertise_api: linkvertise_api,
          workink_api: workink_api,
        },
      })
      .catch((Err) => {
        console.error(Err);
      });

    return {
      success: true,
      message: "Your profile has been updated.",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        from: error.issues[0].path[0],
        message: error.issues[0].message,
      };
    }
  }
}
