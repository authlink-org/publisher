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

import CreateLicense from "@/actions/licenses/createlicense";
import { Loader2Icon, ShieldXIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateLicenseDialog({
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
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Create a new license</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new license</DialogTitle>
            <DialogDescription>
              Creates a new unassigned license
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
              <Label htmlFor="description">Expire Date</Label>
              <DatePickerDemo date={date} setDate={setDate} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lifetime" />
              <label
                htmlFor="lifetime"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                defaultChecked={true}
                defaultValue={"true"}
              >
                Lifetime license
              </label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button
              disabled={loading}
              onClick={() => {
                if (!project || !date) {
                  return;
                }
                const Lifetime = document.getElementById(
                  "lifetime"
                ) as HTMLInputElement;

                setLoading(true);
                CreateLicense(
                  project,
                  date,
                  Lifetime.value === "true" ? true : false
                ).then((Response) => {
                  setResponse(Response);
                  if (!Response?.success) {
                    return setLoading(false);
                  }

                  toast(Response.message);
                  setLoading(false);
                });
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
