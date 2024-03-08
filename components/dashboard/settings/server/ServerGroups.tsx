import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select/select";

export function ServerGroups() {
    return <div className={"flex flex-col gap-2"}>
        <span className={"secondary text-xl text-center flex flex-col"}>Server Groups</span>
        <p className={"text-sm text-center text-gray-400 font-open-sans"}>Server Groups allow you to sync settings between your different servers! Currently, Server Groups are still unfinished and coming soon.</p>
        <span className={'flex max-sm:flex-col items-center justify-center gap-2 md:gap-5'}>
        <Select disabled={true}>
            <SelectTrigger className={'w-36'}>
            <SelectValue placeholder="Server Group" />
        </SelectTrigger>
        <SelectContent>

        </SelectContent>
        </Select>
        <Button disabled variant={'default'} type="submit">Premium Only</Button>
        </span>

        </div>
}