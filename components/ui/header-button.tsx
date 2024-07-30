import Link from "next/link";
import { AnchorHTMLAttributes } from "react";


interface ButtonProps {
    readonly children: JSX.Element | (string | JSX.Element)[] | string;
    readonly href?: string;
    readonly className?: string;
}

export function HeaderButton({ children, href, className, ...props }: ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {

    return <Link href={href ?? ''} {...props} className={"border-2 cursor-pointer border-solid relative border-gray-200 hover:border-gray-900 transition-colors px-4 py-2 rounded-full group font-raleway " + className}>
    <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute group-hover:triangle triangle-reverse rounded-full -inset-5 group-hover:origin-top-right origin-bottom-left scale-0 group-hover:scale-[180%] transition-transform duration-700 ease-in-out bg-gradient-to-bl  group-hover:from-primary-100 from-primary-600 to-primary-100 from-20% to-50% group-hover:to-primary-600"/>
        </div>
    <span className="z-20 relative transition-all duration-700 group-hover:text-black text-reverse select-none">
        {children}
    </span>
    </Link>
}