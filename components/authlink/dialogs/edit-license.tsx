"use client";

import { useEffect, useState } from "react";
import { DatePickerDemo } from "./picker";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Loader2Icon, ShieldXIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

import UpdateFreeLicenseTime from "@/actions/project/updatefreetimer";

export default function EditLicenseDialog({
  project,
}: {
  project: string | undefined;
}) {
  const [Response, setResponse] = useState<
    | {
        success: boolean;
        message: string;
      }
    | undefined
  >({
    success: true,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Dialog>
        <DialogTrigger className="mr-4">
          <Button variant={"outline"} className="w-full">
            Edit free config
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change free licenses</DialogTitle>
            <DialogDescription>
              Set the amount of hours that a free license will last for.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!Response?.success && (
              <Alert variant="destructive">
                <ShieldXIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{Response?.message}</AlertDescription>
              </Alert>
            )}
            <div className="grid w-full gap-1.5">
              <Label htmlFor="hours">Amount of hours</Label>
              <Input
                type="text"
                id="hours"
                placeholder="2"
                defaultValue={"2"}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button
              disabled={loading}
              onClick={() => {
                if (!project) {
                  return;
                }
                setLoading(true);

                const Hours = document.getElementById(
                  "hours"
                ) as HTMLInputElement;

                if (Hours.value !== "") {
                  UpdateFreeLicenseTime(project, Number(Hours.value)).then(
                    (Resp) => {
                      setResponse(Resp);
                      if (!Resp?.success) {
                        setLoading(false);
                        return;
                      }

                      setLoading(false);
                      toast(Resp.message);
                    }
                  );
                }
              }}
            >
              {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
