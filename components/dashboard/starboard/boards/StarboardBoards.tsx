"use client";
import Twemoji from '@/components/ui/emojis/twemoji';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select/select';
import StarboardReactionCount from './StarboardReactionCount';
import StarboardReaction from './StarboardReaction';
import StarboardChannel from './StarboardChannel';
import { emojis } from '@/lib/constants/emojis';
import { StarboardCreateDialog } from './StarboardCreateDialog';
import { useMemo, useState } from 'react';


export default function StarboardBoards({ server }: { server: { 
    data: {
        serverID: string, 
        starboard_boards: StarboardData[],
    } 
}}) {
    const [board, setBoard] = useState(server?.data?.starboard_boards[0]?.board_name)
    const boardData = useMemo(() => server?.data?.starboard_boards?.find((b) => b.board_name == board), [board, server]);
    
    return <>
    <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Starboard Boards</h2>
    <div className={"flex flex-col gap-4"}>
    {server?.data &&
    <span className='flex gap-2 px-5'>
    <Select value={board} onValueChange={(val) => setBoard(val)}>
        <SelectTrigger className='rounded-none border-2'>
            <SelectValue/>
        </SelectTrigger>
        <SelectContent>
            {server.data.starboard_boards.map((b, index) => {
                const emojiValue = emojis.find((i) => i.emojis.find((emoji) => emoji.emoji == b.reaction))?.emojis.find((emoji) => emoji.emoji == b.reaction);
                return <SelectItem value={b.board_name} key={index}><span className='flex gap-2 items-center font-open-sans'><Twemoji className='w-4' serverID={server.data.serverID}>{emojiValue?.hexcode?.toLowerCase() ?? b.reaction}</Twemoji> {b.board_name}</span></SelectItem>
            })}
        </SelectContent>
        {

        }
    </Select>
    <StarboardCreateDialog id={server.data.serverID}/>
    
    </span>
   }
   {
    boardData && <div>
    <StarboardReactionCount id={server.data.serverID} board={boardData}/>
    <StarboardReaction id={server.data.serverID} board={boardData}/>
    <StarboardChannel id={server.data.serverID} board={boardData}/>
    </div>
   }
    
    </div>
    </div>
    </>;
}