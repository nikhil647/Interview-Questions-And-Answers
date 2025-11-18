# 🛡️ CORS (Cross-Origin Resource Sharing) — Complete Notes

CORS is a **browser security mechanism** that determines **whether a web page from one origin can access resources from another origin**.

---

# 1. 🌍 What is an Origin?
An **origin** = `protocol` + `hostname` + `port`

Examples:
- https://example.com  
- http://localhost:3000  

If any part differs → it’s **cross‑origin**.

---

# 2. 🔥 Why CORS Exists
To stop malicious websites from reading sensitive data using the victim’s cookies.

Example:
Evil site → tries to fetch bank data → **browser blocks JS from reading it**.

---

# 3. 🧠 How Browser Handles CORS

## 3.1 Simple Requests
Methods: GET, POST, HEAD  
Headers: Only simple headers allowed.

Server must return:
```
Access-Control-Allow-Origin: <origin>
```

## 3.2 Non‑Simple (Preflight)
Triggered by:
- PUT, PATCH, DELETE
- Authorization header
- Content-Type: application/json

Browser sends an **OPTIONS** request first.

Server must return:
```
Access-Control-Allow-Origin: <origin>
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type
```

## 3.3 Credentials (cookies/sessions)
Frontend:
```js
fetch(url, { credentials: "include" });
```

Server:
```
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://frontend.com
```

`*` is not allowed with credentials.

---

# 4. 🎯 Frontend Capabilities

### ✔ Frontend CAN:
- Send credentials
- Add custom headers (but triggers preflight)

### ✖ Frontend CANNOT:
- Modify CORS policy
- Bypass CORS
- Force browser to ignore preflight

CORS is **100% server‑controlled**.

---

# 5. 🛠 Setting CORS in Node.js

## 5.1 Express + cors (recommended)
```bash
npm install cors
```

```js
const cors = require("cors");
app.use(cors());
```

### Restrict origin
```js
app.use(cors({
  origin: "https://frontend.com"
}));
```

### Credentials
```js
app.use(cors({
  origin: "https://frontend.com",
  credentials: true
}));
```

---

## 5.2 Manual Headers (without cors)

```js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://frontend.com");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
```

---

# 6. 🎛 CORS Headers Explained

| Header | Purpose |
|--------|---------|
| **Access-Control-Allow-Origin** | Which site can access |
| **Access-Control-Allow-Credentials** | Allow cookies/auth |
| **Access-Control-Allow-Methods** | Allowed HTTP methods |
| **Access-Control-Allow-Headers** | Custom headers |
| **Access-Control-Expose-Headers** | Which response headers JS can read |
| **Access-Control-Max-Age** | Cache preflight result |

---

# 7. ❌ Common CORS Errors

### Missing allow origin
“**No Access-Control-Allow-Origin** header found”

### Credentials with *
Not allowed:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```

### Preflight failed
OPTIONS request missing:
```
Access-Control-Allow-Methods
Access-Control-Allow-Headers
```

---

# 8. ✔ Summary
- CORS is browser-enforced.
- Only backend can configure it.
- Preflight is automatic.
- Frontend cannot bypass CORS.
- Node.js supports CORS easily via `cors` package or manual headers.
