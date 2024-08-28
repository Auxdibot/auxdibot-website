'use client';
import MockEmbed from '@/components/ui/messages/mock-embed';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { APIEmbed } from 'discord-api-types/v10';
import {
    BsBell,
    BsCalendar,
    BsChatLeftDots,
    BsClock,
    BsEye,
    BsMegaphone,
    BsRepeat,
} from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import Channels from '@/components/ui/select/channels';
import TimestampBox from '@/components/ui/timestamp-box';
import { Button } from '@/components/ui/button/button';
import { TextareaMessage } from '@/components/ui/messages/textarea-message';
import { DatePicker } from '@/components/ui/date-picker';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { EmbedDialog } from '@/components/ui/dialog/embed-dialog';
type ScheduleBody = {
    times_to_run: number;
    message: string;
    channel: string;
    duration: string;
    embed: APIEmbed;
    start_date?: Date;
};
export default function CreateSchedule({ serverID }: { serverID: string }) {
    const { register, watch, control, handleSubmit, reset } =
        useForm<ScheduleBody>({
            defaultValues: {
                embed: { fields: [] },
                channel: '',
                duration: '',
                message: '',
                times_to_run: 0,
            },
        });
    const { data: channels } = useQuery(
        ['data_channels', serverID],
        async () =>
            await fetch(`/bot/v1/servers/${serverID}/channels`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    const { append, remove } = useFieldArray({
        name: 'embed.fields',
        control,
        rules: {
            maxLength: 25,
        },
    });
    const queryClient = useQueryClient();

    const { toast } = useToast();
    function onSubmit(data: ScheduleBody) {
        let body = new URLSearchParams();
        body.append('channel', data.channel);
        body.append('duration', data.duration);
        body.append('message', data.message);
        if (data.start_date)
            body.append('start_date', data.start_date.toISOString() + '');
        if (
            data.embed.author?.name ||
            data.embed.description ||
            data.embed.title ||
            data.embed.footer?.text ||
            (data.embed.fields?.length || 0) > 0
        ) {
            body.append('embed', JSON.stringify(data.embed));
        }
        body.append('times_to_run', data.times_to_run?.toString() || '');
        fetch(`/bot/v1/servers/${serverID}/schedules`, { method: 'POST', body })
            .then(async (res) => {
                const json = await res.json().catch(() => undefined);
                if (!json || json['error']) {
                    toast({
                        title: 'Failed to create schedule',
                        description: json['error'] ?? 'An error occured',
                        status: 'error',
                    });
                    return;
                }
                toast({
                    title: 'Schedule Created',
                    description: `Scheduled a message in #${channels.find((i: { id: string; name: string }) => i.id == data.channel)?.name ?? 'Unknown'}`,
                    status: 'success',
                });

                queryClient.invalidateQueries(['data_schedules', serverID]);
                reset();
            })
            .catch(() => {});
    }
    const embed = watch('embed');
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
                    Create Schedule
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
                    <span
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
                    </span>

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
                            <span className={'text-red-500'}>*</span>
                            <BsClock /> Duration:
                        </span>
                        <Controller
                            name={'duration'}
                            control={control}
                            render={({ field }) => (
                                <TimestampBox
                                    className={
                                        'w-48 rounded-md border border-gray-800'
                                    }
                                    onChange={field.onChange}
                                    value={field.value}
                                />
                            )}
                        ></Controller>
                    </label>

                    <label
                        className={
                            'flex flex-row items-center gap-2 font-open-sans text-xl max-md:flex-col'
                        }
                    >
                        <span className={'flex flex-row items-center gap-2'}>
                            <BsCalendar /> Start Date:
                        </span>
                        <Controller
                            name={'start_date'}
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    className={'w-fit'}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        ></Controller>
                    </label>
                    <label
                        className={
                            'flex flex-row items-center gap-2 font-open-sans text-xl max-md:flex-col'
                        }
                    >
                        <span className={'flex flex-row items-center gap-2'}>
                            <BsRepeat /> Times to run:
                        </span>
                        <Controller
                            name={'times_to_run'}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    className={'w-16'}
                                    type='number'
                                    value={field.value}
                                    max={999}
                                    min={0}
                                    onChange={field.onChange}
                                />
                            )}
                        ></Controller>
                    </label>
                    <label
                        className={
                            'flex flex-col gap-2 font-open-sans text-xl max-md:items-center'
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
                                    placeholderContext={['schedule']}
                                    wrapperClass={'w-full'}
                                    maxLength={2000}
                                    serverID={serverID}
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </label>
                    <span
                        className={
                            'flex items-center justify-between gap-5 max-md:flex-col'
                        }
                    >
                        <EmbedDialog
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
                            <BsBell /> Create Schedule
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
                        {embed ? <MockEmbed embed={embed} /> : ''}
                    </span>
                </form>
            </div>
        </>
    );
}
