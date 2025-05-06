const WebSocket = require('ws');

let wss; // Declare at module level so we can access it later

function setupWebSocket(server) {
    wss = new WebSocket.Server({ server });


}

// This function will broadcast to all connected clients
function broadcastMatchUpdate(eventId, match) {
    // Broadcast the match update to all WebSocket clients
    console.log('Broadcasting match update to all clients');
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'MATCH_UPDATE',
                eventId,
                match,
            }));
        }
    });
}

module.exports = setupWebSocket;
module.exports.broadcastMatchUpdate = broadcastMatchUpdate;
