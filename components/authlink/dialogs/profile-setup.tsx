"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useEffect, useState } from "react";

import { Loader2Icon, ShieldXIcon } from "lucide-react";

import { toast } from "sonner";

import UpdateProfile from "@/actions/profile/update-profile";
import ClerkExists from "@/actions/profile/clerk-exists";
import GetProfile from "@/actions/profile/get-profile";
import { useClerk } from "@clerk/nextjs";
import CreateProfile from "@/actions/profile/create-profile";

export default function ProfileSetup() {
  const [IsOpen, setIsOpen] = useState(false);
  const [IsLoadingProfile, setIsLoadingProfile] = useState(false);
  const [IsUpdating, setIsUpdating] = useState(false);
  const [ShowingAPIKeys, setShowingAPIKeys] = useState(true);
  const [Response, setResponse] = useState({ success: true, message: "" });
  const [Profile, setProfile] = useState<{
    id: string;
    clerk: string;
    username: string;
    aboutme: string | null;
    views: number;
    linkvertise_api: string | null;
    workink_api: string | null;
  } | null>({
    id: "",
    clerk: "",
    username: "",
    aboutme: "",
    views: 0,
    linkvertise_api: "",
    workink_api: "",
  });
  const Clerk = useClerk();

  useEffect(() => {
    setResponse({ success: true, message: "" });
  }, [IsOpen]);

  useEffect(() => {
    if (!Clerk?.user?.id) return;
    console.log("Loading profile..");
    setIsLoadingProfile(true);
    if (Clerk?.user?.id && Clerk?.user?.primaryEmailAddress) {
      ClerkExists(Clerk.user.id).then((exists) => {
        if (exists) return (window.location.href = "/");

        GetProfile(
          // @ts-ignore
          Clerk.user.id
        ).then((Profile) => {
          setProfile(Profile);
        });
      });
      GetProfile(Clerk.user.id).then((Profile) => {
        setProfile(Profile);
        setIsLoadingProfile(false);
        setIsOpen(true);
      });
    }
  }, [Clerk.client]);

  return (
    <Dialog open={IsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile Setup</DialogTitle>
          <DialogDescription>
            Setup your profile to use AuthLink.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!Response.success && (
            <Alert variant="destructive">
              <ShieldXIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{Response.message}</AlertDescription>
            </Alert>
          )}
          <div className="grid w-full gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              defaultValue={Profile?.username || "Username"}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="usecase">What do you plan on doing?</Label>
            <Select>
              <SelectTrigger>
                <SelectValue id="usecase" placeholder=""></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="monetize-my-software">
                    Monetize software
                  </SelectItem>
                  <SelectItem value="monetize-downloads">
                    Monetize downloads
                  </SelectItem>
                  <SelectItem value="license-freemium">
                    Use the license system
                  </SelectItem>
                  <SelectItem value="license-freemium-other">
                    Become an affiliate partner
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="aboutme">About me</Label>
            <Textarea
              placeholder="Tell us something about yourself!"
              defaultValue={Profile?.aboutme || ""}
              id="aboutme"
            />
          </div>
          <Collapsible open={ShowingAPIKeys}>
            <CollapsibleTrigger asChild>
              <Button
                onClick={() => {
                  setShowingAPIKeys(!ShowingAPIKeys);
                }}
                variant={"outline"}
              >
                {ShowingAPIKeys ? "Hide API Keys" : "Show API Keys"}
              </Button>
            </CollapsibleTrigger>
            <div className="grid gap-4 py-2">
              <CollapsibleContent>
                <div className="grid gap-4 py-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="linkvertise">Linkvertise ID</Label>
                    <Input
                      defaultValue={Profile?.linkvertise_api || ""}
                      type="text"
                      id="linkvertise"
                      placeholder="123456"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="workink">Work.Ink Api Key</Label>
                    <Input
                      defaultValue={Profile?.workink_api || ""}
                      type="text"
                      id="workink"
                      placeholder="5757470e-84dc-44fd-bb91-f5559660c7d9"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              setIsUpdating(true);
              const Username = (
                document.getElementById("username") as HTMLInputElement
              ).value;
              const AboutMe = (
                document.getElementById("aboutme") as HTMLInputElement
              ).value;
              let Linkvertise = undefined;
              let WorkInk = undefined;
              const LV_ELEMENT = document.getElementById(
                "linkvertise"
              ) as HTMLInputElement;
              const WI_ELEMENT = document.getElementById(
                "workink"
              ) as HTMLInputElement;
              if (LV_ELEMENT && LV_ELEMENT.value !== "") {
                Linkvertise = LV_ELEMENT.value;
              }
              if (WI_ELEMENT && WI_ELEMENT.value !== "") {
                WorkInk = WI_ELEMENT.value;
              }
              if (Clerk?.user?.id) {
                const Result:
                  | { success: boolean; message: string }
                  | undefined = await UpdateProfile(
                  Clerk.user.id,
                  Username,
                  AboutMe,
                  Linkvertise,
                  WorkInk
                );
                if (Result) {
                  setIsUpdating(false);
                  setResponse(Result);
                  if (Result.success) {
                    setShowingAPIKeys(false);
                    toast(Result.message);
                    window.location.href = "/";
                  }
                }
              }
            }}
            type="submit"
            disabled={IsUpdating}
          >
            {IsUpdating && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Complete Setup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
