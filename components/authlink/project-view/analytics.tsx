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

import { hasFlag } from "country-flag-icons";
import Image from "next/image";

import GetUniqueViews from "@/actions/visits/unique";
import {
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";

import GetLogs from "@/actions/logs/getlogs";

import EditProjectDialog from "../dialogs/edit-project";

export default function InspectAnalytics() {
  const Clerk = useClerk();
  const Params = useParams();

  const [Loading, setLoading] = useState(true);

  const [Project, setProject] = useState<{
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
  } | null>({
    id: "",
    title: "",
    description: "",
    active: false,
    verified: false,
    createdAt: new Date(),
    views: 0,
    block_adblock: false,
    monetization_method: "",
    image_url: "",
    youtube_url: "",
    profileClerk: "",
  });
  const [Logs, setLogs] = useState<Array<{
    views: number;
    validations: number;
    skips: number;
    date: Date | string;
  }> | null>();

  let [TopCountries, setTopCountries] = useState<
    | Array<{
        _count: {
          country_code: number;
        };
        country_code: string;
      }>
    | undefined
  >();

  const { id } = Params;

  function RefreshProjects() {
    if (!Clerk?.user?.id) return;
    if (!id) return;

    GetProject(String(id)).then((Project) => {
      if (!Project?.title) return (window.location.href = "/");
      setProject(Project);
      GetTopCountry(String(id), 25).then((Res) => {
        if (Res) {
          setTopCountries(Res);
        }
        GetLogs(String(id)).then((Logs) => {
          setLogs(Logs);
          setLoading(false);
        });
      });
    });
  }

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
          {((!Logs || Logs.length === 0) && (
            <h1>
              Your analytics are still being prepared, check back in 10 minutes.
            </h1>
          )) || (
            <div className="container mx-auto flex w-full flex-col items-center justify-center gap-2 p-6 md:grid md:grid-cols-2 md:gap-0 lg:grid-cols-2">
              <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full">
                <CardHeader>
                  <CardTitle className="text-md">
                    <span className="flex justify-between">
                      <p>Views</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <QuestionMarkCircledIcon className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            The amount of times your project has been viewed.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </CardTitle>
                  <CardDescription>Last 7 days.</CardDescription>
                </CardHeader>
                <CardContent className="w-128 h-48">
                  <ReChart.ResponsiveContainer width="100%" height="100%">
                    <ReChart.BarChart
                      width={500}
                      height={300}
                      data={(Logs && Logs) || []}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <ReChart.CartesianGrid strokeDasharray="3 3" />
                      <ReChart.XAxis dataKey={" "} />
                      <ReChart.Tooltip />
                      <ReChart.Bar
                        dataKey="views"
                        fill="#16a34a"
                        label={false}
                      />
                    </ReChart.BarChart>
                  </ReChart.ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="relative max-w-sm min-w-96 max-h-96 mb-8 ml-4 max-w-full">
                <CardHeader>
                  <CardTitle className="text-md">
                    <span className="flex justify-between">
                      <p>Top Countries</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <QuestionMarkCircledIcon className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            The countries that use your project the most.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </CardTitle>
                  <CardDescription>All time.</CardDescription>
                </CardHeader>
                <CardContent className="w-128 h-48">
                  <ScrollArea className="h-full w-full">
                    <Table className="w-full">
                      <TableCaption>
                        List of top 25 countries from unique visits.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Country</TableHead>
                          <TableHead>Flag</TableHead>
                          <TableHead className="text-right">Visits</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {TopCountries?.map((Info) => {
                          return (
                            <>
                              <TableRow key={Info.country_code + "-1"}>
                                <TableCell key={Info.country_code + "-2"}>
                                  <p className={Info.country_code + "-6"}>
                                    {Info.country_code}
                                  </p>
                                </TableCell>
                                <TableCell key={Info.country_code + "-3"}>
                                  <Image
                                    key={Info.country_code + "-5"}
                                    width="10"
                                    height="10"
                                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${Info.country_code}.svg`}
                                    alt={`${Info.country_code} Flag`}
                                  />
                                </TableCell>
                                <TableCell
                                  key={Info.country_code + "-4"}
                                  className="text-right"
                                >
                                  <p className={Info.country_code + "-7"}>
                                    {Info._count.country_code}
                                  </p>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full">
                <CardHeader>
                  <CardTitle className="text-md">
                    <span className="flex justify-between">
                      <p>Validations</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <QuestionMarkCircledIcon className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            The amount of times someone went through your
                            monetization link.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </CardTitle>
                  <CardDescription>Last 7 days.</CardDescription>
                </CardHeader>
                <CardContent className="w-128 h-48">
                  <ReChart.ResponsiveContainer width="100%" height="100%">
                    <ReChart.BarChart
                      width={500}
                      height={300}
                      data={(Logs && Logs) || []}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <ReChart.CartesianGrid strokeDasharray="3 3" />
                      <ReChart.XAxis dataKey={" "} />
                      <ReChart.Tooltip />
                      <ReChart.Bar dataKey="validations" fill="#16a34a" />
                    </ReChart.BarChart>
                  </ReChart.ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full">
                <CardHeader>
                  <CardTitle className="text-md">
                    <span className="flex justify-between">
                      <p>AdBlock Detected</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <QuestionMarkCircledIcon className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            The amount of times adblock has been detected.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </CardTitle>
                  <CardDescription>Last 7 days.</CardDescription>
                </CardHeader>
                <CardContent className="w-128 h-48">
                  <ReChart.ResponsiveContainer width="100%" height="100%">
                    <ReChart.BarChart
                      width={500}
                      height={300}
                      data={(Logs && Logs) || []}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <ReChart.CartesianGrid strokeDasharray="3 3" />
                      <ReChart.XAxis dataKey={" "} />
                      <ReChart.Tooltip />
                      <ReChart.Bar dataKey="skips" fill="#16a34a" />
                    </ReChart.BarChart>
                  </ReChart.ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
