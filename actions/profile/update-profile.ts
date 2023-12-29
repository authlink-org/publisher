"use server";

import prisma from "../prisma";
import { ZodError, z } from "zod";

import IsNameTaken from "./is-name-taken";
import ClerkExists from "./clerk-exists";

import { ProfileValidator } from "../validators";

export default async function UpdateProfile(
  clerk: string,
  // new values
  username: string,
  aboutme?: string,
  linkvertise_api?: string,
  workink_api?: string
) {
  console.log("Updating profile.");
  const Taken = await IsNameTaken(clerk, username);
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
          clerk: clerk,
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
