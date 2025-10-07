# 🌐 Understanding How the Web Works

<img width="1263" height="425" alt="image" src="https://github.com/user-attachments/assets/3db1a78e-82f9-4306-b39f-8b5d5370e075" />

---

### 💻 Client vs Server

- **Client:** Your **mobile** or **laptop browser** — devices that send requests.  
- **Server:** Any computer that **processes requests** and **responds with data**.  
  A server is essentially someone else’s computer, designed to handle multiple connections efficiently.

**Why your laptop can’t act as a full server:**
- Limited **RAM**, **storage**, and **processing power**  
- Can’t be available **24×7** reliably  
- Hence, we use **high-end servers** that stay online continuously  

---

### 🌍 DNS (Domain Name System)

Think of DNS like a **phonebook** for the internet.

> If you want to order Domino’s Pizza, you need a **pincode**.  
> Similarly, if two devices want to communicate, they need something called an **IP address**.  
> But humans remember **names** (like `google.com`) better than numbers — that’s why DNS exists.

When you type **google.com**, your system first needs to find its **IP address**.  
This IP is stored and managed on **DNS servers**.  
Once the IP is resolved, your browser sends the actual request to that server.

---

### 📶 Modem

A **modem** converts **telephone signals** into **internet signals** —  
transforming **digital** signals (your data) into **analog** ones and vice versa.  
It acts as the crucial **bridge** between your home and the wider network.

---

### 🌐 Domain Level Overview

<img width="809" height="292" alt="image" src="https://github.com/user-attachments/assets/b2840bd7-b65b-4475-9b23-2ab23b5eed69" />

The entire world is connected through **high-speed fiber optic cables**,  
many of which are **laid under the sea** to link continents together.

---

## 🧭 Step-by-Step: What Happens When You Visit a Website

Let’s say you type `https://example.com` in your browser.

---

### 1️⃣ Browser Cache

**Purpose:** Stores previously visited website data — HTML, CSS, JS, images, etc.  
Also stores: DNS cache (sometimes).  

- ✅ If cached → Browser already knows the IP of `example.com` (no DNS request).  
- ❌ If not cached → Browser asks the **Operating System (OS)** for DNS resolution.

---

### 2️⃣ OS (Operating System) Cache

**Purpose:** OS maintains a **DNS resolver cache**,  
which maps domains to IPs (e.g., `example.com → 93.184.216.34`).

- ✅ If found → OS returns the IP to the browser.  
- ❌ If not → OS queries the **router** or the **configured DNS server**.

---

### 3️⃣ Router

**Purpose:** Acts as a **gateway** between your computer and the internet.  
Routers may also have a **DNS cache**.

- ✅ If the router knows the IP → returns it immediately.  
- ❌ If not → forwards the request to your **ISP’s DNS server**.

---

### 4️⃣ ISP (Internet Service Provider)

**Purpose:** Provides your internet connection and often handles DNS resolution.

- ✅ If cached → ISP returns the IP from its DNS cache.  
- ❌ If not → It queries the **authoritative DNS servers** on the internet.

---

### ⚡ After DNS Resolution

Once the **browser has the IP address:**

1. Opens a **TCP** (or **TLS**, for HTTPS) connection to that IP.  
2. Sends an **HTTP request** (e.g., `GET /index.html`).  
3. The **web server** processes it and sends a **response**.  
4. The **browser** receives the response and may **cache** it for faster future loads.

---

### ⚙️ Additional Notes

- 🌐 **Browser Parallel Requests:**  
  A browser can request a maximum of **6–8 parallel connections** per domain.  
  Any additional requests are placed in a **queue** until earlier ones complete.

- 🔗 **Peering Concept:**  
  Companies like **Google**, **Netflix**, and **YouTube** establish **direct or near-direct connections** with ISPs.  
  This reduces latency and improves streaming and loading speeds for end users.

- 🏛️ **ICANN (Internet Corporation for Assigned Names and Numbers):**  
  The global authority responsible for **managing IP address allocation** and **domain naming guidelines**.

