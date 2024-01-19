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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useClerk } from "@clerk/nextjs";

import CreateProject from "@/actions/project/create-project";
import { useEffect, useState } from "react";
import { Loader2Icon, ShieldXIcon, Youtube } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateProjectButton({
  refresh,
}: {
  refresh: Function;
}) {
  const [Open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Response, setResponse] = useState<
    { success: boolean; message: string } | undefined
  >({ success: true, message: "" });

  useEffect(() => {
    setResponse({ success: true, message: "" });
  }, [Open]);

  const Clerk = useClerk();
  const Router = useRouter();

  return (
    <>
      <Dialog open={Open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => {}}>Create a new project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>Create a new project</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!Response?.success && (
              <Alert variant="destructive">
                <ShieldXIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{Response?.message}</AlertDescription>
              </Alert>
            )}
            <div className="grid w-full gap-1.5">
              <Label htmlFor="title">Title*</Label>
              <Input
                type="text"
                id="title"
                placeholder="Project title"
                defaultValue={"My new project"}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="method">Monetization Method*</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    id="method"
                    placeholder="Select your monetization provider"
                  ></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="linkvertise">linkvertise</SelectItem>
                    <SelectItem value="workink">workink</SelectItem>
                    <SelectItem value="lootlabs">lootlabs</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                placeholder="Tell others about your project!"
                defaultValue=""
                id="description"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="freelicenses" />
              <label
                htmlFor="freelicenses"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                defaultChecked={true}
                defaultValue={"true"}
              >
                Allow generation of free licenses
              </label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>
            <Button
              disabled={Loading}
              onClick={() => {
                if (!Clerk?.user?.id) return;

                const Title = document.getElementById(
                  "title"
                ) as HTMLInputElement;
                const Description = document.getElementById(
                  "description"
                ) as HTMLInputElement;
                const Monetization = document.getElementById(
                  "method"
                ) as HTMLInputElement;
                const Licenses = document.getElementById(
                  "freelicenses"
                ) as HTMLInputElement;

                let Imgur = undefined;
                let YouTube = undefined;

                let ImgurDoc = document.getElementById(
                  "imgur"
                ) as HTMLInputElement;
                let YouTubeDoc = document.getElementById(
                  "youtube"
                ) as HTMLInputElement;

                if (ImgurDoc && ImgurDoc.value !== "") {
                  Imgur = ImgurDoc.value;
                }
                if (YouTubeDoc && YouTubeDoc.value !== "") {
                  YouTube = YouTubeDoc.value;
                }

                if (
                  !["linkvertise", "workink", "lootlabs"].includes(
                    Monetization.innerHTML
                  )
                ) {
                  return setResponse({
                    success: false,
                    message: "Monetization Method must be selected.",
                  });
                }
                setLoading(true);

                CreateProject(
                  Title.value,
                  Description.value,
                  Monetization.innerHTML,
                  Boolean(Licenses.value),
                  Imgur,
                  YouTube
                ).then((Resp) => {
                  setLoading(false);
                  if (!Resp?.success) {
                    setResponse(Resp);
                    return;
                  }

                  setOpen(false);
                  refresh();
                  toast(Resp.message, {
                    action: {
                      label: "Okay",
                      onClick: () => {},
                    },
                  });
                });
              }}
            >
              {Loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
