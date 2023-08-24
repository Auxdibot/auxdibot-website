"use client";

import { createContext, Dispatch, SetStateAction } from "react";

const DashboardSidebarContext = createContext<{ page: string, setCurrentPage: Dispatch<SetStateAction<string>> } | null>(null);

export default DashboardSidebarContext;