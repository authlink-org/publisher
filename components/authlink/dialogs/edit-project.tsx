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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyBlock } from "react-code-blocks";

import "highlight.js/styles/vs.css";
import { useParams } from "next/navigation";

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
  const Params = useParams();

  const Languages = {
    Lua: `
shared.auth_link_license = "LICENSE HERE"

-- obfuscate everything else

loadstring(game:HttpGet("https://raw.githubusercontent.com/MaHuJa/CC-scripts/master/sha256.lua"))()

local ClientVersion = "v1"
local API_Endpoint = "https://auth-endpoints-production.up.railway.app/"

function a_error(msg, ...)
  return warn(("[AuthLink - %s]: %s"):format(ClientVersion, msg:format(...)))
end

local API_Version = game:HttpGet(API_Endpoint .. "version")

if(API_Version ~= ClientVersion) then
  a_error("There is a new version available (%s)", API_Version)
end

local Seed = 0
for i = 1, 10 do
  for i = 1, math.random(1, 100) do
    Seed = Seed + math.random()
  end
end
Seed = tostring(Seed)
local HashedSeed = sha256(Seed)

local Authenticate = API_Endpoint .. "authenticate?a=%s&b=%s&c=%s"

local AuthURL = Authenticate:format(
  shared.auth_link_license,
  Seed,
  "${Params.id}"
)

local Response = game:HttpGet(AuthURL)

local CanDecode, Decoded = pcall(function()
  return game:GetService("HttpService"):JSONDecode(Response)
end)

if(not CanDecode) then
  return a_error("Unable to decode server response.")
end

if(not Decoded.success) then
  return a_error("Server responded with an unsuccessful message.")
end

if(Decoded.validator ~= HashedSeed) then
  return a_error("Server responded with invalid data.")
end

local IsPremium = not Decoded.free

warn("Authenticated")
warn("User is premium?", IsPremium)
  `,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Loaders</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Loaders</DialogTitle>
          <DialogDescription>These are demo loaders.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account" className="w-96">
          <TabsList>
            <TabsTrigger value="roblox">Roblox</TabsTrigger>
            <TabsTrigger value="cpp" disabled>
              C++
            </TabsTrigger>
            <TabsTrigger value="cs" disabled>
              C#
            </TabsTrigger>
            <TabsTrigger value="golang" disabled>
              GoLang
            </TabsTrigger>
          </TabsList>
          <TabsContent value="roblox">
            <div className="overflow-auto max-h-96">
              <CopyBlock
                text={Languages.Lua}
                language={"julia"}
                showLineNumbers={false}
                codeBlock={true}
              />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
