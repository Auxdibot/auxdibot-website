import { MutableRefObject } from "react";
import { IconType } from "react-icons";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

interface NumberBoxProps {
    readonly value?: number;
    readonly onChange?: (...args: any[]) => void;
    readonly Icon: IconType;
    readonly max?: number;
    readonly className?: string;
    readonly ref?: MutableRefObject<HTMLInputElement | null>;
    readonly disableControls?: boolean;
    readonly required?: boolean;
    readonly min?: number;
}
export default function NumberBox({ value, onChange, Icon, max, className, ref, disableControls, min, required }: NumberBoxProps) {

    function change(val: string | number) {
        if (((!Number(val) && val != 0) || Number.isNaN(val) || (typeof val == 'string' && val.includes('.')) || (max && Number(val) > max) || (min && Number(val) < min)) && val != '') return;
        if (onChange) onChange(val);
    }
    return (<span className={"bg-gray-600 border border-slate-500 p-1 flex flex-row group items-center gap-2 rounded-2xl transition-all overflow-hidden"}>
        <Icon className={"origin-left group-focus-within:text-lg text-base transition-all float-left"}/>
        <input className={"bg-transparent text-base outline-none font-open-sans " + className} required={required} value={value} onChange={(e) => change(e.currentTarget.value)} ref={ref}></input>
        {!disableControls ? <span className={'flex flex-col text-xs pr-2'}>
            <span className={"hover:text-green-500 cursor-pointer select-none"} onClick={() => change(Number(value || 0)+1)}><BsArrowUpShort/></span>
            <span className={"hover:text-red-500 cursor-pointer select-none"} onClick={() => change(Number(value || 0)-1)}><BsArrowDownShort/></span>
        </span> : ""}
    </span>)
}