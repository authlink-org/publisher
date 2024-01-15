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
import {
  Contact2Icon,
  ContactIcon,
  Link2Icon,
  ShieldAlertIcon,
  User2Icon,
} from "lucide-react";

import { useClerk } from "@clerk/nextjs";

import { SelectProject } from "./extra/selectproject";
import { useEffect } from "react";

import ClerkExists from "@/actions/profile/clerk-exists";
import Image from "next/image";

import { CrosshairIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    <div>
      <div className="border-b-2">
        <div className="container mx-auto px-4 m-3">
          <div className="flex justify-between">
            <div className="flex justify-between mt-1 mr-3">
              <h2 className="scroll-m-20 mt-1.5 mr-4 text-xl font-semibold text-lime-500">
                {/* <a href="/">AuthLink</a> */}
                <a href="/">
                  <Image
                    src="/authlink-logo-full.svg"
                    width={"150"}
                    height={"0"}
                    alt="AuthLink Logo"
                  />
                </a>
              </h2>
            </div>
            <div className="flex flex-row mt-1">
              <User />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 container mx-auto">
        <Alert>
          <User2Icon className="h-4 w-4" />
          <AlertTitle>Account manager contact.</AlertTitle>
          <AlertDescription>
            You can contact your account manager on discord by sending a friend
            request: <b>eax.al</b>.
          </AlertDescription>
        </Alert>
      </div>
      <div className="mt-2 container mx-auto">
        <Alert>
          <Contact2Icon className="h-4 w-4" />
          <AlertTitle>
            New Loader Version is now out. (<b>v1.1</b>)
          </AlertTitle>
          <AlertDescription>
            <a
              href="https://authlink.canny.io/changelog/changelog-2"
              className="underline underline-offset-4 text-green-300"
            >
              <b>Read Latest Changelog.</b>
            </a>
            <br />
            Join our{" "}
            <a
              className="underline underline-offset-4"
              href="https://t.me/authlink"
              target="telegram"
            >
              Telegram Channel
            </a>{" "}
            to recieve update notifications.
            <br />
            You can also request new features on our{" "}
            <a
              className="underline underline-offset-4"
              href="https://authlink.canny.io/feature-requests"
              target="feature-requests"
            >
              Community Board
            </a>
            .
            <br />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
