import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

interface LogProps {
    actions?: string[];
    value: string;
    onChange: (value: string) => void;
}
export function LogCombobox({ actions, value, onChange }: LogProps) {

    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
    if (isDesktop) {
    return (<Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {value
              ? actions?.find((action) => action === value)?.split('_').map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase()).join(' ')
              : "Select a log action..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <LogActionList actions={actions} value={value} setOpen={setOpen} onChange={onChange} />
        </PopoverContent>
      </Popover>)
    }
    return (<Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {value
              ? actions?.find((action) => action === value)?.split('_').map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase()).join(' ')
              : "Select a log action..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-full h-[300px] p-0">
          <LogActionList actions={actions} value={value} setOpen={setOpen} onChange={onChange} />
        </DrawerContent>
      </Drawer>)
}
function LogActionList({ actions, value, setOpen, onChange }: { actions?: string[], value: string, setOpen: (open: boolean) => void, onChange: (value: string) => void }) {
    return (<Command value={value}>
        <CommandInput placeholder="Search log actions..." />
        <CommandEmpty>No log action found.</CommandEmpty>
        <CommandGroup className={"max-h-[300px]"}>
          {actions?.map((action) => (
            <CommandItem
              key={action}
              value={action}
              className={"flex items-center gap-2"}
              onSelect={(currentValue) => {
                onChange(currentValue === value ? "" : currentValue.toUpperCase())
                setOpen(false)
              }}
            >
              {action.split('_').map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase()).join(' ')}
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === action ? "opacity-100" : "opacity-0"
                )}
              />

            </CommandItem>
          ))}
        </CommandGroup>
      </Command>)
}