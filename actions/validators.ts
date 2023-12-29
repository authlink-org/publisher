import { z } from "zod";

export const ProfileValidator = z.object({
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
    .regex(/^[0-9]*$/, "Linkvertise API must only contain numbers.")
    .optional(),
  workink_api: z
    .string({
      invalid_type_error: "Work.Ink API must be a string.",
    })
    .min(0)
    .uuid("Work.Ink API must be a UUID.")
    .optional(),
});
