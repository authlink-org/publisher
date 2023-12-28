"use server";

import prisma from "../prisma";
import { ZodError, z } from "zod";

const Profile = z.object({
  username: z
    .string({
      required_error: "Username must be set.",
      invalid_type_error: "Username must be a string.",
    })
    .min(3, "Username must be longer than 3 characters.")
    .max(24, "Username must be 24 or less characters.")
    .regex(
      /^[A-z|0-9]*$/,
      "Your username cannot contain any special characters."
    ),
  aboutme: z
    .string({
      invalid_type_error: "About Me must be a string.",
    })
    .min(0)
    .max(400, "About me must be 400 or less characters")
    .optional(),
  linkvertise_api: z
    .string({
      invalid_type_error: "Linkvertise API must be a string.",
    })
    .min(0)
    .max(12, "Linkvertise API must be 12 or less characters.")
    .optional(),
  workink_api: z
    .string({
      invalid_type_error: "Work.Ink API must be a string.",
    })
    .min(0)
    .uuid("Work.Ink API must be a UUID.")
    .optional(),
});

import IsNameTaken from "./is-name-taken";
import ClerkExists from "./clerk-exists";

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
    Profile.parse({
      username: username,
      aboutme: aboutme,
      linkvertise_api: linkvertise_api,
      workink_api: workink_api,
    });

    prisma.profile.update({
      where: {
        clerk: clerk,
      },
      data: {
        username: username,
        aboutme: aboutme,
        linkvertise_api: linkvertise_api,
        workink_api: workink_api,
      },
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
