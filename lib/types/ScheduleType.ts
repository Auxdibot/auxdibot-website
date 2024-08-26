import { APIEmbed } from 'discord-api-types/v10';

type ScheduleType = {
    index: number;
    channelID: string;
    last_run: Date;
    times_run: number;
    interval_timestamp: string;
    embed: APIEmbed;
    message: String;
    times_to_run: number;
};

export default ScheduleType;
