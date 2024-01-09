import { CardFont } from "./CardFonts"
import { CardGradients } from "./CardGradients"

export interface CardData {
    server: {
        name: string,
        icon_url: string,
        members: number
    },
    description?: string,
    invite_url?: string,
    background?: {
        color1: string,
        color2: string,
        gradient: CardGradients,
    },
    primary_color: string,
    rules?: string,
    public: boolean,
    featured: boolean,
    text_font?: CardFont,
    header_font?: CardFont,

}