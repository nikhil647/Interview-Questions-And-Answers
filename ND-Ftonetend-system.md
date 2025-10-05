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
