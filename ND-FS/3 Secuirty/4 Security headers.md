### 🧱 1. **X-Powered-By**

**Purpose:**
Hides the technology used by your server (e.g., Express, PHP, ASP.NET).
Attackers can use this info to find vulnerabilities.

**Example:**

```http
X-Powered-By: Express
```

**Fix (remove it):**
Disable or remove this header.
**Example (Express.js):**

```js
app.disable('x-powered-by');
```

---

### 🔐 2. **Referrer-Policy**

**Purpose:**
Controls how much referrer information (URL path, query, etc.) is shared when navigating to another site.

**Example:**

```http
Referrer-Policy: no-referrer
```

**Common values:**

* `no-referrer` → Don’t send referrer info
* `same-origin` → Send only for same site
* `strict-origin-when-cross-origin` → Secure default (do not send any query params only )

---

### 🧾 3. **X-Content-Type-Options**

**Purpose:**
Prevents browsers from guessing the file type (MIME sniffing).
Helps stop malicious content from being executed.

**Example:**

```http
X-Content-Type-Options: nosniff
```

✅ Always use `nosniff`.

---

### 🛡️ 4. **X-XSS-Protection**

**Purpose:**
Tells browser to block or sanitize pages if XSS (Cross-Site Scripting) is detected.
Note: Modern browsers mostly ignore it (use CSP instead).

**Example:**

```http
X-XSS-Protection: 1; mode=block
```

* `1` = enable protection
* `mode=block` = stop rendering page if XSS found

---

### 🌐 5. **Strict-Transport-Security (HSTS)**

**Purpose:**
Forces browsers to use **HTTPS only**, not HTTP.
Prevents man-in-the-middle attacks.

**Example:**

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

* `max-age` → how long (in seconds) to enforce HTTPS
* `includeSubDomains` → also applies to subdomains
* `preload` → can be added to browser preload list

---

### ✅ Summary Table

| Header                    | Purpose                  | Example                                                                   |
| ------------------------- | ------------------------ | ------------------------------------------------------------------------- |
| X-Powered-By              | Hide tech info           | *(remove it)*                                                             |
| Referrer-Policy           | Control referrer info    | `Referrer-Policy: no-referrer`                                            |
| X-Content-Type-Options    | Prevent MIME sniffing    | `X-Content-Type-Options: nosniff`                                         |
| X-XSS-Protection          | Basic XSS block (legacy) | `X-XSS-Protection: 1; mode=block`                                         |
| Strict-Transport-Security | Enforce HTTPS            | `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` |

