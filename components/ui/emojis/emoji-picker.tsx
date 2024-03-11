
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { emojis } from "@/lib/constants/emojis";
import Image from "next/image";
import ServerEmojiBody from "@/lib/types/ServerEmojis";
import { EmojiList } from "./emoji-list";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button/button";

const Twemoji = React.lazy(() => import('./twemoji'));
interface EmojiInputProps {
    readonly serverID?: string;
    readonly onChange: (e: { emoji: string | null }) => void;
    readonly value: string | null;
}


export default function EmojiPicker({ serverID, onChange, value }: EmojiInputProps) {

    let { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(["data_emojis", serverID], async () => serverID && await fetch(`/api/v1/servers/${serverID}/emojis`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined)); 
    const [open, setOpen] = useState(true);

    const inputRef = useRef<HTMLSpanElement | null>(null);
    useEffect(() => {
        const paste = (e: globalThis.ClipboardEvent) => {


          const text = e.clipboardData?.getData('text');
          console.log(text, emojis.find((i) => i.emojis.find((emoji) => emoji.emoji.codePointAt(0) === text?.codePointAt(0))));
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
            <Popover onOpenChange={(open) => setOpen(open)}>
            <PopoverTrigger asChild>
            <Button variant={'outline'}>
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

            
            </span>);
}