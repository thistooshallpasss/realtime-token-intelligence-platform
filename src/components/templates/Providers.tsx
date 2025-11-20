// src/components/templates/Providers.tsx
'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store/store';

// Create a client for React Query
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        // 1. Redux Provider
        <Provider store={store}>
            {/* 2. React Query Provider */}
            <QueryClientProvider client={queryClient}>
                {children}
                {/* Optional: ReactQueryDevtools in a dev environment */}
            </QueryClientProvider>
        </Provider>
    );
}