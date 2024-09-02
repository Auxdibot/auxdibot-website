import ServerEmojiBody from '@/lib/types/ServerEmojis';
import Image from 'next/image';
import { memo, useState } from 'react';
import { useQuery } from 'react-query';
import twemoji from 'twemoji';
export const Twemoji = memo(function ({
    children,
    className,
    serverID,
}: {
    children: string;
    className?: string;
    serverID?: string;
}) {
    let { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(
        ['data_emojis', serverID],
        async () =>
            serverID &&
            (await fetch(`/bot/v1/servers/${serverID}/emojis`)
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined))
    );
    const [fallback, setFallback] = useState(false);
    const uniqueEmojis = {
        '👁‍🗨': 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f441-200d-1f5e8.svg',
    };
    const original = Array.isArray(children) ? children.join('-') : children;
    const unicode = original
        ?.split('-')
        .map((i) => twemoji.convert.fromCodePoint(i))
        .join('')
        .replaceAll('\uFE0F', '');

    const serverEmojiValue = serverEmojis?.emojis.find(
        (i2) => i2.id == original
    );
    if (serverEmojiValue)
        return (
            <Image
                width={24}
                height={24}
                alt={serverEmojiValue.name}
                draggable='false'
                loading='lazy'
                src={serverEmojiValue.image}
            />
        );
    if (!twemoji && !unicode)
        return <span className={'w-full'}>{original}</span>;
    const src = Object.keys(uniqueEmojis).includes(unicode)
        ? uniqueEmojis[unicode as keyof typeof uniqueEmojis]
        : /^[\da-f-]+$/.test(original)
          ? `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${original}.svg`
          : `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${twemoji?.convert?.toCodePoint(original)}.svg`;
    return fallback ? (
        <span className={'w-full'}>{unicode}</span>
    ) : (
        <Image
            src={src}
            height='22'
            width='22'
            draggable='false'
            loading='lazy'
            className={className}
            alt={children}
            onError={() => setFallback(true)}
        />
    );
});
Twemoji.displayName = 'Twemoji';
export default Twemoji;
