import { TemplatePlaceholderData } from '@/lib/constants/TemplatePlaceholderData';
import { ShowdownExtension } from 'showdown';

export default <ShowdownExtension>{
    type: 'lang',

    regex: /(%[A-Za-z0-9_\\]+%|\{%[A-Za-z0-9_\\]+%\})/g,
    replace: (_: string, match: string) => {
        const placeholder = match
            .replaceAll('\\', '')
            .replaceAll(/({%|%}|%)/g, '')
            .toLowerCase();

        const data =
            TemplatePlaceholderData[
                placeholder as keyof typeof TemplatePlaceholderData
            ];
        return `<span class="${data ? 'text-green-500' : 'text-red-500'}">${data ?? 'Invalid Placeholder'}</span>`;
    },
};
