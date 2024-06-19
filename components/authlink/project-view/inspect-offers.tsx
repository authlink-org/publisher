"use client";

import { Button } from "@/components/ui/button";

import GetTopCountry from "@/actions/visits/topcountry";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { GetProject } from "@/actions/project/get-project";

import * as ReChart from "recharts";

import { ScrollArea } from "@/components/ui/scroll-area";

import LoadingInpsect from "./loading-inspect";
import DeleteProjectButton from "./delete-project";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import numeral from "numeral";
import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import RegenerateAPIKey from "@/actions/api/regenerate";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { hasFlag } from "country-flag-icons";
import Image from "next/image";

import GetUniqueViews from "@/actions/visits/unique";
import {
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";

import GetLogs from "@/actions/logs/getlogs";

import GetLicenses from "@/actions/licenses/getlicenses";

import EditProjectDialog from "../dialogs/edit-project";

import CreateLicenseDialog from "../dialogs/create-license";
import moment from "moment";
import DeleteLicense from "@/actions/licenses/deletelicense";
import { toast } from "sonner";
import ResetAuth from "@/actions/licenses/resetauth";

import EditLicenseDialog from "../dialogs/edit-license";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";

import EditNote from "../dialogs/editnote";
import MetadataViewer from "../dialogs/viewmetadata";
import MobileNavbar from "../mobile-navbar";
import GetStats from "@/actions/partner/get-stats";

export default function InspectOffers() {
  const Clerk = useClerk();
  const Params = useParams();

  const [Loading, setLoading] = useState(true);
  const [Regenerating, setRegenerating] = useState(false);

  const [useEditNote, setEditNote] = useState(false);
  const [useLicense, setLicense] = useState("");
  const [useViewMetadata, setViewMetadata] = useState(false);
  const [useMetadata, setMetadata] = useState("");

  const [Project, setProject] = useState<{
    id: string;
    title: string;
    description: string;
    active: boolean;
    verified: boolean;
    createdAt: Date;
    views: number;
    api_key: string | null;
    block_adblock: boolean;
    monetization_method: string;
    image_url: string | null;
    youtube_url: string | null;
    profileClerk: string | null;
  } | null>({
    id: "",
    title: "",
    description: "",
    active: false,
    verified: false,
    createdAt: new Date(),
    api_key: "",
    views: 0,
    block_adblock: false,
    monetization_method: "",
    image_url: "",
    youtube_url: "",
    profileClerk: "",
  });
  const [Balance, SetBalance] = useState(0);
  const [Logs, SetLogs] = useState<
    { id: number; source: string; amount: string }[]
  >([]);

  const { id } = Params;
  const [Keys, setKeys] = useState("");

  function RefreshProjects() {
    if (!Clerk?.user?.id) return;
    if (!id) return;

    GetProject(String(id)).then((Project) => {
      if (!Project?.title) return (window.location.href = "/");

      GetStats(Project.id).then((XLogs) => {
        SetLogs(XLogs);
        setLoading(false);
        XLogs.map((I) => {
          SetBalance(Balance + Number(I.amount));
        });
      });
    });
  }

  useEffect(() => {
    let Amount = 0;
    Logs.map((I) => {
      Amount += Number(I.amount);
    });
    console.log(Amount);
    SetBalance(Amount);
  }, [Logs]);

  useEffect(RefreshProjects, [Clerk.user]);

  if (Loading) {
    return <LoadingInpsect />;
  }

  return (
    <>
      <div>
        <div className="container mx-auto flex justify-between mt-8 mb-8">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mt-2">
            <a href="/" className="hover:underline underline-offset-8">
              Projects
            </a>
            <span className="mr-4 ml-4">/</span>
            <a className="underline underline-offset-8">
              {(Project?.title || "").length > 11
                ? (Project?.title || "").substring(0, 11) + "..."
                : Project?.title}
            </a>
          </h1>
          <DeleteProjectButton
            id={String(id)}
            clerk={String(Clerk?.user?.id)}
          />
        </div>
        <div className="container mx-auto flex w-full flex-col items-center justify-center gap-2 overflow-y-auto p-6 md:grid md:grid-cols-2 md:gap-0 lg:grid-cols-3"></div>
      </div>
      <div className="container mx-auto space-y-6 p-10 pb-16 md:block -mt-20">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <MobileNavbar id={id} Project={Project} />
          <aside className="-mx-4 lg:w-1/5 hidden lg:block">
            <nav className="flex space-x-2 ml-8 lg:flex-col lg:space-x-0 lg:space-y-4">
              <a
                href="./"
                className="w-full hover:underline underline-offset-4"
              >
                Overview
              </a>
              <a
                href="./analytics"
                className="w-full hover:underline underline-offset-4 text-left"
              >
                Analytics
              </a>
              <a
                href="./licenses"
                className="w-full hover:underline underline-offset-4 text-left"
              >
                Licenses
              </a>
              <Button
                onClick={() => {
                  window.location.href = `/view/${id}/partner`;
                }}
                variant={"outline"}
              >
                Partner
              </Button>
              <Separator />
              {Project?.title && (
                <EditProjectDialog
                  key={Project.id}
                  id={Project.id}
                  title={Project.title}
                  description={Project.description}
                  active={Project.active}
                  verified={Project.verified}
                  createdAt={Project.createdAt}
                  views={Project.views}
                  block_adblock={Project.block_adblock}
                  monetization_method={Project.monetization_method}
                  image_url={Project.image_url}
                  youtube_url={Project.youtube_url}
                  profileClerk={Project.profileClerk}
                />
              )}
              <Button
                variant={"link"}
                onClick={() => {
                  window.open(
                    `https://authlink.org/p/${Project?.id}`,
                    "_authlink",
                    "popup,width=600,height=1000"
                  );
                }}
              >
                View Project
              </Button>
            </nav>
          </aside>

          <div className="container mx-auto flex w-full flex-col items-center justify-center gap-2 p-6 md:grid md:grid-cols-2 md:gap-0 lg:grid-cols-2">
            <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full">
              <CardHeader>
                <CardTitle className="text-md">
                  <span className="flex justify-between">
                    <p>Balance</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <QuestionMarkCircledIcon className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          The amount of money eligible for withdrawal.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </CardTitle>
                <CardDescription>Your effective balance.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">${Balance.toFixed(4)} USD</p>
              </CardContent>
            </Card>
            <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full">
              <CardHeader>
                <CardTitle className="text-md">
                  <span className="flex justify-between">
                    <p>Offers Finished</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <QuestionMarkCircledIcon className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          The amount of offers finished.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </CardTitle>
                <CardDescription>Amount of offers finished.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">{Logs.length}</p>
              </CardContent>
            </Card>
            <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full">
              <CardHeader>
                <CardTitle className="text-md">
                  <span className="flex justify-between">
                    <p>eCPM</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <QuestionMarkCircledIcon className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Estimated amount you will earn per 1,000 offers
                          finished.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </CardTitle>
                <CardDescription>
                  Estimated amount you will earn per 1K offers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">
                  $
                  {(Balance === 0 && "0.0000") ||
                    ((1000 * Balance) / Logs.length).toFixed(4)}{" "}
                  USD
                </p>
              </CardContent>
            </Card>
            <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full col-span-2">
              <CardHeader>
                <CardTitle className="text-md">
                  <span className="flex justify-between">
                    <p>Partner Results</p>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="w-full h-64">
                <ScrollArea className="h-full w-full">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Logs.map((Log, id) => {
                        return (
                          <TableRow key={id}>
                            <TableCell
                              className="text-right"
                              key={id + "-amount"}
                            >
                              {"$" + Number(Log.amount).toFixed(4) + " USD"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
