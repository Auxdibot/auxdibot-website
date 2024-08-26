import { CardData } from '@/lib/types/CardData';
import { BsHash } from 'react-icons/bs';

import { CardFonts } from '@/lib/constants/CardFonts';

export default function LatestMessages({ data }: { readonly data: CardData }) {
    const header = CardFonts[data?.header_font || 'BAUHAUS_93'],
        text = CardFonts[data?.text_font || 'OPEN_SANS'];

    return (
        <div className={'flex w-full max-w-sm items-center justify-center'}>
            <section
                className={`${data?.dark ? 'bg-black' : 'bg-gray-100'} ${data?.dark ? 'text-gray-100' : 'text-gray-900'} ${data?.dark ? 'border-gray-800' : 'border-gray-300'} w-full max-w-full rounded-2xl border bg-opacity-60 px-3 py-10`}
            >
                <div
                    className={`flex flex-col items-center justify-center gap-5 font-${text}`}
                >
                    <h1
                        className={`text-3xl font-${header} flex flex-col items-center justify-center`}
                    >
                        Latest Messages
                        <br />
                        <span
                            className={
                                'break-words-wrap flex max-w-full items-center gap-2'
                            }
                        >
                            <BsHash /> {data.channel?.name}
                        </span>
                    </h1>
                    <ul className={'flex max-w-full flex-col'}>
                        {data.channel?.messages.map((i, index) => (
                            <li className={'flex flex-col'} key={index}>
                                <span
                                    className={
                                        'break-words-wrap flex max-w-full flex-col'
                                    }
                                >
                                    {i.author}
                                    <span
                                        className={`${data?.dark ? 'text-gray-400' : 'text-gray-600'}`}
                                    >
                                        {new Date(i.date).toLocaleString()}
                                    </span>
                                </span>
                                <span
                                    className={
                                        'break-words-wrap my-2 max-w-full'
                                    }
                                >
                                    {i.message ||
                                        '{Message contains attachment.}'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
