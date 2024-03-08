import ServerEmojiBody from "@/lib/types/ServerEmojis";
import Image from "next/image";
import { Suspense, useState } from "react";
import { BsBuilding, BsDiscord, BsEmojiSmile, BsFlag, BsHash, BsLamp, BsPerson } from "react-icons/bs";
import { MdOutlineFastfood, MdOutlineSportsBasketball } from "react-icons/md";
import { PiDog } from "react-icons/pi";
import { emojis } from "@/lib/constants/emojis";
import { ScrollArea } from "../scroll-area";

function Category({ name, icon}: { name: string, icon: JSX.Element }) {
    return (<span className={"p-0.5 md:px-1.5 px-1 self-stretch flex items-center relative group"}>
      {icon}
      <span className={"absolute z-[60] max-md:hidden -translate-y-8 -translate-x-1/2 left-1/2 transition-all scale-0 group-hover:scale-100 origin-bottom rounded-2xl border bg-gray-950 border-gray-700 font-open-sans px-1"}>{name}</span>
      </span>)
  }
interface EmojiListProps {
    readonly serverEmojis: ServerEmojiBody | undefined;
    readonly change: (e: string | null) => void;
    readonly parseServerEmojis?: boolean;
}
export function EmojiList({ serverEmojis, change, parseServerEmojis }: EmojiListProps) {
    const [category, setCategory] = useState(0);
    return <div className={`h-auto flex md:flex-col max-md:py-2`}>
    <span className={"flex max-md:flex-col max-md:h-fit md:self-stretch w-fit items-center md:pr-6 justify-between"}>
      <span onClick={() => setCategory(0)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r max-md:py-0.5"}><Category icon={<BsEmojiSmile/>} name={'Smileys'}/></span>
      <span onClick={() => setCategory(1)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r max-md:py-0.5"}><Category icon={<BsPerson/>} name={'People'}/></span>
      <span onClick={() => setCategory(2)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r max-md:py-0.5"}><Category icon={<PiDog/>} name={'Nature'}/></span>
      <span onClick={() => setCategory(3)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r max-md:py-0.5"}><Category icon={<MdOutlineFastfood/>} name={'Food'}/></span>
      <span onClick={() => setCategory(4)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r max-md:py-0.5"}><Category icon={<BsBuilding/>} name={'Places'}/></span>
      <span onClick={() => setCategory(5)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r max-md:py-0.5"}><Category icon={<MdOutlineSportsBasketball/>} name={'Activities'}/></span>
      <span onClick={() => setCategory(6)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r max-md:py-0.5"}><Category icon={<BsLamp/>} name={'Objects'}/></span>
      <span onClick={() => setCategory(7)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r max-md:py-0.5"}><Category icon={<BsHash/>} name={'Symbols'}/></span>
      <span onClick={() => setCategory(8)} className={"cursor-pointer max-md:border-b max-md:border-r-0 border-r last-of-type:border-0 max-md:py-0.5"}><Category icon={<BsFlag/>} name={'Flags'}/></span>
      {serverEmojis?.emojis.length ? <span onClick={() => setCategory(9)} className={"cursor-pointer last-of-type:border-0 border-r max-md:py-0.5"}><Category icon={serverEmojis.server_icon ? <Image alt={'Server Icon'} width={16} height={16} className={"rounded-xl"} quality={100} src={serverEmojis.server_icon}/> : <BsDiscord/>} name={'Server'}/></span> : <></>}
    </span>

    <ScrollArea className={`flex flex-col gap-1 h-60 self-stretch py-2 font-open-sans`}>
    {<div className={'grid pr-4 grid-cols-9 gap-1 self-stretch flex-1 min-h-full'}>
          {category != 9 ? emojis[category].emojis.map(emoji => <span key={emoji.order} onClick={() => change(emoji.emoji)} className={'cursor-pointer hover:bg-gray-600 p-1 rounded-lg h-fit'}>
              <Suspense fallback={<span className={"bg-gray-600"}>{<BsEmojiSmile className={"animate-pulse"}/>}</span>}>
                {emoji.twemoji}
              </Suspense>
            </span>) :
            serverEmojis?.emojis.map(emoji => <span key={emoji.name} onClick={() => change(parseServerEmojis ? `<:${emoji.name}:${emoji.id}>` : emoji.id)} className={'cursor-pointer hover:bg-gray-600 p-1 rounded-lg h-fit'}>
              <Image alt={emoji.name} width={24} height={24} quality={100} draggable="false" loading="lazy" src={emoji.image}/>
            </span>)}
        </div>}
    </ScrollArea>
    </div>;
}