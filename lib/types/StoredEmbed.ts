import { APIEmbed } from 'discord-api-types/v10';

export interface StoredEmbed {
    id: string;
    content?: string;
    embed?: APIEmbed;
    webhook_url?: string;
    date_created: string;
}
