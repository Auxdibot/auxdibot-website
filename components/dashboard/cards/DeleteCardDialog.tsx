"use client";
import { useRouter } from "next/navigation";
import { BsTrash } from "react-icons/bs";
import { useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

export function ResetDialog({ serverID }: { serverID: string; }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {toast} = useToast();
  function reset() {

    fetch(`/api/v1/servers/${serverID}/updateCard`, { method: "DELETE" }).then(() => {
      queryClient.invalidateQueries(["data_settings", serverID]);
      router.push(`/dashboard/${serverID}`);
      toast({
        title: `Reset Card`,
        description: `The card data for this server has been reset.`,
        status: "success",
      })
    }).catch(() => undefined);
}

  return <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button className={"font-open-sans w-fit flex items-center mx-auto gap-2"} variant={'destructive'} type="submit">
        <BsTrash /> Reset Card
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Reset Auxdibot Card</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to reset Auxdibot&apos;s Card settings for this server? This action is <span className={"text-red-500"}>irreversible</span> and will delete all your card data.  
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant={"destructive"} className="gap-1" onClick={reset}><BsTrash /> Reset Card</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>;
}
