import { EmbedDialog } from '@/components/ui/dialog/embed-dialog';
import { testWebhook } from '@/lib/testWebhook';
import { Input } from '@/components/ui/input';
import Channels from '@/components/ui/select/channels';
import { TextareaMessage } from '@/components/ui/messages/textarea-message';
import { Button } from '@/components/ui/button/button';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { DiscordMessage } from '@/components/ui/messages/discord-message';
import { isEmbedEmpty } from '@/lib/isEmbedEmpty';
import { APIEmbed } from 'discord-api-types/v10';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useQueryClient } from 'react-query';
import {
    Database,
    Megaphone,
    MessageCircle,
    MessageCircleIcon,
    User,
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { useState } from 'react';
import { StoredEmbeds } from '@/components/ui/messages/stored-embeds';
import { StoredEmbed } from '@/lib/types/StoredEmbed';

type EmbedBody = {
    id?: string;
    message?: string;
    channel?: string;
    webhook_url?: string;
    embed: APIEmbed;
};

export function EmbedForm({ id }: { id: string }) {
    const { register, watch, control, handleSubmit, reset, setValue } =
        useForm<EmbedBody>({
            defaultValues: {
                embed: { fields: [] },
                channel: '',
                message: '',
                webhook_url: '',
            },
        });
    const { append, remove } = useFieldArray({
        name: 'embed.fields',
        control,
        rules: {
            maxLength: 25,
        },
    });
    const { toast } = useToast();
    const { data: channels } = useQuery(
        ['data_channels', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/channels`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const { data: embeds } = useQuery<
        { data: { stored_embeds: StoredEmbed[] } } | undefined
    >(
        ['data_embeds', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/embeds`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const [storeDialogOpen, setStoreDialogOpen] = useState(false);
    const [channelDialogOpen, setChannelDialogOpen] = useState(false);
    const queryClient = useQueryClient();
    function onPost(data: EmbedBody) {
        if (!data.channel) {
            toast({
                title: 'Failed to post embed',
                description: 'Channel is required',
                status: 'error',
            });
            return;
        }
        let body = new URLSearchParams();
        body.append('channel', data.channel || '');
        body.append('message', data.message || '');
        body.append('webhook_url', data.webhook_url || '');
        if (
            data.embed.author?.name ||
            data.embed.description ||
            data.embed.title ||
            data.embed.footer?.text ||
            (data.embed.fields?.length || 0) > 0
        ) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/bot/v1/servers/${id}/embeds`, { method: 'POST', body })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to create embed',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Embed Created',
                    description: `Posted an embed in #${channels.find((i: { id: string; name: string }) => i.id == data.channel)?.name ?? 'Unknown'}`,
                    status: 'success',
                });
            })
            .catch(() => {});
    }
    function onStore(data: EmbedBody) {
        if (!data.id) {
            toast({
                title: 'Failed to store embed',
                description: 'Embed ID is required',
                status: 'error',
            });
            return;
        }
        let body = new URLSearchParams();
        body.append('content', data.message || '');
        body.append('webhook_url', data.webhook_url || '');
        if (
            data.embed.author?.name ||
            data.embed.description ||
            data.embed.title ||
            data.embed.footer?.text ||
            (data.embed.fields?.length || 0) > 0
        ) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/bot/v1/servers/${id}/embeds/${data.id}`, {
            method: 'POST',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to store embed',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Embed Stored',
                    description: `Stored a new Embed, "${data.id}". You can now utilize this Embed in various Auxdibot modules.`,
                    status: 'success',
                });
                if (storeDialogOpen) setStoreDialogOpen(false);
                queryClient.invalidateQueries(['data_embeds', id]);
                reset();
            })
            .catch(() => {});
    }

    const embed = watch('embed'),
        message = watch('message');
    return (
        <>
            <div
                className={
                    'w-full flex-grow-0 self-stretch overflow-auto rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Create Embed
                </h2>
                <form className={'my-5 flex flex-col gap-2 md:m-5'}>
                    <label
                        className={
                            'flex flex-row items-center gap-2 max-xl:flex-col'
                        }
                    >
                        <span
                            className={
                                'flex flex-row items-center gap-2 font-open-sans text-xl'
                            }
                        >
                            <User /> Webhook URL:
                        </span>
                        <Controller
                            name={`webhook_url`}
                            control={control}
                            render={({ field }) => {
                                const tested = testWebhook(field.value ?? '');
                                return (
                                    <span
                                        className={`w-fit ${tested ? 'text-green-500' : (field.value?.length || 0) > 10 ? 'text-red-500' : ''}`}
                                    >
                                        <Input
                                            className={'w-64 text-sm'}
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.currentTarget.value
                                                )
                                            }
                                        />
                                    </span>
                                );
                            }}
                        />
                    </label>
                    <section
                        className={
                            'flex flex-col gap-2 font-open-sans text-xl max-md:items-center'
                        }
                    >
                        <span
                            className={
                                'flex w-full flex-row items-center gap-2 max-md:flex-col'
                            }
                        >
                            <label
                                className={'flex flex-row items-center gap-1'}
                            >
                                <MessageCircleIcon /> Message Content:
                            </label>
                            <span className='ml-auto max-md:mx-auto'>
                                <StoredEmbeds
                                    id={id}
                                    value={''}
                                    onValueChange={(e) => {
                                        const message =
                                            embeds?.data?.stored_embeds?.find(
                                                (i) => i.id === e
                                            );
                                        if (!message) return;
                                        setValue('embed', message.embed ?? {});
                                        setValue(
                                            'message',
                                            message.content ?? ''
                                        );
                                    }}
                                />
                            </span>
                        </span>

                        <Controller
                            name={'message'}
                            control={control}
                            render={({ field }) => {
                                return (
                                    <TextareaMessage
                                        serverID={id}
                                        wrapperClass={'w-full'}
                                        value={field.value}
                                        placeholderContext={'*'}
                                        onChange={field.onChange}
                                        maxLength={2000}
                                    />
                                );
                            }}
                        />
                    </section>

                    <section
                        className={
                            'flex items-center justify-between gap-2 max-md:flex-col'
                        }
                    >
                        <EmbedDialog
                            serverID={id}
                            addField={append}
                            removeField={remove}
                            control={control}
                            register={register}
                            placeholderContext={'*'}
                        />
                        <span className='flex items-center gap-1'>
                            <Dialog
                                open={storeDialogOpen}
                                onOpenChange={(e) => setStoreDialogOpen(e)}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={`flex flex-row items-center gap-2`}
                                        type='button'
                                    >
                                        <Database size={'16'} /> Store
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle className='font-raleway text-2xl'>
                                        Store Embed
                                    </DialogTitle>
                                    <label
                                        className={
                                            'flex flex-row items-center gap-2 max-xl:flex-col'
                                        }
                                    >
                                        <span
                                            className={
                                                'flex flex-row items-center gap-2 font-open-sans text-xl'
                                            }
                                        >
                                            <Database size='20' /> Embed ID:
                                        </span>
                                        <Controller
                                            name={`id`}
                                            control={control}
                                            render={({ field }) => {
                                                const tested = field.value
                                                    ? /^[a-zA-Z0-9_]+$/.test(
                                                          field.value
                                                      ) &&
                                                      field.value.length <= 64
                                                    : true;
                                                return (
                                                    <span
                                                        className={`w-fit ${!tested ? 'text-red-500' : ''}`}
                                                    >
                                                        <Input
                                                            className={
                                                                'w-64 text-sm'
                                                            }
                                                            value={field.value}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    e
                                                                        .currentTarget
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                );
                                            }}
                                        />
                                    </label>
                                    <Button
                                        onClick={handleSubmit(onStore)}
                                        variant='secondary'
                                    >
                                        Store
                                    </Button>
                                </DialogContent>
                            </Dialog>
                            <Dialog
                                open={channelDialogOpen}
                                onOpenChange={(e) => setChannelDialogOpen(e)}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={`flex flex-row items-center gap-2`}
                                        type='button'
                                    >
                                        <MessageCircle size={'16'} /> Post
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle className='font-raleway text-2xl'>
                                        Post Embed
                                    </DialogTitle>
                                    <label
                                        className={
                                            'flex flex-row items-center gap-2 max-xl:flex-col'
                                        }
                                    >
                                        <span
                                            className={
                                                'flex flex-row items-center gap-2 font-open-sans text-xl'
                                            }
                                        >
                                            <Megaphone /> Channel:
                                        </span>
                                        <Controller
                                            name={'channel'}
                                            control={control}
                                            render={({ field }) => (
                                                <Channels
                                                    required
                                                    serverID={id}
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.channel
                                                        )
                                                    }
                                                />
                                            )}
                                        ></Controller>
                                    </label>

                                    <Button
                                        variant={'secondary'}
                                        className={`flex flex-row items-center gap-2`}
                                        onClick={handleSubmit(onPost)}
                                    >
                                        <MessageCircle size={'16'} /> Post
                                    </Button>
                                </DialogContent>
                            </Dialog>
                        </span>
                    </section>
                </form>
            </div>
            <div
                className={
                    'w-full max-w-full self-stretch overflow-auto max-md:mx-auto'
                }
            >
                <DiscordMessage
                    background
                    serverData={
                        {
                            serverID: id,
                        }
                    }
                    content={
                        isEmbedEmpty(embed) && !message
                            ? `This is the Embed preview. When you make changes to your embed, the changes will be reflected here! See the [documentation for Embeds](${process.env.NEXT_PUBLIC_DOCUMENTATION_LINK}/modules/embeds) for more information!`
                            : message
                    }
                    embed={embed}
                />
            </div>
        </>
    );
}
