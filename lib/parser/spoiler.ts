import { ShowdownExtension } from 'showdown';

export default <ShowdownExtension>{
    type: 'lang',

    regex: /(\|{2}[^|]+\|{2})/g,
    replace: (_: string, match: string) => {
        const content = match?.replaceAll('||', '');
        return `<span class="hover:text-white text-transparent cursor-pointer px-1 rounded-[4px] bg-black">${content}</span>`;
    },
};
