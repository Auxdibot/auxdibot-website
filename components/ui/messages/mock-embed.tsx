import {
    APIEmbed,
    APIEmbedAuthor,
    APIEmbedFooter,
} from 'discord-api-types/v10';

import Link from 'next/link';

export default function MockEmbed({ embed }: { embed: APIEmbed }) {
    if (!embed) return <></>;
    if (
        !embed.author?.name &&
        !embed.title &&
        !embed.description &&
        (!embed.fields || embed.fields.length == 0) &&
        !embed.footer?.text
    )
        return <></>;
    return (
        <div
            className={`relative flex flex-col overflow-hidden rounded-l-md rounded-r-md bg-discord-embed py-3 pl-4 pr-5 font-sans max-sm:max-w-[95vw] sm:max-w-[512px]`}
        >
            {embed.color ? (
                <div
                    className={'absolute left-0 top-0 h-full w-1'}
                    style={{
                        backgroundColor: embed.color
                            ? `#${embed.color.toString(16)}`
                            : 'black',
                    }}
                ></div>
            ) : (
                ''
            )}
            <div className={'flex flex-row justify-start'}>
                <div
                    className={
                        'flex w-full flex-shrink flex-col gap-2 overflow-hidden'
                    }
                >
                    {embed.author ? (
                        <MockEmbedAuthor author={embed.author} />
                    ) : (
                        ''
                    )}
                    {embed.title ? (
                        <MockEmbedTitle url={embed.url} title={embed.title} />
                    ) : (
                        ''
                    )}
                    {embed.description ? (
                        <p
                            className={
                                'whitespace-pre-line break-words font-light'
                            }
                        >
                            {embed.description}
                        </p>
                    ) : (
                        ''
                    )}
                    <div className={'grid grid-cols-3 gap-2'}>
                        {embed.fields
                            ? embed.fields.map((i, index) => (
                                  <section
                                      key={index}
                                      className={`${i.inline ? '' : 'col-start-1 col-end-4'} m-0 flex w-full flex-col whitespace-pre-line break-words font-light`}
                                  >
                                      <span className={'font-bold'}>
                                          {i.name}
                                      </span>
                                      <span>{i.value}</span>
                                  </section>
                              ))
                            : ''}
                    </div>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element*/}
                {embed.thumbnail?.url ? (
                    <div className={'ml-auto flex-shrink-0'}>
                        <img
                            src={embed.thumbnail.url}
                            className={
                                'ml-5 mt-2 rounded-md object-scale-down object-top'
                            }
                            width={80}
                            height={80}
                            alt={'Embed image'}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            {embed.image?.url ? (
                <img
                    src={embed.image.url}
                    className={
                        'my-3 w-full rounded-md object-scale-down object-left'
                    }
                    alt={'Embed image'}
                />
            ) : (
                ''
            )}
            {embed.footer ? <MockEmbedFooter footer={embed.footer} /> : ''}
        </div>
    );
}
export function MockEmbedTitle({
    title,
    url,
}: {
    title: string;
    url?: string;
}) {
    let titleSpan = (
        <span
            className={
                'text-roboto whitespace-pre-line break-words text-lg font-semibold'
            }
        >
            {title || ''}
        </span>
    );
    return url ? (
        <Link
            className={'text-sky-400 underline-offset-1 hover:underline'}
            target={'_blank'}
            href={url}
        >
            {titleSpan}
        </Link>
    ) : (
        titleSpan
    );
}
export function MockEmbedAuthor({ author }: { author: APIEmbedAuthor }) {
    let authorSpan = (
        <span
            className={
                'text-roboto whitespace-pre-line break-words text-sm font-bold'
            }
        >
            {author.icon_url ? (
                /* eslint-disable-next-line @next/next/no-img-element*/
                <img
                    src={author.icon_url}
                    alt={'Embed author icon'}
                    className={'mr-2 inline-block rounded-full'}
                    width={24}
                    height={24}
                />
            ) : (
                ''
            )}
            {author.name || ''}
        </span>
    );
    return author.url ? (
        <Link className={'hover:underline'} target={'_blank'} href={author.url}>
            {authorSpan}
        </Link>
    ) : (
        authorSpan
    );
}
export function MockEmbedFooter({ footer }: { footer: APIEmbedFooter }) {
    return (
        <span
            className={
                'flex flex-row items-center gap-2 whitespace-pre-line break-words font-roboto text-xs font-medium'
            }
        >
            {footer.icon_url ? (
                /* eslint-disable-next-line @next/next/no-img-element*/
                <img
                    src={footer.icon_url}
                    alt={'Embed footer icon'}
                    className={'inline-block rounded-full'}
                    width={20}
                    height={20}
                />
            ) : (
                ''
            )}{' '}
            {footer.text || ''}
        </span>
    );
}
