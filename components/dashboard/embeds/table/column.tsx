import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { Eye, MoreHorizontal } from 'lucide-react';

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
import { BsTrash } from 'react-icons/bs';
import { StoredEmbed } from '@/lib/types/StoredEmbed';
import { Dialog, DialogContent } from '@/components/ui/dialog/dialog';
import { DiscordMessage } from '@/components/ui/messages/discord-message';
import { useState } from 'react';

export const columns: (serverID: string) => ColumnDef<StoredEmbed>[] = (
    serverID
) => [
    {
        accessorKey: 'id',
        cell: ({ row }) => {
            return <span>{row.original.id}</span>;
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Embed ID' />
        ),
    },
    {
        accessorKey: 'date_created',
        cell: ({ row }) => {
            const date = new Date(row.original.date_created);

            return <span>{date?.toLocaleString()}</span>;
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Date Created' />
        ),
    },
    {
        id: 'actions',
        cell({ row }) {
            function RowActions() {
                const { toast } = useToast();
                const queryClient = useQueryClient();
                const [embed, setOpenEmbed] = useState(false);
                function deleteStoredEmbed() {
                    fetch(
                        `/bot/v1/servers/${serverID}/embeds/${row.original.id}`,
                        { method: 'DELETE' }
                    ).then(async (data) => {
                        const json = await data.json().catch(() => undefined);
                        if (!json || json['error']) {
                            toast({
                                title: 'Failed to delete stored embed',
                                description:
                                    json['error'] ?? 'An error occured',
                                status: 'error',
                            });
                            return;
                        }
                        queryClient.invalidateQueries([
                            'data_embeds',
                            serverID,
                        ]);
                        toast({
                            title: 'Stored Embed Deleted',
                            description: `The embed "${row.original.id}" was deleted.`,
                            status: 'success',
                        });
                    });
                }
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
                                    onClick={() => deleteStoredEmbed()}
                                >
                                    <BsTrash /> Delete Stored Embed
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
                                    content={row.original.content}
                                    background
                                    embed={row.original.embed}
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
