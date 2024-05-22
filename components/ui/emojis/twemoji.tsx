import ServerEmojiBody from '@/lib/types/ServerEmojis';
import Image from 'next/image';
import { memo, useState } from 'react';
import { useQuery } from 'react-query';
import twemoji from 'twemoji';
function Twemoji({ children, className, serverID }: { children: string, className?: string, serverID?: string }) {
  let { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(["data_emojis", serverID], async () => serverID && await fetch(`/api/v1/servers/${serverID}/emojis`).then(async (data) => 
  await data.json().catch(() => undefined)).catch(() => undefined)); 
    const [fallback, setFallback] = useState(false);
    const uniqueEmojis = {
        '👁‍🗨': 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f441-200d-1f5e8.svg',
    };
    const unicode = children?.split('-').map(i => twemoji.convert.fromCodePoint(i)).join('').replaceAll('\uFE0F', '');
     const src = Object.keys(uniqueEmojis).includes(unicode) ? 
     uniqueEmojis[unicode as keyof typeof uniqueEmojis] : 
     /^[\da-f-]+$/.test(children) ?
    `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${children}.svg` : 
    `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${twemoji.convert.toCodePoint(children)}.svg`;
    const serverEmojiValue = serverEmojis?.emojis.find((i2) => i2.id == children);
    if (serverEmojiValue) return <Image width={24} height={24} alt={serverEmojiValue.name} draggable="false" loading="lazy" src={serverEmojiValue.image}/>;
    return (fallback ? <span className={"w-full"}>{unicode}</span> :
      <Image
        src={src}
        height="22"
        width="22"
        draggable="false"
        loading='lazy'
        className={className}
        alt={children}
        onError={() => setFallback(true)}
      />
    )
}

export default memo(Twemoji)