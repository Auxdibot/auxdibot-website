"use client";

import { DashboardActionPrompt } from "@/lib/types/DashboardActionPrompt";
import { createContext, Dispatch, SetStateAction } from "react";


const DashboardActionContext = createContext<{ action: DashboardActionPrompt | null, setAction: Dispatch<SetStateAction<DashboardActionPrompt | null>> } | null>(null);

export default DashboardActionContext;