"use client";
import { useFieldArray, useForm } from "react-hook-form";
import MockEmbed from "../ui/messages/mock-embed";
import { APIEmbed } from "discord-api-types/v10";

import { BsTrash } from "react-icons/bs";
import { motion } from 'framer-motion';
import { EmbedDialog } from "../ui/dialog/embed-dialog";
import { Trash } from "lucide-react";
type EmbedPreviewBody = { embed: APIEmbed }
export function Preview() {
    const { control, register, watch, reset } = useForm<EmbedPreviewBody>({
        defaultValues: {
            embed: {
                color: 5793266,
                author: {
                    name: 'Auxdible',
                    icon_url: 'https://auxdible.me/icon.png'
                },
                title: 'Auxdibot Embed Tools',
                description: 'This is a preview of the embed you are creating. You can edit the embed by clicking the Edit Embed button. You can implement placeholders, roles, emojis, or channels in your bot by clicking the + in the bottom right of text boxes.',
                fields: [
                    { name: 'Fields = Supported!', value: 'Fields are supported on Auxdibot in commands and on the dashboard. If you are using slash commands, seperate title from description using |d| and seperate fields using |s|\nExample: "Field 1|d|Field description here...|s|Field 2|d|Field description here..."', inline: false },
                    { name: 'I want to learn more', value: "Check out Auxdibot's official documentation to view more information!", inline: true },
                    { name: 'Inline fields???', value: "Siiiickkk.", inline: true },
                ],
                footer: {
                    text: 'Powered by Auxdibot',
                    icon_url: 'https://bot.auxdible.me/logo.png'
                },
                thumbnail: {
                    url: 'https://bot.auxdible.me/logo.png'
                }
            }
        }
    });
    const { append: addField, remove: removeField } = useFieldArray({
        name: "embed.fields",
        control,
        rules: {
            maxLength: 25
        }
    })
    const embed = watch('embed');
    return (
        <div className={'flex flex-col items-center gap-20'}>

            <div className={'flex max-lg:flex-col max-lg:gap-20 justify-between items-center max-w-7xl mx-auto w-full'}>
            <div className={'flex-1  max-lg:text-center flex max-lg:items-center flex-col gap-4'}>
            <div>
                <motion.h1 className={"header text-5xl py-2"} initial={{ transform: "translateY(-2rem)", opacity: 0 }} viewport={{ once: true }} whileInView={{ transform: "translateY(0px)", opacity: 1 }} transition={{ duration: 0.5, delay: 0.2  }}>next-gen tools</motion.h1>
                <span className="text-lg font-inter text-zinc-400">The future is now, old man.</span>
            </div>
            
            <p className={'font-inter text-zinc-200 max-w-lg'}>Auxdibot features an innovative dashboard with an approachable, user-friendly UI and convenience prioritized first-hand! Click &quot;Edit Embed&quot; to start creating!</p>
            <span className={'flex items-center gap-2'}>
            <EmbedDialog register={register} control={control} removeField={removeField} addField={addField}/>

                <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border-2 border-zinc-700 text-zinc-600 rounded-md w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => reset({ embed: { fields: [] }})}><Trash/></button></span>
            </span>
            </div>
            <span className="flex items-center justify-center flex-1 relative">
                <div className={'absolute -inset-1 bg-gradient-to-br from-primary-100 to-primary-600 blur-3xl opacity-70'}/>
                {!embed || (!embed.author?.name && !embed.title && !embed.description && (!embed.fields || embed.fields.length == 0) && !embed.footer?.text) ? <span className={'text-gray-500 font-open-sans text-xl italic'}>Click &quot;Edit Embed&quot; to start creating!</span> : <MockEmbed embed={embed}/>}</span>
            </div>
        </div>
    )
}