import { CardData } from '@/lib/types/CardData';
import { BsCheck, BsDiscord, BsShare } from 'react-icons/bs';
import ServerMembers from './ServerMembers';
import Image from 'next/image';
import { CardFonts } from '@/lib/constants/CardFonts';
import Link from 'next/link';
import { useState } from 'react';
import ServerBadges from './ServerBadges';

export default function ServerInfo({
    data,
    serverID,
}: {
    readonly data: CardData;
    readonly serverID: string;
}) {
    const [copied, setCopied] = useState(false);
    function copy() {
        navigator.clipboard?.writeText(
            `${process.env.NEXT_PUBLIC_URL}/cards/${serverID}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
    const header = CardFonts[data?.header_font || 'BAUHAUS_93'],
        text = CardFonts[data?.text_font || 'OPEN_SANS'];
    return (
        <div className={'flex max-w-lg items-center justify-center'}>
            <div className={'flex max-w-full flex-col items-center gap-2'}>
                <section
                    className={`${data?.dark ? 'bg-black' : 'bg-gray-100'} ${data?.dark ? 'text-gray-100' : 'text-gray-900'} ${data?.dark ? 'border-gray-800' : 'border-gray-300'} w-full rounded-2xl border bg-opacity-60 px-3 py-10`}
                >
                    <div
                        className={`flex flex-col items-center justify-center gap-5 text-center font-${text}`}
                    >
                        <span className={'relative'}>
                            <div
                                className={
                                    'absolute -inset-0 z-0 select-none rounded-2xl opacity-40 blur-xl transition-all'
                                }
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${data?.background?.color1 ?? 'transparent'}, ${data.background?.color2 ?? 'transparent'})`,
                                }}
                            />
                            {data?.server?.icon_url ? (
                                <Image
                                    src={data.server.icon_url}
                                    alt={'Server icon'}
                                    className={'relative z-10 rounded-2xl'}
                                    width={128}
                                    height={128}
                                />
                            ) : (
                                data?.server?.acronym && (
                                    <span
                                        className={`relative z-10 flex h-32 w-32 cursor-pointer items-center justify-center rounded-[5rem] bg-discord-bg font-roboto text-2xl text-gray-100 transition-all duration-300 hover:rounded-2xl hover:bg-discord-primary`}
                                    >
                                        {data.server.acronym}
                                    </span>
                                )
                            )}
                        </span>
                        <h1
                            className={`text-5xl font-${header} break-words-wrap max-w-full`}
                        >
                            {data?.server?.name}
                        </h1>
                        <span
                            className={
                                'flex w-full items-center justify-center gap-4 px-10 max-md:flex-col'
                            }
                        >
                            <ServerMembers
                                totalMembers={data?.server?.members || 0}
                            />
                            {data?.badges.length > 0 ? (
                                <ServerBadges
                                    badges={data?.badges}
                                    dark={data?.dark}
                                />
                            ) : (
                                ''
                            )}
                        </span>
                        <p className={`break-words-wrap max-w-full text-lg`}>
                            {data?.description || ''}
                        </p>
                        <span
                            className={
                                'flex items-center gap-4 max-md:flex-col'
                            }
                        >
                            {data?.invite_url && (
                                <Link
                                    href={data?.invite_url}
                                    className={
                                        'group relative w-fit rounded-2xl text-xl'
                                    }
                                >
                                    <div
                                        className={
                                            'absolute -inset-0 z-0 select-none rounded-2xl opacity-0 blur-xl transition-all group-hover:opacity-100'
                                        }
                                        style={{
                                            backgroundImage: `linear-gradient(180deg, ${data?.background?.color1 ?? 'transparent'}, ${data?.background?.color2 ?? 'transparent'})`,
                                        }}
                                    />
                                    <span
                                        className={
                                            'relative z-10 flex flex-row items-center gap-2 rounded-2xl bg-discord-primary p-1 text-gray-100'
                                        }
                                    >
                                        <BsDiscord /> Join Server
                                    </span>
                                </Link>
                            )}
                            <span
                                onClick={copy}
                                className={
                                    'group relative w-fit cursor-pointer rounded-2xl text-xl'
                                }
                            >
                                <div
                                    className={
                                        'absolute -inset-0 z-0 select-none rounded-2xl opacity-0 blur-lg transition-all group-hover:opacity-100'
                                    }
                                    style={{
                                        backgroundImage: `linear-gradient(135deg, ${data?.background?.color1 ?? 'transparent'}, ${data?.background?.color2 ?? 'transparent'})`,
                                    }}
                                />
                                <span
                                    className={
                                        'relative z-10 flex origin-left flex-row items-center gap-2 rounded-2xl p-1 transition-all'
                                    }
                                >
                                    <span
                                        className={`absolute w-max translate-x-10 ${data?.dark ? 'bg-gray-950' : 'bg-gray-200'} origin-left scale-0 rounded-md rounded-bl-2xl rounded-tl-2xl border border-gray-800 px-2 transition-all group-hover:scale-100 group-focus:scale-100`}
                                    >
                                        {' '}
                                        {copied ? 'Copied!' : 'Copy Link'}
                                    </span>
                                    {copied ? <BsCheck /> : <BsShare />}
                                </span>
                            </span>
                        </span>
                    </div>
                </section>
            </div>
        </div>
    );
}
