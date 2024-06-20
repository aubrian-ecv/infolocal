"use client";

import { queryClient } from "@/lib/reactquery";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type ProvidersProps = {
    children: React.ReactNode
}

export const Providers = (props: ProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}