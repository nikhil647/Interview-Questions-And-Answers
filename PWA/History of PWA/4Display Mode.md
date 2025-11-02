# 🧭 Display Modes in PWAs

**Definition:**
`display` in the **Web App Manifest** controls how your web app looks when it’s **launched** —
whether it behaves like a normal browser tab, a native-like app, or a true full-screen experience.

---

## 🔹 1. `browser` — Default (Regular Website)

**Description:**

* App opens **in the browser’s normal UI** — address bar, tabs, back button, etc.
* It’s identical to visiting your site through Chrome/Safari/Firefox manually.
* Happens if you **don’t specify** a `display` property in your manifest.

**Example Manifest:**

```json
{
  "name": "Zoro App",
  "short_name": "Zoro",
  "start_url": "/index.html",
  "display": "browser",
  "theme_color": "#fff",
  "background_color": "#000"
}
```

**What user sees:**

* Normal browser chrome (tabs, URL bar, reload icon).
* Can open DevTools, type URLs, etc.

**When to use:**

* When you don’t want to hide browser controls (e.g., for SEO-first sites).

---

## 🔹 2. `minimal-ui` — Light Browser Chrome

**Description:**

* Looks **almost like an app**, but still has small browser UI controls: back/forward, reload, sometimes URL bar.
* It’s meant as a compromise between native-like and browser-like.
* Supported only on **some Android browsers** (Chrome for Android, Samsung Internet, etc.); **ignored on iOS**.

**Example Manifest:**

```json
{
  "name": "Zoro App",
  "short_name": "Zoro",
  "start_url": "/",
  "display": "minimal-ui",
  "theme_color": "#2196f3",
  "background_color": "#ffffff"
}
```

**What user sees:**

* Small top bar with navigation arrows and refresh icon.
* No tab strip or omnibox (URL field minimized).

**When to use:**

* You want a little browser control but cleaner UI than full browser.
* Good for apps where navigation buttons still help.

---

## 🔹 3. `standalone` — App-Like Mode (Installed PWA Look)

**Description:**

* Launches the site **like a native app** — **no browser UI at all** (no address bar, tabs, or back button).
* Has its **own icon, splash screen, and window**.
* Provides that “installed app” feel.
* Can have separate entry in app switcher (like a native app).
* Commonly used for production PWAs.

**Example Manifest:**

```json
{
  "name": "Zoro App",
  "short_name": "Zoro",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#4CAF50",
  "background_color": "#000000",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**What user sees:**

* Opens as a separate window (like Telegram or Twitter PWA).
* You handle navigation in-app (e.g., custom back button).
* No browser chrome visible.

**When to use:**

* Almost always — the standard choice for real PWAs.

---

## 🔹 4. `fullscreen` — Immersive Mode

**Description:**

* Occupies **entire screen**; **no status bar, no home indicator, no system UI**.
* Ideal for **games, presentations, video players, or kiosks**.
* The most “immersive” mode.

**Example Manifest:**

```json
{
  "name": "Zoro Game",
  "short_name": "ZoroGame",
  "start_url": "/",
  "display": "fullscreen",
  "orientation": "landscape",
  "theme_color": "#000",
  "background_color": "#000"
}
```

**What user sees:**

* Full screen (similar to Android “immersive mode”).
* System bars hidden until user swipes.
* Requires user gesture or install; not allowed automatically in normal browser tabs.

**When to use:**

* Games, media players, exhibitions, or kiosk interfaces.

---

## 🧩 Relationship Between Modes (“Fallback Hierarchy”)

If a browser doesn’t support your chosen mode, it **falls back** in this order:

```
fullscreen → standalone → minimal-ui → browser
```

Example:
If iOS Safari doesn’t support `minimal-ui`, it’ll automatically show `standalone` (if installed) or normal browser.

---

## 🔍 How to Detect Which Mode Is Running

**In JavaScript:**

```js
function getDisplayMode() {
  if (window.matchMedia('(display-mode: fullscreen)').matches) return 'fullscreen';
  if (window.matchMedia('(display-mode: standalone)').matches) return 'standalone';
  if (window.matchMedia('(display-mode: minimal-ui)').matches) return 'minimal-ui';
  return 'browser';
}

