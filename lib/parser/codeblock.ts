import { ShowdownExtension } from 'showdown';

export default <ShowdownExtension>{
    type: 'lang',

    regex: /^`{3}\w+`{3}$/gm,
    replace: (match: string) => {
        const content = match?.replace(/`{3}/g, '');

        return (
            '<code class="block w-full !my-0 p-2 text-left indent-0">' +
            content +
            '</code>'
        );
    },
};
