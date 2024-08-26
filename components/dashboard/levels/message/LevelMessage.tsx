import MockEmbed from '@/components/ui/messages/mock-embed';
import { TextareaMessage } from '@/components/ui/messages/textarea-message';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { BsChatLeftDots, BsTrophy } from 'react-icons/bs';
import { LevelPayload } from '../DashboardLevelsConfig';

import { EmbedDialog } from '@/components/ui/dialog/embed-dialog';
import { Button } from '@/components/ui/button/button';
import { APIEmbed } from 'discord-api-types/v10';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from 'react-query';

type FormBody = { embed: APIEmbed; content: string };
export function LevelMessage({ server }: { server: LevelPayload }) {
    let level_message = Object.create(server.level_message);
    const { register, handleSubmit, reset, control, watch } =
        useForm<FormBody>();
    const { append, remove } = useFieldArray({
        name: 'embed.fields',
        control,
        rules: {
            maxLength: 25,
        },
    });
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function onSubmit(data: FormBody) {
        let body = new URLSearchParams();
        body.append('content', data.content || '');
        if (
            data.embed.author?.name ||
            data.embed.description ||
            data.embed.title ||
            data.embed.footer?.text ||
            (data.embed.fields?.length || 0) > 0
        ) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/bot/v1/servers/${server.serverID}/levels/message`, {
            method: 'POST',
            body,
        })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to update levels message',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Levels Message Updated',
                    description: `Successfully updated the levels message for your server.`,
                    status: 'success',
                });
                queryClient.refetchQueries(['data_levels', server.serverID]);
                reset({ embed: {}, content: '' });
            })
            .catch(() => {});
    }
    const embed = watch('embed');
    const content = watch('content');
    level_message.content = content || level_message.content;
    level_message.embed =
        content?.length > 0 ||
        embed?.author?.name ||
        embed?.description ||
        embed?.title ||
        embed?.footer?.text ||
        (embed?.fields?.length || 0) > 0
            ? embed
            : level_message.embed;
    return (
        <div
            className={
                'h-fit w-full flex-1 flex-shrink-0 flex-grow rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
            }
        >
            <h2
                className={
                    'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                }
            >
                Embed Preview
            </h2>
            <div className='mx-2 rounded-lg bg-discord-bg/50 px-2 py-2'>
                {level_message.content && (
                    <span className={'my-2 flex w-full font-roboto md:p-5'}>
                        {level_message.content}
                    </span>
                )}
                <span className={'flex w-full !pt-0 md:p-5'}>
                    {level_message.embed?.author?.name ||
                    level_message.embed?.description ||
                    level_message.embed?.title ||
                    level_message.embed?.footer?.text ||
                    (level_message.embed?.fields?.length || 0) > 0 ? (
                        <MockEmbed embed={level_message.embed} />
                    ) : (
                        ''
                    )}
                </span>
            </div>
            <h3 className='secondary mt-5 text-center text-xl'>
                Update Level Embed
            </h3>
            <span className='mx-auto mt-2 flex max-w-lg text-center font-lato text-sm italic text-gray-400'>
                Using the placeholders %LEVEL_TO% and %LEVEL_FROM% will
                automatically fill with the level the player is going to, and
                the level the player is going from when the levelup message is
                sent.
            </span>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={'mb-5 flex flex-col gap-2 md:m-5'}
            >
                <section
                    className={'flex w-full flex-col gap-2 max-md:items-center'}
                >
                    <span
                        className={
                            'flex flex-row items-center gap-2 font-open-sans text-xl'
                        }
                    >
                        <BsChatLeftDots /> Content:
                    </span>
                    <Controller
                        name={'content'}
                        control={control}
                        render={({ field }) => (
                            <TextareaMessage
                                maxLength={2000}
                                wrapperClass={'w-full'}
                                placeholderContext={['level', 'member']}
                                serverID={server.serverID}
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
                        serverID={server.serverID}
                        addField={append}
                        removeField={remove}
                        control={control}
                        placeholderContext={['level', 'member']}
                        register={register}
                    />

                    <Button
                        variant={'outline'}
                        className={`flex flex-row items-center gap-2`}
                        type='submit'
                    >
                        <BsTrophy /> Update
                    </Button>
                </section>
            </form>
        </div>
    );
}
