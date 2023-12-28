"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

export default function SignOutButton() {
  const Clerk = useClerk();

  const [Open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);

  return (
    <>
      <AlertDialog
        open={Open}
        onOpenChange={(state) => {
          if (state) {
            setOpen(true);
          }
        }}
      >
        <AlertDialogTrigger asChild>
          <Button variant="outline">Sign Out</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpen(false);
              }}
            >
              Never mind
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={Loading}
              onClick={() => {
                setLoading(true);
                Clerk.signOut().then(() => {
                  setLoading(false);
                  setOpen(false);
                });
              }}
            >
              {Loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
