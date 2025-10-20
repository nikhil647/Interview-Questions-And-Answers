# WebSockets

------------------------------------------------------------------------

# Overview

WebSockets provide a **full-duplex**, low-latency communication channel
between a client (usually a browser) and a server over a **single
long-lived TCP connection**. Once established (via an HTTP upgrade), the
connection stays open and allows **continuous bi-directional
communication**: the client can push messages to the server and the
server can push messages to the client at any time without creating a
new HTTP request for each message.

------------------------------------------------------------------------

# Small Example --- Broadcasting (Node.js + Express + Socket.IO)

> This example creates an Express app with Socket.IO that allows all
> connected clients to receive broadcast messages in real-time.

**Install**

``` bash
npm init -y
npm install express socket.io
```

**server.js**

``` js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.emit('message', { type: 'welcome', message: 'Connected to broadcast server!' });

  socket.on('broadcast', (msg) => {
    console.log('Broadcasting:', msg);
    // Emit to all clients except sender
    socket.broadcast.emit('message', { type: 'broadcast', payload: msg });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
```

**public/index.html**

``` html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Socket.IO Broadcast Demo</title>
  <script src="/socket.io/socket.io.js"></script>
</head>
<body>
  <h3>Socket.IO Broadcast Demo</h3>
  <div>
    <input id="msg" placeholder="Type a message" />
    <button id="send">Send</button>
  </div>
  <ul id="log"></ul>

  <script>
    const socket = io();

    const log = (text) => {
      const li = document.createElement('li');
      li.textContent = text;
      document.getElementById('log').appendChild(li);
    };

    socket.on('connect', () => log('Connected as ' + socket.id));

    socket.on('message', (data) => {
      log(`[${data.type}] ${data.message || data.payload}`);
    });

    document.getElementById('send').addEventListener('click', () => {
      const msg = document.getElementById('msg').value;
      socket.emit('broadcast', msg);
      log(`You: ${msg}`);
    });
  </script>
</body>
</html>
```

------------------------------------------------------------------------

# Use Cases

-   **Realtime Analytics / Dashboards**
-   **Financial Trading**
-   **Online Gaming**
-   **Collaborative Editing / Chat Apps**

------------------------------------------------------------------------

# Notes

-   Socket.IO builds on WebSocket and adds **fallbacks**,
    **reconnection**, and **rooms/namespaces** support.
-   You can inspect the WebSocket connection under **Browser DevTools →
    Network → WS tab**.
-   For production, always use **`wss://`** (secure WebSocket).

------------------------------------------------------------------------

# Key Terminology

-   **Full Duplex**, **Single Long-lived TCP**, **Continuous
    Bi-directional Communication**
-   **wss**, **Framing**, **101 Switching Protocols**
-   **Sticky Sessions**, **Load Balancer**, **Authentication**,
    **Firewall**, **Resource Cleanup**

------------------------------------------------------------------------

# When to Use / Not Use

Use for realtime, low-latency apps. Avoid when you only need infrequent
or cacheable requests.

------------------------------------------------------------------------

*End of Socket.IO-based WebSocket Guide.*
