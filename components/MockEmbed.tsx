import { APIEmbed, APIEmbedAuthor, APIEmbedFooter } from "discord-api-types/v10";

import Link from "next/link";

export default function MockEmbed({ embed }: { embed: APIEmbed }) {
    console.log(embed);
    return (<div className={`bg-discord-embed rounded-l-md overflow-hidden rounded-r-md flex flex-col pl-4 py-3 relative pr-5 `}>
    <div className={"flex flex-row"}>
    <section className={"flex flex-col gap-1 w-fit"}>
    {embed.color ? <div className={"absolute w-1 h-screen top-0 left-0"} style={{ backgroundColor: embed.color ? `#${embed.color.toString(16)}` : "black"}}></div> : ""}
    {embed.author ? <MockEmbedAuthor author={embed.author}/> : ""}
    {embed.title ? <MockEmbedTitle url={embed.url} title={embed.title} /> : ""}
    {embed.description ? <p>{embed.description}</p> : ""}
    {embed.fields ? embed.fields.map((i, index) => <section key={index} className={`${i.inline ? "inline-block" : ""} flex flex-col w-fit`}><span className={"font-bold"}>{i.name}</span><span>{i.value}</span></section>) : ""}
    
    {embed.footer ? <MockEmbedFooter footer={embed.footer}/> : ""}
    </section>
    {/* eslint-disable-next-line @next/next/no-img-element*/}
    {embed.thumbnail ? <div className={"ml-5"}><img
        src={embed.thumbnail.url}
        className={"rounded-md float-right mt-2"}
        width={100}
        height={100}
        alt={"Embed image"}
        /></div> : ""}
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element*/}
    {embed.image ? <img
        src={embed.image.url}
        className={"rounded-md my-3 max-h-52 object-scale-down object-left w-fit    "}
        alt={"Embed image"}
        /> : ""}
    </div>)
}
export function MockEmbedTitle({ title, url }: { title: string, url?: string }) {
    let titleSpan = <span className={"font-bold w-fit text-xl text-roboto"}>{title || ""}</span>;
    return (url ? <Link className={"hover:underline underline-offset-1 text-sky-400"} href={url}>{titleSpan}</Link> : titleSpan)
}
export function MockEmbedAuthor({ author }: { author: APIEmbedAuthor }) {
    let authorSpan = <span className={"flex flex-row gap-2 items-center text-sm font-bold text-roboto"}>{ author.icon_url ? 
        /* eslint-disable-next-line @next/next/no-img-element*/
        <img
        src={author.icon_url}
        alt={"Embed author icon"}
        className={"inline-block rounded-full"}
        width={24}
        height={24}
        /> : ""} {author.name || ""}</span>;
    return (author.url ? <Link className={"hover:underline underline-offset-1"} href={author.url}>{authorSpan}</Link> : authorSpan)
}
export function MockEmbedFooter({ footer }: { footer: APIEmbedFooter }) {
    return (<span className={"flex flex-row gap-2 items-center text-xs font-medium font-roboto"}>{ footer.icon_url ? 
        /* eslint-disable-next-line @next/next/no-img-element*/
        <img
        src={footer.icon_url}
        alt={"Embed footer icon"}
        className={"inline-block rounded-full"}
        width={20}
        height={20}
        /> : ""} {footer.text || ""}</span>)
}