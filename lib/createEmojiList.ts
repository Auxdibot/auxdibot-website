import emojis from 'emojibase-data/en/compact.json';
import groups from 'emojibase-data/meta/groups.json';
import shortcodes from 'emojibase-data/en/shortcodes/joypixels.json';
export function createEmojiList(): Group[] {
// take the emojidata from the json file and map it to a new array sorting out the different groups of emojis and sorting those groups by subgroups
    return Object.keys(groups.groups).reduce((acc: any[], group, index) => {
       

        return acc[index] = {
            group: group,
            groupName: groups.groups[group],
            emojis: emojis.filter(emoji => emoji.group === Number(group) && emoji.unicode.split(' ').length < 2).map(emoji => {
                return {
                    order: emoji.order ?? 0,
                    emoji: emoji.unicode.toString(),
                    hexcode: emoji.hexcode,
                    group: emoji.group ?? 0,
                    annotation: emoji.label,
                    shortcodes: shortcodes[emoji.hexcode] || [],
                } satisfies EmojiType;
            }).filter(i => i?.shortcodes.length > 0 && i.emoji.split(' ').length < 2).sort((a,b) => (a?.order ?? 0)-(b?.order ?? 0)),
        }, acc;
        }, Array(Object.keys(groups.groups).length));
} 