import { CommandType } from "@/lib/types/CommandType";
import { useQuery } from "react-query";
import { Command } from "./command/Command";
import { CommandPermissionData } from "@/lib/types/CommandPermissionData";

export function Commands({ commands, id }: { commands?: CommandType[], id: string }) {

    const { data: permissions } = useQuery<{ data: { command_permissions: CommandPermissionData[] } }>(["data_command_permissions", id], async () => await fetch(`/api/v1/servers/${id}/commands`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined));
    return (<div className={"grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 py-2 gap-4 px-4 mt-8"}>
        {commands?.map((command, index) => {
            return <Command key={index} command={command} data={permissions?.data?.command_permissions?.find((i) => i.command == command.command && (i.group ?? undefined) == command.group && (i.subcommand ?? undefined) == command.subcommand)} id={id} />;
        })}
        </div>);
}