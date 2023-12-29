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

export default function ProjectCard() {
  return (
    <>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <span className="mt-2">Project Name</span>
              <Button variant={"ghost"} size="icon">
                <GearIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Project Description Trimmf safhasd jkhfasdhjk fjkhasd jlfhkasdlhjk
            ffaks jdhfkljh asdfkjlh asjkdhlf khjlasdfhjk lg sdfghkj sdfghjk
            sdfhjklg hjkdlsfg hjkld
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div>
            <Badge>License</Badge>
            <Badge>Free</Badge>
            <Badge variant={"destructive"}>Inactive</Badge>
          </div>
        </CardFooter>
        <CardContent>
          <Button className="w-full" variant={"secondary"}>
            View
          </Button>
        </CardContent>
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
