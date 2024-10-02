const express = require('express');
const https = require('https');
const fs = require('fs');
const { Server } = require('socket.io');
const path = require('path');

const app = express();

// SSL certificate configuration
const options = {
  key: fs.readFileSync('/etc/ssl/private/joaogames.key'),
  cert: fs.readFileSync('/etc/ssl/certs/joaogames.crt')
};

const server = https.createServer(options, app);
const io = new Server(server, {
  cors: {
    origin: "https://joaogames.io",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 443;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Game state
let currentMode = null;
let connectedClients = 0;

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('connect_request', () => {
    connectedClients++;
    socket.emit('connection_accepted');
  });

  socket.on('select_mode', (mode) => {
    if (!currentMode) {
      currentMode = mode;
      io.emit('mode_selected', mode);
    } else {
      socket.emit('mode_already_selected', currentMode);
    }
  });

  socket.on('upload_image', (imageData) => {
    // Handle image upload for Aquarium mode
    io.emit('new_image', imageData);
  });

  // Add more event handlers for game-specific actions

  socket.on('disconnect_request', () => {
    connectedClients--;
    if (connectedClients === 0) {
      currentMode = null;
    }
    socket.disconnect();
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
    connectedClients--;
    if (connectedClients === 0) {
      currentMode = null;
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});