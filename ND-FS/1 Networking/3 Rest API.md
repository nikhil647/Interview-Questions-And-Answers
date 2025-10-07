# REST API

<img width="781" height="542" alt="REST API drawio" src="https://github.com/user-attachments/assets/5bc35bb8-0043-4d3d-b5df-dc61e5a65cb3" />


# 🏗️ System Architecture Tiers Explained

This document explains 1-tier to 5-tier architectures with simple explanations and examples.

---

## 🧩 1-Tier Architecture (Single-Tier / Monolithic)

In this model, the **UI**, **business logic**, and **database** all reside in the same system or application.  
It’s a self-contained program that runs entirely on a single machine.

**Example:**  
Old desktop applications like **MS Access**, **FoxPro**, or **VB6 inventory systems**.

**Visualization:**
```
[ Application = UI + Logic + Database ]
```

---

## 🧩 2-Tier Architecture (Client–Server Model)

In 2-tier systems, the **client application (UI + partial logic)** communicates directly with a **database server**.  
There’s **no separate backend or API** layer in between.

**Example:**  
Banking or library management systems where desktop clients connect directly to a remote **Oracle/MySQL database**.

**Visualization:**
```
[ Client App (UI + Logic) ↔ Database Server ]
```

**Technologies:**
- Client: Java Swing, .NET, VB, Delphi  
- Database: MySQL, Oracle, SQL Server  
- Connection: ODBC / JDBC / ADO.NET  

---

## 🧩 3-Tier Architecture (Modern Web Applications)

Here, the application is split into **three layers**:

1. **Presentation Layer** – Frontend (UI)
2. **Application Layer** – Backend (APIs, logic)
3. **Data Layer** – Database

The frontend never directly talks to the database — it always goes through the backend.

**Example:**  
Web apps like **Instagram**, **Amazon**, **Netflix**.

**Visualization:**
```
[ Frontend (React) → Backend (Node.js/Django) → Database (MySQL/MongoDB) ]
```

**Technologies:**
- Frontend: React, Angular, Vue  
- Backend: Node.js, Express, Java Spring Boot, Django  
- Database: MySQL, PostgreSQL, MongoDB  

---

## 🧩 4-Tier Architecture (Distributed / Cloud-Based Systems)

An extension of 3-tier, where an additional layer (like **service or middleware**) handles caching, microservices, or API gateways.

**Typical Layers:**
1. Presentation Layer (UI)
2. Application Layer (Backend)
3. Service Layer (Microservices, API Gateway, Caching)
4. Data Layer (Database / Data Warehouse)

**Example:**  
Large-scale systems like **Netflix**, **Uber**, or **Amazon**, using **microservices** and **cloud infrastructure**.

**Visualization:**
```
[ Frontend → Backend → Microservices → Database ]
```

---

## 🧩 5-Tier Architecture (Enterprise / Cloud-Native)

Incorporates an additional layer for scalability, load balancing, or edge computing.  
Common in **enterprise** or **IoT** systems.

**Typical Layers:**
1. Client Layer (User Interface)
2. Presentation Layer (Frontend Logic)
3. Business Layer (Application Logic)
4. Data Layer (Database / Data Services)
5. Cloud or Integration Layer (Load Balancers, APIs, or Cloud Services)

**Example:**  
**Google Cloud apps**, **AWS-based enterprise systems**, or **IoT control dashboards**.

**Visualization:**
```
[ Client → Frontend → Backend → Database → Cloud/Integration ]
```

---

## 🧠 Summary

| Tier | Description | Example |
|------|--------------|----------|
| **1-Tier** | All-in-one app | Old desktop tools (MS Access) |
| **2-Tier** | Client ↔ Database | Banking or library system |
| **3-Tier** | Frontend ↔ Backend ↔ Database | Modern web apps |
| **4-Tier** | Adds Microservices / Middleware | Netflix, Uber |
| **5-Tier** | Adds Cloud / Integration Layer | AWS, Google Cloud |

---

### 💬 Key Idea:
Each higher tier adds **more separation**, **security**, and **scalability** —  
moving from standalone desktop programs to globally distributed cloud systems.


# REST API - Representational State Transfer - Application Programming Interface

# REST API

## Definition
**REST (Representational State Transfer)** is a way for applications to communicate over the web using simple HTTP requests.


---

## Benefits of REST API

### 1. Ease of Use
Simple to understand and implement using standard HTTP methods like GET, POST, PUT, DELETE.

### 2. Stateless
Each request is independent and contains all necessary information — no session is stored on the server.

