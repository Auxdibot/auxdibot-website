import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import NotificationType from '@/lib/types/NotificationType';
import { NotificationNames } from '@/lib/constants/NotificationNames';
import Link from 'next/link';
import { Channel } from '@/components/ui/channel';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from 'react-query';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button/button';
import { Eye, MoreHorizontal } from 'lucide-react';
import { BsTrash } from 'react-icons/bs';
import { Dialog, DialogContent } from '@/components/ui/dialog/dialog';
import { useState } from 'react';
import { DiscordMessage } from '@/components/ui/messages/discord-message';

export const columns: (serverID: string) => ColumnDef<NotificationType>[] = (
    serverID
) => [
    {
        accessorKey: 'type',
        cell: ({ row }) => {
            return (
                <span className={'flex items-center gap-2'}>
                    {NotificationNames[row.original.type] ?? row.original.type}
                </span>
            );
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Type' />
        ),
    },
    {
        accessorKey: 'channelID',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Channel' />
        ),
        cell: ({ row }) => {
            return (
                <Channel
                    serverID={serverID}
                    channelID={row.original.channelID}
                />
            );
        },
    },
    {
        accessorKey: 'topicURL',
        cell: ({ row }) => {
            const userID = row.original.topicURL;

            return row.original.type == 'TWITCH' ? (
                <Link
                    href={`https://twitch.tv/${userID}`}
                    target='_blank'
                    rel='noreferrer'
                >
                    <Button variant={'link'}>{userID}</Button>
                </Link>
            ) : (
                <Link href={userID} target='_blank' rel='noreferrer'>
                    <Button variant={'link'}>View Output</Button>
                </Link>
            );
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Topic' />
        ),
    },
    {
        id: 'actions',
        cell({ row }) {
            function RowActions() {
                const { toast } = useToast();
                const queryClient = useQueryClient();
                function deleteNotification() {
                    fetch(
                        `/bot/v1/servers/${serverID}/notifications/${row.original.index}`,
                        { method: 'DELETE' }
                    ).then(async (data) => {
                        const json = await data.json().catch(() => undefined);
                        if (!json || json['error']) {
                            toast({
                                title: 'Failed to delete notification',
                                description:
                                    json['error'] ?? 'An error occured',
                                status: 'error',
                            });
                            return;
                        }
                        queryClient.invalidateQueries([
                            'data_notifications',
                            serverID,
                        ]);
                        toast({
                            title: 'Notification Deleted',
                            description: `Notification #${row.original.index + 1} was deleted.`,
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
                                        'flex cursor-pointer items-center gap-1 transition-all hover:!text-red-500'
                                    }
                                    onClick={() => deleteNotification()}
                                >
                                    <BsTrash /> Delete Notification
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setOpenEmbed(true)}
                                    className={
                                        'flex cursor-pointer items-center gap-1 transition-all'
                                    }
                                >
                                    <Eye size='16' /> View Embed
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
                                    <Eye /> Embed Preview
                                </h2>
                                <DiscordMessage
                                    content={row.original.message.content}
                                    serverData={
                                        {
                                            serverID,
                                        }
                                    }
                                    background
                                    embed={row.original.message.embed}
                                />
                            </DialogContent>
                        </Dialog>
                    </>
                );
            }

            return <RowActions />;
        },
    },
];
