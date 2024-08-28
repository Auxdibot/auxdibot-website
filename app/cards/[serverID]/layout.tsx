import { Metadata, Viewport } from 'next';
import '@/styles/global.scss';
import { CardBadgeEmojis } from '@/lib/constants/CardBadgeEmojis';
import { CardData } from '@/lib/types/CardData';
import axios from 'axios';
import LoadingCard from '@/components/public/cards/LoadingCard';
import fonts from '@/app/fonts';

interface CardProps {
    params: { readonly serverID: string };
    children: React.ReactNode;
}

export async function generateMetadata({
    params,
}: CardProps): Promise<Metadata> {
    const cardData = await axios
        .get<CardData | { error: string } | undefined>(
            `${process.env.NEXT_PUBLIC_SITE_URL}/bot/v1/cards/${params.serverID}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then(async (result) =>
            result.data && !('error' in result.data) ? result.data : undefined
        )
        .catch(() => undefined);
    if (!cardData)
        return {
            title: 'Card Not Found',
            description: "Couldn't find an Auxdibot card for that server.",
            openGraph: {
                title: 'Card Not Found',
                description: "Couldn't find an Auxdibot card for that server.",
                type: 'website',
                url: 'https://bot.auxdible.me',
            },
        };
    return {
        title: cardData.server.name,
        description:
            cardData.description ??
            "A server card created utilizing Auxdibot's card system.",
        icons: cardData.server.icon_url,
        openGraph: {
            title: `${cardData.server.name}`,
            description:
                cardData.description ??
                "A server card created utilizing Auxdibot's card system.",
            images: cardData.server.icon_url && [cardData.server.icon_url],
            siteName: `🧍 ${cardData.server.members.toLocaleString()} members | ${cardData.badges.map((i: string) => CardBadgeEmojis[i as keyof typeof CardBadgeEmojis] ?? '').join(' ')} badges`,
            type: 'website',
            url: 'https://bot.auxdible.me',
        },
    };
}
export async function generateViewport({
    params,
}: CardProps): Promise<Viewport> {
    const cardData = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/bot/v1/cards/${params.serverID}`
    )
        .then((result) => result.json())
        .then((data) => (data && !data['error'] ? data : undefined))
        .catch(() => undefined);
    if (!cardData)
        return {
            colorScheme: 'dark',
            themeColor: '#000000',
        };
    return {
        colorScheme: 'dark',
        themeColor: cardData.primary_color ?? '#000000',
    };
}

export default function ServerCardLayout({ params, children }: CardProps) {
    // extra div element here is to render in all card fonts to tailwind
    return (
        <div className={'flex h-full flex-1 flex-col'}>
            <div
                className={`font-bauhaus font-inter font-josefin-slab font-lato font-oswald font-playfair-display font-raleway font-roboto ${Object.keys(
                    fonts
                )
                    .map((i) => fonts[i as keyof typeof fonts].variable)
                    .join(' ')}`}
            />
            <LoadingCard serverID={params.serverID} />
            {children}
        </div>
    );
}
