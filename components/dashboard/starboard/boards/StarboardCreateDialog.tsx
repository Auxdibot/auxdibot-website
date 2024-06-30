import { Button } from "@/components/ui/button/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog/dialog";
import EmojiPicker from "@/components/ui/emojis/emoji-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Channels from "@/components/ui/select/channels";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form"
import { useQueryClient } from "react-query";

interface StarboardCreateBody {
    board_name: string;
    channelID: string;
    reaction: string;
    count: number;

}
export function StarboardCreateDialog({ id, onChange }: { readonly id: string, onChange: (...items: any[]) => void }) {
    const { register, control, handleSubmit, reset } = useForm<StarboardCreateBody>({ defaultValues: { board_name: "starboard", channelID: "", count: 5, reaction: "⭐" }});
    const { toast } = useToast();
    const queryClient = useQueryClient();
    function onSubmit(data: StarboardCreateBody) {
        const body = new URLSearchParams();
        body.append("board_name", data.board_name);
        body.append("channelID", data.channelID);
        body.append("reaction", data.reaction);
        body.append("reaction_count", data.count.toString());
        fetch(`/bot/v1/servers/${id}/starboard/boards`, { method: "POST", body }).then(async (res) => {
            const json = await res.json().catch(() =>  undefined);
            if (!json || json['error']) {
                toast({ title: `Failed to create new starboard`, description: json['error'] ? json['error'] : `An error occurred while creating the starboard.`, status: 'error' })
                return;
            }
            toast({ title: `Starboard Created`, description: `The starboard ${data.board_name} was created.`, status: 'success' })
            reset();
            queryClient.invalidateQueries(["data_starboard", id])
            onChange(data.board_name);
        }).catch(() => { });
    }
    return <Dialog>
    <DialogTrigger asChild>
        <Button variant={"ghost"} className='w-9 h-9 p-0 group'><Plus className='w-8 text-gray-600 group-hover:text-gray-200 transition-all'/></Button>
    </DialogTrigger>
    <DialogContent>
        <DialogTitle className="font-normal text-2xl font-montserrat">Create Starboard</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="w-fit">
        <Label>Starboard Name</Label>
        <Input {...register("board_name")} id="board_name" />
        </div>

        <div className="w-fit">
        <Label>Starboard Channel</Label>
        <Controller name="channelID" control={control} render={({ field }) => {
            return <Channels serverID={id} onChange={(e) => field.onChange(e.channel)} value={field.value} required/>;
        }}/>
        </div>
        <div>
        <Label>Reaction & Count</Label>
        <span className='flex gap-2'>
            <Controller name="reaction" control={control} render={({ field }) => {
                return <EmojiPicker serverID={id} onChange={(e) => field.onChange(e.emoji)} value={field.value} />;
            }}/>
            
            <Input type='number' min={1} className='w-16' {...register("count")} required/>
        </span>
        </div>
        <DialogClose><Button variant={"outline"} className="w-fit mx-auto" type="submit"><Plus/> Create</Button></DialogClose>
        </form>
    
    </DialogContent>
</Dialog>
}