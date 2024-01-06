import { z } from "zod";

export const ProfileValidator = z.object({
  username: z
    .string({
      required_error: "Username must be set.",
      invalid_type_error: "Username must be a string.",
    })
    .min(3, "Username must be longer than 2 characters.")
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
  allowFreeLicenses: z.boolean({
    invalid_type_error: "Allow Free Licenses must be a boolean",
    required_error: "Allow Free Licenses must be set.",
  }),
});

export const ProjectValidator = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be a string.",
      required_error: "Title must be set.",
    })
    .min(3, "Title must be longer than 3 characters.")
    .max(24, "Title must be 24 or less characters.")
    .regex(
      /^[A-z|0-9| ]*$/,
      "Title can only contain Spaces and normal characters."
    ),
  monetization_method: z.enum(["linkvertise", "workink"], {
    invalid_type_error: "Monetization Method doesn't have the correct type.",
    required_error: "Monetization Method must be set.",
  }),
  description: z
    .string({
      invalid_type_error: "Description must be a string.",
      required_error: "Description must be set.",
    })
    .min(21, "Description must be longer than 20 characters.")
    .max(300, "Description must be 300 or less characters."),
  active: z
    .boolean({
      invalid_type_error: "Active must be a boolean.",
      required_error: "Active must be set.",
    })
    .optional(),
  image_url: z
    .string({
      invalid_type_error: "Image URL must be a string.",
      required_error: "Image URL must be set.",
    })
    .url("Image URL must be a valid URL.")
    .includes("i.imgur.com", {
      message: "Image URL must be an Imgur.com link.",
    })
    .startsWith("https://", "Image URL must start with https.")
    .endsWith(".png", "Image URL must end with a png.")
    .optional(),
  youtube_url: z
    .string({
      invalid_type_error: "Youtube URL must be a string.",
      required_error: "Youtube URL must be set.",
    })
    .url("Youtube URL must be a valid URL.")
    .includes("www.youtube.com", {
      message: "Youtube URL must be a Youtube URL.",
    })
    .startsWith("https://", "Youtube URL must start with https.")
    .optional(),
});

export const LicenseValidator = z.object({
  date: z.date({
    invalid_type_error: "Date must be a date.",
    required_error: "Date must be set",
  }),
});