console.log('Display mode:', getDisplayMode());
```

**Example Use:**

```js
if (getDisplayMode() === 'standalone') {
  // Hide “Install” button
  document.querySelector('#installBanner').style.display = 'none';
}
```

---

## 🧠 Summary Table

| Mode           | Browser UI Visible  | PWA-Like Window | Use Case                   |
| -------------- | ------------------- | --------------- | -------------------------- |
| **browser**    | Full tabs + URL bar | ❌               | Normal websites            |
| **minimal-ui** | Only basic controls | ✅ (partial)     | Light PWAs                 |
| **standalone** | None                | ✅               | Real PWAs (installed apps) |
| **fullscreen** | None at all         | ✅               | Games / Media / Kiosks     |


Nice — here are detailed, practical notes (with small working examples) on **Display Mode**, **device detection with WURFL.js**, and **`navigator.standalone` / iOS vs Chrome detection**. I’ve included best practices, pitfalls, and alternatives so you can pick what fits your project.

---

# 2) `navigator.standalone` — iOS behavior and “hack” to detect OS

**What it is:**
`window.navigator.standalone` is an Apple non-standard property added in iOS Safari. It’s `true` when the site is launched from the home screen (installed PWA), `false` when running in Mobile Safari, and `undefined` in browsers that don’t implement it (Chrome, Firefox, desktop). Because it’s non-standard it should only be used as a targeted iOS check / fallback. ([groups.google.com][3])

**Important:** Don’t rely on it as the primary detection for “installed” — prefer `matchMedia('(display-mode: standalone)')` and use `navigator.standalone` as an iOS-specific fallback. ([MDN Web Docs][1])

### Detecting iOS + standalone reliably

```js
function isIos() {
  // covers iPhone/iPod/iPad + modern iPadOS (when iPad reports MacIntel and has touch points)
  return /iP(hone|od|ad)/.test(navigator.userAgent) ||
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function isRunningStandalone() {
  // primary: spec media query (works on Chrome, Edge, Android WebView etc.)
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  // fallback: iOS-specific property
  if (window.navigator.standalone === true) return true;
  return false;
}

console.log({ isIos: isIos(), standalone: isRunningStandalone() });
```

**Reasoning / pitfalls**

* `navigator.standalone` exists mainly on iOS Safari and is not available in Chrome (it will be `undefined` there). Using it as the only check will produce false negatives on other platforms. ([crbug.com][4])
* `matchMedia('(display-mode: standalone)')` is the current standard approach and works across modern platforms. ([MDN Web Docs][1])

---

# 3) Device detection in JS — WURFL.js (overview, how it works, tips)

**What WURFL is:**
WURFL (Wireless Universal Resource FiLe) is a device-detection technology that maps User-Agent and client hints to a database of device capabilities (form factor, model, screen size, features). ScientiaMobile provides WURFL.js as a client-side way to get device properties via their cloud or local bundle. It’s widely used when you need higher accuracy than simple UA parsing. ([ScientiaMobile][5])

**WURFL.js editions / capabilities (summary)**

* **WURFL.js Lite** — free, basic capability set (is_mobile, form_factor, complete_device_name sometimes limited).
* **Basic/Standard/Pro** — paid tiers that offer more granular capabilities (exact iPhone/iPad model detection, more properties). ([web.wurfl.io][6])

**How WURFL.js works (high level)**

1. You include a small client-side script (or load WURFL.js via tag).
2. The library either consults a local capability set or calls the WURFL cloud service (often using UA + Client Hints) to get a capabilities object.
3. It exposes a JS object or promise with properties such as `is_mobile`, `form_factor`, `complete_device_name`, screen dimensions, etc. ([docs.scientiamobile.com][7])

**Typical usage (pattern)**

* Load the WURFL script, wait for detection to complete (they provide events or promises), then read properties and adapt UI or send analytics.

Pseudo / example (adapt to the actual WURFL API version you use):

```html
<!-- include WURFL.js per provider instructions (your API key / config) -->
<script src="https://cdn.wurfl.io/wurfl.js"></script>
<script>
  // Many WURFL.js variants provide a promise/event when ready
  WURFL.ready.then(() => {
    console.log('form factor', WURFL.form_factor);
    console.log('is mobile?', WURFL.is_mobile);
    console.log('device name', WURFL.complete_device_name);
    // Use data to tailor UX, analytics tagging, ad targeting, etc.
  });
</script>
```

(Refer to the specific WURFL.js documentation for exact API shapes and initialization — their docs include a Getting Started guide.) ([docs.scientiamobile.com][8])

**Pros**

* High accuracy (especially for model-level detection on iOS devices in paid plans).
* Maintained database of devices and capabilities.
* Useful for ad-targeting, analytics segmentation, or sending tailored assets. ([ScientiaMobile][5])

**Cons / caveats**

* **Privacy / legal**: sending UA and client hints to a third-party cloud can have privacy implications — disclose in privacy policy and consider on-device or server options.
* **Latency**: client-side calls to a cloud may add latency unless cached / optimized. WURFL provides strategies (local bundle, caching, promises) to reduce impact. ([docs.scientiamobile.com][7])
* **Cost**: advanced capabilities (exact model detection) usually require paid tiers. ([ScientiaMobile][5])

**Alternatives / complements**

* **User-Agent Client Hints (Sec-CH-*)** + server detection — modern approach that’s more privacy-focused and structured. WURFL supports client hints delegation. ([web.wurfl.io][6])
* **Libraries**: `Bowser`, `platform.js`, `mobile-detect` — simpler UA parsing (less accurate than WURFL for model-level detection).
* **Server-side WURFL**: do detection on the server and return capabilities to the client (reduces client-side network calls and keeps keys/private data off the client).

**Integration tips**

* Prefer server-side detection for initial HTML rendering (avoid flicker/CLS). Use WURFL server or server-side API and pass capabilities in data attributes or JSON. If you need runtime adaptation, use WURFL.js on the client but cache results locally.
* When using WURFL.js client-side, prefer their promise/event API (avoid race conditions when loading asynchronously). ([docs.scientiamobile.com][8])

---

# 4) Practical cookbook — combine display-mode, WURFL, and navigator.standalone

```js
// 1) Detect platform (iOS vs Android vs Desktop)
function detectPlatform() {
  const ua = navigator.userAgent || '';
  const isIos = /iP(hone|od|ad)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  return { isIos, isAndroid, ua };
}

// 2) Detect installed (primary + fallback)
function isInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

// 3) Use WURFL.js when available (pseudo)
function handleWurflCapabilities(wurfl) {
  // wurfl could be WURFL global object or promise - adapt to your WURFL.js version
  console.log('WURFL capabilities', wurfl.form_factor, wurfl.is_mobile, wurfl.complete_device_name);
  // Example: reduce animations on low-end devices
  if (wurfl.form_factor === 'Smartphone' && wurfl.hardwareConcurrency <= 2) {
    document.documentElement.classList.add('reduced-motion');
  }
}

// Usage
const platform = detectPlatform();
console.log('platform', platform, 'installed?', isInstalled());
if (window.WURFL) {
  // adapt depending on WURFL API: some expose promise Wurfl.ready or WURFL.ready
  WURFL.ready?.then(handleWurflCapabilities).catch(()=>{/*fallback*/});
}
```

---

# 5) Quick checklist / best practices

* Prefer `window.matchMedia('(display-mode: standalone)')` for installed/standalone detection. Use `navigator.standalone` only as iOS fallback. ([MDN Web Docs][1])
* If you use WURFL.js: read their Getting Started docs and handle async detection correctly (promises/events). Cache results and consider server-side detection for SSR. ([docs.scientiamobile.com][8])
* Consider client hints (Sec-CH-UA) + server detection as modern alternative for privacy/accuracy. WURFL supports client hints delegation. ([web.wurfl.io][6])
* Always degrade gracefully: responsive CSS + media queries + feature detection beats brittle UA-only logic.

---

# 6) Useful links (docs I used)

* WURFL.js docs / getting started (ScientiaMobile). ([docs.scientiamobile.com][8])
* WURFL product page (capabilities overview). ([ScientiaMobile][5])
* Detecting PWA display-mode (web.dev / MDN examples). ([web.dev][2])
* StackOverflow / browser issues thread about standalone detection (practical notes). ([Stack Overflow][9])

---

If you want, I can:

* paste a **copy-paste-ready WURFL.js example** using the exact snippet from ScientiaMobile docs (I can pull the canonical snippet).
* produce a **tiny demo page** that shows different UI for `standalone` vs `browser` vs `mobile` using WURFL + `matchMedia`.

Which of those would help most — demo page, or the exact WURFL.js snippet from their docs?

[1]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Create_a_standalone_app?utm_source=chatgpt.com "Create a standalone app - Progressive web apps | MDN"
[2]: https://web.dev/learn/pwa/detection?utm_source=chatgpt.com "Detection - PWA"
[3]: https://groups.google.com/a/dartlang.org/g/misc/c/iL_C3A8wE94?utm_source=chatgpt.com "navigator.standalone"
[4]: https://crbug.com/chromium/289113?utm_source=chatgpt.com "[Webapps] support navigator.standalone [40332437]"
[5]: https://scientiamobile.com/wurfl-js/?utm_source=chatgpt.com "WURFL.js"
[6]: https://web.wurfl.io/?utm_source=chatgpt.com "WURFL.js - WURFL.io"
[7]: https://docs.scientiamobile.com/documentation/wurfl-js/wurflDotjs-lite-getting-started-guide?utm_source=chatgpt.com "ScientiaMobile WURFL.js Lite Getting Started Guide"
[8]: https://docs.scientiamobile.com/documentation/wurfl-js/wurflDotjs-getting-started-guide?utm_source=chatgpt.com "ScientiaMobile WURFL.js Basic/Standard/Pro Getting Started ..."
[9]: https://stackoverflow.com/questions/21125337/how-to-detect-if-web-app-running-standalone-on-chrome-mobile?utm_source=chatgpt.com "How to detect if web app running standalone on Chrome ..."
