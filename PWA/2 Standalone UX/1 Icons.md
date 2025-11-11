# 🧭 **PWA (Progressive Web App) Context Notes**

## ✅ **If PWA Criteria Passes**

When all **PWA installability criteria** are met:

* It becomes a **full Android native package (WebAPK)**
* Contains only **metadata** (actual app still served from the web)
* The **APK installs silently** in the background
* App **icon appears on home screen and launcher** like a native app
* Requires **Google Chrome with Play Services**
* Works on devices with **internet access (e.g. Samsung devices)**
* **HarmonyOS (Huawei)** supports a **similar concept**

> 💡 **Result:** The app appears and behaves like a native Android app, without the browser icon overlay.

---

## ⚠️ **If PWA Criteria Fail**

* The app is **not installed as WebAPK**
* The **icon shows browser badge** (small Chrome/Edge icon at bottom-right)
* Appears less like a native app and more like a browser shortcut

---

# 🖼️ **PNG Icons (Color Space: sRGB)**

### 🔹 Format & Use

* **Format:** PNG
* **Color space:** sRGB
* **Usage:**

  * **Android** devices
  * **Desktop OS** (Windows, macOS, Linux)

### 🔹 Behavior

* If no exact icon size is available → **closest available size is used**
* Used by browsers for **installation icons, splash screens, and app manifests**

### 🔹 Recommended Sizes

| Purpose                  | Recommended Size |
| ------------------------ | ---------------- |
| Default Icon             | **192x192 px**   |
| Play Store / WebAPK      | **512x512 px**   |
| High Resolution Displays | **1024x1024 px** |

### 🔹 Deprecated Sizes

* **72x72**
* **152x152**
* **384x384**

---

# 📐 **SVG Icons**

### 🔹 Format & Usage

* **Format:** SVG
* **Usage:**

  * On **Android WebAPK** (some devices)
  * On **desktop** (depending on OS/browser support)

### 🔹 Notes

* SVGs are **scalable and lightweight**
* Ideal fallback for platforms that support **vector icons**
* Recommended to include both **SVG and PNG** in manifest for compatibility.


Got it 😅 — here’s a **super short version** you can remember easily 👇

---

### 🧾 Manifest basics

`manifest.json` defines:

```json
{
  "name": "My App",
  "start_url": "/",
  "display": "standalone",
  "icons": [ ... ]
}
```

---

### 🖼️ Maskable Icon (important!)

* Add property `"purpose": "maskable"` to your icon.
* Example:

  ```json
  {
    "src": "icon-512-maskable.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "maskable"
  }
  ```
* Prevents your icon from getting **shrunk or cut off** on Android launchers.
* Makes your app look **native and clean**.

---

### 🎨 Use [maskable.app](https://maskable.app/)

* Upload your icon → preview how it looks under different shapes (circle, squircle, etc).
* Adjust spacing until it looks good → export.
* Add that icon to your manifest.

---

✅ **Quick summary**

* Always include a maskable icon.
* Keep main logo in the *center safe zone*.
* Use `purpose: "maskable"`, not `"any maskable"`.
* Test with Lighthouse or Chrome → Application → Manifest tab.
---

## 📱 PWA Notes — App Icons (Android + iOS)

### 🧩 1. Android / General (via Manifest)

PWAs on Android and Chrome use icons from the **Web App Manifest** (`manifest.json`).

Example:

```json
"icons": [
  {
    "src": "icon-512x512.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "maskable"
  }
]
```

✅ Android picks icons automatically from here when installed.

---

### 🍎 2. iOS (Apple Devices)

iOS **does not fully support `manifest.json` icons** 😕
So, you must specify icons manually in the **HTML `<head>`** using:

```html
<link rel="apple-touch-icon" href="ios_icon.png">
```

You can provide multiple sizes:

```html
<link rel="apple-touch-icon" href="ios_icon-120.png" sizes="120x120">
<link rel="apple-touch-icon" href="ios_icon-180.png" sizes="180x180">
```

✅ This ensures a proper icon appears when the user taps **“Add to Home Screen”** in Safari.

---

### 🖼️ 3. Summary

| Platform     | Uses Manifest? | Icon Source                     | Example                                         |
| ------------ | -------------- | ------------------------------- | ----------------------------------------------- |
| Android      | ✅ Yes          | `manifest.json`                 | `"icons": [ ... ]`                              |
| iOS (Safari) | ❌ No           | `<link rel="apple-touch-icon">` | `<link rel="apple-touch-icon" href="icon.png">` |

---

### 💡 Tips

* Always include at least one `apple-touch-icon` for iOS.
* Use **512×512** for manifest icons (Android).
* Use **120×120, 180×180** for iOS touch icons.
* For Android, prefer `"purpose": "maskable"` → design via [maskable.app](https://maskable.app/).



