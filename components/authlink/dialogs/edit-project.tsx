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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useEffect, useState } from "react";

import { Loader2Icon, ShieldXIcon } from "lucide-react";

import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditProjectDialog({
  id,
  title,
  description,
  active,
  verified,
  createdAt,
  views,
  block_adblock,
  monetization_method,
  image_url,
  youtube_url,
  profileClerk,
}: {
  id: string;
  title: string;
  description: string;
  active: boolean;
  verified: boolean;
  createdAt: Date;
  views: number;
  block_adblock: boolean;
  monetization_method: string;
  image_url: string | null;
  youtube_url: string | null;
  profileClerk: string | null;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Make changes to your project.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Title"
              defaultValue={title}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              placeholder="Tell us something about your project!"
              defaultValue={description}
              id="description"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="method">Monetization Method</Label>
            <Select>
              <SelectTrigger>
                <SelectValue
                  id="method"
                  placeholder="Select your monetization provider"
                  defaultValue={monetization_method}
                ></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="linkvertise">linkvertise</SelectItem>
                  <SelectItem value="workink">workink</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={async () => {}} type="submit">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
