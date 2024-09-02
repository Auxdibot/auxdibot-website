import { TemplatePlaceholderData } from '@/lib/constants/TemplatePlaceholderData';
import { ShowdownExtension } from 'showdown';

const placeholders = (placeholders?: string[]) =>
    <ShowdownExtension>{
        type: 'output',

        regex: /(%[A-Za-z0-9_\\]+%|\{%[A-Za-z0-9_\\]+%\})/g,
        replace: (_: string, match: string) => {
            const placeholder = match
                .replaceAll('\\', '')
                .replaceAll(/({%|%}|%)/g, '')
                .toUpperCase();

            const data =
                TemplatePlaceholderData[
                    placeholder as keyof typeof TemplatePlaceholderData
                ];
            return `<span markdown="1" class="${data ? (Array(...(placeholders ?? [])).includes(placeholder) ? 'text-green-500' : 'text-yellow-500') : 'text-red-500'}">${data ? (placeholders?.includes(placeholder) ? data : 'This placeholder cannot be used for this feature') : 'Invalid Placeholder'}</span>`;
        },
    };
export default placeholders;
