import { BsHash, BsX } from "react-icons/bs";
import { useQuery } from "react-query";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue  } from "../ui/select";
interface ChannelsInputProps {
    readonly serverID: string;
    readonly onChange: (e: { channel: string | undefined }) => void;
    readonly required?: boolean;
    readonly value?: string;
}
type ChannelsType = {
    id: string;
    name: string;
    type: number;
    parentId: string | null;
    rawPosition: number;
}
export default function Channels({ serverID, onChange, value, required }: ChannelsInputProps) {
    let { data: channels } = useQuery<ChannelsType[]>(["data_channels", serverID], async () => await fetch(`/api/v1/servers/${serverID}/channels`).then(async (data) => 
    await data.json().catch(() => undefined)).catch(() => undefined));

    if (!channels || 'error' in channels ) return <></>;
    const data = channels.filter((i) => [0,5].includes(i.type)).reduce((acc: (ChannelsType & { children: ChannelsType[]})[], i) => {
      const parent = acc.find((c) => i.parentId ? c.id === i.parentId : c.id === "");
        if (!parent) {
          if (!i.parentId)  {
            acc.push({ id: "", name: "", parentId: "", type: 4, rawPosition: -1, children: [i] });
          } else {
          const dataParent = channels?.find((c) => c.id === i.parentId);
          if (dataParent) acc.push({ ...dataParent, children: [i] });
          }
        } else {
          parent.children.push(i);
        }

        return acc;
    }, []);

    return (<span>
            <Select required={required} value={value} onValueChange={(i) => onChange({ channel: i ?? '' })}>
            <SelectTrigger className="flex gap-2 items-center">
            <SelectValue placeholder="Select a channel" />
            </SelectTrigger>
            
            <SelectContent>
            {!required && <SelectItem className={'group'} value={"null"}><span className={"flex items-center gap-1 group-hover:gap-2 transition-all pl-2"}><BsX/> None</span></SelectItem>}
            {data?.sort((a,b) => a.rawPosition-b.rawPosition).map((i) => {
              return (<>
                {i.name && <h2 className={"uppercase text-xs font-bold font-roboto pl-1 my-1"}>{i.name}</h2>}
                {i.children.map((c) => <SelectItem className={'group'} key={c.id} value={c.id}><span className={"flex items-center gap-1 group-hover:gap-2 transition-all pl-2"}><BsHash/> {c.name}</span></SelectItem>)}
              </>)
            })}
            </SelectContent>
            </Select>
            </span>);
}