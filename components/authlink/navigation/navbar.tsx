"use client";

import { Button } from "@/components/ui/button";
import User from "./user";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link2Icon } from "lucide-react";

import { useClerk } from "@clerk/nextjs";

import { SelectProject } from "./extra/selectproject";
import { useEffect } from "react";

import ClerkExists from "@/actions/profile/clerk-exists";

export default function Navbar() {
  const Clerk = useClerk();

  useEffect(() => {
    if (!Clerk.user) return;

    ClerkExists().then((Resp) => {
      if (!Resp) {
        window.location.href = "/setup";
      }
    });
  }, [Clerk.user]);

  return (
    <div className="border-b-2">
      <div className="container mx-auto px-4 m-3">
        <div className="flex justify-between">
          <div className="flex justify-between mt-1 mr-3">
            <h2 className="scroll-m-20 mt-1.5 mr-4 text-xl font-semibold text-lime-500">
              <a href="/">AuthLink</a>
            </h2>
          </div>
          <div className="flex flex-row mt-1">
            <User />
          </div>
        </div>
      </div>
    </div>
  );
}
