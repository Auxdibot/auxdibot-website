import { ShowdownExtension } from 'showdown';
import emojiRegex from 'emoji-regex';
import { emojis } from '@/lib/constants/emojis';
export default <ShowdownExtension>{
    type: 'lang',
    regex: emojiRegex(),
    replace: (match: string) => {
        const emojiValue = emojis
            .find((i) => i.emojis.find((emoji) => emoji.emoji == match))
            ?.emojis.find((emoji) => emoji.emoji == match);
        return `<Twemoji>${emojiValue ? emojiValue.hexcode.toLowerCase() : match}</Twemoji>`;
    },
};
