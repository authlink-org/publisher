"use client";

import { useClerk } from "@clerk/nextjs";
import GetProfile from "@/actions/profile/get-profile";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import SignOutPrompt from "./extra/signout";
import UpdateProfileButton from "./extra/updateprofile";
import { useState } from "react";

export default function User() {
  const Clerk = useClerk();
  const [Open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <Avatar>
              <AvatarImage src={Clerk.user?.imageUrl} />
              <AvatarFallback>
                {(Clerk.user?.firstName || "A").charAt(0) +
                  (Clerk.user?.lastName || "B").charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {Clerk.user?.firstName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {Clerk.user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <UpdateProfileButton />
          <SignOutPrompt />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
