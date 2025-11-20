// src/types/token.ts

// Define the core structure of a single Token object
export interface Token {
    id: string; // Unique identifier (e.g., contract address or symbol)
    symbol: string; // e.g., "ETH" or "UNI"
    name: string; // e.g., "Ethereum" or "Uniswap"
    currentPrice: number; // Current market price (real-time update target)
    priceChange24h: number; // Price change in 24 hours (for conditional coloring)
    volume24h: number; // Trading volume in 24 hours
    liquidity: number; // Current liquidity pool size
    status: 'New pairs' | 'Final Stretch' | 'Migrated'; // Corresponds to the required columns [cite: 4]
    sparklineData: number[]; // Small array for the chart (last 7 days/24 hours)
    marketCap: number; // Market capitalization (optional but good for trading UI)
}

// Define the structure of the real-time price update message
export interface PriceUpdate {
    id: string; // Token ID
    newPrice: number;
    // Optional: newVolume: number;
}

// Define the status keys for table organization
export type TokenStatus = Token['status'];

// Define the field keys used for sorting the table
export type SortField = keyof Omit<Token, 'id' | 'symbol' | 'name' | 'sparklineData' | 'status'>;