import { ShowdownExtension } from 'showdown';

export default <ShowdownExtension>{
    type: 'lang',

    regex: /^(-#\s+.*)$/gm,
    replace: (_: string, match: string) => {
        const content = match?.replace(/-#\s+/, '');
        return `<small>${content}</small>`;
    },
};
