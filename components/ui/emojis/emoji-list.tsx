import ServerEmojiBody from '@/lib/types/ServerEmojis';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import { emojis } from '@/lib/constants/emojis';
import { ScrollArea } from '../scroll-area';
import { Input } from '../input';
import {
    Building,
    Dog,
    Dumbbell,
    Flag,
    Hash,
    Lamp,
    Smile,
    User,
    Utensils,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { DiscordLogoIcon } from '@radix-ui/react-icons';

function Category({ name, icon }: { name: string; icon: JSX.Element }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{icon}</TooltipTrigger>
            <TooltipContent>{name}</TooltipContent>
        </Tooltip>
    );
}
interface EmojiListProps {
    readonly serverEmojis: ServerEmojiBody | undefined;
    readonly change: (e: string | null) => void;
    readonly parseServerEmojis?: boolean;
}
export function EmojiList({
    serverEmojis,
    change,
    parseServerEmojis,
}: EmojiListProps) {
    const [category, setCategory] = useState(0);
    const [q, setQuery] = useState('');
    return (
        <div className={`flex h-auto max-md:py-2 md:min-w-[346px] md:flex-col`}>
            <span
                className={
                    'flex items-center justify-between self-stretch border-gray-600/50 max-md:mr-2 max-md:flex-col max-md:border-r max-md:pl-2 max-md:pr-2 md:w-full md:border-b md:px-4 md:py-2'
                }
            >
                <span
                    onClick={() => setCategory(0)}
                    className={'cursor-pointer max-md:py-0.5'}
                >
                    <Category icon={<Smile size='20' />} name={'Smileys'} />
                </span>
                <span
                    onClick={() => setCategory(1)}
                    className={'cursor-pointer max-md:py-0.5'}
                >
                    <Category icon={<User size='20' />} name={'People'} />
                </span>
                <span
                    onClick={() => setCategory(2)}
                    className={'cursor-pointer max-md:py-0.5'}
                >
                    <Category icon={<Dog size='20' />} name={'Nature'} />
                </span>
                <span
                    onClick={() => setCategory(3)}
                    className={'cursor-pointer max-md:py-0.5'}
                >
                    <Category icon={<Utensils size='20' />} name={'Food'} />
                </span>
                <span
                    onClick={() => setCategory(4)}
                    className={'cursor-pointer max-md:py-0.5'}
                >
                    <Category icon={<Building size='20' />} name={'Places'} />
                </span>
                <span
                    onClick={() => setCategory(5)}
                    className={'cursor-pointer max-md:py-0.5'}
                >
                    <Category
                        icon={<Dumbbell size='20' />}
                        name={'Activities'}
                    />
                </span>
                <span
                    onClick={() => setCategory(6)}
                    className={'cursor-pointer max-md:py-0.5'}
                >
                    <Category icon={<Lamp size='20' />} name={'Objects'} />
                </span>
                <span
                    onClick={() => setCategory(7)}
                    className={'cursor-pointer max-md:py-0.5'}
                >
                    <Category icon={<Hash size='20' />} name={'Symbols'} />
                </span>
                <span
                    onClick={() => setCategory(8)}
                    className={'cursor-pointer max-md:py-0.5'}
                >
                    <Category icon={<Flag size='20' />} name={'Flags'} />
                </span>

                {serverEmojis?.emojis.length ? (
                    <span
                        onClick={() => setCategory(9)}
                        className={'relative cursor-pointer max-md:py-0.5'}
                    >
                        <Category
                            icon={
                                serverEmojis?.server_icon ? (
                                    <Image
                                        alt={'Server Icon'}
                                        width={20}
                                        height={20}
                                        className={'rounded-xl'}
                                        quality={100}
                                        src={serverEmojis?.server_icon}
                                    />
                                ) : (
                                    <DiscordLogoIcon
                                        width={'20'}
                                        height={'20'}
                                    />
                                )
                            }
                            name={'Server'}
                        />
                    </span>
                ) : (
                    <></>
                )}
            </span>
            <div className={'flex-shrink-0 flex-grow max-md:pr-2'}>
                <Input
                    value={q}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={'Search...'}
                    className={'my-2 self-stretch'}
                />
                <ScrollArea
                    className={`flex h-60 flex-col gap-1 self-stretch py-2 font-open-sans`}
                >
                    {
                        <div
                            className={
                                'grid min-h-full flex-1 grid-cols-9 gap-1 self-stretch pr-4'
                            }
                        >
                            {category != 9
                                ? emojis[category].emojis
                                      .filter((i) => {
                                          if (q.length == 0) return true;
                                          return i.annotation
                                              .replaceAll('_', ' ')
                                              .includes(q);
                                      })
                                      .map((emoji) => (
                                          <span
                                              key={emoji.order}
                                              onClick={() =>
                                                  change(emoji.emoji)
                                              }
                                              className={
                                                  'h-fit cursor-pointer rounded-lg p-1 hover:bg-gray-600'
                                              }
                                          >
                                              <Suspense
                                                  fallback={
                                                      <span
                                                          className={
                                                              'bg-gray-600'
                                                          }
                                                      >
                                                          {
                                                              <Smile
                                                                  size='20'
                                                                  className={
                                                                      'animate-pulse'
                                                                  }
                                                              />
                                                          }
                                                      </span>
                                                  }
                                              >
                                                  {emoji.twemoji}
                                              </Suspense>
                                          </span>
                                      ))
                                : serverEmojis?.emojis
                                      .filter((i) => {
                                          if (q.length == 0) return true;
                                          return i.name.includes(q);
                                      })
                                      .map((emoji) => (
                                          <span
                                              key={emoji.name}
                                              onClick={() =>
                                                  change(
                                                      parseServerEmojis
                                                          ? `<:${emoji.name}:${emoji.id}>`
                                                          : emoji.id
                                                  )
                                              }
                                              className={
                                                  'h-fit cursor-pointer rounded-lg p-1 hover:bg-gray-600'
                                              }
                                          >
                                              <Image
                                                  alt={emoji.name}
                                                  width={24}
                                                  height={24}
                                                  quality={100}
                                                  draggable='false'
                                                  loading='lazy'
                                                  src={emoji.image}
                                              />
                                          </span>
                                      ))}
                        </div>
                    }
                </ScrollArea>
            </div>
        </div>
    );
}
