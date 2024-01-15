"use server";

import { auth } from "@clerk/nextjs";
import prisma from "../prisma";
import { NoteValidator } from "../validators";

export default async function ChangeNote(License: string, Note: string) {
  const { userId } = await auth();
  if (!userId) return;

  const Result = NoteValidator.safeParse(Note);

  if (!Result.success) {
    return { success: false, message: Result.error.issues[0].message };
  }

  await prisma.license.update({
    where: {
      id: License,
      Project: {
        profileClerk: userId,
      },
    },
    data: {
      note: Note,
    },
  });

  return { success: true, message: "Successfully updated the note." };
}
