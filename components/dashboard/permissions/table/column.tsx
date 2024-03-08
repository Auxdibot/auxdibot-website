import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from 'react-query';
import { BsTrash } from 'react-icons/bs';

import PermissionType from '@/lib/types/PermissionType';
import { User } from '@/components/ui/user';
import { Role } from '@/components/ui/role';


export const columns: (serverID: string) => ColumnDef<PermissionType>[] = (serverID) => [
    {
      accessorKey: "permission",
      cell: ({ row }) => {
        return row.original.permission;
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Channel" />
      ),
    },
    {
      accessorKey: "user_or_role",
      cell: ({ row }) => {

        return row.original.user ? <User userID={row.original.user.id} /> : row.original.role ? <Role roleID={row.original.role.id} serverID={serverID}/> : "None";
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role or User" />
      ),
    },
    {
      accessorKey: "allowed",
      cell: ({ row }) => {
        return row.original.allowed ? "Allowed" : "Denied";
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Interval" />
      ),
    },

    {
      id: "actions",
      cell({ row }) {
        function RowActions() {
        const { toast } = useToast();
        const queryClient = useQueryClient();
        function deleteSchedule() {
          fetch(`/api/v1/servers/${serverID}/permissions/${row.original.index}`, { method: "DELETE" }).then(async (data) => {
              const json = await data.json().catch(() => undefined);
              if (!json || json['error']) {
                  toast({ title: "Failed to delete permission", description: json['error'] ?? "An error occured", status: "error" })
                  return
              }
              queryClient.invalidateQueries(["data_permissions", serverID])
              toast({ title: "Permission Deleted", description: `Permission #${row.original.index+1} was deleted.`, status: "success" })
          })
          }

          return (<>
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
                  onClick={() => deleteSchedule()}
                >
                  <BsTrash/> Delete Permission
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>)
        }
        
        return (<RowActions />)
    },
  },
  ]