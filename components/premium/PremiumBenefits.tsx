'use client';
import { BsCheck } from 'react-icons/bs';

export function PremiumBenefits() {
    return (
        <>
            <li className={'flex items-center gap-1 font-open-sans'}>
                <BsCheck className={'flex-shrink-0 text-2xl'} /> 100% of your
                donation goes to Auxdibot.
            </li>
            <li className={'flex items-center gap-1 font-open-sans'}>
                <BsCheck className={'flex-shrink-0 text-2xl'} /> 3 Premium
                Servers
            </li>
            <li className={'flex items-center gap-1 font-open-sans'}>
                <BsCheck className={'flex-shrink-0 text-2xl'} /> Special role on
                Auxdibot&apos;s Support Server.
            </li>
            <li className={'flex items-center gap-1 font-open-sans'}>
                <BsCheck className={'flex-shrink-0 text-2xl'} /> Access to a
                quick support channel.
            </li>
            <li className={'flex items-center gap-1 font-open-sans'}>
                <BsCheck className={'flex-shrink-0 text-2xl'} /> Voter benefits
                at no additional cost.
            </li>
            <li className={'flex items-center gap-1 font-open-sans'}>
                <BsCheck className={'flex-shrink-0 text-2xl'} /> Customize your
                level card across all Auxdibot servers.
            </li>
            <li className={'flex items-center gap-1 font-open-sans'}>
                <BsCheck className={'flex-shrink-0 text-2xl'} /> Enhanced
                Moderation features, including appeals.
            </li>
            <li className={'flex items-center gap-1 font-open-sans'}>
                <BsCheck className={'flex-shrink-0 text-2xl'} /> Access to beta
                versions of Auxdibot features.
            </li>
            <li className={'flex items-center gap-1 font-open-sans'}>
                <BsCheck className={'flex-shrink-0 text-2xl'} /> Infinite
                storage for punishments, suggestions, and more.
            </li>
            <li className={'flex items-center gap-1 font-open-sans'}>
                <BsCheck className={'flex-shrink-0 text-2xl'} /> Access to
                premium-only utilities.
            </li>
        </>
    );
}
