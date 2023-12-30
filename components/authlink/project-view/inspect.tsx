"use client";

import { Button } from "@/components/ui/button";

import GetTopCountry from "@/actions/visits/topcountry";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { GetProject } from "@/actions/project/get-project";

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

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

import { hasFlag } from "country-flag-icons";
import Image from "next/image";

import GetUniqueViews from "@/actions/visits/unique";

export default function InspectProject() {
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
    monetization_method: "",
    image_url: "",
    youtube_url: "",
    profileClerk: "",
  });

  const [UniqueViews, setUniqueViews] = useState(0);

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

    GetProject(Clerk.user.id, String(id)).then((Project) => {
      if (!Project?.title) return (window.location.href = "/");
      setProject(Project);
      GetUniqueViews(String(id)).then((Views) => {
        setUniqueViews(Views);
      });
      GetTopCountry(String(id), 10).then((Res) => {
        if (Res) {
          setTopCountries(Res);
        }
        setLoading(false);
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
              <a href="#" className="w-full hover:underline underline-offset-4">
                Overview
              </a>
              <a
                href="#"
                className="w-full hover:underline underline-offset-4 text-left"
              >
                Analytics
              </a>
              <Separator />
              <a
                href="#"
                className="w-full hover:underline underline-offset-4 text-left"
              >
                Monetization
              </a>
            </nav>
          </aside>
          <div className="container mx-auto flex w-full flex-col items-center justify-center gap-2 p-6 md:grid md:grid-cols-2 md:gap-0 lg:grid-cols-2">
            <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full">
              <CardHeader>
                <CardTitle className="text-md">Views</CardTitle>
                <CardDescription>All time.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">
                  {numeral(Project?.views || 0).format("0,0")}
                </p>
              </CardContent>
            </Card>
            <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full">
              <CardHeader>
                <CardTitle className="text-md">Unique Views</CardTitle>
                <CardDescription>Last 30 days.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">
                  {numeral(UniqueViews || 0).format("0,0")}
                </p>
              </CardContent>
            </Card>
            <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full">
              <CardHeader>
                <CardTitle className="text-md">Top Country</CardTitle>
                <CardDescription>Last 30 days.</CardDescription>
              </CardHeader>
              <CardContent>
                {(((TopCountries && TopCountries.length) || 0) > 0 && (
                  <>
                    <div className="flex">
                      <p className="text-2xl mr-1">
                        {TopCountries && TopCountries[0].country_code}
                      </p>
                      <sub>
                        {" "}
                        <Image
                          className="mr-4"
                          width={"18"}
                          height={"18"}
                          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${
                            TopCountries && TopCountries[0].country_code
                          }.svg`}
                          alt={`${
                            (TopCountries && TopCountries[0].country_code) ||
                            "Not found"
                          } Flag`}
                        />
                      </sub>
                    </div>
                  </>
                )) || <p className="text-2xl mr-1">Not found</p> || (
                    <p className="text-2xl mr-1">Not found</p>
                  )}
                {/* {(hasFlag("US") && (
                  <>
                    <div className="flex">
                      <p className="text-2xl mr-1">US</p>
                      <sub>
                        {" "}
                        <Image
                          className="mr-4"
                          width={"18"}
                          height={"18"}
                          src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                          alt="US Flag"
                        />
                      </sub>
                    </div>
                  </>
                )) || <>US</>} */}
              </CardContent>
            </Card>
            <Card className="relative max-w-sm min-w-96 min-h-32 mb-8 ml-4 max-w-full">
              <CardHeader>
                <CardTitle className="text-md">Validations</CardTitle>
                <CardDescription>Last 30 days.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">
                  {numeral(Project?.views || 0).format("0,0")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
