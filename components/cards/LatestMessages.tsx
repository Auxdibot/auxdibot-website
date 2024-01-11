import { CardData } from "@/lib/types/CardData";
import { BsHash } from "react-icons/bs";

import { CardFonts } from "@/lib/types/CardFonts";


export default function LatestMessages({ data }: { readonly data: CardData; }) {

    const header = CardFonts[data?.header_font || "BAUHAUS_93"], text = CardFonts[data?.text_font || 'OPEN_SANS'];

    return <div className={"flex-1 flex justify-center items-center max-w-sm"}>
    <section className={`${data?.dark ? "bg-black" : "bg-gray-100"} ${data?.dark ? "text-gray-100" : "text-gray-900"} ${data?.dark ? "border-gray-800" : "border-gray-300"} border px-3 py-10 bg-opacity-60 rounded-2xl`}>
    <div className={`flex flex-col justify-center items-center gap-5 font-${text}`}>
        <h1 className={`text-3xl font-${header} text-center`}>Latest Messages<br/><span className={"flex items-center gap-2"}><BsHash/> {data.channel?.name}</span></h1>
        <ul>
            {data.channel?.messages.map((i, index) => 
            <li className={"flex flex-col"} key={index}>
                <span>{i.author} • {new Date(i.date).toDateString()}</span>
                <span className={"my-2"}>{i.message || "{Message contains attachment.}"}</span>
            </li>)}
        </ul>
    </div>
</section>
</div>;
}