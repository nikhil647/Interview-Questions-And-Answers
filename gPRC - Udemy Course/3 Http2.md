# HTTP/2 vs HTTP/1.1

## Why HTTP/2 Is Much Faster

### 1. HTTP/1.1 is slow because:

* It opens **one TCP connection per request**.

  * Steps:

    1. Open Connection
    2. Send Request
    3. Wait for Response
* This creates **heavy latency** when a page needs many files.
* Example:
  To load **1 HTML + 1 CSS + 1 JS**, HTTP/1.1 will typically open **3 separate TCP connections**.
* **Headers are not compressed**, so request/response metadata is large.
* Requests cannot run in parallel on the same connection (Head-of-line blocking).

---

## 2. How HTTP/2 improves speed

### Single Long-Lived TCP Connection

* HTTP/2 opens **one persistent TCP connection** per domain.
* This connection is **shared by all requests and responses**.
* Result:
  Eliminates repeated connection overhead and reduces latency drastically.

---

### Multiplexing

* Multiple requests and responses are sent **in parallel** over the same TCP connection.
* No waiting for one request to finish before sending the next.
* Removes **Head-of-line blocking** at the HTTP level.
* Webpages load much faster because all assets stream simultaneously.

---

### Header Compression (HPACK)

* HTTP/2 **compresses headers** using a specialized algorithm (HPACK).
* Both headers and data are transmitted in **binary**, not plain text.
* Saves bandwidth and improves performance, especially for large APIs.

---

### Server Push

* Server can **send files before the client asks** for them.
* Example:
  When client requests `index.html`, server can *push*:

  * `styles.css`
  * `app.js`
    because it knows the browser will need them.
* Removes extra request–response cycles.

---

### Binary Protocol

* HTTP/2 uses **binary framing** instead of text.
* Faster to parse, smaller in size, and easier for machines to process.

---

### SSL/TLS Required

* HTTP/2 works **only over HTTPS** (TLS).
* Browsers enforce TLS for HTTP/2 usage.
* Provides security + modern optimization features.

---

## 3. gRPC Uses All HTTP/2 Advantages

* gRPC is built **on top of HTTP/2**.
* Automatically gives:

  * Multiplexing
  * Header compression
  * Binary transport
  * Persistent connection
  * Extremely low latency
* This is why gRPC performs far better than REST over HTTP/1.
