## 🌐 **PWA Installation Criteria**

### ✅ **Common Requirements (All Devices)**

A web app can be installed as a PWA **only if it meets these conditions:**

1. **Served over HTTPS** – ensures secure connection.
2. **Has a valid Web App Manifest (`manifest.json`)** – defines name, icon, theme color, start URL, etc.
3. **Has a Service Worker registered** – enables offline use, caching, and installability.
4. **User Engagement** – user must visit/interact with the site at least once.
5. **Install Prompt Supported by Browser** – browser must support `beforeinstallprompt` event.

---

## 💻 **Platform-Wise Installation Criteria**

### 🧭 **Desktop (Windows / macOS / Linux)**

**Browser:** Chrome, Edge, Brave, or Firefox (partial).
**Criteria:**

* Manifest + Service Worker present.
* HTTPS required.
* User must visit at least twice (Chrome heuristic).
* Install option appears in address bar or menu (“Install App”).

**Installation:**

* Installed like a native app (standalone window, in Start Menu or Applications folder).

---

### 📱 **Android**

**Browser:** Chrome, Edge, Brave, Firefox for Android.
**Criteria:**

* HTTPS + Manifest + Service Worker.
* Browser automatically shows “Add to Home screen” prompt.
* Can also manually add via browser menu.

**Installation:**

* Appears as an app icon on the home screen.
* Runs fullscreen (no browser UI).

---

### 🍎 **iOS (iPhone / iPad)**

**Browser:** Safari only.
**Criteria:**

* HTTPS required.
* `manifest.json` is **ignored** — uses meta tags instead.
* Service Worker required (for offline).
* User must manually tap **Share → Add to Home Screen** (no automatic prompt).

**Installation:**

* Launches as a standalone app.
* Limited APIs (no push notifications until iOS 16.4+).

---

### 🧠 **Extra Notes**

* PWAs can also be installed on **ChromeOS** just like native apps.
* **Windows** PWAs show up in “Programs & Features.”
* **macOS** PWAs appear in Applications folder.
* **Storage** and **permissions** are isolated per PWA.

---

## ❓**Can We Install More Than One PWA on a Device?**

✅ **Yes, absolutely!**

You can install **multiple PWAs** on the same device — even if they come from the **same domain** (as long as each has a different `start_url` or `scope`).

### Example:

* `example.com/news` → “News App”
* `example.com/shop` → “Shop App”
  Both can be installed and run independently.

Each PWA:

* Has its **own icon**, cache, and storage space.
* Works offline independently.
* Can be updated or uninstalled separately.

---

## 📝 **PWA Quick Notes (Summary Sheet)**

| Topic               | Key Point                                 |
| ------------------- | ----------------------------------------- |
| **Definition**      | Web app installable like native app       |
| **Core Files**      | `manifest.json`, `service-worker.js`      |
| **Protocol**        | Must use HTTPS                            |
| **Offline Support** | Managed via Service Worker                |
| **Installability**  | Triggered by `beforeinstallprompt`        |
| **Storage**         | Independent cache, storage per app        |
| **Cross-platform**  | Works on Android, Desktop, limited on iOS |
| **Multiple PWAs**   | Yes, can install more than one            |
| **Updates**         | Auto-updates when service worker changes  |
| **Uninstall**       | Same as uninstalling a native app         |

---