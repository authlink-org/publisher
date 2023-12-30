"use client";

import AddPageView from "@/actions/visits/addpageview";
import { Button } from "@/components/ui/button";

import { useParams } from "next/navigation";

export default function PageViewButton() {
  const { id } = useParams();

  if (!id) return <h1>ID not set</h1>;

  return (
    <Button
      onClick={() => {
        AddPageView(id);
      }}
    >
      Simulate View
    </Button>
  );
}
