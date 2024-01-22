import { BsClock } from "react-icons/bs";
import TextBox from "./TextBox";

export default function TimestampBox({ value, onChange, className }: { value: string, onChange: (...items: any[]) => any, className?: string }) {
    const tested = value?.match(/\d+[mhdwMys]{1}/);
    return <span className={`${value?.length >= 2 && !tested ? 'text-red-500' : tested && tested[0] == value ? 'text-green-500' : !tested ? '' : 'text-red-500'}`}><TextBox className={className} Icon={BsClock} value={value} onChange={(e) => onChange(e.currentTarget.value)}/></span>
}