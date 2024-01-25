import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import EditProjectDialog from "./dialogs/edit-project";

export default function MobileNavbar({
  id,
  Project,
}: {
  id: string | string[];
  Project: any;
}) {
  return (
    <>
      <aside className="-mx-4 lg:w-1/5 lg:hidden">
        <nav>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="w-full">
                Open Mobile Menu
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AlertDialogHeader>
                <DialogTitle>Mobile Menu</DialogTitle>
              </AlertDialogHeader>
              <Button
                onClick={() => {
                  window.location.href = `/view/${id}`;
                }}
                variant={"outline"}
              >
                Overview
              </Button>
              <Button
                onClick={() => {
                  window.location.href = `/view/${id}/analytics`;
                }}
                variant={"outline"}
              >
                Analytics
              </Button>
              <Button
                onClick={() => {
                  window.location.href = `/view/${id}/licenses`;
                }}
                variant={"outline"}
              >
                Licenses
              </Button>
              <Button
                onClick={() => {
                  window.location.href = `/view/${id}/partner`;
                }}
                variant={"outline"}
              >
                Partner
              </Button>
              <EditProjectDialog
                key={Project?.id}
                id={Project?.id || ""}
                title={Project?.title || ""}
                description={Project?.description || ""}
                active={Project?.active || false}
                verified={Project?.verified || false}
                createdAt={Project?.createdAt || new Date()}
                views={Project?.views || 0}
                block_adblock={Project?.block_adblock || false}
                monetization_method={Project?.monetization_method || ""}
                image_url={Project?.image_url || ""}
                youtube_url={Project?.youtube_url || ""}
                profileClerk={Project?.profileClerk || ""}
              />
              <Button
                variant={"link"}
                onClick={() => {
                  window.open(
                    `https://authlink.org/p/${Project?.id}`,
                    "_authlink",
                    "popup,width=600,height=1000"
                  );
                }}
              >
                View Project
              </Button>
            </DialogContent>
          </Dialog>
        </nav>
      </aside>
    </>
  );
}
