import Image from "next/image";
import Link from "next/link";
import { BsEnvelope, BsGear, BsBook, BsDiscord, BsArrowUp, BsArrowDown, BsArrowDownShort } from 'react-icons/bs';
import MiniProfile from "./MiniProfile";
export default function LayoutNavbar() {
    return (<>
    
    <nav className={"fixed flex align-middle items-center gap-10 w-full px-5 py-2 h-16 bg-gray-600 z-50"}>
        <Link href={'/'} className={"flex flex-row gap-2 items-center"}><Image
                src={"/logo.png"}
                alt={"Auxdibot icon."}
                className={"inline-block align-middle"}
                width={32}
                height={32}
                quality="100"
                priority
            /><span className={"header text-3xl text-center items-center align-bottom pt-2 max-md:hidden"}>Auxdibot</span></Link>
        <div className={"flex gap-5 max-md:gap-8 align-middle items-center font-montserrat text-gray-100"}>
            <Link href={"/blog"} className={"flex gap-2 items-center text-xl group"}><BsEnvelope className={"group-hover:scale-110 group-hover:text-orange-500 transition-all"}/> <span className={"max-md:hidden"}>Blog</span></Link>
            <Link href={"/docs"} className={"flex gap-2 items-center text-xl group"}><BsBook className={"group-hover:scale-110 group-hover:text-orange-500 transition-all"}/> <span className={"max-md:hidden"}>Docs</span></Link>
            <Link href={process.env.DISCORD_SERVER_LINK || ""} className={"flex gap-2 items-center text-xl group"}><BsDiscord className={"group-hover:scale-110 group-hover:text-orange-500 transition-all"}/> <span className={"max-md:hidden"}>Discord</span></Link>
            <Link href={process.env.DISCORD_INVITE_LINK || ""} className={"flex gap-2 items-center text-xl group"}><BsArrowUp className={"group-hover:scale-110 group-hover:text-orange-500 transition-all"}/> <span className={"max-md:hidden"}>Invite</span></Link>
        </div>
        <MiniProfile className={"flex ml-auto justify-center items-center gap-2"}/>

    </nav>
    <div className={"block h-16"}></div>
    </>
    
    )
}