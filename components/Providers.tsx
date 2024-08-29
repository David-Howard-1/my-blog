'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()

export default function Providers(props: { children: ReactNode; headers: Headers }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            {props.children}
        </QueryClientProvider>
    )
}