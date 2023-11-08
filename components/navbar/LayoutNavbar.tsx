"use client";

import Image from "next/image";
import Link from "next/link";
import { BsBook, BsDiscord, BsArrowUp} from 'react-icons/bs';
import MiniProfile from "./MiniProfile";
import { useEffect, useState } from "react";
export default function LayoutNavbar({ preventCollapse }: { preventCollapse?: boolean }) {
    const [previousScrollPos, setScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        if (preventCollapse) return;
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
      });
    function onScroll() {
        
        const visible = previousScrollPos > window.pageYOffset;
        if (!visible && window.pageYOffset < 64) return;
        setScrollPos(window.pageYOffset);
        setVisible(visible);
    }
    return (<>
    
    <nav className={`fixed transition-all flex align-middle items-center gap-10 max-md:gap-4 w-full px-5 py-2 h-16 bg-slate-600 border-b-2 border-slate-700 z-50${!visible ? " -translate-y-full" : ""}`}>
        <Link href={'/'} className={"flex flex-row gap-2 items-center min-w-fit"}><Image
                src={"/logo.png"}
                alt={"Auxdibot icon."}
                className={"inline-block align-middle"}
                width={36}
                height={36}
                quality="100"
                priority
            /><span className={"header text-3xl text-center items-center align-bottom pt-2 max-md:hidden"}>Auxdibot</span></Link>
        <div className={"flex gap-5 items-center font-montserrat text-gray-100"}>
            <Link href={"/docs"} className={"flex gap-2 items-center text-xl max-sm:text-md group"}><BsBook className={"group-hover:scale-110 group-hover:text-orange-500 transition-all"}/> <span className={"max-md:hidden"}>Docs</span></Link>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER_LINK || ""} className={"flex gap-2 items-center max-sm:text-md text-xl group"}><BsDiscord className={"group-hover:scale-110 group-hover:text-orange-500 transition-all"}/> <span className={"max-md:hidden"}>Discord</span></Link>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK || ""} className={"flex gap-2 items-center max-sm:text-md text-xl group"}><BsArrowUp className={"group-hover:scale-110 group-hover:text-orange-500 transition-all"}/> <span className={"max-md:hidden"}>Invite</span></Link>
        </div>
        <MiniProfile className={"flex ml-auto justify-center items-center gap-2"}/>

    </nav>
    <div className={"block h-16"}></div>
    </>
    
    )
}