
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { emojis } from "@/lib/constants/emojis";
import Image from "next/image";
import ServerEmojiBody from "@/lib/types/ServerEmojis";
import { EmojiList } from "./emoji-list";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button/button";
import { useMediaQuery } from "react-responsive";
import { Drawer, DrawerContent, DrawerTrigger } from "../drawer";

const Twemoji = React.lazy(() => import('./twemoji'));
type EmojiInputProps = {
    readonly serverID?: string;
    readonly onChange: (e: { emoji: string | null }) => void;
    readonly value: string | null;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'onChange' | 'value'>;


export default function EmojiPicker({ serverID, onChange, value, className }: EmojiInputProps) {

    let { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(["data_emojis", serverID], async () => serverID && await fetch(`/bot/v1/servers/${serverID}/emojis`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined)); 
    const [open, setOpen] = useState(true);
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const inputRef = useRef<HTMLSpanElement | null>(null);
    useEffect(() => {
        const paste = (e: globalThis.ClipboardEvent) => {
          const text = e.clipboardData?.getData('text');
          if (open && text && emojis.find((i) => i.emojis.find((emoji) => emoji.emoji.codePointAt(0) === text.codePointAt(0)))) {

            e.preventDefault();

            change(text);
          }
        }

        document.addEventListener("paste", paste)
        return () => { document.removeEventListener("paste", paste) };
      })

    function change(emoji: string | null) {
        onChange({ emoji: emoji || "" });
    }
    
    const serverEmojiValue = serverEmojis?.emojis.find((i) => i.id == value);
    const emojiValue = value ? emojis.find((i) => i.emojis.find((emoji) => emoji.emoji == value))?.emojis.find((emoji) => emoji.emoji == value) : undefined;
    return (<span className={"relative flex items-center"} ref={inputRef}>
            {isDesktop ? <Popover modal onOpenChange={(open) => setOpen(open)}>
            <PopoverTrigger asChild>
            <Button variant={'outline'} className={className}>
            {value ? serverEmojiValue ? 
              <Image alt={serverEmojiValue.name} width={24} height={24} quality={100} draggable="false" loading="lazy" src={serverEmojiValue.image}/> 
              : <Twemoji>{emojiValue?.hexcode.toLowerCase() ?? value}</Twemoji> 
            : <span className={'flex items-center gap-2 text-sm italic text-gray-400'}><Twemoji>👋</Twemoji> Select an Emoji</span>
            }
            </Button>
            
            </PopoverTrigger>
            <PopoverContent className={'w-full'}>
            <EmojiList serverEmojis={serverEmojis} change={change}/>
            </PopoverContent>

            </Popover>

            : 
            <Drawer onOpenChange={(open) => setOpen(open)}>
            <DrawerTrigger asChild>
            <Button variant={'outline'} className={className}>
            {value ? serverEmojiValue ? 
              <Image alt={serverEmojiValue.name} width={24} height={24} quality={100} draggable="false" loading="lazy" src={serverEmojiValue.image}/> 
              : <Twemoji>{emojiValue?.hexcode.toLowerCase() ?? value}</Twemoji> 
            : <span className={'flex items-center gap-2 text-sm italic text-gray-400'}><Twemoji>👋</Twemoji> Select an Emoji</span>
            }
            </Button>
            </DrawerTrigger>
            <DrawerContent className="w-full p-0">
              <EmojiList parseServerEmojis serverEmojis={serverEmojis} change={change}/>
            </DrawerContent>
          </Drawer>}
            </span>);
}