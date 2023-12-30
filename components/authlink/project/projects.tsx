"use client";

import { Button } from "@/components/ui/button";
import ProjectCard from "./card";

import CreateProjectButton from "./create-project";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { GetProjects } from "@/actions/project/get-projects";

export default function Projects() {
  const [Loading, setLoading] = useState(true);
  const Clerk = useClerk();
  const [Projects, setProjects] = useState<
    Array<{
      id: string;
      title: string;
      description: string;
      active: boolean;
      verified: boolean;
      createdAt: Date;
      views: number;
      monetization_method: string;
      profileClerk: string | null;
      image_url: string | null;
      youtube_url: string | null;
    }>
  >([]);

  function RefreshProjects() {
    if (!Clerk?.user?.id) return;

    GetProjects(Clerk.user.id).then((Data) => {
      setProjects(Data);
      setLoading(false);
    });
  }

  useEffect(RefreshProjects, [Clerk.user]);

  return (
    <>
      <div>
        <div className="container mx-auto flex justify-between mt-8 mb-8">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mt-2">
            <a href="/" className="hover:underline underline-offset-8">
              Projects
            </a>
          </h1>
          <CreateProjectButton refresh={RefreshProjects} />
        </div>
        <div className="container mx-auto flex w-full flex-col items-center justify-center gap-2 overflow-y-auto p-6 md:grid md:grid-cols-2 md:gap-0 lg:grid-cols-3">
          {(!Loading &&
            Projects.map((Project, x) => {
              return (
                <ProjectCard
                  key={Project.id}
                  title={Project.title}
                  description={Project.description}
                  id={Project.id}
                  views={Project.views}
                  method={Project.monetization_method}
                  active={Project.active}
                  createdAt={Project.createdAt}
                />
              );
            })) ||
            [0, 0, 0].map((x, idx) => {
              return (
                <ProjectCard
                  key={idx}
                  title=""
                  description=""
                  id=""
                  views={0}
                  method=""
                  active={false}
                  createdAt={new Date()}
                  loading
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
