import Link from "next/link";
import { BsGithub, BsHandThumbsUp, BsLink, BsRobot } from "react-icons/bs";

export default function Footer() {
    return (<footer className={"bg-gray-700"}>
        <div className={"max-w-6xl mx-auto py-5 flex flex-row max-md:flex-col gap-10 justify-center"}>
            <div className={"flex-1 flex-grow flex-shrink flex justify-center"}><Link className={"secondary text-xl hover:text-orange-500 flex flex-row gap-2 items-center"} href={"https://auxdible.me"}><BsLink/> Auxdible&apos;s Portfolio</Link></div>
            <div className={"flex-1 flex-grow flex-shrink flex justify-center"}><Link className={"secondary text-xl hover:text-orange-500 flex flex-row gap-2 items-center"} href={"https://github.com/Auxdibot/auxdibot-website"}><BsGithub/> Source</Link></div>
            <div className={"flex-1 flex-grow flex-shrink flex justify-center"}><Link className={"secondary text-xl hover:text-orange-500 flex flex-row gap-2 items-center"} href={"https://github.com/Auxdibot/auxdibot"}><BsRobot/> Auxdibot Source</Link></div>
            <div className={"flex-1 flex-grow flex-shrink flex justify-center"}><Link className={"secondary text-xl hover:text-orange-500 flex flex-row gap-2 items-center"} href={"https://github.com/Auxdible/"}><BsHandThumbsUp/> Auxdible&apos;s GitHub</Link></div>
        </div>
        
    </footer>)
}