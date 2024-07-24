import { CardData } from "@/lib/types/CardData";
import { BsHash } from "react-icons/bs";

import { CardFonts } from "@/lib/constants/CardFonts";


export default function LatestMessages({ data }: { readonly data: CardData; }) {

    const header = CardFonts[data?.header_font || "BAUHAUS_93"], text = CardFonts[data?.text_font || 'OPEN_SANS'];

    return <div className={"w-full flex justify-center items-center max-w-sm"}>
    <section className={`${data?.dark ? "bg-black" : "bg-gray-100"} ${data?.dark ? "text-gray-100" : "text-gray-900"} ${data?.dark ? "border-gray-800" : "border-gray-300"} border w-full max-w-full px-3 py-10 bg-opacity-60 rounded-2xl`}>
    <div className={`flex flex-col justify-center items-center gap-5 font-${text}`}>
        <h1 className={`text-3xl font-${header} flex flex-col justify-center items-center`}>Latest Messages<br/><span className={"flex items-center gap-2 break-words-wrap max-w-full"}><BsHash/> {data.channel?.name}</span></h1>
        <ul className={"flex flex-col max-w-full"}>
            {data.channel?.messages.map((i, index) => 
            <li className={"flex flex-col"} key={index}>
                <span className={"break-words-wrap max-w-full flex flex-col"}>{i.author} 
                <span className={`${data?.dark ? 'text-gray-400' : 'text-gray-600'}`}>{new Date(i.date).toLocaleString()}</span></span>
                <span className={"my-2 break-words-wrap max-w-full"}>{i.message || "{Message contains attachment.}"}</span>
            </li>)}
        </ul>
    </div>
</section>
</div>;
}