import Image from "next/image";
import Link from "next/link";
import { BsEnvelope, BsGear, BsBook, BsDiscord, BsArrowUp } from 'react-icons/bs';
export default function LayoutNavbar() {
    return (<>
    
    <nav className={"fixed flex align-middle items-center gap-10 w-full px-5 py-2 h-16 bg-gray-600 z-50"}>
        <Link href={'/'} className={""}><Image
                src={"/logo.png"}
                alt={"Auxdibot icon."}
                className={"inline-block align-middle"}
                width={32}
                height={32}
                priority
            /></Link>
        <div className={"flex gap-5 max-md:gap-8 align-middle items-center"}>
            <Link href={"/blog"} className={"flex gap-2 items-center secondary text-xl"}><BsEnvelope/> <span className={"max-md:hidden"}>Blog</span></Link>
            <Link href={"/docs"} className={"flex gap-2 items-center secondary text-xl"}><BsBook/> <span className={"max-md:hidden"}>Docs</span></Link>
            <Link href={process.env.DISCORD_SERVER_LINK || ""} className={"flex gap-2 items-center secondary text-xl"}><BsDiscord/> <span className={"max-md:hidden"}>Discord</span></Link>
            <Link href={process.env.DISCORD_INVITE_LINK || ""} className={"flex gap-2 items-center secondary text-xl"}><BsArrowUp/> <span className={"max-md:hidden"}>Invite</span></Link>
        </div>
    </nav>
    <div className={"block h-16"}></div>
    </>
    
    )
}