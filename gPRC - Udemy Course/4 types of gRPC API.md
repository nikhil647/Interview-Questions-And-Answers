# gRPC API Types — Simple Notes

## 1. Unary API

**Pattern:** One request → One response
**Flow:**
Client → Request → Server
Server → Response → Client

**Use case:** Normal API calls (login, get user, update item, etc.)

---

## 2. Server Streaming

**Pattern:** One request → Multiple responses
**Flow:**
Client → Request → Server
Server → Response1, Response2, Response3...

**Use case:**
Sending a stream of data back to the client (news feed updates, file chunks, stock prices, etc.)

---

## 3. Client Streaming

**Pattern:** Multiple requests → One response
**Flow:**
Client → Request1, Request2, Request3... → Server
Server → Final Response → Client

**Use case:**
Uploading chunks, sending logs, sending sensor readings.

---

## 4. Bi-Directional Streaming

**Pattern:** Multiple requests ↔ Multiple responses (both ways)
**Flow:**
Client → sends stream
Server ← sends stream
Both continue independently.

**Use case:**
Chat apps, real-time game updates, live collaboration tools.

---

# One-Line Summary

* **Unary:** 1 request → 1 response
* **Server Streaming:** 1 request → many responses
* **Client Streaming:** many requests → 1 response
* **Bi-Directional Streaming:** many requests ↔ many responses

---
