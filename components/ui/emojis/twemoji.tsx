import Image from 'next/image';
import { memo, useState } from 'react';
import twemoji from 'twemoji';
function Twemoji({ children, className }: { children: string, className?: string }) {
    const [fallback, setFallback] = useState(false);
    const uniqueEmojis = {
        '👁‍🗨': 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f441-200d-1f5e8.svg',
    };
    const unicode = children.split('-').map(i => twemoji.convert.fromCodePoint(i)).join('').replaceAll('\uFE0F', '');
     const src = Object.keys(uniqueEmojis).includes(unicode) ? 
     uniqueEmojis[unicode as keyof typeof uniqueEmojis] : 
     /^[\da-f-]+$/.test(children) ?
    `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${children}.svg` : 
    `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${twemoji.convert.toCodePoint(children)}.svg`;
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