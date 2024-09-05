"use client";

import { QueryProvider } from "./queryProvider";

interface ProviderProps {
    children: React.ReactNode;
}

export function Providers({children}: ProviderProps) {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    )
}