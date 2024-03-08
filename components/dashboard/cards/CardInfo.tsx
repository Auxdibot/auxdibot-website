
import { Button } from "@/components/ui/button/button";
import Link from "next/link";
import { useState } from "react";
import { BsCardImage, BsCheck, BsShare } from "react-icons/bs";
import { ResetDialog } from "./DeleteCardDialog";

export default function CardInfo({ server }: { server: { name: string, id: string } }) {

    const [copied, setCopied] = useState(false);
    function copy() {
        navigator.clipboard?.writeText(`${process.env.NEXT_PUBLIC_URL}/cards/${server.id}`)
        setCopied(true);
        setTimeout(() => setCopied(false), 2000)
    }

    
    return (<div className={"flex-1 flex-grow flex-shrink-0 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto pb-4"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Card Info</h2>
    <div className={"flex flex-col justify-center items-center gap-4 py-5"}>
    <h3 className={"text-xl font-montserrat"}>Card URL</h3>
    <span><Link className={"bg-gray-900 text-base max-sm:hidden font-open-sans p-1 rounded-xl text-wrap overflow-hidden"} href={`${process.env.NEXT_PUBLIC_URL}/cards/${server.id}`}>{`${process.env.NEXT_PUBLIC_URL}/cards/${server.id}`}</Link> 
    </span>
    <span className={'flex gap-2 items-center'}>
    <Link href={`${process.env.NEXT_PUBLIC_URL}/cards/${server.id}`} target="_blank" type="submit">
        <Button className={"flex flex-row gap-2 items-center"} variant={'outline'}><BsCardImage/> View Card</Button>
    </Link>
    <span onClick={copy} className={"text-base group rounded-2xl w-fit relative cursor-pointer"} >
                <span className={"flex relative flex-row gap-2 rounded-2xl font-open-sans p-1 items-center z-10 origin-left transition-all"}>
                    <span className={`absolute w-max translate-x-6 bg-gray-950 border border-gray-800 group-hover:scale-100 group-focus:scale-100 scale-0 rounded-tl-2xl rounded-md px-2 rounded-bl-2xl transition-all origin-left`}> {copied ? "Copied!" : "Copy Link"}</span>
                    {copied ? <BsCheck/> : <BsShare/>}
                </span>
    </span>
    </span>
    </div>
    
    <h3 className={"text-xl font-montserrat text-center"}>Delete Card</h3>
    <p className={"text-md font-open-sans text-center p-2"}>Deleting your card will make the link for your card inaccessible, and all settings for your card will be deleted.</p>
    <ResetDialog serverID={server.id}/>
</div>)
}