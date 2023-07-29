"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type ProvidersProps = { children: ReactNode };

let queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
    return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute={"class"} enableSystem disableTransitionOnChange>
            {children}
        </ThemeProvider>
    </QueryClientProvider>
    );
}