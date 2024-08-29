import { ShowdownExtension } from 'showdown';

export default <ShowdownExtension>{
    type: 'lang',

    regex: /^(>+.*)$/gm,
    replace: (_: string, match: string) => {
        const content = match?.replace(/>\s*/, '');
        return `<div class="flex">
        <div class="w-1 self-stretch rounded-[4px] bg-discord-quote"></div>
        <blockquote class="block pr-2 pl-3 indent-0 box-border">${content}</blockquote>
        </div>`;
    },
};
