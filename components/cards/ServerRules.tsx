import { CardData } from "@/lib/types/CardData";
import { CardFonts } from "@/lib/types/CardFonts";


export default function ServerRules({ data }: { readonly data: CardData; }) {

    const header = CardFonts[data?.header_font || "BAUHAUS_93"], text = CardFonts[data?.text_font || 'OPEN_SANS'];

    return <div className={"flex-1 flex flex-col justify-center items-center max-w-sm"}>
    <section className={`${data?.dark ? "bg-black" : "bg-gray-100"} ${data?.dark ? "text-gray-100" : "text-gray-900"} ${data?.dark ? "border-gray-800" : "border-gray-300"} w-full max-w-full text-lg border px-3 py-10 bg-opacity-60 rounded-2xl flex-1`}>
        <div className={`flex flex-col justify-center items-center gap-5 px-4 font-${text}`}>
            <h1 className={`text-5xl font-${header} text-center`}>Server Rules</h1>
            <ul>
                {data?.rules?.map((i, index) => <li className={'list-decimal'} key={index}>{i}</li>)}
            </ul>
        </div>
    </section>
    </div>;
}