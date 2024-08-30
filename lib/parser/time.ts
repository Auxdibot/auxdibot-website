import { ShowdownExtension } from 'showdown';

export default <ShowdownExtension>{
    type: 'lang',

    regex: /<t:\w+>/g,
    replace: (match: string) => {
        const content = match?.replaceAll('<t:', '').replaceAll('>', '');
        const date = new Date(Number(content) * 1000).toLocaleString();
        return `<span class="bg-discord-code border border-discord-code-border rounded-[4px] px-1">${date}</span>`;
    },
};
