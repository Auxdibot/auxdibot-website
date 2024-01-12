import { CardBadge } from "./CardBadge"
import { CardFont } from "./CardFont"
import { CardGradients } from "./CardGradients"

export interface CardData {
    server: {
        name: string,
        icon_url?: string,
        members: number,
        acronym: string
    },
    description?: string,
    invite_url?: string,
    background?: {
        color1: string,
        color2: string,
        gradient: CardGradients,
    },
    channel?: {
        name: string,
        messages: { author: string, message: string, date: number }[]
    },
    primary_color: string,
    rules: string[],
    public: boolean,
    featured: boolean,
    text_font?: CardFont,
    header_font?: CardFont,
    badges: CardBadge[],
    dark: boolean;

}