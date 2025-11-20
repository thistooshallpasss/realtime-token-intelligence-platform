// src/lib/hooks/useTokenData.ts
import { useQueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';
import { MOCK_TOKENS } from '@/lib/constants/mockTokens';
import { startMockPriceStream } from '@/services/websocket/mockWebSocket';
import { Token, PriceUpdate } from '@/types/token';

const fetchInitialTokens = async (): Promise<Token[]> => {
    // 🚀 PERFORMANCE FIX: Removed setTimeout(300). 
    // Return a copy of the data to ensure immutability.
    return [...MOCK_TOKENS];
};

export const useTokenData = () => {
    const queryClient = useQueryClient();
    const queryKey = ['tokens'];

    const query = useQuery({
        queryKey: queryKey,
        queryFn: fetchInitialTokens,
        staleTime: Infinity,
    });

    React.useEffect(() => {
        const updateCache = (update: PriceUpdate) => {
            queryClient.setQueryData<Token[]>(queryKey, (oldTokens) => {
                if (!oldTokens) return [];

                return oldTokens.map(token => {
                    if (token.id === update.id) {
                        return {
                            ...token,
                            currentPrice: update.newPrice,
                        };
                    }
                    return token;
                });
            });
        };

        const cleanup = startMockPriceStream(updateCache);
        return cleanup;
    }, [queryClient]);

    return query;
};