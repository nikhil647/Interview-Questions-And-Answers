# SSJI (Server-Side JavaScript Injection) — Notes (with your examples)

## 1) Injection attacks in SQL / NoSQL (example)

**Vulnerable example (from your slide):**

```js
// Example (insecure):
const userInput = '{"username": "admin", "password": {"$ne": null}}';
const query = `SELECT * FROM users WHERE data = '${userInput}'`;
```

**Why it's bad:** embedding raw user-controlled JSON/text into a query can let attackers inject query operators or syntax (NoSQL/SQL injection).

**Mitigation:**

* Use parameterized queries / prepared statements (do **not** string-interpolate user input).
* Parse & validate JSON before use, and use DB driver parameters instead of string concat.

```js
// safer (psuedocode)
const data = JSON.parse(req.body.data);
db.query('SELECT * FROM users WHERE data = $1', [JSON.stringify(data)]);
```

---

## 2) Resource exhaustion (Denial-of-Service) (example)

**Vulnerable example (from your slide):**

```js
// Example (insecure):
const userInput = '{"data": "' + 'A'.repeat(1000000) + '"}';
const data = JSON.parse(userInput);
```

**Why it's bad:** a huge payload or repeated characters can consume CPU/memory while parsing or processing → DoS.

**Mitigation:**

* Enforce request body size limits (e.g., `express.json({ limit: '100kb' })`).
* Validate lengths/limits before heavy processing.
* Rate-limit requests and reject oversized payloads early.

---

## 3) Deserialization vulnerabilities (example)

**Vulnerable example (from your slide):**

```js
const userInput = '{"type": "Buffer", "data": [72, 101, 108, 108, 111]}';
const buffer = JSON.parse(userInput);
const text = Buffer.from(buffer).toString();
```

**Why it's bad:** blindly deserializing arbitrary structures can create unexpected objects or binary content that gets executed/used insecurely.

**Mitigation (from slide — secure deserialization + validation):**

```js
const serializedData = req.body.data;
try {
  const deserializedObject = JSON.parse(serializedData); // JSON example
  if (isValidData(deserializedObject)) {
    // process safely
  } else {
    res.status(400).send('Invalid data');
  }
} catch (error) {
  res.status(500).send('Error while deserializing data');
}

function isValidData(data) {
  // implement validation logic:
  // - check types, required fields
  // - disallow unexpected object types (no functions, no Buffer wrappers you don't expect)
  // - whitelist allowed keys/structures
  return true; // replace with real checks
}
```

---

## 4) Direct execution of user-provided code (example)

**Vulnerable example (from your slide):**

```js
// Issue
const userCode = req.body.code;  // user-provided JS code
eval(userCode);                  // directly executing user code (dangerous!)
```

**Why it's bad:** `eval()` (or `new Function()`) runs attacker-supplied JS in your process — leads to RCE, data exfiltration, or tampering.

**Mitigation (from slide + best practice):**

```js
// Mitigation: do NOT execute user-provided code.
// Option A: Remove eval and implement functionality differently
const userCode = req.body.code;
// do NOT eval(userCode);

// Option B: If you absolutely must run untrusted code, use a strong sandbox (and still restrict)
const { NodeVM } = require('vm2');
const vm = new NodeVM({ timeout: 1000, sandbox: {} });
try {
  vm.run(userCode);
} catch (err) {
  // handle unsafe code
}
```

**Also:** prefer not to run user code. If functionality requires user-supplied logic, provide a safe DSL or server-controlled templates, and strictly sandbox & limit resources.

---

## 5) Input validation example (from slide)

**Example validation function shown:**

```js
function isValidInput(input) {
  // Proper input validation logic here
  // Reject any input that contains potentially dangerous characters
  const regex = /^[a-zA-Z0-9\s]+$/; // Example: allow only letters, numbers, spaces
  return regex.test(input);
}
```

**Note:** Use whitelisting validation tuned to your data needs (not generic blacklists).

---

## Quick cheatsheet (do / don't)

**DO**

* Enforce body size limits and rate limiting.
* Use parameterized DB queries and ORM safe APIs.
* Parse JSON safely and validate the resulting object schema.
* Whitelist allowed fields/types and lengths.
* Log suspicious inputs and monitor unusual usage.
* Use strong sandboxes if running untrusted code (vm2, containers) and still limit time/memory.

**DON’T**

* Use `eval()`, `new Function()` or `setTimeout(userInput)` with user input.
* Concatenate user input directly into queries or code.
* Trust deserialized objects without validation.
* Rely on weak regex blacklists — use whitelists.

---