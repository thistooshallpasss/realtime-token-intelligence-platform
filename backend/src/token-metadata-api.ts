// backend/src/token-metadata-api.ts - Initial Metadata API

// Simulates a database query response (only non-realtime fields)
export const getTokenMetadata = (request: any, reply: any) => {
    const mockData = [
        // Real implementation would pull this from a PostgreSQL/Mongo DB
        { id: 'id-1', symbol: 'BTC', name: 'Bitcoin', marketCap: 1.2e12, status: 'New pairs' },
        { id: 'id-2', symbol: 'ETH', name: 'Ethereum', marketCap: 4.0e11, status: 'Migrated' },
        // ... more tokens
    ];

    reply.send(mockData);
};