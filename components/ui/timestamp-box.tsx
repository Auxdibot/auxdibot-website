import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select/select";


export default function TimestampBox({ value, onChange, className }: { value: string, onChange: (...items: any[]) => any, className?: string }) {
    const match = value?.match(/\d+|[mhdwMys]/g) ?? [];
    console.log(value);
    console.log(match);
    const [time, stamp] = match;
    console.log(stamp);
    return <span className={cn("flex items-center w-full", className)}>
        <Input className={'border-0 rounded-none border-r border-gray-700 w-16'} type={"number"} min={1} value={time} onChange={(e) => onChange(e.target.value + (stamp || 'm'))} />
        <Select value={stamp} onValueChange={(e) => onChange((time || 1) + e)}>
            <SelectTrigger className={'border-0 rounded-none'}>
                <SelectValue placeholder={"Minutes"} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="s">Seconds</SelectItem>
                <SelectItem value="m">Minutes</SelectItem>
                <SelectItem value="h">Hours</SelectItem>
                <SelectItem value="d">Days</SelectItem>
                <SelectItem value="w">Weeks</SelectItem>
                <SelectItem value="M">Months</SelectItem>
                <SelectItem value="y">Years</SelectItem>
            </SelectContent>
        </Select>
    </span>
}