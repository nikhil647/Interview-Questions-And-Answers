# 🧠 Iframe Security Vulnerabilities & Mitigation Guide (Simplified + Structured)

## 📘 Table of Contents
1. Clickjacking (UI Redressing)
2. Data Theft via JavaScript / postMessage
3. Session & Cookie Theft
4. Core Mitigation Strategies
5. Defense-in-Depth Checklist

---

# 1. Clickjacking (UI Redressing)

### 🔍 What It Is
Clickjacking happens when an attacker loads your webpage inside an invisible iframe to trick a user into clicking real buttons.

```
Attacker Page
┌──────────────────────────────┐
│  "Click for Free Money!"     │
│  ┌────────────────────────┐  │
│  │ Transparent iframe     │  │
│  │ (delete-account)       │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### 🧩 Root Cause
Browsers allow framing unless blocked.

### ✅ Prevention
```
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none'
```

---

# 2. Data Theft via JavaScript / postMessage

If you do not validate `event.origin`, any attacker can communicate with your page.

### 💣 Vulnerable Example
```js
window.addEventListener("message", (event) => {
  if (event.data.action === "getUser") {
    event.source.postMessage({ user: "admin" }, "*");
  }
});
```

### 🚨 Real Attack Flow
1. Attacker iframes your site  
2. Sends fake messages  
3. Your site responds with sensitive data  
4. Can even trigger money transfers silently

### 🛡️ Safe Version
```js
window.addEventListener("message", (event) => {
  if (event.origin !== "https://yourdomain.com") return;
  if (event.data.action === "getUser") {
    event.source.postMessage({ user: "admin" }, event.origin);
  }
});
```

---

# 3. Session & Cookie Theft

Even if attacker cannot read cookies, they can **use your session** inside an iframe because the browser sends cookies automatically.

### ⚠️ Attack Flow
```html
<iframe src="https://bank.com/dashboard"></iframe>
```

1. Browser sends victim cookies automatically  
2. If CSRF/postMessage/clickjacking protections are weak → attacker performs authenticated actions  
3. Attacker never sees cookies but uses the session indirectly

---

# 🔐 Cookie Hardening

```
httpOnly: true
secure: true
sameSite: 'strict'
```

---

# 4. Core Mitigation Strategies

| Area | Action | Example |
|------|--------|---------|
| Frame Blocking | Prevent framing | `X-Frame-Options: DENY` |
| CSP | Limit who can frame | `frame-ancestors 'none'` |
| Cookie Security | Harden cookies | `sameSite: strict` |
| CSRF | Tokens | `<input type="hidden">` |
| postMessage | Validate origin | `event.origin === trusted` |
| Sandbox | Limit iframe permissions | `<iframe sandbox>` |

---

# 5. Defense-in-Depth Checklist

- [ ] X-Frame-Options set  
- [ ] CSP frame-ancestors set  
- [ ] HttpOnly + Secure + SameSite cookies  
- [ ] CSRF tokens on all POST/PUT/DELETE  
- [ ] Validate postMessage origins  
- [ ] No `'*'` in postMessage  
- [ ] HTTPS everywhere  
- [ ] Iframe sandboxing  

---

# 🧪 Testing

```
curl -I https://yoursite.com | grep -i frame
curl -I https://yoursite.com | grep -i content-security-policy
curl -I https://yoursite.com/login | grep -i set-cookie
```