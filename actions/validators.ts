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
});

export const NoteValidator = z
  .string({
    invalid_type_error: "Note must be a string.",
  })
  .min(0, "Note lenght cannot be less than 0 characters.")
  .max(20, "Note lenght cannot be longer than 20 characters.")
  .optional();

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
  monetization_method: z.enum(["linkvertise", "workink", "lootlabs"], {
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
  allowFreeLicenses: z.boolean({
    invalid_type_error: "Allow Free Licenses must be a boolean",
    required_error: "Allow Free Licenses must be set.",
  }),
});

export const LicenseValidator = z.object({
  date: z.date({
    invalid_type_error: "Date must be a date.",
    required_error: "Date must be set",
  }),
});

export const LootlabsValidator = z.object({
  ad_control: z.enum(["tier-1", "tier-2", "tier-3"]),
  tasks: z
    .number({
      required_error: "Task Amount must be set.",
      invalid_type_error: "Task Amount must be a number.",
    })
    .min(1, "Task Amount must be above 0.")
    .max(5, "Task Amount cannot be above 5."),
  theme: z.enum(["theme-1", "theme-2", "theme-3", "theme-4", "theme-5"]),
  api: z
    .string({
      required_error: "API Key must be set.",
      invalid_type_error: "API Key must be a string.",
    })
    .min(64, "API Key must be a valid key.")
    .max(64, "API Key must be a valid key."),
});
