import { Button } from '@/components/ui/button/button';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select/select';

export function ServerGroups() {
    return (
        <div className={'flex flex-col gap-2'}>
            <span className={'secondary flex flex-col text-center text-xl'}>
                Server Groups
            </span>
            <p className={'text-center font-open-sans text-sm text-gray-400'}>
                Server Groups allow you to sync settings between your different
                servers! Currently, Server Groups are still unfinished and
                coming soon.
            </p>
            <span
                className={
                    'flex items-center justify-center gap-2 max-sm:flex-col md:gap-5'
                }
            >
                <Select disabled={true}>
                    <SelectTrigger className={'w-36'}>
                        <SelectValue placeholder='Server Group' />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                </Select>
                <Button disabled variant={'default'} type='submit'>
                    Premium Only
                </Button>
            </span>
        </div>
    );
}
