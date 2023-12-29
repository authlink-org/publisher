"use client";

import { Button } from "@/components/ui/button";
import ProjectCard from "./card";

export default function Projects() {
  return (
    <>
      <div>
        <div className="container mx-auto flex justify-between mt-8 mb-8">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            Projects
          </h1>
          <Button>Create a new project</Button>
        </div>
        <div
          className="
            container
            mx-auto
            px-4
            m-3
            grid
            grid-rows-6
            sm:grid-rows-6
            md:grid-rows-3
            lg:grid-rows-2
            gap-4
            grid-flow-col
            grid-flow-row
            place-content-cente
            flex
            justify-center"
        >
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </>
  );
}
