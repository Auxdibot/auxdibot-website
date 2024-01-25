import TextBox from "@/components/input/TextBox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeftCircle, BsCardImage, BsCheck, BsShare, BsThreeDots, BsTrash, BsX } from "react-icons/bs";

export default function CardInfo({ server }: { server: { name: string, id: string } }) {
    const router = useRouter();
    const [confirmation, setConfirmation] = useState(false);
    const [shake, setBarShake] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmationDelete, setConfirmationDelete] = useState('');
    const [copied, setCopied] = useState(false);
    function copy() {
        navigator.clipboard?.writeText(`${process.env.NEXT_PUBLIC_URL}/cards/${server.id}`)
        setCopied(true);
        setTimeout(() => setCopied(false), 2000)
    }
    function onConfirmationChange(e: React.ChangeEvent<HTMLInputElement>) {
        setConfirmationDelete(e.currentTarget.value);
    }
    function reset(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!server) return;
        if (confirmationDelete != server?.name) {
            setBarShake(true);
            setTimeout(() => { setBarShake(false) }, 300);
            return;
        }
        setLoading(true);
        fetch(`/api/v1/servers/${server.id}/updateCard`, { method: "DELETE" }).then(() => {
            setLoading(false )
            router.push(`/dashboard/${server.id}/card`);
            setConfirmation(false);
        }).catch(() => undefined);
    }
    return (<div className={"bg-gray-800 flex-1 flex-grow flex-shrink-0 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto pb-4"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Card Info</h2>
    <div className={"flex flex-col justify-center items-center gap-4 py-5"}>
    <h3 className={"text-xl font-montserrat"}>Card URL</h3>
    <span><Link className={"bg-gray-900 text-base max-sm:text-sm font-open-sans p-1 rounded-xl"} href={`${process.env.NEXT_PUBLIC_URL}/cards/${server.id}`}>{`${process.env.NEXT_PUBLIC_URL}/cards/${server.id}`}</Link> 
    </span>
    <span className={'flex gap-2 items-center'}>
    <Link href={`${process.env.NEXT_PUBLIC_URL}/cards/${server.id}`} target="_blank" className={"secondary text-lg hover:bg-gradient-to-l hover-gradient hover:text-black hover:border-black transition-all w-fit border-white border rounded-xl p-1 flex flex-row gap-2 items-center"} type="submit">
                <BsCardImage/> View Card
    </Link>
    <span onClick={copy} className={"text-base group rounded-2xl w-fit relative cursor-pointer"} >
                <span className={"flex relative flex-row gap-2 rounded-2xl font-open-sans p-1 items-center z-10 origin-left transition-all"}>
                    <span className={`absolute w-max translate-x-6 bg-gray-800 border border-gray-400 group-hover:scale-100 group-focus:scale-100 scale-0 rounded-tl-2xl rounded-md px-2 rounded-bl-2xl transition-all origin-left   `}> {copied ? "Copied!" : "Copy Link"}</span>
                    {copied ? <BsCheck/> : <BsShare/>}
                </span>
    </span>
    </span>
    </div>
    
    <h3 className={"text-xl font-montserrat text-center"}>Delete Card</h3>
    <p className={"text-md font-open-sans text-center p-2"}>Deleting your card will make the link for your card inaccessible, and all settings for your card will be deleted.</p>
    <span className={`secondary text-xl mx-auto hover:from-red-400 hover:to-red-700 cursor-pointer border-white hover:text-black hover:border-black transition-all w-fit border rounded-xl p-1 flex flex-row gap-2 items-center`} onClick={() => setConfirmation(!confirmation)}><BsTrash/> Delete Card</span>
    {confirmation ? <div className={"fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center"}>
        <div className={"bg-auxdibot-masthead bg-black border-2 border-slate-800 rounded-2xl max-w-lg items-center flex flex-col text-center p-5 gap-5 max-md:gap-3"}>
            {loading ? <BsThreeDots className={"animate-spin text-8xl text-white"}/> : <><h1 className={"header text-6xl max-md:text-4xl"}>WARNING</h1>
            <p className={"text-2xl max-md:text-lg font-roboto"}>You are about to completely reset your Auxdibot card. <span className={"font-bold text-red-500"}>The card you have created for Auxdibot and all its data will be deleted.</span><br/><br/>Type <code>{server?.name}</code> below to confirm.</p>
            <TextBox value={confirmationDelete} onChange={onConfirmationChange} Icon={shake ? BsX : BsTrash } className={`${shake ? "animate-incorrect animate" : ""}`}/>
            <span className={"w-full flex flex-row justify-between"}>
            <button onClick={(e) => reset(e)} className={"secondary text-2xl max-md:text-lg hover:bg-gradient-to-l hover:from-red-400 hover:to-red-700 hover:text-black hover:border-black transition-all w-fit border-white border rounded-xl p-1 flex flex-row gap-2 items-center"} type="submit">
                <BsTrash/> Delete Card
            </button>
            <button onClick={() => setConfirmation(false)} className={"secondary text-2xl max-md:text-lg hover-gradient hover:text-black hover:border-black transition-all w-fit border-white border rounded-xl p-1 flex flex-row gap-2 items-center"} type="submit">
                <BsArrowLeftCircle/> Cancel
            </button>
            </span></>}
            
        </div>
        
    </div> : ""}
</div>)
}