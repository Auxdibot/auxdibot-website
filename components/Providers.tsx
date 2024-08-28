'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

type ProvidersProps = { children: ReactNode };

let queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
