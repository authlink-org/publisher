"use server";

import { ProjectValidator } from "../validators";

export default function CreateProject(
  clerk: string,

  title: string,
  description: string,
  image_url?: string,
  youtube_url?: string
) {
  const ValidationResult = ProjectValidator.safeParse({
    title: title,
    description: description,
    image_url: image_url,
    youtube_url: youtube_url,
  });

  if (!ValidationResult.success) {
    return {
      success: false,
      message: ValidationResult.error.issues[0].message,
    };
  }
}
