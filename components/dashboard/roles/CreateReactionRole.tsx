'use client';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { APIEmbed } from 'discord-api-types/v10';
import {
    BsEye,
    BsMegaphone,
    BsPerson,
    BsPersonVcard,
    BsPlus,
    BsRobot,
    BsTag,
    BsTextCenter,
    BsX,
} from 'react-icons/bs';
import Channels from '@/components/ui/select/channels';
import Roles from '@/components/ui/select/roles';

import { ReactionRoleTypes } from '@/lib/types/ReactionRoleTypes';
import EmojiPicker from '@/components/ui/emojis/emoji-picker';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { testWebhook } from '@/lib/testWebhook';
import { DiscordMessage } from '@/components/ui/messages/discord-message';
import { MessageCircleIcon } from 'lucide-react';
import { StoredEmbed } from '@/lib/types/StoredEmbed';
import { StoredEmbeds } from '@/components/ui/messages/stored-embeds';
import { isEmbedEmpty } from '@/lib/isEmbedEmpty';

type ReactionRoleBody = {
    message?: string;
    title: string;
    channel: string;
    webhook_url?: string;
    reactions: { emoji: string; roleID: string }[];
    embed?: APIEmbed;
    messageID?: string;
    type: ReactionRoleTypes;
};
export default function CreateReactionRole({
    serverID: id,
}: {
    serverID: string;
}) {
    const { register, watch, control, handleSubmit, reset, setValue } =
        useForm<ReactionRoleBody>({
            defaultValues: {
                message: '',
                title: '',
                channel: '',
                reactions: [],
                embed: { fields: [] },
                type: 'DEFAULT',
                webhook_url: '',
            },
        });
    const { fields, append, remove } = useFieldArray({
        name: 'embed.fields',
        control,
        rules: {
            maxLength: 25,
        },
    });
    const {
        fields: reactions,
        append: appendReaction,
        remove: removeReaction,
    } = useFieldArray({
        name: 'reactions',
        control,
        rules: {
            maxLength: 10,
        },
    } as never);

    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: embeds } = useQuery<
        { data: { stored_embeds: StoredEmbed[] } } | undefined
    >(
        ['data_embeds', id],
        async () =>
            await fetch(`/bot/v1/servers/${id}/embeds`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    function onSubmit(data: ReactionRoleBody) {
        let body = new URLSearchParams();
        body.append('channel', data.channel ?? '');
        body.append(
            'reactions',
            JSON.stringify(
                data.reactions.map((i) => ({
                    emoji: i.emoji,
                    roleID: i.roleID,
                }))
            )
        );
        body.append('message', data.message ?? '');
        body.append('title', data.title ?? '');
        body.append('type', data.type ?? '');
        body.append('messageID', data.messageID ?? '');
        body.append('webhook_url', data.webhook_url ?? '');
        if (
            data.embed &&
            (data.embed.author?.name ||
                data.embed.description ||
                data.embed.title ||
                data.embed.footer?.text ||
                (data.embed.fields?.length || 0) > 0)
        ) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/bot/v1/servers/${id}/reaction_roles`, {
            method: 'POST',
            body,
        })
            .then(async (data) => {
                const json = await data.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: `Failed to create reaction role`,
                        description: json['error']
                            ? json['error']
                            : `An error occurred while creating the reaction role.`,
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: `Reaction Role Created`,
                    description: `The reaction role has been created successfully.`,
                    status: 'success',
                });

                removeReaction(fields.length);
                queryClient.invalidateQueries(['data_reaction_roles', id]);
                removeReaction(reactions.length);
                reset({ channel: undefined });
            })
            .catch(() => {});
    }
    const embed = watch('embed'),
        messageID = watch('messageID'),
        content = watch('message');
    return (
        <>
            <div
                className={
                    'row-span-1 w-full flex-1 flex-grow rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Create Reaction Role
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
                    className={'my-5 flex flex-col gap-2 p-1 md:m-5'}
                >
                    <span
                        className={
                            'flex flex-row items-center gap-2 font-open-sans max-xl:flex-col'
                        }
                    >
                        {!messageID && (
                            <>
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
                                            required
                                            serverID={id}
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.channel)
                                            }
                                        />
                                    )}
                                ></Controller>
                            </>
                        )}
                    </span>
                    <label
                        className={
                            'flex flex-row items-center gap-2 font-lato text-xl max-xl:flex-col'
                        }
                    >
                        <span className={'flex flex-row items-center gap-2'}>
                            <span className={'text-red-500'}>*</span> <BsTag />{' '}
                            Type:
                        </span>
                        <Controller
                            control={control}
                            name={'type'}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        className={'w-fit min-w-[200px]'}
                                    >
                                        <SelectValue
                                            placeholder={'Select a type'}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={'DEFAULT'}>
                                            Default
                                        </SelectItem>
                                        <SelectItem value={'SELECT_ONE'}>
                                            Select One
                                        </SelectItem>
                                        <SelectItem value={'STICKY'}>
                                            Sticky
                                        </SelectItem>
                                        <SelectItem value={'STICKY_SELECT_ONE'}>
                                            Sticky (Select One)
                                        </SelectItem>
                                        {!messageID && (
                                            <>
                                                <SelectItem value={'BUTTON'}>
                                                    Discord Button
                                                </SelectItem>
                                                <SelectItem
                                                    value={'BUTTON_SELECT_ONE'}
                                                >
                                                    Discord Button (Select One)
                                                </SelectItem>
                                                <SelectItem
                                                    value={'SELECT_MENU'}
                                                >
                                                    Select Menu
                                                </SelectItem>
                                                <SelectItem
                                                    value={'SELECT_ONE_MENU'}
                                                >
                                                    Select Menu (Select One)
                                                </SelectItem>
                                            </>
                                        )}
                                    </SelectContent>
                                </Select>
                            )}
                        />
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
                            <BsTextCenter /> Title:
                        </span>
                        <Controller
                            control={control}
                            name={'title'}
                            render={({ field }) => {
                                return (
                                    <Input
                                        className={'w-fit'}
                                        value={field.value}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                );
                            }}
                        />
                    </label>

                    <span
                        className={
                            'secondary mx-auto my-5 flex flex-row items-center gap-2 text-2xl'
                        }
                    >
                        <BsPerson /> Roles
                    </span>
                    <span
                        className={
                            'secondary mx-auto my-3 flex flex-row items-center gap-2 text-xl text-gray-300'
                        }
                    >
                        <span
                            className={
                                'hover-gradient w-fit cursor-pointer rounded-2xl border p-1 text-lg text-white transition-all hover:border-black hover:text-black'
                            }
                            onClick={() =>
                                reactions.length < 10
                                    ? appendReaction(
                                          { name: '', value: '' },
                                          { shouldFocus: false }
                                      )
                                    : {}
                            }
                        >
                            <BsPlus />
                        </span>{' '}
                        Add Role
                    </span>

                    <div className={'flex flex-col gap-4'}>
                        {reactions.map((item, index) => (
                            <li
                                key={item.id}
                                className={
                                    'mx-auto flex w-fit items-center gap-2 max-md:flex-col'
                                }
                            >
                                <Controller
                                    name={`reactions.${index}.emoji`}
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <EmojiPicker
                                                serverID={id}
                                                value={field.value}
                                                onChange={(e) =>
                                                    field.onChange(e.emoji)
                                                }
                                            />
                                        );
                                    }}
                                />
                                <Controller
                                    control={control}
                                    name={`reactions.${index}.roleID`}
                                    render={({ field }) => {
                                        return (
                                            <Roles
                                                serverID={id}
                                                onChange={(e) =>
                                                    field.onChange(e.role)
                                                }
                                                value={field.value}
                                            />
                                        );
                                    }}
                                />
                                <span
                                    className={
                                        'hover-gradient mx-auto w-fit cursor-pointer rounded-2xl border border-gray-700 p-1 text-lg text-gray-700 transition-all hover:border-black hover:text-black'
                                    }
                                    onClick={() => removeReaction(index)}
                                >
                                    <BsX />
                                </span>
                            </li>
                        ))}
                    </div>
                    <Tabs
                        onValueChange={(val) =>
                            val != 'attach'
                                ? setValue('messageID', undefined)
                                : setValue('type', 'DEFAULT')
                        }
                        defaultValue='create'
                    >
                        <TabsList className={'mx-auto my-2 flex w-fit'}>
                            <TabsTrigger value='create'>Embed</TabsTrigger>
                            <TabsTrigger value='attach'>
                                Attach to Message
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value='create'>
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
                                        const tested = testWebhook(
                                            field.value ?? ''
                                        );
                                        return (
                                            <span
                                                className={`w-fit ${tested ? 'text-green-500' : (field.value?.length || 0) > 10 ? 'text-red-500' : ''}`}
                                            >
                                                <Input
                                                    className={'w-64 text-sm'}
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.currentTarget
                                                                .value
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
                                        className={
                                            'flex flex-row items-center gap-1'
                                        }
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
                                                placeholderContext={[
                                                    'reaction_role',
                                                ]}
                                                wrapperClass={'w-full'}
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
                                    <BsPersonVcard /> Create
                                </Button>
                            </section>
                        </TabsContent>
                        <TabsContent value='attach'>
                            <section
                                className={
                                    'flex items-end justify-center gap-2 max-md:flex-col max-md:items-center'
                                }
                            >
                                <span className={'flex flex-col'}>
                                    <label className={'secondary'}>
                                        Message ID:
                                    </label>
                                    <Input
                                        className={'w-fit'}
                                        {...register('messageID')}
                                    />
                                </span>

                                <Button
                                    variant={'outline'}
                                    className={`flex flex-row items-center gap-2`}
                                    type='submit'
                                >
                                    <BsPersonVcard /> Create
                                </Button>
                            </section>
                        </TabsContent>
                    </Tabs>

                    <span className={'max-md:px-2'}>
                        <h1
                            className={
                                'my-2 flex items-center gap-2 font-montserrat text-xl'
                            }
                        >
                            <BsEye /> Embed Preview
                        </h1>
                        {embed ? (
                            <DiscordMessage
                                embed={embed}
                                content={
                                    isEmbedEmpty(embed) && !content
                                        ? `This is the Embed preview for the Reaction Role you are creating. When you make changes to your embed, the changes will be reflected here! See the [documentation for Embeds](${process.env.NEXT_PUBLIC_DOCUMENTATION_LINK}/modules/embeds) for more information!`
                                        : content
                                }
                                background
                            />
                        ) : (
                            ''
                        )}
                    </span>
                </form>
            </div>
        </>
    );
}
