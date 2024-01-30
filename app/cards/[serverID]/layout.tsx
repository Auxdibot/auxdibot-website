import LoadingCard from "@/components/cards/LoadingCard";
import { Metadata } from "next";
import '@/styles/global.scss'
import { CardBadgeEmojis } from "@/lib/constants/CardBadgeEmojis";

interface CardProps {
    params: { readonly serverID: string }
    children: React.ReactNode
}

export async function generateMetadata({ params }: CardProps): Promise<Metadata> {
    const cardData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/cards/${params.serverID}`)
    .then((result) => result.json())
    .then((data) => data && !data['error'] ? data : undefined)
    .catch(() => undefined);
    if (!cardData) return {
        title: 'Card Not Found',
        description: "Couldn't find an Auxdibot card for that server.",
        themeColor: '#000000',
        openGraph: {
            title: 'Card Not Found',
            description: "Couldn't find an Auxdibot card for that server.",
            type: 'website',
            url: 'https://bot.auxdible.me'
        }
    }
    return {
        title: cardData.server.name,
        description: (cardData.description ?? "A server card created utilizing Auxdibot's card system."),
        icons: cardData.server.icon_url,
        themeColor: cardData.primary_color ?? "#000000",
        openGraph: {
            title: `${cardData.server.name}`,
            description: (cardData.description ?? "A server card created utilizing Auxdibot's card system."),
            images: cardData.server.icon_url && [cardData.server.icon_url],
            siteName: `🧍 ${cardData.server.members.toLocaleString()} members | ${cardData.badges.map((i: string) => CardBadgeEmojis[i as keyof typeof CardBadgeEmojis] ?? '').join(' ')} badges`,
            type: 'website',
            url: 'https://bot.auxdible.me'
        }
    }
}


export default function ServerCardLayout({ params, children }: CardProps) {
    // extra div element here is to render in all card fonts to tailwind
    return (<div className={"flex flex-1 flex-col h-full"}>
    <div className={"font-roboto font-lato font-playfair-display font-inter font-josefin-slab font-oswald font-bauhaus font-raleway"}/>
    <LoadingCard serverID={params.serverID}/>
    {children}
    </div>)
}