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

    fetch(`/api/v1/servers/${serverID}/reset`, { method: "POST" }).then(() => {
      queryClient.invalidateQueries(["data_settings", serverID]);
      router.push(`/dashboard/${serverID}`);
      toast({
        title: `Reset Bot`,
        description: `Auxdibot's settings have been reset.`,
        status: "success",
        duration: 5000,
      })
    }).catch(() => undefined);
  }
  return <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button className={"font-open-sans w-fit mx-auto gap-1"} variant={'destructive'} type="submit">
        <BsTrash /> Reset Bot
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Reset Auxdibot</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to reset Auxdibot&apos;s settings for this server? This action is <span className={"text-red-500"}>irreversible</span> and will reset all settings to their default values. Your server&apos;s card, server member data, punishment data, and settings will be lost.  
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant={"destructive"} className="gap-1" onClick={reset}><BsTrash /> Reset Bot</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>;
}
