import ServerEmojiBody from '@/lib/types/ServerEmojis';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import {
    BsBuilding,
    BsDiscord,
    BsEmojiSmile,
    BsFlag,
    BsHash,
    BsLamp,
    BsPerson,
} from 'react-icons/bs';
import { MdOutlineFastfood, MdOutlineSportsBasketball } from 'react-icons/md';
import { PiDog } from 'react-icons/pi';
import { emojis } from '@/lib/constants/emojis';
import { ScrollArea } from '../scroll-area';

function Category({ name, icon }: { name: string; icon: JSX.Element }) {
    return (
        <span
            className={
                'group relative flex items-center self-stretch p-0.5 px-1 md:px-1.5'
            }
        >
            {icon}
            <span
                className={
                    'absolute left-1/2 z-[60] origin-bottom -translate-x-1/2 -translate-y-8 scale-0 rounded-2xl border border-gray-700 bg-gray-950 px-1 font-open-sans transition-all group-hover:scale-100 max-md:hidden'
                }
            >
                {name}
            </span>
        </span>
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
    return (
        <div className={`flex h-auto max-md:py-2 md:flex-col`}>
            <span
                className={
                    'flex w-fit items-center justify-between max-md:h-fit max-md:flex-col md:self-stretch md:pr-6'
                }
            >
                <span
                    onClick={() => setCategory(0)}
                    className={
                        'cursor-pointer border-r max-md:border-b max-md:border-r-0 max-md:py-0.5'
                    }
                >
                    <Category icon={<BsEmojiSmile />} name={'Smileys'} />
                </span>
                <span
                    onClick={() => setCategory(1)}
                    className={
                        'cursor-pointer border-r max-md:border-b max-md:border-r-0 max-md:py-0.5'
                    }
                >
                    <Category icon={<BsPerson />} name={'People'} />
                </span>
                <span
                    onClick={() => setCategory(2)}
                    className={
                        'cursor-pointer border-r max-md:border-b max-md:border-r-0 max-md:py-0.5'
                    }
                >
                    <Category icon={<PiDog />} name={'Nature'} />
                </span>
                <span
                    onClick={() => setCategory(3)}
                    className={
                        'cursor-pointer border-r max-md:border-b max-md:border-r-0 max-md:py-0.5'
                    }
                >
                    <Category icon={<MdOutlineFastfood />} name={'Food'} />
                </span>
                <span
                    onClick={() => setCategory(4)}
                    className={
                        'cursor-pointer border-r max-md:border-b max-md:border-r-0 max-md:py-0.5'
                    }
                >
                    <Category icon={<BsBuilding />} name={'Places'} />
                </span>
                <span
                    onClick={() => setCategory(5)}
                    className={
                        'cursor-pointer border-r max-md:border-b max-md:border-r-0 max-md:py-0.5'
                    }
                >
                    <Category
                        icon={<MdOutlineSportsBasketball />}
                        name={'Activities'}
                    />
                </span>
                <span
                    onClick={() => setCategory(6)}
                    className={
                        'cursor-pointer border-r max-md:border-b max-md:border-r-0 max-md:py-0.5'
                    }
                >
                    <Category icon={<BsLamp />} name={'Objects'} />
                </span>
                <span
                    onClick={() => setCategory(7)}
                    className={
                        'cursor-pointer border-r max-md:border-b max-md:border-r-0 max-md:py-0.5'
                    }
                >
                    <Category icon={<BsHash />} name={'Symbols'} />
                </span>
                <span
                    onClick={() => setCategory(8)}
                    className={
                        'cursor-pointer border-r last-of-type:border-0 max-md:border-b max-md:border-r-0 max-md:py-0.5'
                    }
                >
                    <Category icon={<BsFlag />} name={'Flags'} />
                </span>
                {serverEmojis?.emojis.length ? (
                    <span
                        onClick={() => setCategory(9)}
                        className={
                            'cursor-pointer border-r last-of-type:border-0 max-md:py-0.5'
                        }
                    >
                        <Category
                            icon={
                                serverEmojis.server_icon ? (
                                    <Image
                                        alt={'Server Icon'}
                                        width={16}
                                        height={16}
                                        className={'rounded-xl'}
                                        quality={100}
                                        src={serverEmojis.server_icon}
                                    />
                                ) : (
                                    <BsDiscord />
                                )
                            }
                            name={'Server'}
                        />
                    </span>
                ) : (
                    <></>
                )}
            </span>

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
                            ? emojis[category].emojis.map((emoji) => (
                                  <span
                                      key={emoji.order}
                                      onClick={() => change(emoji.emoji)}
                                      className={
                                          'h-fit cursor-pointer rounded-lg p-1 hover:bg-gray-600'
                                      }
                                  >
                                      <Suspense
                                          fallback={
                                              <span className={'bg-gray-600'}>
                                                  {
                                                      <BsEmojiSmile
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
                            : serverEmojis?.emojis.map((emoji) => (
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
    );
}