### 3. Scalability
- **Horizontal:** Easily scale by adding more servers.  
- **Vertical:** Increase resources (CPU, RAM) of existing servers.

### 4. Flexibility
Allows multiple formats (JSON, XML, etc.) and easy integration with various clients and platforms.

### 5. Uniform Interface
Consistent design patterns make it predictable and easier for developers to use.

### 6. Caching
Responses can be cached to reduce server load and improve performance.

### 7. Separation of Concerns
Frontend and backend can evolve independently since they communicate via defined endpoints.

### 8. Interoperability
Can be used across different languages and systems that understand HTTP.

### 9. Ease of Testing
Endpoints can be tested easily using tools like Postman or curl.

### 10. Security
Supports authentication mechanisms like OAuth and HTTPS for secure communication.

# Understanding URL Structure

A **URL (Uniform Resource Locator)** is the address used to access resources on the internet.  
It tells the browser **where** to find something and **how** to retrieve it.

---

## 🧩 Example URL

```
https://blog.example.co.uk:8080/articles?page=2#comments
```

---

## 🏗️ Parts of the URL

| Part | Example | Description |
|------|----------|--------------|
| **Scheme (Protocol)** | `https` | Defines how the resource should be accessed. Common schemes include `http`, `https`, `ftp`, and `mailto`. |
| **Subdomain** | `blog` | A prefix to the main domain used to organize content. For example, `blog.example.com` vs `shop.example.com`. |
| **Domain Name** | `example` | The main name identifying the website or organization. |
| **Top-Level Domain (TLD)** | `.co.uk` | Indicates the category or country of the domain — e.g., `.com`, `.org`, `.net`, `.in`, `.co.uk`. |
| **Port Number** | `8080` | Optional. Specifies the port used by the server. Default ports are `80` for HTTP and `443` for HTTPS. |
| **Path** | `/articles` | Indicates the specific location or resource on the server. |
| **Query Parameters** | `?page=2` | Provide additional data to the server. Used for filtering, searching, pagination, etc. |
| **Fragment (Anchor)** | `#comments` | Points to a specific section within a page. It’s handled by the browser (not sent to the server). Useful for linking to a section or enabling smooth scrolling. |

---

## 🔍 Breakdown of Example

```
https://blog.example.co.uk:8080/articles?page=2#comments
```

| Component | Value | Meaning |
|------------|--------|---------|
| **Scheme** | `https` | Use HTTPS protocol for secure communication |
| **Subdomain** | `blog` | Indicates the blog section of the site |
| **Domain** | `example` | Main website identifier |
| **TLD** | `.co.uk` | Indicates a UK-based commercial entity |
| **Port** | `8080` | Custom port number used by the server |
| **Path** | `/articles` | Resource path (articles section) |
| **Query Parameters** | `page=2` | Instructs server to return the second page of results |
| **Fragment** | `comments` | Scrolls to the comments section within the page |

---

## 🧾 Visual Diagram

```
 ┌──────────────────────────────────────────────────────────────┐
 │ https://blog.example.co.uk:8080/articles?page=2#comments     │
 │ └──┬───┘ └──────┬────────────┘ └─┬┘ └────────────┬────────┘ │
 │  │        │           │             │         │              │
 │Scheme   Subdomain   Domain+TLD     Port      Path      Query+Fragment │
 └──────────────────────────────────────────────────────────────┘
```

---

## ✅ Quick Reference

| Element | Symbol / Separator | Example |
|----------|--------------------|----------|
| Scheme | `://` | `https://` |
| Subdomain | `.` | `blog.example.com` |
| Path | `/` | `/home/about` |
| Query Parameters | `?` then `&` | `?id=1&sort=desc` |
| Fragment | `#` | `#section1` |

---

**In short:**  
A URL is like a full address —  
**Scheme** (how) + **Domain** (where) + **Path & Params** (what) + **Fragment** (which part of it).

---

# CRUD & HTTP Methods

**CRUD** — basic operations for data handling:  
**C**reate → **R**ead → **U**pdate → **D**elete.

---

## 🧠 HTTP Methods Overview

| Method | CRUD | Description |
|---------|------|--------------|
| **GET** | Read | Retrieve data (no body sent). |
| **POST** | Create | Send new data to the server. |
| **PUT** | Update | Replace an entire existing resource. |
| **PATCH** | Update | Modify only specific fields of a resource. |
| **DELETE** | Delete | Remove a resource from the server. |
| **HEAD** | Read | Same as GET but returns headers only (no body). |
| **OPTIONS** | — | Returns allowed HTTP methods for a resource. |
| **CONNECT** | — | Establish a network tunnel (e.g., HTTPS proxy). |
| **TRACE** | — | Echoes the received request (used for debugging). |

