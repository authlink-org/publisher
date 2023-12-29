"use server";
import { clerkClient } from "@clerk/nextjs";

export default async function IsUserValid(Clerk: string) {
  const User = await clerkClient.users.getUser(Clerk);

  return User ? true : false;
}
