'use client';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import {
    BsBell,
    BsChatLeftDots,
    BsEye,
    BsLink,
    BsMegaphone,
    BsRss,
    BsTwitch,
    BsWifi,
    BsYoutube,
} from 'react-icons/bs';
import { APIEmbed } from 'discord-api-types/v10';
import MockEmbed from '@/components/ui/messages/mock-embed';
import Channels from '@/components/ui/select/channels';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select/select';
import { NotificationNames } from '@/lib/constants/NotificationNames';
import { Input } from '@/components/ui/input';
import { TextareaMessage } from '@/components/ui/messages/textarea-message';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { EmbedDialog } from '@/components/ui/dialog/embed-dialog';
type NotificationBody = {
    type: string;
    topic: string;
    embed: APIEmbed;
    message: string;
    channel: string;
};
const NotificationSelect = {
    YOUTUBE: (
        <>
            <BsYoutube /> YouTube Handle
        </>
    ),
    TWITCH: (
        <>
            <BsTwitch /> Twitch Username
        </>
    ),
    RSS: (
        <>
            <BsRss /> RSS Feed URL
        </>
    ),
};
const FeedPlaceholders: { [key: string]: string } = {
    '{%feed_link%}': '[[ LINK TO CONTENT ]]',
    '{%feed_author%}': '[[ CONTENT AUTHOR ]]',
    '{%feed_title%}': '[[ CONTENT TITLE ]]',
    '{%feed_content%}': '[[ FEED CONTENT ]]',
};
export default function CreateNotification({ serverID }: { serverID: string }) {
    const { handleSubmit, reset, control, register, watch } =
        useForm<NotificationBody>({
            defaultValues: {
                type: 'YOUTUBE',
                embed: { fields: [] },
                channel: '',
                topic: '',
                message: '',
            },
        });
    const { append, remove } = useFieldArray({
        name: 'embed.fields',
        control: control,
        rules: { maxLength: 25 },
    });
    const queryClient = useQueryClient();
    const embed = watch('embed');
    const type = watch('type');
    const { toast } = useToast();
    function onSubmit(data: NotificationBody) {
        let body = new URLSearchParams();
        body.append('channelID', data.channel);
        body.append('type', data.type);
        body.append('topicURL', data.topic);
        body.append('message', data.message);
        if (
            data.embed.author?.name ||
            data.embed.description ||
            data.embed.title ||
            data.embed.footer?.text ||
            (data.embed.fields?.length || 0) > 0
        ) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/bot/v1/servers/${serverID}/notifications`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to create notification',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                queryClient.invalidateQueries(['data_notifications', serverID]);
                toast({
                    title: 'Notification Created',
                    description: `Notification was created.`,
                    status: 'success',
                });
                reset();
            })
            .catch(() => {});
    }
    return (
        <>
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
                    Create Notification Feed
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
                            'flex flex-row items-center gap-2 font-open-sans max-md:flex-col'
                        }
                    >
                        <span
                            className={
                                'flex flex-row items-center gap-2 text-xl'
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
                                    serverID={serverID}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.channel)}
                                />
                            )}
                        ></Controller>
                    </label>
                    <label
                        className={
                            'flex flex-row items-center gap-2 font-open-sans max-md:flex-col'
                        }
                    >
                        <span
                            className={
                                'flex flex-row items-center gap-2 text-xl'
                            }
                        >
                            <span className={'text-red-500'}>*</span> <BsWifi />{' '}
                            Type:
                        </span>
                        <Controller
                            name={'type'}
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className={'w-fit'}>
                                            <SelectValue
                                                placeholder={
                                                    'Select a feed type'
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.keys(NotificationNames).map(
                                                (i) => (
                                                    <SelectItem
                                                        className={'group'}
                                                        key={i}
                                                        value={i}
                                                    >
                                                        <span
                                                            className={
                                                                'flex items-center gap-2 px-2 transition-all group-hover:gap-3'
                                                            }
                                                        >
                                                            {
                                                                NotificationNames[
                                                                    i as keyof typeof NotificationNames
                                                                ]
                                                            }
                                                        </span>
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                );
                            }}
                        />
                    </label>
                    <label
                        className={
                            'flex flex-row items-center gap-2 font-open-sans max-md:flex-col'
                        }
                    >
                        <span
                            className={
                                'flex flex-row items-center gap-2 text-xl'
                            }
                        >
                            <span className={'text-red-500'}>*</span>{' '}
                            {NotificationSelect[
                                type as keyof typeof NotificationSelect
                            ] ?? (
                                <>
                                    <BsLink /> Topic
                                </>
                            )}
                            :
                        </span>
                        <Input
                            className='w-fit'
                            {...register('topic', { required: true })}
                        />
                    </label>

                    <section
                        className={
                            'flex w-full flex-col gap-2 font-open-sans text-xl max-md:items-center'
                        }
                    >
                        <span className={'flex flex-row items-center gap-2'}>
                            <BsChatLeftDots /> Message:
                        </span>
                        <Controller
                            name={'message'}
                            control={control}
                            render={({ field }) => (
                                <TextareaMessage
                                    placeholderContext={['feed']}
                                    wrapperClass={'w-full'}
                                    maxLength={2000}
                                    serverID={serverID}
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </section>
                    <section
                        className={
                            'flex w-full flex-col max-md:items-center max-md:justify-center'
                        }
                    >
                        <span
                            className={
                                'flex items-center justify-between gap-5 max-md:flex-col'
                            }
                        >
                            <EmbedDialog
                                placeholderContext={['feed']}
                                serverID={serverID}
                                addField={append}
                                register={register}
                                removeField={remove}
                                control={control}
                            />

                            <Button
                                className={`flex w-fit flex-row items-center gap-2 max-md:mx-auto`}
                                variant={'outline'}
                                type='submit'
                            >
                                <BsBell /> Create Notification
                            </Button>
                        </span>
                        <Separator className={'my-2'} />
                        <span className={'max-md:px-2'}>
                            <h1
                                className={
                                    'my-2 flex items-center gap-2 font-montserrat text-xl'
                                }
                            >
                                <BsEye /> Embed Preview
                            </h1>
                            {embed ? (
                                <MockEmbed
                                    embed={JSON.parse(
                                        Object.keys(FeedPlaceholders).reduce(
                                            (acc: string, i) =>
                                                acc.replace(
                                                    i,
                                                    FeedPlaceholders[i]
                                                ),
                                            JSON.stringify(embed)
                                        )
                                    )}
                                />
                            ) : (
                                ''
                            )}
                        </span>
                    </section>
                </form>
            </div>
        </>
    );
}
