import { Button } from '@/components/ui/button/button';
import Link from 'next/link';
import { useState } from 'react';
import { BsCardImage, BsCheck, BsShare } from 'react-icons/bs';
import { ResetDialog } from './DeleteCardDialog';

export default function CardInfo({
    server,
}: {
    server: { name: string; id: string };
}) {
    const [copied, setCopied] = useState(false);
    function copy() {
        navigator.clipboard?.writeText(
            `${process.env.NEXT_PUBLIC_SITE_URL}/cards/${server.id}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div
            className={
                'h-fit w-full flex-1 flex-shrink-0 flex-grow rounded-2xl border-2 border-gray-800 pb-4 shadow-2xl max-md:mx-auto'
            }
        >
            <h2
                className={
                    'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                }
            >
                Card Info
            </h2>
            <div
                className={
                    'flex flex-col items-center justify-center gap-4 py-5'
                }
            >
                <h3 className={'font-montserrat text-xl'}>Card URL</h3>
                <span>
                    <Link
                        className={
                            'text-wrap overflow-hidden rounded-xl bg-gray-900 p-1 font-open-sans text-base max-sm:hidden'
                        }
                        href={`${process.env.NEXT_PUBLIC_SITE_URL}/cards/${server.id}`}
                    >{`${process.env.NEXT_PUBLIC_SITE_URL}/cards/${server.id}`}</Link>
                </span>
                <span className={'flex items-center gap-2'}>
                    <Link
                        href={`${process.env.NEXT_PUBLIC_SITE_URL}/cards/${server.id}`}
                        target='_blank'
                        type='submit'
                    >
                        <Button
                            className={'flex flex-row items-center gap-2'}
                            variant={'outline'}
                        >
                            <BsCardImage /> View Card
                        </Button>
                    </Link>
                    <span
                        onClick={copy}
                        className={
                            'group relative w-fit cursor-pointer rounded-2xl text-base'
                        }
                    >
                        <span
                            className={
                                'relative z-10 flex origin-left flex-row items-center gap-2 rounded-2xl p-1 font-open-sans transition-all'
                            }
                        >
                            <span
                                className={`absolute w-max origin-left translate-x-6 scale-0 rounded-md rounded-bl-2xl rounded-tl-2xl border border-gray-800 bg-gray-950 px-2 transition-all group-hover:scale-100 group-focus:scale-100`}
                            >
                                {' '}
                                {copied ? 'Copied!' : 'Copy Link'}
                            </span>
                            {copied ? <BsCheck /> : <BsShare />}
                        </span>
                    </span>
                </span>
            </div>

            <h3 className={'text-center font-montserrat text-xl'}>
                Delete Card
            </h3>
            <p className={'text-md p-2 text-center font-open-sans'}>
                Deleting your card will make the link for your card
                inaccessible, and all settings for your card will be deleted.
            </p>
            <ResetDialog serverID={server.id} />
        </div>
    );
}
