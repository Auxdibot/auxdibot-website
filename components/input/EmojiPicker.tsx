
import React, { Suspense, useEffect, useRef, useState } from "react";
import { BsArrowDownShort, BsBuilding, BsDiscord, BsEmojiSmile, BsFlag, BsHash, BsLamp, BsPerson } from "react-icons/bs";
import { useQuery } from "react-query";
import { PiDog } from "react-icons/pi";
import { MdOutlineFastfood, MdOutlineSportsBasketball } from "react-icons/md";
import { emojis } from "@/lib/constants/emojis";
import Image from "next/image";
import ServerEmojiBody from "@/lib/types/ServerEmojis";

const Twemoji = React.lazy(() => import('./Twemoji'));
interface EmojiInputProps {
    readonly serverID?: string;
    readonly onChange: (e: { emoji: string | null }) => void;
    readonly value: string | null;
}

function Category({ name, icon}: { name: string, icon: JSX.Element }) {
  return (<span className={"p-0.5 md:px-1.5 px-1 self-stretch flex items-center relative group"}>
    {icon}
    <span className={"absolute z-40 max-md:hidden -translate-y-8 -translate-x-1/2 left-1/2 transition-all scale-0 group-hover:scale-100 origin-bottom rounded-2xl border bg-gray-900 font-open-sans px-1"}>{name}</span>
    </span>)
}
export default function EmojiPicker({ serverID, onChange, value }: EmojiInputProps) {

    let { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(["data_emojis", serverID], async () => serverID && await fetch(`/api/v1/servers/${serverID}/emojis`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined)); 
    const [collapsed, setCollapsed] = useState(true);
    const [category, setCategory] = useState(0);
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
            <span onClick={() => setCollapsed(!collapsed)}  className={"flex items-center gap-1 group cursor-pointer bg-gray-700 p-1 rounded-lg font-open-sans select-none"}>
            {value ? serverEmojiValue ? 
              <Image alt={serverEmojiValue.name} width={24} height={24} quality={100} draggable="false" loading="lazy" src={serverEmojiValue.image}/> 
              : <Twemoji>{emojiValue?.hexcode.toLowerCase() ?? value}</Twemoji> 
            : <span className={'flex items-center gap-2'}><Twemoji>👋</Twemoji> Select an Emoji</span>
            } 
            <span>
                <BsArrowDownShort className={"transition-all group-hover:translate-y-1"}/></span>
            </span>
            {!collapsed && <div className={`absolute h-auto flex md:flex-col z-10 border border-gray-500 transition-all shadow-xl bg-gray-700 rounded-lg w-max top-full translate-y-1 origin-top-left max-md:origin-top max-md:-translate-x-1/2 max-md:left-1/2 ${collapsed ? 'scale-0 hidden' : ' visible scale-100 z-10'}`}>
            <span className={"flex md:fixed w-full md:rounded-t-lg max-md:rounded-l-lg bg-gray-800 md:h-8 max-md:self-stretch max-md:flex-col max-md:w-fit max-md:left-0 text-lg max-md:text-sm max-md:gap-1 max-md:py-1 items-center"}>
              <span onClick={() => setCategory(0)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r"}><Category icon={<BsEmojiSmile/>} name={'Smileys'}/></span>
              <span onClick={() => setCategory(1)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r"}><Category icon={<BsPerson/>} name={'People'}/></span>
              <span onClick={() => setCategory(2)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r"}><Category icon={<PiDog/>} name={'Nature'}/></span>
              <span onClick={() => setCategory(3)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r"}><Category icon={<MdOutlineFastfood/>} name={'Food'}/></span>
              <span onClick={() => setCategory(4)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r"}><Category icon={<BsBuilding/>} name={'Places'}/></span>
              <span onClick={() => setCategory(5)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r"}><Category icon={<MdOutlineSportsBasketball/>} name={'Activities'}/></span>
              <span onClick={() => setCategory(6)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r"}><Category icon={<BsLamp/>} name={'Objects'}/></span>
              <span onClick={() => setCategory(7)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r"}><Category icon={<BsHash/>} name={'Symbols'}/></span>
              <span onClick={() => setCategory(8)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r last-of-type:border-0"}><Category icon={<BsFlag/>} name={'Flags'}/></span>
              {serverEmojis?.emojis.length ? <span onClick={() => setCategory(9)} className={"cursor-pointer last-of-type:border-0 border-r"}><Category icon={serverEmojis.server_icon ? <Image alt={'Server Icon'} width={16} height={16} className={"rounded-xl"} quality={100} src={serverEmojis.server_icon}/> : <BsDiscord/>} name={'Server'}/></span> : <></>}
            </span>
            <div className={"md:h-8"}></div>
            <div className={`flex flex-col gap-1 max-h-60 overflow-y-scroll self-stretch py-2 font-open-sans`}>
            {<div className={'grid grid-cols-9 max-md:grid-cols-6 gap-1 self-stretch flex-1 min-h-full'}>
                  {category != 9 ? emojis[category].emojis.map(emoji => <span key={emoji.order} onClick={() => change(emoji.emoji)} className={'cursor-pointer hover:bg-gray-600 p-1 rounded-lg h-fit'}>
                      <Suspense fallback={<span className={"bg-gray-600"}>{<BsEmojiSmile className={"animate-pulse"}/>}</span>}>
                        {emoji.twemoji}
                      </Suspense>
                    </span>) :
                    serverEmojis?.emojis.map(emoji => <span key={emoji.name} onClick={() => change(emoji.id)} className={'cursor-pointer hover:bg-gray-600 p-1 rounded-lg h-fit'}>
                      <Image alt={emoji.name} width={24} height={24} quality={100} draggable="false" loading="lazy" src={emoji.image}/>
                    </span>)}
            </div>}
  
            </div>
            </div>}
            
            </span>);
}