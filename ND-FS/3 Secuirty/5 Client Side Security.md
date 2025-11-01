## 🛡️ Client-Side Security

### 1️⃣ Storing Sensitive Data on Storage

Client-side storage (like `localStorage`, `sessionStorage`, `IndexedDB`, or `cookies`) is **not secure** for confidential data.
Attackers can access it through **XSS attacks** or **device compromise**.

#### ✅ Best Practices

a) **Store sensitive data on the server**
→ Keep tokens, passwords, and user info safely in backend databases.

b) **Encrypt data before storing (if necessary)**
→ Example: AES encryption for local caching.
Even though encryption isn’t perfect, it’s better than plain text.

c) **Use short-lived tokens (token expiry)**
→ Access tokens should expire quickly to limit risk if stolen.

---

### 2️⃣ Authentication

Client-side authentication should focus on **secure token handling** and **session control**.

#### ✅ Best Practices

a) **Use JWT or OAuth2**
→ For token-based authentication with scopes and expiry.

b) **Session token expiry**
→ Tokens should automatically expire after a short time or inactivity.

c) **Use MFA (Multi-Factor Authentication)**
→ Adds extra protection against stolen credentials.

---

### 3️⃣ Data Integrity

Ensure data sent or stored hasn’t been tampered with.

#### ✅ Best Practices

a) **Checksum / Hash validation**
→ Use SHA-256 or similar to verify data integrity between client and server.
Example: Verify file uploads or API payloads using checksum comparison.

---

### 4️⃣ Storage Limit

Each browser storage type has its own **limit (usually 5–10 MB)** per origin.

| Storage Type     | Typical Limit | Persistent?                  | Scope           | Notes                                         |
| ---------------- | ------------- | ---------------------------- | --------------- | --------------------------------------------- |
| `localStorage`   | ~5–10 MB      | Yes                          | Per domain      | Accessible via JavaScript                     |
| `sessionStorage` | ~5 MB         | Until tab closes             | Per tab         | Good for temporary session data               |
| `IndexedDB`      | ~50 MB+       | Yes                          | Per domain      | Structured storage for large data             |
| `Cookies`        | ~4 KB each    | Optional (depends on expiry) | Per domain/path | Sent with every request (affects performance) |

👉 Use the **Navigator API** to check storage usage:

```js
navigator.storage.estimate().then(({usage, quota}) => {
  console.log(`Used: ${(usage/1024/1024).toFixed(2)} MB`);
  console.log(`Available: ${(quota/1024/1024).toFixed(2)} MB`);
});
```

---

### 5️⃣ Session Management

Secure handling of user sessions is crucial to prevent **session hijacking**.

#### ✅ Best Practices

* Use **HTTP-only, Secure cookies** for tokens (prevents JavaScript access).
* Implement **SameSite cookies** to prevent CSRF.
* **Invalidate session** on logout or inactivity.
* Rotate tokens frequently.
* Use **server-side session tracking** to detect anomalies (like multiple IPs).

---

### ⚙️ Quick Summary

| Area               | Key Practice                                          |
| ------------------ | ----------------------------------------------------- |
| Storage            | Avoid storing sensitive data; use encryption & expiry |
| Authentication     | Use JWT/OAuth + MFA                                   |
| Data Integrity     | Verify using checksum/hash                            |
| Storage Limit      | 5–10 MB (check with Navigator API)                    |
| Session Management | Use secure, short-lived sessions with logout handling |
