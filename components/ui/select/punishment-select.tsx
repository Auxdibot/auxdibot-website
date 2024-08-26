import { PunishmentNames } from '@/lib/constants/PunishmentNames';
import { PunishmentType } from '@/lib/types/PunishmentType';
import { useEffect, useRef, useState } from 'react';
import { BsX } from 'react-icons/bs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select';
interface PunishmentSelectProps {
    readonly onChange: (e: { type: PunishmentType | null }) => void;
    readonly value: PunishmentType | null;
    readonly required?: boolean;
    readonly disable?: PunishmentType[];
    readonly className?: string;
}
export default function PunishmentSelect({
    onChange,
    value,
    required,
    disable,
    className,
}: PunishmentSelectProps) {
    const [collapsed, setCollapsed] = useState(true);
    const inputRef = useRef<HTMLSpanElement | null>(null);
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
            if (
                !collapsed &&
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            )
                setCollapsed(true);
        };
        document.addEventListener('mousedown', clickedOutside);
        return () => document.removeEventListener('mousedown', clickedOutside);
    }, [collapsed]);
    function change(type: PunishmentType | null) {
        setCollapsed(!collapsed);
        onChange({ type: type });
    }
    return (
        <Select
            value={value?.toString()}
            onValueChange={(val) => change(val as PunishmentType)}
        >
            <SelectTrigger className={className}>
                <SelectValue placeholder='Select a channel' />
            </SelectTrigger>

            <SelectContent>
                {required ? (
                    <SelectItem className={'group'} value={'null'}>
                        <span
                            className={
                                'flex items-center gap-1 pl-2 transition-all group-hover:gap-2'
                            }
                        >
                            <BsX /> None
                        </span>
                    </SelectItem>
                ) : (
                    ''
                )}
                {Object.keys(PunishmentNames)
                    .filter(
                        (i) =>
                            !disable || !disable.includes(i as PunishmentType)
                    )
                    .map((i: string) => (
                        <SelectItem className={'group'} key={i} value={i}>
                            <span
                                className={
                                    'flex w-full cursor-pointer items-center gap-2 transition-all hover:gap-3'
                                }
                            >
                                {PunishmentNames[i as PunishmentType].icon}
                                {PunishmentNames[i as PunishmentType].name}
                            </span>
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
}
