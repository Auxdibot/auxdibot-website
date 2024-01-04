import { APIEmbed, APIEmbedAuthor, APIEmbedFooter } from "discord-api-types/v10";

import Link from "next/link";

export default function MockEmbed({ embed }: { embed: APIEmbed }) {
    return (<div className={`font-sans bg-discord-embed rounded-l-md overflow-hidden rounded-r-md flex flex-col pl-4 py-3 relative pr-5 max-md:w-screen md:w-[512px]`}>
    {embed.color ? <div className={"absolute w-1 h-full top-0 left-0"} style={{ backgroundColor: embed.color ? `#${embed.color.toString(16)}` : "black"}}></div> : ""}
    <div className={"flex flex-row justify-start"}>
        
    
    <div className={"flex flex-col gap-2 flex-shrink overflow-hidden w-full "}>
    
    {embed.author ? <MockEmbedAuthor author={embed.author}/> : ""}
    {embed.title ? <MockEmbedTitle url={embed.url} title={embed.title} /> : ""}
    {embed.description ? <p className={"font-light break-words whitespace-pre-line "}>{embed.description}</p> : ""}
    <div className={"grid grid-cols-3 gap-2"}>
    {embed.fields ? embed.fields.map((i, index) => <section key={index} className={`${i.inline ? "" : "col-start-1 col-end-4"} flex flex-col m-0 w-full break-words whitespace-pre-line font-light`}><span className={"font-bold"}>{i.name}</span><span>{i.value}</span></section>) : ""}
    </div>
    
    
    
    </div>
   
    
    {/* eslint-disable-next-line @next/next/no-img-element*/}
    {embed.thumbnail?.url ? <div className={"ml-auto flex-shrink-0"}><img
        src={embed.thumbnail.url}
        className={"ml-5 object-scale-down object-top rounded-md mt-2"}
        width={80}
        height={80}
        alt={"Embed image"}
        /></div> : ""}
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element*/}
    {embed.image?.url ? <img
        src={embed.image.url}
        className={"rounded-md my-3 object-scale-down object-left w-full"}
        alt={"Embed image"}
        /> : ""}
    {embed.footer ? <MockEmbedFooter footer={embed.footer}/> : ""}
    </div>)
}
export function MockEmbedTitle({ title, url }: { title: string, url?: string }) {
    let titleSpan = <span className={"font-semibold text-lg break-words whitespace-pre-line text-roboto"}>{title || ""}</span>;
    return (url ? <Link className={"hover:underline underline-offset-1 text-sky-400"} href={url}>{titleSpan}</Link> : titleSpan)
}
export function MockEmbedAuthor({ author }: { author: APIEmbedAuthor }) {
    let authorSpan = <span className={"break-words whitespace-pre-line text-sm font-bold text-roboto"}>{ author.icon_url ? 
        /* eslint-disable-next-line @next/next/no-img-element*/
        <img
        src={author.icon_url}
        alt={"Embed author icon"}
        className={"inline-block rounded-full mr-2"}
        width={24}
        height={24}
        /> : ""}{author.name || ""}</span>;
    return (author.url ? <Link className={"hover:underline"} href={author.url}>{authorSpan}</Link> : authorSpan)
}
export function MockEmbedFooter({ footer }: { footer: APIEmbedFooter }) {
    return (<span className={"flex flex-row gap-2 items-center break-words whitespace-pre-line text-xs font-medium font-roboto"}>{ footer.icon_url ? 
        /* eslint-disable-next-line @next/next/no-img-element*/
        <img
        src={footer.icon_url}
        alt={"Embed footer icon"}
        className={"inline-block rounded-full"}
        width={20}
        height={20}
        /> : ""} {footer.text || ""}</span>)
}