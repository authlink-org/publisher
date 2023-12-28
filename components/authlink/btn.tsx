"use client";

import { Button } from "@/components/ui/button";

export default function BtnY({ doAction }: { doAction: Function }) {
  return (
    <>
      <button
        onClick={async () => {
          const Return = await doAction(100);
          console.log(Return);
        }}
      >
        Hello world!
      </button>
    </>
  );
}

export function BtnX({ doAction }: { doAction: Function }) {
  return (
    <Button
      onClick={async () => {
        const Response = await doAction(
          "clerk_1",
          "testuser",
          "This is just my about me\n nothing crazy nothing fancy\n just an about me about me.",
          "linkvertise api key is going to be too long!",
          "work ink is not valid fyi."
        );
        console.log(Response);
      }}
    >
      Hello world!
    </Button>
  );
}
