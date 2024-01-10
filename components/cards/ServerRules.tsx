import { CardData } from "@/lib/types/CardData";
import { CardFonts } from "@/lib/types/CardFonts";


export default function ServerRules({ data }: { readonly data: CardData; }) {

    const header = CardFonts[data?.header_font || "BAUHAUS_93"], text = CardFonts[data?.text_font || 'OPEN_SANS'];

    return <div className={"flex-1 flex flex-col justify-center items-center"}>
    <section className={"bg-black border border-gray-800 px-3 py-10 bg-opacity-60 rounded-2xl flex-1"}>
        <div className={`flex flex-col justify-center items-center gap-5 px-4 font-${text}`}>
            <h1 className={`text-5xl font-${header}`}>Server Rules</h1>
            <ul>
                {data?.rules?.map((i, index) => <li className={'list-decimal'} key={index}>{i}</li>)}
            </ul>
        </div>
    </section>
    </div>;
}