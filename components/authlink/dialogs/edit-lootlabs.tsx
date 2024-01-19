"use client";

import EditLootlabs from "@/actions/profile/editlootlabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Loader2Icon, ShieldXIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EditLootlabsConfig() {
  const [Loading, setLoading] = useState(false);

  const [AdControl, setAdControl] = useState("tier-1");
  const [Theme, setTheme] = useState("theme-1");
  const [Response, setResponse] = useState<{
    success: boolean;
    message: string;
  }>({ success: true, message: "" });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-500 w-full mt-2">
          Edit LootLabs
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>LootLabs Integration</DialogTitle>
        <DialogDescription>
          Configure your LootLabs settings for <b>high</b> CPM rates.
        </DialogDescription>
        <div className="grid gap-4 py-4">
          {!Response?.success && (
            <Alert variant="destructive">
              <ShieldXIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{Response?.message}</AlertDescription>
            </Alert>
          )}
          <div className="grid w-full gap-1.5">
            <Label htmlFor="advertisements">Advertisement Control</Label>

            <Select
              onValueChange={(val) => {
                setAdControl(val);
              }}
              defaultValue="tier-1"
            >
              <SelectTrigger>
                <SelectValue
                  id="advertisements"
                  placeholder="Select advertisements"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="tier-1">Trending & Recommended</SelectItem>
                  <SelectItem value="tier-2">
                    Gaming Offers & Recommendations
                  </SelectItem>
                  <SelectItem value="tier-3">Profit Maximization</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="aot">Amount of Tasks</Label>
            <Input
              type="text"
              id="aot"
              placeholder="From 1 to 5"
              defaultValue={"2"}
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="theme">Theme</Label>

            <Select
              onValueChange={(val) => {
                setTheme(val);
              }}
              defaultValue="theme-1"
            >
              <SelectTrigger>
                <SelectValue id="theme" placeholder="Select your theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="theme-1">Classic (Default)</SelectItem>
                  <SelectItem value="theme-2">Sims</SelectItem>
                  <SelectItem value="theme-3">Minecraft</SelectItem>
                  <SelectItem value="theme-4">GTA</SelectItem>
                  <SelectItem value="theme-5">Space</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="api">API Key</Label>
            <Input
              type="text"
              id="api"
              placeholder="Paste your api key here."
            />
          </div>

          <Button
            disabled={Loading}
            onClick={() => {
              setLoading(true);
              const AmountOfTasks = document.getElementById(
                "aot"
              ) as HTMLInputElement;
              const APIKey = document.getElementById("api") as HTMLInputElement;

              EditLootlabs(
                APIKey.value,
                AdControl,
                Number(AmountOfTasks.value),
                Theme
              ).then((Response) => {
                setResponse(Response);
                setLoading(false);

                if (Response.success) {
                  toast(Response.message);
                }
              });
            }}
            className="w-full"
          >
            {Loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </div>
        <DialogFooter>
          <DialogClose></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
