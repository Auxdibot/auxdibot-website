import { APIEmbed } from 'discord-api-types/v10';

type DiscordMessageBody = {
    embed?: APIEmbed;
    content?: string;
    background?: boolean;
};
export function DiscordMessage({ embed, content }: DiscordMessageBody) {
    function generateFields() {
        if (!embed?.fields) return '';
        let totalInlines = 0;
        return embed?.fields?.map((field, index) => {
            if (field.inline) {
                totalInlines++;
                if (totalInlines > 3) {
                    totalInlines = 1;
                }
            }

            return (
                <div
                    key={index}
                    className={`block ${field.inline ? `col-span-inline-${totalInlines}` : 'col-span-field'}`}
                >
                    <div className='break-words text-left text-sm font-semibold leading-[1.375rem] text-white'>
                        <span>{field.name}</span>
                    </div>
                    <div className='min-w-0 whitespace-pre-line break-words text-left text-sm leading-[1.375rem]'>
                        <span>{field.value}</span>
                    </div>
                </div>
            );
        });
    }
    console.log(embed?.color?.toString(16).padStart(6, '0'));
    return (
        <article className='whitespace-break-spaces font-sans text-base leading-[1.375rem] text-discord-text'>
            <div className='break-words'>{content}</div>
            <div
                className='relative grid max-w-max select-text rounded-[4px] border-l-4 border-discord-embed-border bg-discord-embed'
                style={{
                    borderColor:
                        '#' + embed?.color?.toString(16).padStart(6, '0'),
                }}
            >
                <div className='max-w-[516px]'>
                    <div
                        className={`grid overflow-hidden pb-3 pl-4 pr-4 pt-2 ${embed?.thumbnail?.url ? 'grid-cols-thumbnail' : ''} grid-cols-auto grid-rows-auto text-base leading-[22px]`}
                    >
                        {embed?.author && (
                            <div className='mt-2 flex min-w-0 items-center'>
                                {/* eslint-disable-next-line @next/next/no-img-element*/}
                                {embed.author.icon_url && (
                                    <img
                                        src={embed.author.icon_url}
                                        alt=''
                                        className='mr-2 h-6 w-6 rounded-[50%] object-contain indent-[-9999px] align-baseline'
                                    />
                                )}
                                {embed?.author?.url ? (
                                    <a
                                        href={embed.author.url}
                                        target='_blank'
                                        role='button'
                                        className={`cursor-pointer whitespace-break-spaces break-words text-left text-sm font-semibold leading-[1.375rem] text-white hover:underline`}
                                    >
                                        {embed.author.name}
                                    </a>
                                ) : (
                                    <span className='whitespace-break-spaces break-words text-left text-sm font-semibold leading-[1.375rem] text-white'>
                                        {embed.author.name}
                                    </span>
                                )}
                            </div>
                        )}
                        {embed?.title && (
                            <div
                                className={`mt-2 inline-block min-w-0 text-left font-semibold text-white outline-0`}
                            >
                                {embed.url ? (
                                    <a
                                        className={
                                            'text-discord-link hover:underline'
                                        }
                                        href={embed.url}
                                        target='_blank'
                                        role='button'
                                    >
                                        {embed.title}
                                    </a>
                                ) : (
                                    <span className='text-white'>
                                        {embed.title}
                                    </span>
                                )}
                            </div>
                        )}
                        {embed?.description && (
                            <div className='col-span-1 mt-2 min-w-0 whitespace-pre-line text-left text-sm leading-[1.125rem]'>
                                <span>{embed.description}</span>
                            </div>
                        )}
                        {embed?.fields && embed.fields.length > 0 && (
                            <div className='col-span-1 mt-2 grid min-w-0 gap-2 whitespace-pre-line leading-[1.125rem]'>
                                {generateFields()}
                            </div>
                        )}
                        {embed?.image?.url && (
                            <div
                                className={`mt-4 min-w-0 ${embed?.thumbnail?.url ? 'col-span-image' : 'col-span-1'} contain-paint block rounded-[4px] object-fill`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element*/}
                                <img src={embed?.image?.url} alt='' />
                            </div>
                        )}
                        {embed?.thumbnail?.url && (
                            <div
                                className={`contain-paint col-span-thumbnail row-span-thumbnail ml-4 mt-2 block h-20 w-[80px] min-w-0 rounded-[4px] object-fill`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element*/}
                                <img
                                    src={embed?.thumbnail?.url}
                                    alt=''
                                    className='overflow-hidden rounded-[3px] object-contain'
                                />
                            </div>
                        )}
                        {embed?.footer && (
                            <div className='mt-2 flex min-w-0 items-center'>
                                {embed.footer.icon_url && (
                                    <img
                                        src={embed.footer.icon_url}
                                        alt=''
                                        className='mr-2 h-6 w-6 rounded-[50%] object-contain indent-[-9999px] align-baseline'
                                    />
                                )}
                                <span className='whitespace-break-spaces break-words text-left text-sm font-semibold leading-[1.375rem] text-white'>
                                    {embed.footer.text}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
