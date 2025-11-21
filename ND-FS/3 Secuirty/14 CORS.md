# 🛡️ CORS (Cross-Origin Resource Sharing) — Corrected & Clear Notes

CORS is a **browser security feature** that controls **which websites can make requests to your server and read the response**.

---

# 1. 🌍 What is an Origin?
An **origin** = `protocol` + `hostname` + `port`  
Difference in ANY of the three makes it **cross-origin**.

---

# 2. 🔥 Why CORS Exists
To prevent malicious websites from reading sensitive data using your cookies.

Example:  
If you're logged into **bank.com**, another site **evil.com** cannot read your account details because browsers block it unless CORS allows it.

---

# 3. 🧠 How Browsers Handle CORS

## ✔ 3.1 Simple Requests (NO Preflight)
Simple requests must follow these rules:
- Methods: **GET, POST, HEAD**
- Content-Type must be one of:
  - `text/plain`
  - `multipart/form-data`
  - `application/x-www-form-urlencoded`
- No custom headers

Browser sends the request directly.  
Server must return:
```
Access-Control-Allow-Origin: <origin>
```

---

## ✔ 3.2 Preflight Requests — Correct Explanation
Preflight happens when the browser needs **permission** before sending the real request.

Triggered by:
- Methods: **PUT, PATCH, DELETE**
- Content-Type: **application/json**
- Custom headers (e.g., Authorization)
- (`credentials: "include"` does NOT trigger preflight)

Browser sends:
```
OPTIONS /route
Origin: https://frontend.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Authorization, Content-Type
```

Server must respond:
```
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 600
```

If any header is missing → **preflight fails** → actual request never happens.

---

## ✔ 3.3 Credentials (cookies/sessions)
Credentials include:
- Cookies  
- Authorization header  
- TLS client certificates  

Frontend:
```js
fetch(url, { credentials: "include" });
```

Server MUST return:
```
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Credentials: true
```

Wildcard (`*`) cannot be used with credentials.

---

# 4. 🎯 What Frontend Can & Cannot Do

### ✔ Frontend CAN:
- Send cookies  
- Add custom headers  
- Trigger preflight  

### ✖ Frontend CANNOT:
- Disable or bypass CORS  
- Stop preflight  
- Modify server’s CORS rules  
- Force browser to ignore CORS  

---

# 5. 🛠 Setting CORS in Node.js

## 5.1 Using cors package
```js
const cors = require("cors");
app.use(cors());
```

Restrict origin:
```js
app.use(cors({ origin: "https://frontend.com" }));
```

Credentials:
```js
app.use(cors({
  origin: "https://frontend.com",
  credentials: true
}));
```

---

## 5.2 Manual headers
```js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://frontend.com");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});
```

---

# 6. 🎛 CORS Headers Summary

| Header | Purpose |
|--------|---------|
| **Access-Control-Allow-Origin** | Which origin may access |
| **Access-Control-Allow-Credentials** | Allow cookies/auth |
| **Access-Control-Allow-Methods** | Allowed HTTP methods |
| **Access-Control-Allow-Headers** | Allowed custom headers |
| **Access-Control-Expose-Headers** | Headers readable by JS |
| **Access-Control-Max-Age** | Cache preflight |

---

# 7. ❌ Common CORS Errors

1. **Missing Access-Control-Allow-Origin**  
2. **Using wildcard with credentials**  
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Credentials: true
   ```
   ❌ Not allowed  
3. **Failed preflight** (missing headers)

---

# 8. ✔ Summary
- Preflight = browser permission check  
- Only backend controls CORS  
- Cookies require **credentials: true** + specific origin  
- Frontend cannot bypass CORS  
- Node.js makes configuration easy  
