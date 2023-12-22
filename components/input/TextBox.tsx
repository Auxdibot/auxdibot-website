import { MutableRefObject } from "react";
import { IconType } from "react-icons";

interface TextBoxProps {
    readonly value?: string;
    readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
    readonly Icon: IconType;
    readonly maxLength?: number;
    readonly className?: string;
    readonly ref?: MutableRefObject<HTMLInputElement | null>;
}
export default function TextBox({ value, onChange, Icon, maxLength, className, ref }: TextBoxProps) {
    return (<span className={"bg-gray-600 border border-slate-500 p-1 flex flex-row items-center gap-2 rounded-2xl focus-within:text-lg transition-all overflow-hidden"}>
        <Icon className={"origin-left"}/>
        <input className={"bg-transparent text-base outline-none font-open-sans " + className} maxLength={maxLength} value={value} onChange={onChange} ref={ref}></input>
    </span>)
}