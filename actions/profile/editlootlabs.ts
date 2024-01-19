"use server";

import { LootlabsValidator } from "../validators";

import prisma from "../prisma";
import { auth } from "@clerk/nextjs";

export default async function EditLootlabs(
  api: string,
  advertisement_control: string,
  amount_of_tasks: number,
  theme: string
) {
  const { userId } = await auth();
  if (!userId) return { success: false, message: "" };

  console.log(userId);

  const Result = LootlabsValidator.safeParse({
    ad_control: advertisement_control,
    tasks: amount_of_tasks,
    theme: theme,
    api: api,
  });

  if (!Result.success) {
    return { success: false, message: Result.error.issues[0].message };
  }

  await prisma.profile.update({
    where: {
      clerk: userId,
    },
    data: {
      lootlabs_number_of_tasks: amount_of_tasks,
      lootlabs_tier_id: Number(advertisement_control.replaceAll("tier-", "")),
      lootlabs_theme: Number(theme.replaceAll("theme-", "")),
      lootlabs_api: api,
    },
  });

  return { success: true, message: "Updated LootLabs Integration" };
}
