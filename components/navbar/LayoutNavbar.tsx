import Image from "next/image";
import Link from "next/link";
import { BsEnvelope, BsGear, BsBook, BsDiscord, BsArrowUp } from 'react-icons/bs';
export default function LayoutNavbar() {
    return (
    <nav className={"fixed flex align-middle items-center gap-10 w-full px-5 py-2 h-16 bg-gray-600 z-10"}>
        <Link href={'/'} className={""}><Image
                src={"/logo.png"}
                alt={"Auxdibot icon."}
                className={"inline-block align-middle"}
                width={32}
                height={32}
                priority
            /></Link>
        <div className={"flex gap-5 align-middle items-center"}>
            <Link href={"/blog"} className={"flex gap-2 items-center secondary text-xl"}><BsEnvelope/> Blog</Link>
            <Link href={"/docs"} className={"flex gap-2 items-center secondary text-xl"}><BsBook/> Docs</Link>
            <Link href={process.env.DISCORD_SERVER_LINK || ""} className={"flex gap-2 items-center secondary text-xl"}><BsDiscord/> Discord</Link>
            <Link href={process.env.DISCORD_INVITE_LINK || ""} className={"flex gap-2 items-center secondary text-xl"}><BsArrowUp/> Invite</Link>
        </div>
    </nav>
    )
}