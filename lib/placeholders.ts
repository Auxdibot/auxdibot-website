import { TemplatePlaceholderData } from './constants/TemplatePlaceholderData';

export function parsePlaceholders(
    content: JSX.Element | string,
    html: boolean = true
): string {
    return content
        .toString()
        .replace(
            /(%[A-Za-z0-9_\\]+%|\{%[A-Za-z0-9_\\]+%\})/g,
            (_: string, match: string) => {
                const placeholder = match
                    .replaceAll('\\', '')
                    .replaceAll(/({%|%}|%)/g, '')
                    .toLowerCase();

                const data =
                    TemplatePlaceholderData[
                        placeholder as keyof typeof TemplatePlaceholderData
                    ];
                return html
                    ? `<span class="${data ? 'text-green-500' : 'text-red-500'}">${data ?? 'Invalid Placeholder'}</span>`
                    : (data ?? 'Invalid Placeholder');
            }
        );
}
