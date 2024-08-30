import { EmbedDialog } from '@/components/ui/dialog/embed-dialog';
import { testWebhook } from '@/lib/testWebhook';
import { Input } from '@/components/ui/input';
import {
    BsBroadcast,
    BsChatLeftDots,
    BsMegaphone,
    BsRobot,
} from 'react-icons/bs';

import Channels from '@/components/ui/select/channels';
import { TextareaMessage } from '@/components/ui/messages/textarea-message';
import { Button } from '@/components/ui/button/button';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { DiscordMessage } from '@/components/ui/messages/discord-message';
import { isEmbedEmpty } from '@/lib/isEmbedEmpty';
import { APIEmbed } from 'discord-api-types/v10';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from 'react-query';

type EmbedBody = {
    message: string;
    channel: string;
    webhook_url?: string;
    embed: APIEmbed;
};

export function EmbedForm({ id }: { id: string }) {
    const { register, watch, control, handleSubmit, reset } =
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
    function onSubmit(data: EmbedBody) {
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
                <p
                    className={
                        'font-open-sans text-base italic text-gray-400 max-md:w-full max-md:text-center md:ml-4'
                    }
                >
                    <span className={'text-red-500'}>*</span> = required field
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={'my-5 flex flex-col gap-2 md:m-5'}
                >
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
                            <span className={'text-red-500'}>*</span>{' '}
                            <BsMegaphone /> Channel:
                        </span>
                        <Controller
                            name={'channel'}
                            control={control}
                            render={({ field }) => (
                                <Channels
                                    required
                                    serverID={id}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.channel)}
                                />
                            )}
                        ></Controller>
                    </label>
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
                            <BsRobot /> Webhook URL:
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
                            'flex w-full max-w-full flex-col gap-2 max-md:items-center'
                        }
                    >
                        <span
                            className={
                                'flex flex-row items-center gap-2 font-open-sans text-xl'
                            }
                        >
                            <BsChatLeftDots /> Message:
                        </span>
                        <Controller
                            name={'message'}
                            control={control}
                            render={({ field }) => (
                                <TextareaMessage
                                    maxLength={2000}
                                    wrapperClass={''}
                                    serverID={id}
                                    {...field}
                                />
                            )}
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
                        />

                        <Button
                            variant={'outline'}
                            className={`flex flex-row items-center gap-2`}
                            type='submit'
                        >
                            <BsBroadcast /> Send Message
                        </Button>
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
