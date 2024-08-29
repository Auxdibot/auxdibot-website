import { ShowdownExtension } from 'showdown';

export default <ShowdownExtension>{
    type: 'lang',
    regex: /!\[([^\]]+)\]\(([^)]+)\)/g,

    replace: (match: string) => match.replace('!', ''),
};
