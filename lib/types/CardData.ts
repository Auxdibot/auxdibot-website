import { CardBadge } from './CardBadge';
import { CardFont } from './CardFont';
import { CardGradients } from './CardGradients';
import { PublicServerData } from './PublicServerData';

export interface CardData {
    server: PublicServerData;
    description?: string;
    invite_url?: string;
    background?: {
        color1: string;
        color2: string;
        gradient: CardGradients;
    };
    channel?: {
        name: string;
        messages: { author: string; message: string; date: number }[];
    };
    primary_color: string;
    rules: string[];
    public: boolean;
    featured: boolean;
    text_font?: CardFont;
    header_font?: CardFont;
    badges: CardBadge[];
    dark: boolean;
}
