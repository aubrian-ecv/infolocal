"use client";

import { queryClient } from "@/lib/reactquery";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export type ProvidersProps = {
    children: React.ReactNode
}

export const Providers = (props: ProvidersProps) => {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </SessionProvider>
    )
}