// backend/src/websocket-handler.ts - Manages WS Clients
import { WebSocket } from 'ws';
import { subscribeToPriceStream, PriceTick } from './redis-service';

let clients: WebSocket[] = [];
let isSubscribed = false;
let cleanupRedis: () => void;

// Function to handle incoming price ticks from Redis
const broadcastPriceTick = (data: PriceTick) => {
    const message = JSON.stringify({
        type: 'PRICE_UPDATE',
        payload: { id: data.id, newPrice: data.price } // Matches frontend PriceUpdate interface
    });

    // Send to all connected clients
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

export const handleWebSocketConnection = (connection: WebSocket) => {
    clients.push(connection);
    console.log(`New WebSocket client connected. Total clients: ${clients.length}`);

    // Start subscribing to Redis only once
    if (!isSubscribed) {
        cleanupRedis = subscribeToPriceStream(broadcastPriceTick);
        isSubscribed = true;
    }

    connection.on('close', () => {
        clients = clients.filter(c => c !== connection);
        console.log(`Client disconnected. Total clients: ${clients.length}`);

        // Optional: Stop Redis subscription if clients.length === 0
        if (clients.length === 0 && cleanupRedis) {
            // cleanupRedis(); 
            // isSubscribed = false; 
        }
    });
};