import { APIEmbed } from 'discord-api-types/v10';

type NotificationType = {
  channelID: string;
  previous_data?: string;
  index: number;
  topicURL: string;
  type: 'TWITCH' | 'YOUTUBE' | 'RSS';
  message: {
    content: string;
    embed: APIEmbed;
  };
  
};

export default NotificationType;