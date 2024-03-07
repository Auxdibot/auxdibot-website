
import React, { useEffect, useRef, useState } from "react";
import { BsArrowDownShort } from "react-icons/bs";
import { useQuery } from "react-query";
import { emojis } from "@/lib/constants/emojis";
import Image from "next/image";
import ServerEmojiBody from "@/lib/types/ServerEmojis";
import { EmojiList } from "./EmojiList";

const Twemoji = React.lazy(() => import('./Twemoji'));
interface EmojiInputProps {
    readonly serverID?: string;
    readonly onChange: (e: { emoji: string | null }) => void;
    readonly value: string | null;
}


export default function EmojiPicker({ serverID, onChange, value }: EmojiInputProps) {

    let { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(["data_emojis", serverID], async () => serverID && await fetch(`/api/v1/servers/${serverID}/emojis`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined)); 
    const [collapsed, setCollapsed] = useState(true);

    const inputRef = useRef<HTMLSpanElement | null>(null);
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (!collapsed && inputRef.current && !inputRef.current.contains(e.target as Node)) setCollapsed(true)
          
        }
        const paste = (e: globalThis.ClipboardEvent) => {
          const text = e.clipboardData?.getData('text');
          if (!collapsed && text && emojis.find((i) => i.emojis.find((emoji) => emoji.emoji.codePointAt(0) === text.codePointAt(0)))) {
            e.preventDefault();

            change(text);
          }
        }
        document.addEventListener("mousedown", clickedOutside)
        document.addEventListener("paste", paste)
        return () => { document.removeEventListener("mousedown", clickedOutside); document.removeEventListener("paste", paste) };
      })

    function change(emoji: string | null) {
        setCollapsed(!collapsed)
        onChange({ emoji: emoji || "" });
    }
    const serverEmojiValue = serverEmojis?.emojis.find((i) => i.id == value);
    const emojiValue = value ? emojis.find((i) => i.emojis.find((emoji) => emoji.emoji == value))?.emojis.find((emoji) => emoji.emoji == value) : undefined;
    return (<span className={"relative flex items-center"} ref={inputRef}>
            <span onClick={() => setCollapsed(!collapsed)}  className={"flex items-center gap-1 group cursor-pointer bg-gray-950 border border-gray-800 p-1 rounded-md font-open-sans select-none"}>
            {value ? serverEmojiValue ? 
              <Image alt={serverEmojiValue.name} width={24} height={24} quality={100} draggable="false" loading="lazy" src={serverEmojiValue.image}/> 
              : <Twemoji>{emojiValue?.hexcode.toLowerCase() ?? value}</Twemoji> 
            : <span className={'flex items-center gap-2 text-sm italic text-gray-400'}><Twemoji>👋</Twemoji> Select an Emoji</span>
            } 
            <span>
                <BsArrowDownShort className={"transition-all group-hover:translate-y-1"}/></span>
            </span>
            {!collapsed && <span className={'absolute top-12 bg-gray-950 border-gray-800 border rounded-md p-1'}><EmojiList serverEmojis={serverEmojis} change={change}/></span>}
            
            </span>);
}