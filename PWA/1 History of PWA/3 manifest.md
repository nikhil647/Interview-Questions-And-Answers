
## 📘 **Web App Manifest — Basics (Simplified Notes)**

The **`manifest.json`** file tells the browser **how your PWA should behave when installed** — like an app’s identity card.

It includes things like name, icon, start URL, colors, etc.
Without it, your web app **won’t be installable**.

---

### 🧩 **Key Properties**

#### 🆔 `id`

* **Uniquely identifies the PWA**.
* Recently added (Chrome 96+).
* Older PWAs (like Starbucks) don’t have it — the browser **computes an ID** automatically using `start_url`.
* Recommended: Always define your own ID.

**Example:**

```json
"id": "/?source=pwa"
```

If you don’t define it, users installing from different URLs (like `/about` or `/home`) could create **duplicate installs** of the same app.

---

#### 🏁 `start_url`

* The page that opens when the user launches the app.
* **Very important** — defines what “home” of your app is.

**Example:**

```json
"start_url": "/index.html"
```

> ⚠️ If not defined, and user installs PWA from `/about`, then `/about` becomes the start page — confusing experience.

---

#### 🌐 `scope`

* Defines **which URLs belong to your PWA** (the navigation area the app can handle).
* Anything **outside this scope** opens in the browser, not inside the app window.

**Example:**

```json
"scope": "/"
```

Means your app controls all URLs under the root path.
If you set `"scope": "/shop/"`, pages like `/shop/item1` open inside app, but `/blog` opens in browser.

> Think of it as the “boundary” of your PWA.

---

#### 🧱 `name`

* Full name of your app (used in install prompt and desktop name).

**Example:**

```json
"name": "Starbucks Coffee"
```

---

#### 🔤 `short_name`

* Shown under the app icon (on home screen).
* Keep it **≤ 11 characters** or it might get truncated on mobile.

**Example:**

```json
"short_name": "Starbucks"
```

> Tip: This is the name visible below the icon when installed.

---

#### 🖥️ `display`

Controls **how the PWA looks** when opened.

| Value        | Behavior                               |
| ------------ | -------------------------------------- |
| `fullscreen` | No browser UI at all (used for games)  |
| `standalone` | Looks like a native app (no URL bar) ✅ |
| `minimal-ui` | Shows small browser UI                 |
| `browser`    | Normal tab mode                        |

**Recommended for PWAs:**

```json
"display": "standalone"
```

---

#### 🎨 `theme_color`

* Used for **status bar color** (on mobile + splash screen).
* Don’t use transparency or non-standard colors (stick to **CSS2 / CSS3 color names** or `rgb()`/`hex`).

**Example:**

```json
"theme_color": "#00704A"
```

> 💡 If no icon is provided, the first letter of the app name will be used on a **background based on theme_color**.

---

#### 🧁 `background_color`

* Used as **splash screen background** while app is loading.

**Example:**

```json
"background_color": "#ffffff"
```

---

### ⚙️ **Optional (But Useful)**

| Field         | Purpose                                            |
| ------------- | -------------------------------------------------- |
| `icons`       | Different icon sizes for various devices           |
| `description` | Short summary shown in install prompt              |
| `orientation` | Lock to portrait or landscape                      |
| `categories`  | App store categorization (e.g. "food", "shopping") |

---

### 🧠 **In Short**

| Property           | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `id`               | Unique app identifier                    |
| `start_url`        | Entry point when opened                  |
| `scope`            | Defines which pages are “inside” the app |
| `name`             | Full app name                            |
| `short_name`       | Label under icon                         |
| `display`          | App’s display mode                       |
| `theme_color`      | Status bar & icon background color       |
| `background_color` | Splash screen color                      |


