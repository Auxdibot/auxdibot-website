"use client";

import { useQuery, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import Channels from "@/components/ui/select/channels";
import { Channel } from "@/components/ui/channel";
import { BsTrash } from "react-icons/bs";

export default function RequiredChannels({ id, command, subcommand, required }: { readonly id: string, readonly command: string, readonly subcommand?: string[], readonly required: string[] }) {
    const { data: channels } = useQuery(["data_channels", id], async () => {
        const res = await fetch(`/bot/v1/servers/${id}/channels`);
        return await res.json();
    });

    const { toast } = useToast();
    const queryClient = useQueryClient();
    function submit(channel: string) {
        let body = new URLSearchParams();

        body.append('command', command + (subcommand ? " " + subcommand.join(" ") : ""));
        body.append('channel', channel ?? '');

        fetch(`/bot/v1/servers/${id}/commands/channels`, { method: 'PATCH', body }).then(async (res) => {
            const json = await res.json().catch(() => undefined);
            queryClient.invalidateQueries(["data_command_permissions", id])
            if (!json || json['error']) {
                toast({ title: 'Failed to add required channel', description: json?.error ?? 'An error occurred while adding a required channel.', status: 'error' })
                return;
            }
            toast({ title: 'Added RequiredCchannel', description: `The command "/${command + " " + subcommand?.join(' ')}" can exclusively be used in the channel #${channels?.find((i: { id: string, name: string }) => i.id == channel)?.name ?? 'Unknown'} and other specified required channels.`, status: 'success' })

        }).catch(() => {})
    }
    function deleteChannel(channel: string) {
        let body = new URLSearchParams();

        body.append('command', command + (subcommand ? " " + subcommand.join(" ") : ""));
        body.append('channel', channel ?? '');

        fetch(`/bot/v1/servers/${id}/commands/channels`, { method: 'DELETE', body }).then(async (res) => {
            const json = await res.json().catch(() => undefined);
            queryClient.invalidateQueries(["data_command_permissions", id])
            if (!json || json['error']) {
                toast({ title: 'Failed to remove required channel', description: json?.error ?? 'An error occurred while removing a required channel.', status: 'error' })
                return;
            }
            toast({ title: 'Removed Required Channel', description: `The command "/${command + " " + subcommand?.join(' ')}" is now longer required to be used in the channel #${channels?.find((i: { id: string, name: string }) => i.id == channel)?.name ?? 'Unknown'}.`, status: 'success' })

        }).catch(() => {})
    }
    return <>
    <Channels serverID={id} onChange={({ channel }) => channel && submit(channel)} required value={""} />
    {required && required.length > 0 ? <ul className={"flex flex-col justify-center items-center my-4 gap-1 border border-gray-800 p-2 w-fit mx-auto rounded-2xl"}>
        {required.map((i, index) => <span className={"flex gap-2 items-center"} key={index}><Channel channelID={i} serverID={id} key={i}/>
        <span className={"secondary text-xl text-gray-300 flex flex-row items-center gap-2"}><button className={"border border-gray-700 text-gray-600 rounded-2xl w-fit p-1 hover-gradient transition-all hover:text-black hover:border-black text-xl"} onClick={() => deleteChannel(i)}><BsTrash/></button></span></span>)} 
    </ul> : <span className={"text-gray-400 font-open-sans text-center"}>No required channels found.</span>}
    </>;
}