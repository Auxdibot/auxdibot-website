import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/components/ui/user';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import PunishmentData from '@/lib/types/PunishmentData';
import { PunishmentNames } from '@/lib/constants/PunishmentNames';
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from 'react-query';
import { BsTrash } from 'react-icons/bs';


export const columns: (serverID: string) => ColumnDef<PunishmentData>[] = (serverID) => [
    {
      accessorKey: "case",
      cell: ({ row }) => {
        return <span className={"flex gap-1 items-center"}><span className={"font-bold"}>#{row.original.punishmentID}</span> {PunishmentNames[row.original.type].icon} {PunishmentNames[row.original.type].name}</span>;
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Case" />
      ),
    },
    {
      accessorKey: "userID",
      cell: ({ row }) => {
        const userID = row.original.userID;

        return (<User userID={userID} />)
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
    },
    {
      accessorKey: "moderatorID",
      cell: ({ row }) => {
        const moderatorID = row.original.moderatorID;

        return (moderatorID ? <User userID={moderatorID} /> : "None");
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Moderator" />
      ),
    },
    {
      accessorKey: "date_unix",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.date_unix);
        return date.toLocaleDateString();
      }
    },
    {
      id: "actions",
      cell({ row }) {
        function RowActions() {
        const { toast } = useToast();
        const queryClient = useQueryClient();
        function deletePunishment() {
          fetch(`/api/v1/servers/${serverID}/punishments/${row.original.punishmentID}`, { method: "DELETE" }).then(async (data) => {
              const json = await data.json().catch(() => undefined);
              if (!json || json['error']) {
                  toast({ title: "Failed to delete punishment", description: json['error'] ?? "An error occured", status: "error" })
                  return
              }
              queryClient.invalidateQueries(["data_punishments", serverID])
              toast({ title: "Punishment Deleted", description: `Punishment #${row.original.punishmentID} was deleted.`, status: "success" })
          })
          }
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={'max-w-xs'} align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className={"hover:!text-red-500 flex items-center gap-1 transition-all cursor-pointer w-fit"}
                  onClick={() => deletePunishment()}
                >
                  <BsTrash/> Delete Punishment
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <p className={"p-1 text-xs italic break-words"}>&quot;{row.original.reason}&quot;</p>
                {row.original.expires_date_unix && <span className={"text-xs font-bold"}>Expires {new Date(row.original.expires_date_unix).toLocaleDateString()}</span>}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
        
        return (<RowActions />)
    },
  },
  ]