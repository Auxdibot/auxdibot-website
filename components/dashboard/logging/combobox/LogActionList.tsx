import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function LogActionList({
    actions,
    value,
    setOpen,
    onChange,
}: {
    actions?: string[];
    value: string;
    setOpen: (open: boolean) => void;
    onChange: (value: string) => void;
}) {
    return (
        <Command value={value}>
            <CommandInput placeholder='Search log actions...' />
            <CommandEmpty>No log action found.</CommandEmpty>
            <CommandGroup className={'max-h-[300px]'}>
                {actions?.map((action) => (
                    <CommandItem
                        key={action}
                        value={action}
                        className={
                            'flex cursor-pointer items-center gap-2 rounded-md transition-all hover:bg-gray-800'
                        }
                        onSelect={(currentValue) => {
                            onChange(
                                currentValue === value
                                    ? ''
                                    : currentValue.toUpperCase()
                            );
                            setOpen(false);
                        }}
                    >
                        {action
                            .split('_')
                            .map(
                                (i) =>
                                    i.charAt(0).toUpperCase() +
                                    i.slice(1).toLowerCase()
                            )
                            .join(' ')}
                        <Check
                            className={cn(
                                'mr-2 h-4 w-4',
                                value === action ? 'opacity-100' : 'opacity-0'
                            )}
                        />
                    </CommandItem>
                ))}
            </CommandGroup>
        </Command>
    );
}
