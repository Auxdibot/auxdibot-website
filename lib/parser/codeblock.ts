import { ShowdownExtension } from 'showdown';

export default <ShowdownExtension>{
    type: 'lang',

    regex: /`{3}(?:[^`\\]|\\.)*`{3}/gm,
    replace: (match: string) => {
        const content = match?.replace(/`{3}/g, '');

        return (
            '<pre><code markdown="1" class="block w-full !my-0 p-2 text-left indent-0">' +
            content.replaceAll('\\`', '`') +
            '</code></pre>'
        );
    },
};