- 🔍 **WHOIS:**  
  A public database that shows **who owns a domain** — including **registration details** and **privacy protection info**.

How Web page Renders (Top most interview question)

First: What Happens When a Page Loads

When you open a page (say index.html), the browser follows a pipeline:

Mental modal (not actually)
1️⃣ Loading → Download the HTML, CSS, JS, images, etc.
2️⃣ Scripting → Run JavaScript.
3️⃣ Rendering → Build the layout (where everything goes).
4️⃣ Painting → Actually draw pixels on the screen.

# Browser Rendering Process Documentation

## Overview

Understanding how browsers render web pages is crucial for web developers. This document explains the complete rendering pipeline from HTML parsing to painting pixels on screen.

---

## Key Concepts

### Critical Loading Behavior

- **CSS Loading**: Until CSS is completely loaded, the web page may appear blank or unstyled (FOUC - Flash of Unstyled Content).
- **JavaScript Execution**: When JS is executing, it blocks the HTML parser, preventing further parsing until execution completes.

### Core Definitions

- **Parsing**: The process of understanding and analyzing code structure.
- **Rendering**: The process of drawing/displaying content on screen.

---

## The Three Main Parsers

### 1. HTML Parser

Converts HTML markup into the Document Object Model (DOM).
```HTML: <h1>Hello</h1>```

### 2. CSS Parser

Converts CSS rules into the CSS Object Model (CSSOM).

```
CSS: h1 { color: "red" }
↓
CSSOM: { h1: { color: 'red' } }
```

### 3. JavaScript Parser

Reads JavaScript code and builds an Abstract Syntax Tree (AST) for execution.

**Visual Reference:**

<img width="1000" height="500" alt="JS Execution Diagram in Browser" src="https://github.com/user-attachments/assets/b49d2b44-7944-46bd-b25a-71225e12d6bf" />

---

## Browser Rendering Pipeline

### Step 1: Fetch HTML

The browser requests and downloads the HTML document from the server.

### Step 2: Parse HTML

The HTML parser begins reading the document and encounters references to CSS and JS files.

#### CSS Handling

CSS does **not** block HTML parsing, regardless of how it's included:
- ✅ Inline CSS
- ✅ Same-file CSS
- ✅ External CSS files

#### JavaScript Handling

JavaScript behavior varies based on how it's loaded:

| Script Type | Download | HTML Parsing | Execution |
|------------|----------|--------------|-----------|
| `<script>` | Blocks parsing | ❌ Stopped | Executes immediately after download |
| `<script async>` | ⚡ Parallel download | ✅ Continues | ⏸️ Pauses briefly when download completes to execute |
| `<script defer>` | ⚡ Parallel download | ✅ Continues | ⏳ Waits until HTML parsing is complete |


---

### Step 3: Build the DOM Tree

Once HTML is parsed and JavaScript is executed, the DOM tree is formed representing the document structure.

### Step 4: CSS Parsing

The browser parses all CSS from multiple sources:
- Inline styles
- Internal `<style>` tags
- External stylesheets

**CSSOM (CSS Object Model)** is created as a structured representation containing:
- Selectors
- Properties and values
- Media queries
- Inheritance rules

### Step 5: Construct the Render Tree

```Render Tree = DOM + CSSOM```

**Important characteristics:**
- Only includes **visible elements** (excludes `display: none`, `<script>`, `<meta>`, etc.)
- Each node contains both content and computed styles
- Used by the browser to calculate layout

### Step 6: Layout (Reflow)

The browser calculates the exact position and size of each element:
- **Position**: Where the element should appear (x, y coordinates)
- **Dimensions**: Width and height
- **Box model**: Margins, padding, borders

**Example:**
```html
<h1>Hello</h1>
```
The browser determines this `<h1>` element's exact pixel position and dimensions.

### Step 7: Painting
The browser paints pixels on the screen based on the render tree:

