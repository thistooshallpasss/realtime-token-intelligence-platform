// backend/src/server.ts - Fastify Server Entry Point
import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import { handleWebSocketConnection } from './websocket-handler';
import { getTokenMetadata } from './token-metadata-api';

const fastify = Fastify({ logger: true });

// 1. Register WebSocket plugin for real-time streaming
fastify.register(websocket);

// 2. Register metadata API endpoint (simulating DB query)
fastify.get('/api/v1/tokens', getTokenMetadata);

// 3. Register the WebSocket route
fastify.get('/ws/live-prices', { websocket: true }, handleWebSocketConnection);

const start = async () => {
    try {
        await fastify.listen({ port: 4000 });
        console.log(`Server listening on http://localhost:4000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};


start();