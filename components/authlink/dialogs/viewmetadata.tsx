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

export default function MetadataViewer({
  metadata,
  isOpen,
  setIsOpen,
}: {
  metadata: string;
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
        <DialogTitle>Metadata Viewer</DialogTitle>
        <DialogDescription>View license metadata</DialogDescription>
        <div className="grid gap-4 py-4">
          {!Result?.success && (
            <Alert variant="destructive">
              <ShieldXIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{Result?.message}</AlertDescription>
            </Alert>
          )}
          <div className="grid w-full gap-1.5">
            {metadata.split(",,,").map((Val) => {
              return (
                <>
                  <Input readOnly type="text" value={Val} />
                </>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
