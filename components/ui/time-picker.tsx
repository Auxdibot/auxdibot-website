import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select/select";
import { cn } from "@/lib/utils";

export function TimePicker({ value, onChange, className }: { value?: Date | undefined, onChange: (...args: any[]) => void, className?: string }) {

    return (<span>
        <div className={cn('flex items-center gap-2', className)}>

            <Input className={'w-16'} value={((value?.getHours() ?? 0) % 12 || 12).toString().padStart(2, '0')} onChange={(e) => {
                const date = new Date(value?.valueOf() ?? Date.now());
                date.setSeconds(0);
                if (parseInt(e.target.value) > 23 || parseInt(e.target.value) <= 0) return;
                date.setHours(parseInt(e.target.value));
                onChange(date);
            }} type={'number'}></Input>
            :
            <Input className={'w-16'} value={(value?.getMinutes() ?? 0).toString().padStart(2, '0')} onChange={(e) => {
                const date = new Date(value?.valueOf() ?? Date.now());
                date.setSeconds(0);
                if (parseInt(e.target.value) > 59 || parseInt(e.target.value) <= 0) return;

                date.setMinutes(parseInt(e.target.value));
                onChange(date);
            }} type={'number'}></Input>
            <Select value={(value?.getHours() ?? 0) >= 12 ? 'PM' : 'AM'} onValueChange={(e) => {
                const date = new Date(value?.valueOf() ?? Date.now());
                date.setSeconds(0);

                if (e == 'PM' && date.getHours() < 12) date.setHours((date.getHours() % 12) + 12);
                else if (e == 'AM' && date.getHours() >= 12 ) date.setHours((date.getHours() % 12));

                onChange(date);
            }}>
                <SelectTrigger className={'w-16'}>
                <span>{(value?.getHours() ?? 0) >= 12 ? 'PM' : 'AM'}</span>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={'AM'}>AM</SelectItem>
                    <SelectItem value={'PM'}>PM</SelectItem>
                    
                </SelectContent>
            </Select>
            
        </div>
    </span>)
}