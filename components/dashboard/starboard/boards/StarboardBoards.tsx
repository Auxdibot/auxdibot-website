"use client";
import Twemoji from '@/components/ui/emojis/twemoji';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select/select';
import StarboardReactionCount from './StarboardReactionCount';
import StarboardReaction from './StarboardReaction';
import StarboardChannel from './StarboardChannel';
import { emojis } from '@/lib/constants/emojis';
import { StarboardCreateDialog } from './StarboardCreateDialog';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from 'react-query';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/dialog/alert-dialog';


export default function StarboardBoards({ server }: { server: { 
    data: {
        serverID: string, 
        starboard_boards: StarboardData[],
    } 
}}) {
    const [board, setBoard] = useState<string | undefined>(server?.data?.starboard_boards[0]?.board_name)
    const boardData = useMemo(() => server?.data?.starboard_boards?.find((b) => b.board_name == board), [board, server]);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function deleteBoard() {
        console.log(board);
        if (!board) return;
        fetch(`/bot/v1/servers/${server.data.serverID}/starboard/boards`, { method: "DELETE", body: new URLSearchParams({ board_name: board }) }).then(async (data) => {
            const json = await data.json().catch(() => undefined);
            if (!json || json['error']) {
                toast({ title: "Failed to delete board", description: json['error'] ?? "An error occured", status: "error" })
                return
            }
            toast({ title: "Board Deleted", description: `The starboard board ${board} has been deleted.`, status: "success" })
            queryClient.invalidateQueries(["data_starboard", server.data.serverID]);
            setBoard(undefined);
        }).catch(() => undefined);
    }
    return <>
    <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Starboard Boards</h2>
    <div className={"flex flex-col gap-4"}>
    {server?.data &&
    <span className='flex gap-2 px-5 my-2'>
    {board && 
    <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button className='px-1.5' variant={'destructive'}><Trash/></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogTitle>Delete Board</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete the board {board}?</AlertDialogDescription>
            <AlertDialogFooter>
            <AlertDialogAction variant='destructive' onClick={() => deleteBoard()}>
                Delete
            </AlertDialogAction>
            <AlertDialogCancel>
            Cancel
            </AlertDialogCancel>
            </AlertDialogFooter>
            
        </AlertDialogContent>
    </AlertDialog>
    }
    <Select value={board} onValueChange={(val) => setBoard(val)}>
        <SelectTrigger>
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
    <StarboardCreateDialog onChange={(name) => {
        setBoard(name);
    }} id={server.data.serverID}/>
    
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