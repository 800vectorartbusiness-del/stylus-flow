// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve frontend files (index.html, etc.)
app.use(express.static(__dirname + '/public'));

wss.on('connection', (ws) => {
  console.log('Client connected ✅');

  ws.on('message', (message) => {
    // Stylus/touch events from phone
    console.log('Received:', message);

    // Broadcast to all connected clients (like laptop canvas)
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected ❌'));
});

// Start server
server.listen(8080, () => {
  console.log('Server running at http://localhost:8080');
});
