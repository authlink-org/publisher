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

import DeleteProject from "@/actions/project/delete-project";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

export default function DeleteProjectButton({
  id,
  clerk,
}: {
  id: string;
  clerk: string;
}) {
  const [Open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const Router = useRouter();

  return (
    <>
      <AlertDialog
        open={Open}
        onOpenChange={(State) => {
          if (State) {
            setOpen(true);
          }
        }}
      >
        <AlertDialogTrigger asChild>
          <Button variant={"default"}>Delete project</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this project?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              project from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={Loading}
              onClick={() => {
                setLoading(true);
                DeleteProject(id).then(() => {
                  Router.push("/");
                });
              }}
            >
              {Loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
