import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from 'react-query';
import { BsEye, BsTrash } from 'react-icons/bs';
import ScheduleType from '@/lib/types/ScheduleType';
import { Channel } from '@/components/ui/channel';
import { Dialog, DialogContent } from '@/components/ui/dialog/dialog';
import { useState } from 'react';
import { DiscordMessage } from '@/components/ui/messages/discord-message';

export const columns: (serverID: string) => ColumnDef<ScheduleType>[] = (
    serverID
) => [
    {
        accessorKey: 'channelID',
        cell: ({ row }) => {
            return (
                <Channel
                    serverID={serverID}
                    channelID={row.original.channelID}
                />
            );
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Channel' />
        ),
    },
    {
        accessorKey: 'times_run',
        cell: ({ row }) => {
            return (
                row.original.times_run.toString() +
                '/' +
                (row.original.times_to_run ?? '∞')
            );
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Times Run' />
        ),
    },
    {
        accessorKey: 'moderatorID',
        cell: ({ row }) => {
            return row.original.interval_timestamp;
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Interval' />
        ),
    },
    {
        accessorKey: 'last_run',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Last Run' />
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.last_run);
            return date.toLocaleDateString();
        },
    },
    {
        id: 'actions',
        cell({ row }) {
            function RowActions() {
                const { toast } = useToast();
                const queryClient = useQueryClient();
                function deleteSchedule() {
                    fetch(
                        `/bot/v1/servers/${serverID}/schedules/${row.original.index}`,
                        { method: 'DELETE' }
                    ).then(async (data) => {
                        const json = await data.json().catch(() => undefined);
                        if (!json || json['error']) {
                            toast({
                                title: 'Failed to delete schedule',
                                description:
                                    json['error'] ?? 'An error occured',
                                status: 'error',
                            });
                            return;
                        }
                        queryClient.invalidateQueries([
                            'data_schedules',
                            serverID,
                        ]);
                        toast({
                            title: 'Schedule Deleted',
                            description: `Schedule #${row.original.index + 1} was deleted.`,
                            status: 'success',
                        });
                    });
                }
                const [embed, setOpenEmbed] = useState(false);
                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='h-8 w-8 p-0'>
                                    <span className='sr-only'>Open menu</span>
                                    <MoreHorizontal className='h-4 w-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className={'max-w-xs'}
                                align='end'
                            >
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    className={
                                        'flex w-fit cursor-pointer items-center gap-1 transition-all hover:!text-red-500'
                                    }
                                    onClick={() => deleteSchedule()}
                                >
                                    <BsTrash /> Delete Schedule
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setOpenEmbed(true)}
                                    className={
                                        'flex cursor-pointer items-center gap-1 transition-all'
                                    }
                                >
                                    <BsEye /> View Embed
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog
                            open={embed}
                            onOpenChange={(e) => setOpenEmbed(e)}
                        >
                            <DialogContent>
                                <h2
                                    className={
                                        'flex items-center gap-2 font-montserrat text-xl'
                                    }
                                >
                                    <BsEye /> Embed Preview
                                </h2>
                                <DiscordMessage embed={row.original.embed} />
                            </DialogContent>
                        </Dialog>
                    </>
                );
            }

            return <RowActions />;
        },
    },
];
