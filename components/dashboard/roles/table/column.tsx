import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from 'react-query';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button/button';
import { MoreHorizontal } from 'lucide-react';
import { BsTrash } from 'react-icons/bs';
import Twemoji from '@/components/ui/emojis/twemoji';



export const columns: (serverID: string) => ColumnDef<{ reactions: { emoji: string }[], messageID: string, index: number }>[] = (serverID) => [
  {
    accessorKey: "messageID",
    cell: ({ row }) => {
      return row.original.messageID;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message ID" />
    ),
  },
  {
    accessorKey: "emoji",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emojis" />
    ),
    cell: ({ row }) => {

      return <span className={'flex gap-2 items-center'}>{row.original.reactions.map((i: { emoji: string }, index) => {
        return <Twemoji serverID={serverID} key={index}>{i.emoji}</Twemoji>;
    })}</span>;
    },
  },

  {
    id: "actions",
    cell({ row }) {
      function RowActions() {
      const { toast } = useToast();
      const queryClient = useQueryClient();
      function deleteReactionRole() {
        const body = new URLSearchParams();
        body.append('index', row.original.index.toString())
        fetch(`/bot/v1/servers/${serverID}/reaction_roles`, { method: "DELETE", body }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to delete reaction role", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            queryClient.invalidateQueries(["data_reaction_roles", serverID])
            toast({ title: "Reaction Role Deleted", description: `Reaction Role #${row.original.index+1} was deleted.`, status: "success" })
        })
        }

        return (
          <>
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
                className={"hover:!text-red-500 flex items-center gap-1 transition-all cursor-pointer"}
                onClick={() => deleteReactionRole()}
              >
                <BsTrash/> Delete Reaction Role
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </>
        )
      }
      
      return (<RowActions />)
  },
},
]
