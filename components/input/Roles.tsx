import { BsAt, BsX } from "react-icons/bs";
import { useQuery } from "react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
interface RolesInputProps {
    readonly serverID: string;
    readonly onChange: (e: { role?: string }) => void;
    readonly value?: string;
    readonly required?: boolean;
}
export default function Roles({ serverID, onChange, value, required }: RolesInputProps) {
    let { data: roles } = useQuery(["data_roles", serverID], async () => await fetch(`/api/v1/servers/${serverID}/roles`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));
    if (!roles || roles['error']) return <></>;

    return (<span>
      <Select required={required} value={value} onValueChange={(i) => onChange({ role: i ?? '' })}>
      <SelectTrigger className="flex gap-2 items-center">
      <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      
      <SelectContent>
      {!required && <SelectItem className={'group'} value={"null"}><span className={"flex items-center gap-1 group-hover:gap-2 transition-all pl-2"}><BsX/> None</span></SelectItem>}
            {roles?.map((i: { id: string, name: string, color: number }) => i.name != '@everyone' ? <SelectItem className={'group'} key={i.id} value={i.id}><span className={"flex items-center gap-1 group-hover:gap-2 transition-all pl-2"} key={i.id} onClick={() => onChange({ role: i.id })}><BsAt className={"text-xl"} style={{ fill: i.color ? '#' + i.color.toString(16) : '' }} /> {i.name}</span></SelectItem> : "")}
            </SelectContent>
            </Select>
            </span>);
}