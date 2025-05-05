const WebSocket = require('ws');

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket');

        const intervalId = setInterval(() => {
            ws.send(JSON.stringify({ message: 'Hello from backend every 10 seconds' }));
        }, 10000);

        ws.on('close', () => {
            console.log('Client disconnected from WebSocket');
            clearInterval(intervalId);
        });
    });
}

module.exports = setupWebSocket;
