import { cn } from '@/lib/utils';
import { Input } from './input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select/select';

export default function TimestampBox({
    value,
    onChange,
    className,
}: {
    value: string;
    onChange: (...items: any[]) => any;
    className?: string;
}) {
    const match = value?.match(/\d+|[mhdwMys]/g) ?? [];
    const [time, stamp] = match;
    return (
        <span className={cn('flex w-full items-center', className)}>
            <Input
                className={
                    'w-16 rounded-none border-0 border-r border-gray-700'
                }
                type={'number'}
                min={1}
                value={time}
                onChange={(e) => onChange(e.target.value + (stamp || 'm'))}
            />
            <Select
                value={stamp}
                onValueChange={(e) => onChange((time || 1) + e)}
            >
                <SelectTrigger className={'rounded-none border-0'}>
                    <SelectValue placeholder={'Minutes'} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='s'>Seconds</SelectItem>
                    <SelectItem value='m'>Minutes</SelectItem>
                    <SelectItem value='h'>Hours</SelectItem>
                    <SelectItem value='d'>Days</SelectItem>
                    <SelectItem value='w'>Weeks</SelectItem>
                    <SelectItem value='M'>Months</SelectItem>
                    <SelectItem value='y'>Years</SelectItem>
                </SelectContent>
            </Select>
        </span>
    );
}
