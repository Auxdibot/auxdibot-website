"use client";
import MockEmbed from '@/components/MockEmbed';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useContext, useState } from 'react';
import { APIEmbed } from 'discord-api-types/v10';
import { BsCalendar, BsChatLeftDots, BsClock, BsMegaphone, BsRepeat, BsTextLeft } from 'react-icons/bs';
import "react-datepicker/dist/react-datepicker.css"; 
import DashboardActionContext from '@/context/DashboardActionContext';
import DatePicker from 'react-datepicker';
import Channels from '@/components/input/Channels';
import NumberBox from '@/components/input/NumberBox';
import EmbedSettings from '@/components/input/EmbedSettings';
import TimestampBox from '@/components/input/TimestampBox';
type ScheduleBody = { times_to_run: number; message: string; channel: string; duration: string; embed: APIEmbed; start_date?: Date; }
export default function CreateSchedule({ serverID }: { serverID: string }) {
    const { register, watch, control, handleSubmit, reset } = useForm<ScheduleBody>();
    const { append, remove } = useFieldArray({
        name: "embed.fields",
        control,
        rules: {
            maxLength: 25
        }
    });
    const queryClient = useQueryClient();
    const [embedExpand, setEmbedExpand] = useState(false);
    const actionContext = useContext(DashboardActionContext);
    function onSubmit(data: ScheduleBody) {
        let body = new URLSearchParams();
        body.append('channel', data.channel);
        body.append('duration', data.duration);
        body.append('message', data.message);
        if (data.start_date) body.append('start_date', data.start_date.toISOString() + "")
        if (data.embed.author?.name || data.embed.description || data.embed.title || data.embed.footer?.text || (data.embed.fields?.length || 0) > 0) {
            body.append('embed', JSON.stringify(data.embed));
        }
        body.append('times_to_run', data.times_to_run?.toString() || "")
        fetch(`/api/v1/servers/${serverID}/schedules`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                queryClient.invalidateQueries(['data_schedules', serverID]);
                if (actionContext)
                    actionContext.setAction({ status: `Successfully created a new schedule.`, success: true })
                reset({ embed: undefined, duration: "", times_to_run: 0, channel: undefined, message: '', start_date: undefined });
            } else {
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    const embed = watch("embed");
    return <>
    <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Schedule</h2>
    <span className={"text-lg font-open-sans ml-2"}><span className={"text-red-500"}>*</span> = required field</span>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <span className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> <BsMegaphone/> Channel:</span> 
            <Controller name={'channel'} control={control} render={({ field }) => (
                <Channels serverID={serverID} value={field.value} onChange={(e) => field.onChange(e.channel)}  />
        )}></Controller>
        </span>
        
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span><BsClock/> Duration:</span>
            <Controller name={'duration'} control={control} render={({ field }) => <TimestampBox onChange={field.onChange} value={field.value} /> }></Controller>
            
        </label>
        <span className={"text text-gray-500 italic text-sm max-md:text-center"}>(ex. 5m for 5 minutes, 5M for 5 months, 2w for 2 weeks, and 1d for 1 day.)</span>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsCalendar/> Start Date (optional):</span>
            <Controller name={'start_date'} control={control} render={({ field }) => (
                <DatePicker dateFormat="MMM d, yyyy h:mm aa" weekDayClassName={() => {
                    return "!bg-gray-700 !text-white"
                }} dayClassName={() => {
                    return "hover:!bg-gray-600 !text-white";
                }} calendarClassName={"!bg-gray-600 !border !border-slate-500 !font-roboto !text-white !border header-styles"} selected={field.value} calendarStartDay={new Date().getDay()} showTimeInput onChange={field.onChange}  className={"rounded-md bg-gray-600 border border-slate-500 font-roboto w-fit text-lg"} allowSameDay/>
        )}></Controller>
            
        </label>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsRepeat/> Times to run:</span>
            <Controller name={'times_to_run'} control={control} render={({ field }) => (
                <NumberBox Icon={BsRepeat} value={field.value} max={999} min={0} onChange={field.onChange}/>
        )}></Controller>

        </label>
        <label className={"flex flex-col gap-2 max-md:items-center font-open-sans text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsChatLeftDots/> Message:</span>
            <textarea className={"rounded-md font-roboto text-lg w-full"} cols={2} {...register("message")}/>
        </label>
        
        <span className={"flex flex-row gap-2 items-center mx-auto font-open-sans text-xl"}><BsTextLeft/> Embed Settings</span>
        <span className={"text text-gray-500 italic text-sm text-center"}>(leave empty for no embed)</span>
        <Controller name={'embed'} control={control} render={({ field }) => (
                <EmbedSettings addField={append} register={register} removeField={remove} control={control} value={field.value} />
        )}></Controller>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2 max-md:mx-auto"}><span className={"border text-white rounded-2xl w-fit p-2 hover-gradient transition-all hover:text-black hover:border-black text-xl cursor-pointer"} onClick={() => setEmbedExpand(!embedExpand)}><BsChatLeftDots/></span> View Embed</span>
        <span className={embedExpand ? "" : "hidden"}>
        {embed ? <MockEmbed embed={embed}/> : ""}
        </span>
        <button className={`secondary text-xl mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            <BsClock/> Submit Schedule
        </button>
    </form>
    
    </div>
    </>;
}