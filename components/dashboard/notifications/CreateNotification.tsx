"use client";
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useContext, useState } from 'react';
import { BsBell, BsChatLeftDots, BsLink, BsMegaphone, BsQuestion, BsRss, BsTwitch, BsWifi, BsX, BsYoutube } from 'react-icons/bs';
import DashboardActionContext from '@/context/DashboardActionContext';
import { APIEmbed } from 'discord-api-types/v10';
import MockEmbed from '@/components/MockEmbed';
import EmbedSettings from '@/components/input/EmbedSettings';
import SelectElement from '@/components/input/SelectElement';
import TextBox from '@/components/input/TextBox';
import Channels from '@/components/input/Channels';
type NotificationBody = { type: string, topic: string, embed: APIEmbed, message: string, channel: string };
const NotificationIcons = {
    'YOUTUBE': <><BsYoutube/> YouTube Handle</>,
    'TWITCH': <><BsTwitch/> Twitch Username</>,
    'RSS': <><BsRss/> RSS Feed URL</>
}
const FeedPlaceholders: { [key: string]: string } = {
    '%feed_link%': '[[ LINK TO CONTENT ]]',
    '%feed_author%': '[[ CONTENT AUTHOR ]]',
    '%feed_title%': '[[ CONTENT TITLE ]]',
    '%feed_content%': '[[ FEED CONTENT ]]'

}
export default function CreateNotification({ serverID }: { serverID: string }) {
    const { handleSubmit, reset, control, register, watch } = useForm<NotificationBody>();
    const { append, remove } = useFieldArray({ name: 'embed.fields', control: control, rules: { maxLength: 25 } });
    const queryClient = useQueryClient();

    const [embedExpand, setEmbedExpand] = useState(false);

    const embed = watch("embed");
    const type = watch("type");
    const actionContext = useContext(DashboardActionContext);

    function onSubmit(data: NotificationBody) {
        let body = new URLSearchParams();
        body.append('channelID', data.channel);
        body.append('type', data.type);
        body.append('topicURL', data.topic);
        body.append('message', data.message);
        
        fetch(`/api/v1/servers/${serverID}/notifications`, { method: 'POST', body }).then(async (data) => {
            const json = await data.json().catch(() => actionContext ? actionContext.setAction({ status: "error receiving data!", success: false }) : {});
            if (json && !json['error']) {
                queryClient.invalidateQueries(['data_notifications', serverID]);
                if (actionContext)
                    actionContext.setAction({ status: `Successfully created a new notification.`, success: true })
                reset();
            } else {
                if (actionContext)
                    actionContext.setAction({ status: `An error occurred. Error: ${json['error'] || "Couldn't find error."}`, success: false });
            }
        }).catch(() => {})
    }
    return <>
    <div className={"bg-gray-800 flex-1 flex-grow shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Create Notification Feed</h2>
    <span className={"text-lg font-open-sans ml-2"}><span className={"text-red-500"}>*</span> = required field</span>
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 my-5"}>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> <BsMegaphone/> Channel:</span> 
            <Controller name={'channel'} control={control} render={({ field }) => (
                <Channels serverID={serverID} value={field.value} onChange={(e) => field.onChange(e.channel)}  />
        )}></Controller>
        </label>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> <BsWifi/> Type:</span>
            <Controller name={"type"} control={control} render={({ field }) => {
            return <SelectElement onChange={field.onChange} value={field.value} required options={[
                { icon: <BsYoutube/>, name: 'YouTube', value: 'YOUTUBE' },
                { icon: <BsTwitch/>, name: 'Twitch', value: 'TWITCH' },
                { icon: <BsRss/>, name: 'RSS Feed', value: 'RSS' },
            ]}/>
            }}/>
        </label>
        <label className={"flex flex-row max-md:flex-col gap-2 items-center font-open-sans"}>
            <span className={"flex flex-row gap-2 items-center text-xl"}><span className={"text-red-500"}>*</span> {NotificationIcons[type as keyof typeof NotificationIcons] ?? <><BsLink/> Topic</>}:</span>
            <Controller name={"topic"} control={control} render={({ field }) => {
            return <TextBox value={field.value} onChange={field.onChange} Icon={type == 'YOUTUBE' ? BsYoutube : type == 'RSS' ? BsRss : type == 'TWITCH' ? BsTwitch : BsLink}/>
            }}/>
        </label>
        {<FeedPlaceholdersList/>}
        <label className={"flex flex-col gap-2 max-md:items-center font-open-sans text-xl"}>
            <span className={"flex flex-row gap-2 items-center"}><BsChatLeftDots/> Message:</span>
            <textarea className={"rounded-md font-roboto text-lg w-full"} cols={2} {...register("message")}/>
        </label>
        <section className={"my-4 w-full flex flex-col max-lg:justify-center max-lg:items-center"}>
        <Controller name={'embed'} control={control} render={({ field }) => (
                <EmbedSettings addField={append} register={register} removeField={remove} control={control} value={field.value} />
        )}></Controller>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2 max-md:mx-auto"}><span className={"border text-white rounded-2xl w-fit p-2 hover-gradient transition-all hover:text-black hover:border-black text-xl cursor-pointer"} onClick={() => setEmbedExpand(!embedExpand)}><BsChatLeftDots/></span> View Embed</span>
        <span className={embedExpand ? "" : "hidden"}>
        {embed ? <MockEmbed embed={JSON.parse(Object.keys(FeedPlaceholders).reduce((acc: string, i) => acc.replace(i, FeedPlaceholders[i]), JSON.stringify(embed)))}/> : ""}
        </span>
        
        </section>
        
        
        <button className={`secondary text-xl mx-auto hover-gradient border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} type="submit">
            <BsBell/> Create Notification
        </button>
    </form>
    
    </div>
    </>;

    
}
function FeedPlaceholdersList() {
    const [placeholders, viewPlaceholders] = useState(false);
    return <span className={'text-xl max-md:text-base font-open-sans flex items-center gap-2 justify-center mt-4'}>
        <span>Placeholders are supported</span>
        <span className={'rounded-2xl border cursor-pointer hover:hover-gradient hover:text-black hover:border-black transition-all'} onClick={() => viewPlaceholders(true)}><BsQuestion /></span>
        {placeholders && <div className={"fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 flex z-50 justify-center items-center"}>
            <div className={"bg-auxdibot-masthead bg-black border-2 border-slate-800 rounded-2xl max-w-lg items-center flex flex-col text-center p-5 gap-5 max-md:gap-3"}>
                <h1 className={"text-3xl font-montserrat flex max-md:flex-col-reverse items-center gap-2"}>Placeholders <span className={'rounded-2xl border cursor-pointer hover:hover-gradient hover:text-black hover:border-black transition-all'} onClick={() => viewPlaceholders(false)}><BsX /></span></h1>
                <span>When you include a placeholder in your message or embed content, Auxdibot will automatically fill it in with the data required.</span>
                {Object.keys(FeedPlaceholders).map((i) => <div className={"flex flex-row gap-2"} key={i}><span>{i}</span> - <span>{FeedPlaceholders[i]}</span></div>)}
            </div>

        </div>}
    </span>;
}