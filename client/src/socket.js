import io from 'socket.io-client';

// Automatically detect if running on localhost or LAN
const protocol = window.location.protocol;
const hostname = window.location.hostname;
// If we are on https, we might be deployed, but for local dev with ports:
const port = 3001; 

const URL = `${protocol}//${hostname}:${port}`;

const socket = io(URL, { 
    autoConnect: false,
    transports: ['websocket'] // Force WebSocket to avoid polling 400 errors
});

export default socket;