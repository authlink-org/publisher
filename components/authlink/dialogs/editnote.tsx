"use client";

import ChangeNote from "@/actions/licenses/changenote";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon, ShieldXIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EditNote({
  license,
  isOpen,
  setIsOpen,
}: {
  license: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [Result, setResult] = useState<
    | {
        success: boolean;
        message: string;
      }
    | undefined
  >({ success: true, message: "none" });
  const [Loading, setLoading] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>Edit License Note</DialogTitle>
        <DialogDescription>
          Add a note which lets you identify users.
        </DialogDescription>
        <div className="grid gap-4 py-4">
          {!Result?.success && (
            <Alert variant="destructive">
              <ShieldXIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{Result?.message}</AlertDescription>
            </Alert>
          )}
          <div className="grid w-full gap-1.5">
            <Label htmlFor="note">New Note</Label>
            <Input type="text" id="note" placeholder="Some guy" />
          </div>
          <Button
            disabled={Loading}
            onClick={() => {
              const noteText = document.getElementById(
                "note"
              ) as HTMLInputElement;

              setLoading(true);
              ChangeNote(license, noteText.value).then((Result) => {
                setLoading(false);
                setResult(Result);

                if (Result?.success) {
                  return toast(Result.message);
                }
              });
            }}
          >
            {Loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
