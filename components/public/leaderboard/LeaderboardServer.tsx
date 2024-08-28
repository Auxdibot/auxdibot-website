import { PublicServerData } from '@/lib/types/PublicServerData';
import Image from 'next/image';

export function LeaderboardServer({ server }: { server: PublicServerData }) {
    return (
        <div className='mb-40 w-full overflow-visible'>
            <div className='relative flex'>
                <span className='mb-42 mx-auto mt-10 h-96 w-full max-w-[95%] overflow-hidden rounded-2xl border-4 border-gray-700 max-lg:h-64 max-sm:h-48 max-[360px]:h-32'>
                    {server.banner_url ? (
                        <Image
                            src={server.banner_url}
                            width={0}
                            height={0}
                            sizes='100vw'
                            style={{ width: '100%', height: 'auto' }}
                            className='bg-black object-cover'
                            alt={server.name}
                        />
                    ) : (
                        <span className='w-full self-stretch bg-gray-800/70' />
                    )}
                </span>

                {server.icon_url ? (
                    <Image
                        src={server.icon_url}
                        width={0}
                        height={0}
                        sizes='100vw'
                        className='absolute -bottom-44 left-24 h-64 w-64 rounded-full border-8 border-gray-700 bg-black object-cover max-lg:-bottom-32 max-lg:left-1/2 max-lg:h-48 max-lg:w-48 max-lg:-translate-x-1/2 max-sm:-bottom-20 max-sm:h-32 max-sm:w-32 max-[360px]:-bottom-16'
                        alt={server.name}
                    />
                ) : (
                    <div className='absolute -bottom-44 left-24 flex h-64 w-64 items-center justify-center rounded-full border-8 border-gray-700 bg-black object-cover font-roboto text-6xl max-lg:-bottom-32 max-lg:left-1/2 max-lg:h-48 max-lg:w-48 max-lg:-translate-x-1/2 max-lg:text-5xl max-sm:-bottom-24 max-sm:h-32 max-sm:w-32 max-sm:text-2xl'>
                        {server.acronym}
                    </div>
                )}
                <div className='absolute -bottom-28 left-96 flex flex-col gap-2 max-lg:-bottom-80 max-lg:left-1/2 max-lg:h-56 max-lg:w-full max-lg:-translate-x-1/2 max-lg:pt-8 max-lg:text-center max-sm:pt-0'>
                    <h1 className='font-raleway text-5xl font-bold max-lg:text-center'>
                        {server.name}
                    </h1>
                    <span className='font-roboto text-3xl font-light'>
                        {server.members} members
                    </span>
                </div>
            </div>
        </div>
    );
}
