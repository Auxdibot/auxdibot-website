import Link from "next/link";
import { Button } from "../ui/button/button";
import { BsGithub, BsLink } from "react-icons/bs";

export default function Footer() {
    return (<footer className={"bg-gradient-to-bl from-zinc-300/10 via-zinc-700/5 to-zinc-900/5 border-t-2 border-zinc-800 text-base max-md:text-sm font-inter flex p-16 justify-between max-sm:flex-col max-sm:items-center max-sm:gap-5 max-sm:text-center"}>
        <div className="flex flex-col">
            <h3 className="font-raleway font-bold text-lg">Resources</h3>
            <Link href={process.env.NEXT_PUBLIC_DOCUMENTATION_LINK ?? ""}><Button className="px-0" variant={'link'}>Documentation</Button></Link>
            
            <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER_LINK ?? ""}><Button className="px-0" variant={'link'}>Support Server</Button></Link>

        </div>
        <div className="flex flex-col">
            <h3 className="font-raleway font-bold text-lg">Legal</h3>
            <Link href={(process.env.NEXT_PUBLIC_DOCUMENTATION_LINK ?? "") + "/legal/terms-of-service"}><Button className="px-0" variant={'link'}>Terms of Service</Button></Link>
            
            <Link href={(process.env.NEXT_PUBLIC_DOCUMENTATION_LINK ?? "") + "/legal/privacy-policy"}><Button className="px-0" variant={'link'}>Privacy Policy</Button></Link>
        </div>
        <div className="flex flex-col">
            <h3 className="font-raleway font-bold text-lg">General</h3>
            <Link href={"/"}><Button className="px-0" variant={'link'}>Home</Button></Link>
            
            <Link href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}><Button className="px-0" variant={'link'}>Contact Us</Button></Link>
        </div>
        <div className="flex flex-col gap-1">
            <h3 className="header text-2xl">auxdibot</h3>
            <span className="font-inter text-zinc-300">© 2024 Steven Primeaux</span>
            <span className="flex gap-2 max-sm:justify-center">
            <Link href={'https://github.com/Auxdible'}><BsGithub/></Link>
            <Link href={'https://auxdible.me'}><BsLink/></Link>
            </span>
        </div>
    </footer>)
}
/*
<div className={"w-full mx-auto py-5 flex flex-row max-md:flex-col justify-between items-center max-md:gap-8"}>
            <div className={"flex-1 flex-grow flex-shrink flex"}><Link className={"secondary text-2xl hover:text-orange-500 hover:-translate-y-1 transition-all flex flex-row gap-2 items-center"} href={"https://github.com/Auxdibot/"}><BsGithub/></Link></div>
            <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER_LINK || ""} className={"flex max-md:flex-col flex-row gap-2 text-center items-center font-open-sans group"}><BsDiscord className={"group-hover:text-discord-primary transition-all max-sm:text-2xl"}/> Need help? Join the Discord Server.</Link>
        </div>
        <div className={'flex max-md:flex-col justify-between items-center font-open-sans text-gray-400'}>
            <span className={"header text-3xl"}>auxdibot</span>
            <Link href={'https://auxdible.me'}>Created by Auxdible.</Link>
        </div> */