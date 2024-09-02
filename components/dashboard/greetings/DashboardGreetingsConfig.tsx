'use client';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { APIEmbed } from 'discord-api-types/v10';
import { PiHandWavingLight } from 'react-icons/pi';
import JoinLeaveChannel from './JoinLeaveChannel';
import { useToast } from '@/components/ui/use-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select/select';
import { TextareaMessage } from '@/components/ui/messages/textarea-message';
import { Button } from '@/components/ui/button/button';
import { EmbedDialog } from '@/components/ui/dialog/embed-dialog';
import { Hand, MessageCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { DiscordMessage } from '@/components/ui/messages/discord-message';
import { ModuleDisableOverlay } from '../ModuleDisableOverlay';
import { StoredEmbeds } from '@/components/ui/messages/stored-embeds';
import { StoredEmbed } from '@/lib/types/StoredEmbed';
import { useQuery } from 'react-query';
import { isEmbedEmpty } from '@/lib/isEmbedEmpty';

enum GreetingType {
    JOIN = 'join',
    JOIN_DM = 'join_DM',
    LEAVE = 'leave',
}

type GreetingBody = {
    message: string;
    greeting: GreetingType;
    embed: APIEmbed;
};
export default function DashboardGreetingsConfig({ id }: { id: string }) {
    const { register, watch, control, handleSubmit, reset, setValue } =
        useForm<GreetingBody>();
    const { append, remove } = useFieldArray({
        name: 'embed.fields',
        control,
        rules: {
            maxLength: 25,
        },
    });
    const { data: embeds } = useQuery<
        { data: { stored_embeds: StoredEmbed[] } } | undefined
    >(
        ['data_embeds', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/embeds`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const { toast } = useToast();
    function onSubmit(bodyData: GreetingBody) {
        let body = new URLSearchParams();
        body.append('message', bodyData.message);
        if (
            bodyData.embed.author?.name ||
            bodyData.embed.description ||
            bodyData.embed.title ||
            bodyData.embed.footer?.text ||
            (bodyData.embed.fields?.length || 0) > 0
        ) {
            body.append('embed', JSON.stringify(bodyData.embed));
        }
        fetch(`/bot/v1/servers/${id}/greetings/${bodyData.greeting}`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: `Failed to set greeting`,
                        description: json['error']
                            ? json['error']
                            : `An error occurred while setting the greeting.`,
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: `Greeting Set`,
                    description: `The "${bodyData.greeting
                        .replace('_', ' ')
                        .split(' ')
                        .map(
                            (i) => i[0].toUpperCase() + i.slice(1).toLowerCase()
                        )}" greeting has been set successfully.`,
                    status: 'success',
                });
                reset({
                    message: '',
                    greeting: GreetingType.JOIN,
                    embed: { fields: [] },
                });
            })
            .catch(() => {});
    }
    const embed = watch('embed');
    const content = watch('message');
    const type = watch('greeting');
    return (
        <>
            <ModuleDisableOverlay id={id} module={'Greetings'} />

            <main className={'flex-grow bg-gray-950'}>
                <div
                    className={
                        'flex animate-fadeIn flex-col gap-5 py-5 max-md:items-center xl:px-5'
                    }
                >
                    <span className='mb-5 mt-2 flex items-center gap-5 max-md:flex-col'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-800 bg-gradient-to-bl from-gray-500/40 to-gray-900/40 shadow transition-colors hover:bg-gray-500/40'>
                            <Hand size={'48'} />
                        </div>
                        <div className='flex flex-col max-md:items-center max-md:text-center'>
                            <h1
                                className={
                                    'header flex items-center font-raleway text-4xl font-bold'
                                }
                            >
                                Greetings
                                <Link
                                    target='_blank'
                                    href={
                                        process.env
                                            .NEXT_PUBLIC_DOCUMENTATION_LINK +
                                        '/modules/greetings'
                                    }
                                >
                                    <Button className='text-sm' variant='link'>
                                        [docs]
                                    </Button>
                                </Link>
                            </h1>
                            <p className='max-w-4xl font-inter text-lg'>
                                Allows Auxdibot to greet members as they join
                                your server. Greetings can be customized using
                                Auxdibot&apos;s Discord Embed creator.
                            </p>
                        </div>
                    </span>
                    <span
                        className={
                            'grid w-full grid-cols-2 grid-rows-2 gap-10 max-xl:grid-cols-1 max-xl:grid-rows-none'
                        }
                    >
                        <div
                            className={
                                'row-span-2 h-fit w-full rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                            }
                        >
                            <h2
                                className={
                                    'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                                }
                            >
                                Set Greeting
                            </h2>
                            <p
                                className={
                                    'font-open-sans text-base italic text-gray-400 max-md:w-full max-md:text-center md:ml-4'
                                }
                            >
                                <span className={'text-red-500'}>*</span> =
                                required field
                            </p>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className={'my-5 flex flex-col gap-2 md:m-5'}
                            >
                                <label
                                    className={
                                        'flex flex-row items-center gap-2 font-open-sans text-xl max-xl:flex-col'
                                    }
                                >
                                    <span
                                        className={
                                            'flex flex-row items-center gap-2'
                                        }
                                    >
                                        <span className={'text-red-500'}>
                                            *
                                        </span>{' '}
                                        <PiHandWavingLight /> Greeting:
                                    </span>
                                    <Controller
                                        control={control}
                                        name={'greeting'}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger
                                                    className={
                                                        'w-fit min-w-[200px]'
                                                    }
                                                >
                                                    <SelectValue
                                                        placeholder={
                                                            'Select a type'
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={'JOIN'}>
                                                        Join
                                                    </SelectItem>
                                                    <SelectItem
                                                        value={'JOIN_DM'}
                                                    >
                                                        Join (DM)
                                                    </SelectItem>
                                                    <SelectItem value={'LEAVE'}>
                                                        Leave
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
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
                                            className={
                                                'flex flex-row items-center gap-1'
                                            }
                                        >
                                            <MessageCircleIcon /> Message
                                            Content:
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
                                                    setValue(
                                                        'embed',
                                                        message.embed ?? {}
                                                    );
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
                                                    placeholderContext={[
                                                        'member',
                                                        'member_join',
                                                        'member_punishments',
                                                        'member_levels',
                                                    ]}
                                                    value={field.value}
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
                                        control={control}
                                        addField={append}
                                        register={register}
                                        removeField={remove}
                                    />

                                    <Button
                                        variant={'outline'}
                                        className={`flex flex-row items-center gap-2`}
                                        type='submit'
                                    >
                                        <PiHandWavingLight /> Set Greeting
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
                                    isEmbedEmpty(embed) && !content
                                        ? `This is the Embed preview for the ${type.split('_').map((i) => i[0].toUpperCase() + i.slice(1))} greeting you are creating. When you make changes to your embed, the changes will be reflected here! See the [documentation for Embeds](${process.env.NEXT_PUBLIC_DOCUMENTATION_LINK}/modules/embeds) for more information!`
                                        : content
                                }
                                embed={embed}
                            />
                        </div>
                        <div
                            className={
                                'h-fit w-full flex-1 flex-grow rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                            }
                        >
                            <h2
                                className={
                                    'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                                }
                            >
                                Greetings Settings
                            </h2>
                            <JoinLeaveChannel serverID={id} />
                        </div>
                    </span>
                </div>
            </main>
        </>
    );
}
