"use server"

import prisma from '../prisma'

export default async function IsNameTaken(
  clerk: string,
  username: string,
) {
  const Profile = await prisma.profile.findFirst({
    where: {
      username: username
    }
  })

  return Profile ? Profile.clerk === clerk ? false : true : false
}