import { useQuery } from 'react-query';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../select/select';
import { StoredEmbed } from '@/lib/types/StoredEmbed';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '../dialog/dialog';
import { Database, Eye } from 'lucide-react';
import { DiscordMessage } from './discord-message';
import { Button } from '../button/button';
import React from 'react';
import { SelectProps } from '@radix-ui/react-select';

export function StoredEmbeds({
    id,
    ...props
}: SelectProps & { readonly id: string }) {
    const { data: embeds } = useQuery<
        { data: { stored_embeds: StoredEmbed[] } } | undefined
    >(
        ['data_embeds', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/embeds`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );

    return (
        <Select {...props}>
            <SelectTrigger className='min-w-[200px]'>
                <SelectValue
                    placeholder={
                        <span className='flex items-center gap-1'>
                            <Database size={'16'} /> Stored Embeds
                        </span>
                    }
                />
            </SelectTrigger>
            <SelectContent>
                {embeds?.data?.stored_embeds?.map((i) => {
                    return (
                        <span key={i.id} className='flex items-center gap-2'>
                            <SelectItem value={i.id}>
                                <span>{i.id}</span>
                            </SelectItem>
                            <Dialog>
                                <DialogTrigger>
                                    <Button
                                        variant='ghost'
                                        className='cursor-pointer p-1'
                                    >
                                        <Eye size={'16'} />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>
                                        Stored Embed: {i.id}
                                    </DialogTitle>
                                    <DialogDescription>
                                        <DiscordMessage
                                            content={i.content}
                                            background
                                            embed={i.embed}
                                        />
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </span>
                    );
                })}
            </SelectContent>
        </Select>
    );
}
