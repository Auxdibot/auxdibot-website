import { TemplatePlaceholderData } from './constants/TemplatePlaceholderData';

export function parsePlaceholders(
    content: JSX.Element | string,
    html: boolean = true,
    usablePlaceholders?: string[]
): string {
    return content
        .toString()
        .replace(
            /(%[A-Za-z0-9_\\]+%|\{%[A-Za-z0-9_\\]+%\})/g,
            (_: string, match: string) => {
                const placeholder = match
                    .replaceAll('\\', '')
                    .replaceAll(/({%|%}|%)/g, '')
                    .toUpperCase();

                const data =
                    TemplatePlaceholderData[
                        placeholder as keyof typeof TemplatePlaceholderData
                    ];
                return html
                    ? `<span class="${data ? (usablePlaceholders?.includes(placeholder) ? 'text-green-500' : 'text-yellow-500') : 'text-red-500'}">${data ? (usablePlaceholders?.includes(placeholder) ? data : 'This placeholder cannot be used for this feature') : 'Invalid Placeholder'}</span>`
                    : data
                      ? usablePlaceholders?.includes(placeholder)
                          ? data
                          : 'This placeholder cannot be used for this feature'
                      : 'Invalid Placeholder';
            }
        );
}
