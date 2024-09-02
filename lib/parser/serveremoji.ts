import { ShowdownExtension } from 'showdown';
export default <ShowdownExtension>{
    type: 'lang',
    regex: /<:[a-zA-Z0-9_]+:[0-9]+>/g,
    replace: (match: string) => {
        return `<Twemoji class="inline">${match.split(':')[2].replace('>', '').toString()}</Twemoji>`;
    },
};
