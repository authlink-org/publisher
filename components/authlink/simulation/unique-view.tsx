"use client";

import AddUniqueView from "@/actions/visits/adduniqueview";
import { Button } from "@/components/ui/button";

import { useParams } from "next/navigation";

export default function UniqueViewButton() {
  const { id } = useParams();

  if (!id) return <h1>ID not set</h1>;

  return (
    <Button
      onClick={() => {
        AddUniqueView(String(id));
      }}
    >
      Simulate Unique View
    </Button>
  );
}
