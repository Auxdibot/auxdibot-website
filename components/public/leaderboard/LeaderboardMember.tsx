import { abbreviateNumber } from '@/lib/abbreviateNumber';
import useSession from '@/lib/hooks/useSession';
import { LeaderboardMemberData } from '@/lib/types/LeaderboardMemberData';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const TROPHIES = ['🥇', '🥈', '🥉'];
export function LeaderboardMember({
    member,
    place,
}: {
    member: LeaderboardMemberData;
    place: number;
}) {
    const session = useSession();
    const [username, setUsername] = useState<string>('Unknown');
    useEffect(() => {
        if (member?.user) {
            setUsername(member.user.username);
        }
    }, [setUsername, member, session]);
    return (
        <span className='mx-auto flex w-full max-w-xl items-center justify-between gap-2 rounded-2xl border-2 border-gray-700 bg-gradient-to-br from-gray-800 to-gray-950 px-4 py-2'>
            <span
                className={`flex flex-1 items-center gap-4 font-raleway text-2xl font-bold ${session?.user?.id == member?.user.id ? 'text-orange-500' : ''}`}
            >
                <span className='max-[360px]:hidden'>
                    {TROPHIES[place] ? TROPHIES[place] : `#${place + 1}`}
                </span>
                {member?.user.avatar ? (
                    <Image
                        src={`https://cdn.discordapp.com/avatars/${member?.user.id}/${member?.user.avatar}.png?size=48`}
                        width={48}
                        height={48}
                        className={'rounded-full max-md:hidden'}
                        alt={`${member?.user.username}'s avatar`}
                    />
                ) : (
                    ''
                )}
                {username.length > 18
                    ? username.slice(0, 16) + '...'
                    : username}
            </span>
            <span className={'flex flex-1 items-center justify-end gap-2'}>
                <span className={'font-roboto text-2xl max-sm:hidden'}>
                    {abbreviateNumber(member?.xp)} XP
                </span>
                <div
                    className='relative h-12 w-12 rounded-full'
                    style={{
                        background: `conic-gradient(orange 0%, red ${(member?.xpTill / member?.nextLevelXP) * 100}%, 0, gray ${100 - (member?.xpTill / member?.nextLevelXP) * 100}%)`,
                    }}
                >
                    <div className='absolute inset-1 flex items-center justify-center rounded-full bg-gray-950'>
                        <span className='font-roboto text-xl'>
                            {member?.level.toLocaleString()}
                        </span>
                    </div>
                </div>
            </span>
        </span>
    );
}
