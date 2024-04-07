import { CommandType } from "@/lib/types/CommandType";
import { useQuery } from "react-query";
import { Command } from "./command/Command";
import { CommandPermissionData } from "@/lib/types/CommandPermissionData";
import CommandChannel from "./CommandChannel";

export function Commands({ commands, id }: { commands?: CommandType[], id: string }) {

    const { data: permissions } = useQuery<{ data: { command_permissions: CommandPermissionData[], serverID: string, commands_channel?: string } }>(["data_command_permissions", id], async () => await fetch(`/api/v1/servers/${id}/commands`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined));
    return (<>
    {permissions?.data && <div className="mt-8 px-4 flex flex-col gap-1 max-md:items-center">
        <label className={'font-open-sans'}>Commands Channel</label>
            <p className={'text-xs text-gray-400 italic w-fit max-md:text-center'}>Setting a commands channel will only allow Auxdibot users to run commands from that channel. For individual commands, use the &quot;Required Channels&quot; feature.</p>
            <CommandChannel server={permissions?.data}/>
            </div>}
    <div className={"grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 py-2 gap-4 px-4"}>
        {commands?.map((command, index) => {
            return <Command key={index} command={command} data={permissions?.data?.command_permissions?.find((i) => i.command == command.command && (i.group ?? undefined) == command.group && (i.subcommand ?? undefined) == command.subcommand)} id={id} />;
        })}
        </div></>);
}