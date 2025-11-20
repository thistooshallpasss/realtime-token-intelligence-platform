// src/services/websocket/mockWebSocket.ts
import { MOCK_TOKENS } from '@/lib/constants/mockTokens';
import { PriceUpdate } from '@/types/token';

// Keep a local state map for simulation so we don't mutate the constant
const currentPrices = new Map<string, number>();

// Initialize local map
MOCK_TOKENS.forEach(t => currentPrices.set(t.id, t.currentPrice));

export const startMockPriceStream = (onUpdate: (data: PriceUpdate) => void): (() => void) => {
    console.log('Starting mock WebSocket stream...');
    const tokenIds = MOCK_TOKENS.map(t => t.id);

    const intervalId = setInterval(() => {
        const randomId = tokenIds[Math.floor(Math.random() * tokenIds.length)];

        // Get current price from our local map, not the global constant
        const currentPrice = currentPrices.get(randomId) || 100;

        // Calculate random change (+/- 1%)
        const change = (Math.random() * 0.02 - 0.01) * currentPrice;
        const newPrice = parseFloat((currentPrice + change).toFixed(2));

        // Update our local map
        currentPrices.set(randomId, newPrice);

        const update: PriceUpdate = {
            id: randomId,
            newPrice: newPrice,
        };

        // Send update
        onUpdate(update);
    }, 200); // Speed up to 200ms for more visible action

    return () => {
        clearInterval(intervalId);
    };
};