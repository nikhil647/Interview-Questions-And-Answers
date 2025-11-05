## 🧠 What Is the Permission Policy Header?

The **`Permissions-Policy`** header lets your **server control what browser features** (like geolocation, camera, microphone, fullscreen, etc.)
your website — and any **embedded iframes** — are allowed to use.

So even if a 3rd-party iframe (like an ad) tries to access a sensitive API,
the browser will **block it before the permission prompt appears**.

---

## 🧩 Problem Example

Let’s say your page includes ads:

```html
<iframe src="https://ads-network.example/ad.html"></iframe>
```

That ad script might secretly run:

```js
navigator.geolocation.getCurrentPosition(...)
```

Then Chrome shows:

> “Allow this site to access your location?”

The user blames **your website**, not the ad.
That’s where **Permission Policy** saves you.

---

## ✅ Node.js (Express) Implementation

### Example 1 — Block All Sensitive APIs for iframes

```js
import express from "express";
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=(), usb=()"
  );
  next();
});

app.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>
  <iframe src="https://ads.example.com"></iframe>`);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

🛡️ **Effect:**
No page or iframe loaded can use:

* `geolocation`
* `microphone`
* `camera`
* `payment`
* `usb`

---

### Example 2 — Allow Geolocation Only for Your Own Site

```js
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "geolocation=(self)");
  next();
});
```

➡️ Main site can call `navigator.geolocation`,
but **iframes (ads, analytics, widgets)** cannot.

---

### Example 3 — Allow Camera Only for Trusted Subdomain

```js
app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    'camera=(self "https://video.yourdomain.com"), microphone=()'
  );
  next();
});
```

➡️ Your main site + `video.yourdomain.com` can use the camera.
No one else can.

---

### Example 4 — Combine with Helmet (Recommended)

Use the popular security middleware **helmet** for simplicity:

```bash
npm install helmet
```

```js
import helmet from "helmet";

app.use(
  helmet({
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "same-origin" },
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(self), camera=(), microphone=(), payment=()"
  );
  next();
});
```

---

## 🧠 Common Use Cases

| Goal                     | Header Example                                | Effect                      |
| ------------------------ | --------------------------------------------- | --------------------------- |
| Block all access         | `geolocation=()`                              | Nobody can access           |
| Allow only your site     | `geolocation=(self)`                          | Only your main site         |
| Allow one trusted iframe | `camera=(self "https://trusted.example.com")` | Only your iframe            |
| Disable mic globally     | `microphone=()`                               | No mic access               |
| Disable payments         | `payment=()`                                  | Prevent Payment Request API |

---

## 🧩 Visual Concept (Text Diagram)

```
Your Website (main page)
│
├── iframe: ads.example.com ❌ (blocked geolocation)
├── iframe: trusted.video.com ✅ (camera allowed)
└── iframe: analytics.example.com ❌ (microphone blocked)
```

---

## 🚀 Key Takeaways

* Avoid iframes when possible (attack surface).
* If needed (ads, analytics, widgets), **sandbox** and **restrict** them.
* Use **`Permissions-Policy`** headers to control browser-level permissions.
* Always serve these headers from **your backend (Node.js)** — not frontend JS.
