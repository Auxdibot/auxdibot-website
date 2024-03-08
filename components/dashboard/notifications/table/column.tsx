import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import NotificationType from '@/lib/types/NotificationType';
import { NotificationNames } from '@/lib/constants/NotificationNames';
import Link from 'next/link';
import { Channel } from '@/components/ui/channel';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from 'react-query';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { BsEye, BsTrash } from 'react-icons/bs';
import MockEmbed from '@/components/ui/mock-embed';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';


export const columns: (serverID: string) => ColumnDef<NotificationType>[] = (serverID) => [
  {
    accessorKey: "type",
    cell: ({ row }) => {
      return <span className={'flex gap-2 items-center'}>{NotificationNames[row.original.type] ?? row.original.type}</span>;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "channelID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel" />
    ),
    cell: ({ row }) => {
      return <Channel serverID={serverID} channelID={row.original.channelID} />
    }
  },
  {
    accessorKey: "topicURL",
    cell: ({ row }) => {
      const userID = row.original.topicURL;

      return (row.original.type == 'TWITCH' ? 
      <Link href={`https://twitch.tv/${userID}`} target="_blank" rel="noreferrer"><Button variant={'link'}>{userID}</Button></Link> : 
      <Link href={userID} target="_blank" rel="noreferrer"><Button variant={'link'}>View Output</Button></Link>)
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic" />
    ),
  },
  {
    id: "actions",
    cell({ row }) {
      function RowActions() {
      const { toast } = useToast();
      const queryClient = useQueryClient();
      function deleteNotification() {
        fetch(`/api/v1/servers/${serverID}/notifications/${row.original.index}`, { method: "DELETE" }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to delete notification", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            queryClient.invalidateQueries(["data_notifications", serverID])
            toast({ title: "Notification Deleted", description: `Notification #${row.original.index+1} was deleted.`, status: "success" })
        })
        }
        const [embed, setOpenEmbed] = useState(false);
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
                onClick={() => deleteNotification()}
              >
                <BsTrash/> Delete Notification
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenEmbed(true)} className={"flex items-center gap-1 transition-all cursor-pointer"}>
              <BsEye/> View Embed
            </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={embed} onOpenChange={(e) => setOpenEmbed(e)}>

          <DialogContent>
              <h2 className={"text-xl font-montserrat flex items-center gap-2"}><BsEye/> Embed Preview</h2>
              <MockEmbed embed={row.original.message.embed}/>
          </DialogContent>
        </Dialog>
        </>
        )
      }
      
      return (<RowActions />)
  },
},
]