- **Colors:** Background and foreground colors  
- **Text:** Font rendering and text effects  
- **Shadows:** Text and box shadows  
- **Images:** Raster and vector graphics  

### Step 8: Compositing
The browser manages layers and determines rendering order:

- Which layers should be visible  
- Which layers should be hidden  
- Stacking context and z-index ordering  
- Hardware-accelerated layers (GPU compositing)


# 🌐 Network Protocols – Easy Notes

Quick and simple guide to remember key Internet protocols.

---

## 1. HTTP
**What:** Sends and receives web data (pages, images, APIs).  
**How:** Uses TCP (port 80). Each request = new connection.  
**Example:** When you open a website.

---

## 2. HTTP/1.1
**What:** Improved HTTP – reuses the same connection.  
**How:** TCP (port 80). Supports keep-alive.  
**Example:** Older websites and APIs.

---

## 3. HTTP/2
**What:** Faster! Sends many files at once on one connection.  
**How:** TCP + encryption (HTTPS).  
**Example:** Most modern websites.

---

## 4. HTTP/3
**What:** Even faster – works on UDP (via QUIC).  
**How:** Encrypted by default, no delays like TCP.  
**Example:** YouTube, Gmail, and newer browsers.

---

## 5. HTTPS
**What:** Secure version of HTTP. Data is encrypted.  
**How:** Uses TCP (port 443) with TLS.  
**Example:** Any website with a 🔒 lock icon.

---

## 6. WebSocket
**What:** Two-way chat between browser and server (live updates).  
**How:** Starts with HTTP, then upgrades to TCP connection.  
**Example:** Chat apps, live stock prices.

---

## 7. TCP
**What:** Reliable data delivery – ensures nothing is lost.  
**How:** Three-way handshake (SYN, SYN-ACK, ACK).  
**Example:** HTTP, FTP, Email use this.

---

## 8. UDP
**What:** Fast but unreliable – no delivery check.  
**How:** Sends packets directly, no handshake.  
**Example:** Games, video calls, streaming.

---

## 9. SMTP
**What:** Sends emails between servers.  
**How:** TCP (port 25 or 465 for secure).  
**Example:** Gmail sending an email to Outlook.

---

## 10. DNS
**What:** Converts website names to IP addresses.  
**How:** Mostly uses UDP (port 53), TCP if big data.  
**Example:** When you type `google.com` in browser.
---

## 11. FTP
**What:** Moves files between computers.  
**How:** TCP (port 21 control, port 20 data).  
**Example:** Uploading a website to a hosting server.

---

### 🧠 Quick Summary Table

| Protocol | Uses | Transport | Reliable? | Example |
|-----------|------|------------|------------|----------|
| HTTP | Web data | TCP | ✅ | Websites |
| HTTP/1.1 | Faster HTTP | TCP | ✅ | Old sites |
| HTTP/2 | Modern web | TCP | ✅ | Google |
| HTTP/3 | Fast + modern | UDP (QUIC) | ✅ | YouTube |
| HTTPS | Secure web | TCP | ✅🔒 | Banking sites |
| WebSocket | Live data | TCP | ✅ | Chat apps |
| TCP | Reliable base | - | ✅ | File transfer |
| UDP | Speed first | - | ❌ | Gaming, video |
| SMTP | Emails | TCP | ✅ | Gmail send |
| DNS | Name lookup | UDP/TCP | ⚙️ | Web browsing |
| FTP | File transfer | TCP | ✅ | Website upload |

---

**📝 Tip to remember:**  
- “T” in **TCP** = **Trust** (reliable).  
- “U” in **UDP** = **Unreliable** but **Ultra fast**.  
- **HTTP** = Web, **HTTPS** = Secure Web.  
- **WebSocket** = Real-time chat.  
- **FTP** = File transfer.  
- **SMTP** = Send mail.  
- **DNS** = Find address.

# REST API

<img width="781" height="542" alt="REST API drawio" src="https://github.com/user-attachments/assets/5bc35bb8-0043-4d3d-b5df-dc61e5a65cb3" />



