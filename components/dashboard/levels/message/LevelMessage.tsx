import MockEmbed from "@/components/ui/messages/mock-embed";
import { TextareaMessage } from "@/components/ui/messages/textarea-message";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { BsChatLeftDots, BsTrophy } from "react-icons/bs";
import { LevelPayload } from "../DashboardLevelsConfig";

import { EmbedDialog } from "@/components/ui/dialog/embed-dialog";
import { Button } from "@/components/ui/button/button";
import { APIEmbed } from "discord-api-types/v10";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "react-query";

type FormBody = { embed: APIEmbed, content: string }
export function LevelMessage({ server }: { server: LevelPayload }) {
    let level_message = Object.create(server.level_message);
    const { register, handleSubmit, reset, control, watch } = useForm<FormBody>();
    const { append, remove } = useFieldArray({
        name: "embed.fields",
        control,
        rules: {
            maxLength: 25,
        }
    });
    const queryClient = useQueryClient();
    const { toast } = useToast();
    function onSubmit(data: FormBody) {
        let body = new URLSearchParams();
        body.append('content', data.content || '');
        if (data.embed.author?.name || data.embed.description || data.embed.title || data.embed.footer?.text || (data.embed.fields?.length || 0) > 0) {
            body.append('embed', JSON.stringify(data.embed));
        }
        fetch(`/bot/v1/servers/${server.serverID}/levels/message`, { method: 'POST', body }).then(async (res) => {
            const json = await res.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to update levels message", description: json['error'] ?? "An error occured", status: "error" })
                return;
            }
            toast({ title: "Levels Message Updated", description: `Successfully updated the levels message for your server.`, status: "success" })
            queryClient.refetchQueries(["data_levels", server.serverID]);
            reset({ embed: {}, content: "" });

        }).catch(() => {})
    }
    const embed = watch("embed");
    const content = watch("content");
    level_message.content = content || level_message.content;
    level_message.embed = content?.length > 0 || embed?.author?.name || embed?.description || embed?.title || embed?.footer?.text || (embed?.fields?.length || 0) > 0 ? embed : level_message.embed;
    return <div className={"flex-1 flex-grow flex-shrink-0 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
        <h2 className={" secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Embed Preview</h2>
        <div className="bg-discord-bg/50 mx-2 rounded-lg py-2 px-2">
        {level_message.content && <span className={"md:p-5 w-full flex my-2 font-roboto"}>{level_message.content}</span>}
        <span className={"md:p-5 !pt-0 w-full flex"}>{level_message.embed?.author?.name || level_message.embed?.description || level_message.embed?.title || level_message.embed?.footer?.text || (level_message.embed?.fields?.length || 0) > 0 ? <MockEmbed embed={level_message.embed}/> : ""}</span>
        </div>
        <h3 className="secondary text-xl text-center mt-5">Update Level Embed</h3>
        <span className="text-sm italic max-w-lg font-lato text-gray-400 text-center flex mx-auto mt-2">Using the placeholders %LEVEL_TO% and %LEVEL_FROM% will automatically fill with the level the player is going to, and the level the player is going from when the levelup message is sent.</span>
        <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 md:m-5 mb-5"}>
        <section className={"flex flex-col gap-2 w-full max-md:items-center"}>
            <span className={"flex flex-row gap-2 items-center font-open-sans text-xl"}><BsChatLeftDots/> Content:</span>
            <Controller name={'content'} control={control} render={({ field }) => (
                <TextareaMessage maxLength={2000} wrapperClass={'w-full'} placeholderContext={['level']} serverID={server.serverID} {...field}/>
            )}/>
        </section>
        
        
        <section className={'flex justify-between gap-2 items-center max-md:flex-col'}>
        <EmbedDialog serverID={server.serverID} addField={append} removeField={remove} control={control}  placeholderContext={['level']} register={register} />

        <Button variant={'outline'} className={`flex flex-row gap-2 items-center`} type="submit">
            <BsTrophy/> Update
        </Button>
        </section>
        
    </form>
    </div>
}