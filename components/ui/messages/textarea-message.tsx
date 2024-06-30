import * as React from "react"


import { Textarea } from "../textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../dropdown-menu";
import { BsAt, BsClock, BsEmojiSmile, BsHash, BsPercent, BsPlus } from "react-icons/bs";
import { Button } from "../button/button";
import { cn } from "@/lib/utils";
import { useQuery } from "react-query";
import { sortChannels } from "@/lib/sortChannels";
import { ScrollArea } from "../scroll-area";

import { useMediaQuery } from "react-responsive";
import { Drawer, DrawerContent, DrawerTrigger } from "../drawer";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../command";
import { APIRole } from "discord-api-types/v10";
import { EmojiList } from "../emojis/emoji-list";
import ServerEmojiBody from "@/lib/types/ServerEmojis";


export interface TextareaMessageProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    readonly serverID?: string;
    readonly wrapperClass?: string;
    readonly placeholderContext?: string | string[];
  }

function TextareaMessage({ className, serverID, wrapperClass, placeholderContext, ...props }: TextareaMessageProps) {
  const { data: channelsRes } = useQuery(["channels", serverID], async () => await fetch(`/bot/v1/servers/${serverID}/channels`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined));
  const { data: roles } = useQuery<APIRole[]>(["roles", serverID], async () => await fetch(`/bot/v1/servers/${serverID}/roles`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined));
  const { data: placeholdersRes } = useQuery<{placeholders: {[k: string]: { context: string | null, description?: string }} }>(["placeholders", serverID], async () => await fetch(`/bot/v1/placeholders?${Array.isArray(placeholderContext) ? placeholderContext.map((i) => `context=${i}`, '').join('&') : `context=${placeholderContext ?? 'null'}`}`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined));
  const { data: serverEmojis } = useQuery<ServerEmojiBody | undefined>(["data_emojis", serverID], async () => serverID && await fetch(`/bot/v1/servers/${serverID}/emojis`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined));
  
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  


  const channels = !channelsRes || channelsRes['error'] ? [] : sortChannels(channelsRes);
  const placeholders = placeholdersRes?.placeholders ? Object.keys(placeholdersRes.placeholders) : [];
  function addText(text: string) {
    if (props.onChange) {
      props.onChange({ target: { value: (props.value ?? '') + text } } as any);
    }
  }

  return (<span className={cn('relative min-h-[100px] max-md:px-2', wrapperClass)}><div className={cn('relative min-h-[100px] max-md:px-2', className)}>
    <Textarea
      className={cn('min-h-[100px] resize-none', className)}
      {...props}
      
    />
    <div className={'absolute bottom-0 right-4 max-md:right-5 p-2'}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <BsPlus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'overflow-visible'}>
          <DropdownMenuLabel>Chat Components</DropdownMenuLabel>
          <DropdownMenuSeparator/> 
          <DropdownMenuGroup className={"flex flex-col items-start"}>


              {isDesktop ? <DropdownMenuSub>
                <DropdownMenuSubTrigger className={'w-full gap-1'}>
                  <BsHash/> Channels
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                  <ScrollArea className={'h-60  '}>
                  <div className={' pr-6'}>
                  {channels?.sort((a,b) => a.rawPosition-b.rawPosition).map((i) => {
                  return (<>
                    {i.name && <DropdownMenuLabel className={"uppercase text-xs font-bold font-roboto pl-1 my-1"}>{i.name}</DropdownMenuLabel>}
                    {i.children.map((c) => <DropdownMenuItem className={'group'} key={c.id} onClick={() => addText(`<#${c.id}>`)}><span className={"flex items-center gap-1 group-hover:gap-2 transition-all pl-2"}><BsHash/> {c.name}</span></DropdownMenuItem>)}
                  </>)
                  })}
                  </div>
                  </ScrollArea>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub> :
              (<Drawer>
              <DrawerTrigger asChild>
              <Button className={'w-full p-0 justify-start pl-2 gap-1'} variant={'link'}>
                  <BsHash/> Channels
                </Button>
              </DrawerTrigger>
              <DrawerContent className="w-full p-0">
              <Command>
              <CommandInput placeholder="Search channels..." />
              <CommandEmpty>No channels found.</CommandEmpty>
              <CommandGroup className={"max-h-[300px]"}>
              {channels?.sort((a,b) => a.rawPosition-b.rawPosition).map((i) => {
                  return (<>
                    {i.children.map((c) => <CommandItem
                    key={c.name}
                    value={c.name}
                    className={"flex items-center gap-2 hover:bg-gray-800 transition-all rounded-md cursor-pointer"}
                      onSelect={() => {
                          addText(`<#${c.id}>`);
                      }}
                    >
                      <BsHash/> {c.name}
                    </CommandItem>)}
                  </>)
                  })}
    </CommandGroup>
              </Command>
              </DrawerContent>
            </Drawer>)}


            {isDesktop ? <DropdownMenuSub>
                <DropdownMenuSubTrigger className={'w-full gap-1'}>
                  <BsAt/> Roles
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                  <ScrollArea className={'h-60  '}>
                  <div className={' pr-6'}>
                  {roles?.map && roles?.map((i) => <DropdownMenuItem className={'gap-2 items-center flex'} key={i.id} onClick={() => addText(`<@&${i.id}>`)}><BsAt style={{ color: i.color ? '#' + i.color.toString(16) : ''}}/>{i.name}</DropdownMenuItem>)}
                  </div>
                  </ScrollArea>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub> :
              (<Drawer>
              <DrawerTrigger asChild>
              <Button className={'w-full p-0 justify-start pl-2 gap-1'} variant={'link'}>
                  <BsAt/> Roles
                </Button>
              </DrawerTrigger>
              <DrawerContent className="w-full p-0">
              <Command>
              <CommandInput placeholder="Search roles..." />
              <CommandEmpty>No roles found.</CommandEmpty>
              <CommandGroup className={"max-h-[300px]"}>
              {roles?.sort && roles?.sort((a,b) => a.position-b.position).map((i) => <CommandItem
                    key={i.name}
                    value={i.name}
                    className={"flex items-center gap-2 hover:bg-gray-800 transition-all rounded-md cursor-pointer"}
                      onSelect={() => {
                          addText(`<@&${i.id}>`);
                      }}
                    >
                      <BsAt style={{ color: i.color ? '#' + i.color.toString(16) : ''}}/>{i.name}
                    </CommandItem>)}

    </CommandGroup>
              </Command>
              </DrawerContent>
            </Drawer>)}


            {isDesktop ? <DropdownMenuSub>
                <DropdownMenuSubTrigger className={'w-full gap-1'}>
                  <BsPercent/> Placeholders
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                  <ScrollArea className={'h-60  '}>
                  <div className={' pr-6'}>
                  {placeholders?.map && placeholders?.map((i: string) => <DropdownMenuItem className={'gap-2 items-center flex'} key={i} onClick={() => addText(`{%${i}%}`)}>{i.split('_').map((i) => i[0].toUpperCase() + i.slice(1).toLowerCase()).join(' ')}</DropdownMenuItem>)}
                  </div>
                  </ScrollArea>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub> :
              (<Drawer>
              <DrawerTrigger asChild>
              <Button className={'w-full p-0 justify-start pl-2 gap-1'} variant={'link'}>
                  <BsPercent/> Placeholders
                </Button>
              </DrawerTrigger>
              <DrawerContent className="w-full p-0">
              <Command>
              <CommandInput placeholder="Search placeholders..." />
              <CommandEmpty>No placeholders found.</CommandEmpty>
              <CommandGroup className={"max-h-[300px]"}>
              {placeholders?.map && placeholders.map((i: string) => <CommandItem
                    key={i}
                    value={i}
                    className={"flex items-center gap-2 hover:bg-gray-800 transition-all rounded-md cursor-pointer"}
                      onSelect={() => {
                          addText(`{%${i}%}`);
                      }}
                    >
                    {i.split('_').map((i) => i[0].toUpperCase() + i.slice(1).toLowerCase()).join(' ')}
                    </CommandItem>)}
                      
    </CommandGroup>
              </Command>
              </DrawerContent>
            </Drawer>)}
            {isDesktop ?  <DropdownMenuSub>
                <DropdownMenuSubTrigger className={'w-full gap-1 overflow-visible'}>
                  <BsEmojiSmile/> Emojis
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className={'overflow-visible'}>
                  <EmojiList parseServerEmojis serverEmojis={serverEmojis} change={(e) => addText(e ?? '')}/>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub> :
              (<Drawer>
                <DrawerTrigger asChild>
                <Button className={'w-full p-0 justify-start pl-2 gap-1'} variant={'link'}>
                    <BsEmojiSmile/> Emojis
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="w-full p-0">
                  <EmojiList parseServerEmojis serverEmojis={serverEmojis} change={(e) => addText(e ?? '')}/>
                </DrawerContent>
              </Drawer>)}

          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuItem className={'gap-2'} onClick={() => addText(`<t:${Math.round(Date.now()/1000)}>`)}><BsClock/> Add Current Time</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    </div>
    {props.maxLength ? <span className={'my-2 pl-2 text-sm text-gray-400 '}>{props.value?.toString().length ?? 0}/{props.maxLength}</span> : ""}
    </span>
  )
}
TextareaMessage.displayName = "TextareaMessage"

export { TextareaMessage }
