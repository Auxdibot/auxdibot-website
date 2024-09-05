import { ShowdownExtension } from 'showdown';

export default <ShowdownExtension>{
    type: 'output',
    regex: /<@([0-9]+)>/g,
    replace: (_: string, id: string) => {
        return `<span class="discord-mention">@user ${id}</span>`;
    },
};
