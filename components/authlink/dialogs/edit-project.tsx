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

local ClientVersion = "v1.1"
local API_Endpoint = "https://auth.authlink.org/"

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

local Authenticate = API_Endpoint .. "authenticate?a=%s&b=%s&c=%s&d=%s"

local b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
local function enc(data)
    return ((data:gsub('.', function(x) 
        local r,b='',x:byte()
        for i=8,1,-1 do r=r..(b%2^i-b%2^(i-1)>0 and '1' or '0') end
        return r;
    end)..'0000'):gsub('%d%d%d?%d?%d?%d?', function(x)
        if (#x < 6) then return '' end
        local c=0
        for i=1,6 do c=c+(x:sub(i,i)=='1' and 2^(6-i) or 0) end
        return b:sub(c+1,c+1)
    end)..({ '', '==', '=' })[#data%3+1])
end
local function dec(data)
    data = string.gsub(data, '[^'..b..'=]', '')
    return (data:gsub('.', function(x)
        if (x == '=') then return '' end
        local r,f='',(b:find(x)-1)
        for i=6,1,-1 do r=r..(f%2^i-f%2^(i-1)>0 and '1' or '0') end
        return r;
    end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x)
        if (#x ~= 8) then return '' end
        local c=0
        for i=1,8 do c=c+(x:sub(i,i)=='1' and 2^(8-i) or 0) end
            return string.char(c)
    end))
end


local Metadata = "RBLX-Username:%s,,,RBLX-UserId:%s"
local LocalPlayer = game:GetService('Players').LocalPlayer
local Name, userId = LocalPlayer.Name, LocalPlayer.UserId
Metadata = Metadata:format(Name, tostring(userId))

local Encoded = enc(Metadata)

local AuthURL = Authenticate:format(
  shared.auth_link_license,
  Seed,
  "${Params.id}",
  Encoded
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
    CSharp: `
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

const string ClientVersion = "v1";
const string API_Endpoint = "https://auth.authlink.org/";
const string API_Version = API_Endpoint + "version";

string Get(string uri)
{
    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
    request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

    using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
    using (Stream stream = response.GetResponseStream())
    using (StreamReader reader = new StreamReader(stream))
    {
        return reader.ReadToEnd();
    }
}

string ServerVersion = Get(API_Version);

if(ClientVersion != ServerVersion)
{
    Console.WriteLine($"[AuthLink V1]: Running outdated client version. (newes: {ServerVersion})");
}

Console.WriteLine("AuthLink V1 Demo");

Console.Write("Please input your license key!\\n> ");
string? LicenseKey = Console.ReadLine();

int Seed = 0;
for (int i = 0; i < 10; i++)
{
    Seed += new Random().Next();
}


Console.WriteLine($"Seed: {Seed}");

SHA256 Hash = SHA256.Create();
byte[] HashResponse = Hash.ComputeHash(Encoding.ASCII.GetBytes($"{Seed}"));
string ExpectedResponse = BitConverter.ToString(HashResponse).Replace("-", "").ToLower();

string AuthenticateURL = $"{API_Endpoint}authenticate?a={LicenseKey}&b={Seed}&c=${Params.id}";
string Response = Get(AuthenticateURL);
try
{
    AuthLinkResponse? Result = JsonSerializer.Deserialize<AuthLinkResponse>(Response);

    if(Result != null && Result.success)
    {
        if(Result.validator == ExpectedResponse)
        {
            _entry(!Result.free);
        } else
        {
            Console.WriteLine("Validator mismatch");
        }
    }

} catch
{
    Console.WriteLine("Invalid license");
}

void _entry(bool isPremium = false)
{
    Console.WriteLine("Authenticated");
    Console.WriteLine($"Is user premium: {isPremium}");
}

class AuthLinkResponse
{
    public bool success { get; set; }
    public bool free { get; set; }
    public string validator { get; set; }
}
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
            <TabsTrigger value="cs">C#</TabsTrigger>
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
          <TabsContent value="cs">
            <div className="overflow-auto max-h-96">
              <CopyBlock
                text={Languages.CSharp}
                language={"cs"}
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
