"use client";

import Image from "next/image";
import Link from "next/link";
import { BsBook, BsDiscord, BsArrowUp} from 'react-icons/bs';
import MiniProfile from "./MiniProfile";
import { useEffect, useState } from "react";
export default function LayoutNavbar({ preventCollapse }: { preventCollapse?: boolean }) {
    return (<>
    
    <nav className={`${preventCollapse ? "fixed bg-gradient-to-br from-gray-900 to-black border-b border-slate-800" : "absolute"} transition-all flex align-middle items-center gap-10 max-md:gap-4 w-full px-5 py-2 h-16 z-50`}>
        <Link href={'/'} className={"flex flex-row gap-2 items-center min-w-fit"}><Image
                src={"/logo.png"}
                alt={"Auxdibot icon."}
                className={"inline-block align-middle hover:scale-110 transition-all"}
                width={36}
                height={36}
                quality="100"
                priority
            /></Link>
        <div className={"flex gap-5 max-md:ml-2 items-center font-montserrat text-gray-100"}> 
            <Link href={"/docs"} className={"flex gap-2 items-center text-xl max-sm:text-md group"}><BsBook className={"group-hover:scale-110 group-hover:text-orange-500 origin-center transition-all"}/> <span className={"max-md:hidden"}>Docs</span></Link>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER_LINK || ""} className={"flex gap-2 items-center max-sm:text-md text-xl group"}><BsDiscord className={"group-hover:scale-110 group-hover:text-orange-500 origin-center transition-all"}/> <span className={"max-md:hidden"}>Discord</span></Link>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK || ""} className={"flex gap-2 items-center max-sm:text-md text-xl group"}><BsArrowUp className={"group-hover:scale-110 group-hover:text-orange-500 origin-center transition-all"}/> <span className={"max-md:hidden"}>Invite</span></Link>
        </div>
        <MiniProfile className={"flex ml-auto justify-center items-center gap-2"}/>

    </nav>
    {!preventCollapse ? "" : <div className={"h-16"}></div>}
    </>
    
    )
}