# Server-Sent Events (SSE)

## Overview

Server-Sent Events (SSE) enable **long-lived, unidirectional
communication** from the server to the client using a **single HTTP
connection**.\
Unlike WebSockets, where both client and server can send messages, SSE
allows only the **server to push updates** to the client.

------------------------------------------------------------------------

## How It Works

-   The client establishes a single HTTP connection using `EventSource`.
-   The connection remains **open** until explicitly closed.
-   The server sends events in a text/event-stream format.
-   Each event can contain fields like `event`, `data`, and `id`.

### Example Message Format

    id: 1
    event: update
    data: {"message": "New notification received"}

------------------------------------------------------------------------

## Use Cases

-   Real-time **feeds** (news, social media)
-   **Notifications** system (user alerts, messages)
-   **Live dashboards** (analytics, stock updates)

------------------------------------------------------------------------

## Node.js + Express Example

### `server.js`

``` js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let counter = 0;

  const interval = setInterval(() => {
    counter++;
    res.write(`id: ${counter}\n`);
    res.write(`event: message\n`);
    res.write(`data: Server time: ${new Date().toLocaleTimeString()}\n\n`);
  }, 3000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => console.log(`SSE Server running on http://localhost:${PORT}`));
```

### `index.html`

``` html
<!DOCTYPE html>
<html>
  <head>
    <title>Server Sent Events Demo</title>
  </head>
  <body>
    <h1>Live Server Updates</h1>
    <div id="output"></div>

    <script>
      const output = document.getElementById('output');
      const source = new EventSource('/events');

      source.addEventListener('message', e => {
        const data = document.createElement('p');
        data.textContent = e.data;
        output.appendChild(data);
      });

      source.onerror = err => {
        console.error('SSE connection error', err);
      };
    </script>
  </body>
</html>
```

------------------------------------------------------------------------

## Connection Concepts

  -----------------------------------------------------------------------
  Term                  Description
  --------------------- -------------------------------------------------
  **Keep Live**         The HTTP connection remains open for continuous
                        data push

  **Event Streams**     Data sent from the server in the
                        `text/event-stream` format

  **Event**             Optional event name used to categorize messages

  **Data**              Actual payload sent to the client

  **ID**                Used to track last received event for
                        reconnection
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Challenges at Scale (Millions of Users)

1.  **Browser Compatibility** --- SSE is not supported in some older
    browsers (e.g., IE).\
2.  **Connection Limit** --- Browsers limit open HTTP connections per
    domain.\
3.  **Connection Timeout** --- Some proxies or load balancers may close
    idle connections.\
4.  **Background Tab Behavior** --- Browsers throttle or pause
    connections in background tabs.\
5.  **Resource Utilisation** --- Each open connection consumes server
    memory and threads.\
6.  **Load Balancer Issues** --- SSE requires **sticky sessions** to
    keep the same server connection.\
7.  **Proxy/Firewall Restrictions** --- Some middlewares may buffer or
    block the event stream.\
8.  **Testing** --- Hard to simulate large-scale persistent connections
    locally.\
9.  **Broadcasting** --- Must implement message fan-out manually (e.g.,
    using Redis Pub/Sub or Message Queues).

------------------------------------------------------------------------

## Broadcasting Example (Multiple Clients)

You can maintain a list of connected clients and broadcast messages to
all:

``` js
const clients = [];

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.push(res);

  req.on('close', () => {
    clients.splice(clients.indexOf(res), 1);
  });
});

setInterval(() => {
  clients.forEach(client => {
    client.write(`data: Broadcast message at ${new Date().toISOString()}\n\n`);
  });
}, 5000);
```

------------------------------------------------------------------------

## Summary

✅ **SSE** = Simple, efficient way for servers to push updates.\
⚠️ **Limitations** = Unidirectional + Connection limits.\
🚀 **Best For** = Feeds, notifications, and dashboards where updates are
frequent but lightweight.
