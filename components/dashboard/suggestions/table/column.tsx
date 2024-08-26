import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
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
import { MoreHorizontal } from 'lucide-react';
import { BsEye, BsHammer, BsTrash } from 'react-icons/bs';
import { User } from '@/components/ui/user';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
} from '@/components/ui/dialog/dialog';

type SuggestionColumn = {
    creatorID: string;
    date_unix: number;
    status: string;
    suggestionID: number;
    content: string;
    handlerID?: string;
    handled_content?: string;
};

export const columns: (serverID: string) => ColumnDef<SuggestionColumn>[] = (
    serverID
) => [
    {
        accessorKey: 'suggestionID',
        cell: ({ row }) => {
            return <b>#{row.original.suggestionID}</b>;
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='ID' />
        ),
    },
    {
        accessorKey: 'creatorID',
        cell: ({ row }) => {
            const creatorID = row.original.creatorID;

            return <User userID={creatorID} />;
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Author' />
        ),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Status' />
        ),
        cell: ({ row }) => {
            const state: { [k in any]: string } = {
                WAITING: '⌚ Waiting',
                APPROVED: '✅ Approved',
                DENIED: '❌ Denied',
                CONSIDERED: '💭 Considered',
                ADDED: '➕ Added',
            };
            return state[row.original.status] ?? state.WAITING;
        },
    },
    {
        accessorKey: 'date_unix',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Date' />
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.date_unix);
            return date.toLocaleDateString();
        },
    },
    {
        id: 'actions',
        cell({ row }) {
            function RowActions() {
                const { toast } = useToast();
                const queryClient = useQueryClient();
                function deleteSuggestion() {
                    const body = new URLSearchParams();
                    body.append('id', row.original.suggestionID.toString());
                    fetch(`/bot/v1/servers/${serverID}/suggestions`, {
                        method: 'DELETE',
                        body,
                    }).then(async (data) => {
                        const json = await data.json().catch(() => undefined);
                        if (!json || json['error']) {
                            toast({
                                title: 'Failed to delete suggestion',
                                description:
                                    json['error'] ?? 'An error occured',
                                status: 'error',
                            });
                            return;
                        }
                        queryClient.invalidateQueries([
                            'data_suggestions',
                            serverID,
                        ]);
                        toast({
                            title: 'Suggestion Deleted',
                            description: `Suggestion #${row.original.suggestionID} was deleted.`,
                            status: 'success',
                        });
                    });
                }
                const [suggestionOpen, setOpenSuggestion] = useState(false);
                const [handledOpen, setHandledOpen] = useState(false);
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
                                    onClick={() => setOpenSuggestion(true)}
                                    className={
                                        'flex cursor-pointer items-center gap-1 transition-all'
                                    }
                                >
                                    <BsEye /> View Suggestion
                                </DropdownMenuItem>
                                {row.original.handlerID && (
                                    <DropdownMenuItem
                                        onClick={() => setHandledOpen(true)}
                                        className={
                                            'flex cursor-pointer items-center gap-1 transition-all'
                                        }
                                    >
                                        <BsHammer /> View Handler & Reason
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                    className={
                                        'flex cursor-pointer items-center gap-1 transition-all hover:!text-red-500'
                                    }
                                    onClick={() => deleteSuggestion()}
                                >
                                    <BsTrash /> Delete Suggestion
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog
                            open={suggestionOpen}
                            onOpenChange={(e) => setOpenSuggestion(e)}
                        >
                            <DialogContent>
                                <h2
                                    className={
                                        'flex items-center gap-2 font-montserrat text-xl'
                                    }
                                >
                                    <BsEye /> View Suggestion
                                </h2>
                                <DialogDescription>
                                    {row.original.content}
                                </DialogDescription>
                            </DialogContent>
                        </Dialog>
                        {row.original.handlerID && (
                            <Dialog
                                open={handledOpen}
                                onOpenChange={(e) => setHandledOpen(e)}
                            >
                                <DialogContent>
                                    <h2
                                        className={
                                            'flex items-center gap-2 font-montserrat text-xl'
                                        }
                                    >
                                        <BsHammer /> View Handler & Reason
                                    </h2>
                                    <User userID={row.original.handlerID} />
                                    <DialogDescription>
                                        {row.original.handled_content ??
                                            'No reason given.'}
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        )}
                    </>
                );
            }

            return <RowActions />;
        },
    },
];
