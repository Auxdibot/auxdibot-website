import Link from "next/link";
import { BsDiscord, BsGithub } from "react-icons/bs";

export default function Footer() {
    return (<footer className={"bg-gray-950 border-gray-800 border-t-2 px-2 text-lg max-md:text-md md:h-32"}>
        <div className={"w-full mx-auto py-5 flex flex-row max-md:flex-col justify-between items-center max-md:gap-8"}>
            <div className={"flex-1 flex-grow flex-shrink flex"}><Link className={"secondary text-2xl hover:text-orange-500 hover:-translate-y-1 transition-all flex flex-row gap-2 items-center"} href={"https://github.com/Auxdibot/"}><BsGithub/></Link></div>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER_LINK || ""} className={"flex max-md:flex-col flex-row gap-2 text-center items-center font-open-sans group"}><BsDiscord className={"group-hover:text-discord-primary transition-all max-sm:text-2xl"}/> Need help? Join the Discord Server.</Link>
        </div>
        <div className={'flex max-md:flex-col justify-between items-center font-open-sans text-gray-400'}>
            <span className={"header text-3xl"}>auxdibot</span>
            <Link href={'https://auxdible.me'}>Created by Auxdible.</Link>
        </div>
    </footer>)
}