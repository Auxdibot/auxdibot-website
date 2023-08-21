import Link from "next/link";
import { ReactElement } from "react";
import { IconType } from "react-icons/lib"
type ButtonProps = { icon: ReactElement; text: string, href?: string, className?: string }
export default function Button({icon, text, href, className}: React.ComponentProps<any> & ButtonProps) {
    let buttonClass = `w-fit px-8 mx-auto rounded-full border-gray-300 border flex gap-2 justify-center secondary items-center my-2 max-md:my-4 py-2 text-2xl hover:bg-gradient-to-l transition-all hover:text-gray-800 hover:border-gray-800 hover:from-orange-500 hover:to-red-400 cursor-pointer`;
    return (<span>{href ? <Link className={buttonClass + " " + className} href={href}>{icon} {text}</Link> : <span className={buttonClass}>{icon} {text}</span>}
        </span>)
}