---

## 💡 Important Points

- Always **serialize payloads** before sending → `JSON.stringify(data)`.  
- Always **set headers** correctly → `Content-Type: application/json`.  
- Use **PATCH** when updating only part of a record; **PUT** when replacing the full resource.  
- **GET & HEAD** must never modify data (safe & idempotent).  
- **PUT, DELETE** are idempotent (multiple same requests = same result).  
- **POST** is **not idempotent** — every call can create a new resource.

---

# 🌐 Common HTTP Request Headers

| **Header Name** | **Usage / Description** | **Example** |
|-----------------|--------------------------|--------------|
| **Host** | Specifies the domain name of the server (and optionally the port). | `Host: www.example.com` |
| **Origin** | Indicates the origin (protocol + domain + port) of the request — used in CORS. | `Origin: https://client.example.com` |
| **User-Agent** | Identifies the client software (browser, OS, etc.) making the request. | `User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)` |
| **Accept** | Tells the server which content types the client can process. | `Accept: application/json, text/html` |
| **Accept-Language** | Specifies preferred languages for the response. | `Accept-Language: en-US,en;q=0.9` |
| **Accept-Encoding** | Lists accepted compression methods. | `Accept-Encoding: gzip, deflate, br` |
| **Connection** | Controls whether the network connection stays open after the response. | `Connection: keep-alive` |
| **Authorization** | Contains credentials for authenticating the client. | `Authorization: Bearer <token>` |
| **Cookie** | Sends stored cookies to the server. | `Cookie: sessionId=abc123; theme=dark` |
| **Cache-Control** | Directives for caching behavior between client and server. | `Cache-Control: no-cache` |
| **If-Modified-Since** | Used for conditional requests — server returns data only if modified after the given date. | `If-Modified-Since: Tue, 07 Oct 2025 12:00:00 GMT` |

---

# 📤 Common HTTP Response Headers

| **Header Name** | **Usage / Description** | **Example** |
|-----------------|--------------------------|--------------|
| **Set-Cookie** | Sends cookies from the server to the client for session management or preferences. | `Set-Cookie: sessionId=xyz123; HttpOnly; Secure` |
| **Content-Encoding** | Indicates the compression method used on the response data. | `Content-Encoding: gzip` |
| **Cache-Control** | Directs how responses are cached by browsers or proxies. | `Cache-Control: no-store, max-age=0` |
| **Last-Modified** | Shows when the resource was last changed — used with `If-Modified-Since`. | `Last-Modified: Tue, 07 Oct 2025 12:00:00 GMT` |
| **ETag** | Unique identifier for a specific version of a resource — helps with caching and validation. | `ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"` |
| **Date** | Indicates the date and time at which the response was generated. | `Date: Tue, 07 Oct 2025 18:30:00 GMT` |
| **Server** | Identifies the software or technology used by the server. | `Server: nginx/1.25.2` |
| **Content-Type** | Specifies the media type (MIME type) of the returned content. | `Content-Type: application/json; charset=utf-8` |
| **Content-Length** | The size (in bytes) of the response body. | `Content-Length: 5120` |

---

💡 **Tip:**  
- `ETag` + `If-None-Match` and `Last-Modified` + `If-Modified-Since` are used for **efficient caching** (avoid re-downloading unchanged files).  
- Always check `Content-Type` before parsing responses (e.g., JSON vs HTML).  

# 📟 HTTP Status Codes

| **Status Range** | **Category** | **Common Codes** | **Meaning / Reason** |
|-----------------|--------------|-----------------|--------------------|
| **1xx** | Informational | 100, 101 | 100: Continue, 101: Switching Protocols |
| **2xx** | Success | 200, 201, 202, 204, 206 | 200: OK, 201: Created, 202: Accepted, 204: No Content, 206: Partial Content |
| **3xx** | Redirection | 301, 302, 307, 308 | 301: Moved Permanently, 302: Found, 307: Temporary Redirect, 308: Permanent Redirect |
| **4xx** | Client Error | 400, 401, 403, 404, 405 | 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found, 405: Method Not Allowed |
| **5xx** | Server Error | 500, 502, 503, 504, 507 | 500: Internal Server Error, 502: Bad Gateway, 503: Service Unavailable, 504: Gateway Timeout, 507: Insufficient Storage |

---

💡 **Tip:**  
- **2xx** means the request succeeded.  
- **3xx** instructs the client to take additional action.  
- **4xx** indicates a client-side problem.  
- **5xx** indicates a server-side problem.  
