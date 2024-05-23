"use client";

import { Suspense } from 'react';
import StarboardSelfStar from './StarboardSelfStar';
import StarboardStarStarboard from './StarboardStarStarboard';
import { Separator } from '@/components/ui/separator';

export default function StarboardSettings({ server }: { server: { 
    data: {
        serverID: string, 
        self_star: boolean,
        starboard_star: boolean,
    } 
}}) {

    
    return <>
    <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Starboard Settings</h2>
    <div className={"flex flex-col items-center gap-4 py-3"}>
    <Suspense fallback={null}>
        { server ? <>
            <span className='text-gray-400 text-sm italic text-center'>Change whether users can star their own messages.</span>
            <span className={"flex flex-row gap-2 items-center text-xl font-open-sans"}><StarboardSelfStar server={server} /> Self Starring</span>
            <Separator className='max-w-xs'/>
            <span className='text-gray-400 text-sm italic text-center'>Change whether users can star messages directly through the Starboard channel.</span>
            <span className={"flex flex-row gap-2 items-center text-xl font-open-sans"}><StarboardStarStarboard server={server} /> Starboard Starring</span>
        </> : "" }

    </Suspense>
    
    </div>
    </div>
    </>;
}