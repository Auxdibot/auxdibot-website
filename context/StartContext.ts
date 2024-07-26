import { Dispatch, SetStateAction, createContext } from "react";


export const StartContext = createContext<{ start: number, setStart: Dispatch<SetStateAction<number>> | null }>({ start: 0, setStart: null });