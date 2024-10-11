import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface ButtonProps {
    readonly children: JSX.Element | (string | JSX.Element)[] | string;
    readonly href?: string;
    readonly gradientClass?: string;
    readonly className?: string;
}

export function HeaderButton({
    children,
    href,
    className,
    gradientClass,
    ...props
}: ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <Link
            href={href ?? ''}
            {...props}
            className={
                'group relative cursor-pointer rounded-full border-2 border-solid border-gray-200 px-4 py-2 font-raleway transition-colors hover:border-gray-900 ' +
                className
            }
        >
            <div className='absolute inset-0 overflow-hidden rounded-full'>
                <div
                    className={
                        'group-hover:triangle triangle-reverse absolute -inset-5 origin-bottom-left scale-0 rounded-full bg-gradient-to-bl from-primary-600 from-20% to-primary-100 to-50% transition-transform duration-700 ease-in-out group-hover:origin-top-right group-hover:scale-[180%] group-hover:from-primary-100 group-hover:to-primary-600' +
                        gradientClass
                    }
                />
            </div>
            <span className='text-reverse relative z-20 select-none transition-all duration-700 group-hover:text-black'>
                {children}
            </span>
        </Link>
    );
}
