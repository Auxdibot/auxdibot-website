"use client";

import Image from "next/image";
import Link from "next/link";
import { BsBook, BsDiscord, BsArrowUp, BsCurrencyDollar} from 'react-icons/bs';
import MiniProfile from "./MiniProfile";
export default function LayoutNavbar({ preventCollapse, premiumIcon }: { preventCollapse?: boolean, premiumIcon?: boolean }) {
    return (<>
    
    <nav className={`${preventCollapse ? "fixed bg-gradient-to-br from-gray-900 to-black border-b border-slate-800" : "absolute"} transition-all flex align-middle items-center gap-10 max-md:gap-4 w-full px-5 py-2 h-16 z-50`}>
        <Link href={'/'} className={"flex flex-row gap-2 items-center min-w-fit"}><Image
                src={premiumIcon ? "/premium.png" : "/logo.png"}
                alt={"Auxdibot icon."}
                className={"inline-block align-middle hover:scale-110 transition-all"}
                width={36}
                height={36}
                quality="100"
                priority
            /></Link>
        <div className={"flex gap-5 max-md:ml-2 items-center font-montserrat text-gray-100"}> 
            <Link href={"/docs"} className={"flex gap-2 items-center text-xl max-sm:text-md group relative transition-all before:hover-underline before:primary-gradient hover:before:scale-100"}><BsBook className={"group-hover:scale-110 group-hover:text-orange-500 origin-center transition-all"}/> <span className={"max-md:hidden tracking-wide"}>docs</span></Link>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER_LINK || ""} className={"flex gap-2 items-center max-sm:text-md text-xl group relative before:hover-underline before:primary-gradient hover:before:scale-100"}><BsDiscord className={"group-hover:scale-110 group-hover:text-orange-500 origin-center transition-all"}/> <span className={"max-md:hidden tracking-wide"}>support</span></Link>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK || ""} className={"flex gap-2 items-center max-sm:text-md text-xl group relative before:hover-underline before:primary-gradient hover:before:scale-100"}><BsArrowUp className={"group-hover:scale-110 group-hover:text-orange-500 origin-center transition-all"}/> <span className={"max-md:hidden tracking-wide"}>invite</span></Link>
            <Link href={"/premium"} className={"flex gap-2 items-center max-sm:text-md text-xl group relative before:hover-underline before:bg-gradient-to-br before:from-yellow-200 before:to-yellow-600 hover:before:scale-100"}><BsCurrencyDollar className={"group-hover:scale-110 group-hover:text-yellow-500 origin-center transition-all"}/> <span className={"max-md:hidden tracking-wide"}>premium</span></Link>
        </div>
        <MiniProfile className={"flex ml-auto justify-center items-center gap-2"}/>

    </nav>
    {!preventCollapse ? "" : <div className={"h-16"}></div>}
    </>
    
    )
}