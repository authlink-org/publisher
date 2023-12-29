"use client";

import { generate } from "geopattern";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GearIcon } from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";

import moment from "moment";
import numeral from "numeral";

export default function ProjectCard({
  title,
  description,
  id,
  views,
  method,
  active,
  createdAt,
}: {
  title: string;
  description: string;
  id: string;
  views: number;
  method: string;
  active: boolean;
  createdAt: Date;
}) {
  return (
    <>
      <Card className="relative  max-w-sm min-w-96 min-h-56 mb-8">
        <a
          href={`/projects/${id}`}
          className="absolute left-0 top-0 z-0 h-full w-full"
        ></a>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <span className="mt-2">
                {title.length > 19 ? title.substring(0, 19) + "..." : title}
              </span>
              <Button variant={"ghost"} size="icon">
                <GearIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            {description.length > 24
              ? description.substring(0, 24) + "..."
              : description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div>
            <Badge variant={"outline"} className="mr-1">
              <span className="text-green-600">
                {method.toLocaleUpperCase()}
              </span>
            </Badge>
            <Badge variant={"outline"}>
              <span className={active ? "text-green-600" : "text-red-500"}>
                {active ? "ACTIVE" : "INACTIVE"}
              </span>
            </Badge>
          </div>
        </CardFooter>
        <CardFooter>
          <CardDescription>
            <div className="flex">
              <span className="mr-2">
                {numeral(views).format("0,0") + " Views"}
              </span>
              <span className="mr-2">{moment(createdAt).calendar()}</span>
            </div>
          </CardDescription>
        </CardFooter>
      </Card>
      {/* <div className="w-[450px]">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={generate("Project-uuid-456909999").toDataUri()}
            alt="Project Pattern"
            width={"200"}
            height={"200"}
            className="w-full"
          />
        </AspectRatio>
      </div> */}
    </>
  );
}
