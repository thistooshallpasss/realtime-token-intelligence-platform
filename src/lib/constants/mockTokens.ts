// src/lib/constants/mockTokens.ts
import { Token, TokenStatus } from '@/types/token';

const generateMockData = (count: number): Token[] => {
    const statuses: TokenStatus[] = ['New pairs', 'Final Stretch', 'Migrated'];
    const mockTokens: Token[] = [];

    for (let i = 1; i <= count; i++) {
        const symbol = `TKN${i}`;
        const status = statuses[i % statuses.length];
        const basePrice = Math.random() * 1000 + 50; // Price between 50 and 1050

        mockTokens.push({
            id: `id-${i}`,
            symbol: symbol,
            name: `Token ${symbol}`,
            currentPrice: parseFloat(basePrice.toFixed(2)),
            priceChange24h: parseFloat((Math.random() * 20 - 10).toFixed(2)), // -10% to +10%
            volume24h: Math.floor(Math.random() * 10000000),
            liquidity: Math.floor(Math.random() * 50000000),
            status: status,
            sparklineData: Array.from({ length: 7 }, () => parseFloat((basePrice * (1 + (Math.random() - 0.5) * 0.2)).toFixed(2))),
            marketCap: Math.floor(basePrice * (Math.random() * 1000000 + 100000)),
        });
    }

    return mockTokens;
};

export const MOCK_TOKENS: Token[] = generateMockData(500);