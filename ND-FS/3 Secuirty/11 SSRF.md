# SSRF (Server-Side Request Forgery)

**What it is (short):** attacker forces the server to make HTTP (or other) requests on their behalf to internal or external resources.

**Detailed explanation & example:** imagine a web app accepts a URL from users and the server fetches that URL (e.g., a “preview this image” feature). If the server blindly requests whatever URL the user supplies, an attacker can supply `http://169.254.169.254/latest/meta-data/` (the AWS EC2 metadata endpoint) or an internal-only admin interface. Example pseudo-code (bad):

```js
// BAD: fetches any URL user gives
const url = req.query.url;
const data = fetch(url); // server-side request
```

An attacker inputs an internal URL and the server — running with cloud credentials or inside a protected network — performs the request and returns data the attacker otherwise couldn’t reach.

**What damage it can do:**

* Steal cloud instance metadata / credentials (e.g., AWS metadata) and then access S3, databases or other services.
* Access internal management interfaces (databases, admin consoles) not exposed to the internet.
* Use the server as a proxy to pivot inside the network, scanning internal hosts/ports.
* Trigger actions on internal services (delete data, change config) if interfaces are exploitable.

**Historical record / example incident:** The Capital One 2019 breach involved an attacker exploiting a server-side request flaw to reach AWS metadata and obtain credentials to read S3 buckets — exposing millions of customer records. This is a well-documented SSRF-to-cloud-credentials case. ([Appsecco][1])

---

# Invalid User Input (input validation failures)

**What it is (short):** the app accepts user data without proper validation or sanitization, letting attackers inject data that changes program logic or queries.

**Detailed explanation & example:** “Invalid user input” covers many concrete classes of bugs (SQL injection, XSS, command injection, path traversal). Example — SQL injection from concatenated SQL strings:

```py
# BAD: vulnerable to SQL injection
query = "SELECT * FROM users WHERE email = '" + user_input + "'"
db.execute(query)
```

If `user_input` is `x' OR '1'='1`, the query returns all rows. Another example: failing to escape user text in a page leads to XSS where malicious JavaScript runs in other users’ browsers.

**What damage it can do:**

* Read or modify entire databases (SQLi): leak PII, credentials, financial data.
* Perform actions as other users (auth bypass), or take over admin accounts.
* Run arbitrary JavaScript in victims’ browsers (XSS) to steal session cookies or perform fraudulent actions.
* Execute shell commands or access files (command injection / path traversal).

**Historical record / example incidents:** SQL injection has been used in many large breaches (e.g., Sony PlayStation/Sony related breaches and numerous others historically). Input validation failures remain among the most common root causes and are covered by OWASP guidance. ([Wikipedia][2])

---

# Lack of Whitelisting (allowlist missing)

**What it is (short):** the app uses blacklists or no filtering instead of a strict allowlist of acceptable inputs — meaning unexpected/malicious inputs are accepted.

**Detailed explanation & example:** Whitelisting (allowlisting) means you define exactly what is allowed (e.g., only `image/png` and `image/jpeg` for uploads, or only digits for a phone number). Blacklisting tries to block “bad” patterns (e.g., blocking `<script>`), but attackers can bypass with variants or encodings. Example file upload problem: accepting any file extension and trusting content type lets an attacker upload `webshell.php` and then execute it. A safer approach: only accept known-good MIME types + validate file headers + store uploads outside webroot.

**What damage it can do:**

* Remote code execution (if uploaded code can be executed).
* Bypass of filters (XSS, SQLi, path traversal) by crafting inputs that blacklists miss.
* Data corruption or service misuse due to unexpected formats.

**Why whitelisting is better:** allowlists explicitly restrict inputs to expected patterns, drastically reducing attack surface compared to blocklists that try to enumerate bad inputs (and inevitably miss variants). ([owasp-top-10-proactive-controls-2018.readthedocs.io][3])

---

# Insufficient Access Control (IDOR, broken authorization)

**What it is (short):** the application fails to properly check whether the requesting user is allowed to access/modify a resource (e.g., predictable IDs used directly).

**Detailed explanation & example:** Common pattern: URLs like `/invoice/12345/download` where the app trusts the numeric `12345` and returns the invoice without verifying current user owns it. Attacker enumerates IDs (`12345`, `12346`, ...) and downloads other users’ data. That class of bug is often called IDOR (Insecure Direct Object Reference). Example fix: check `invoice.user_id === current_user.id` or use unguessable references plus server-side authorization checks.

**What damage it can do:**

* Read or modify other users’ data (privacy/data breach).
* Escalate privileges or manipulate records (change balances, submit fake reports).
* Widespread data exposure when references are predictable or scanning is possible.

**Historical record / context:** IDOR / insufficient authorization frequently shows up in OWASP Top Ten and appsec writeups — tools like PortSwigger/OWASP document many IDOR exploit patterns and how they lead to data leaks. ([portswigger.net][4])

---

# XML External Entity (XXE)

**What it is (short):** when an XML parser processes external entity declarations from untrusted XML input, enabling attackers to make the parser load local files or remote resources.

**Detailed explanation & example:** XML supports entity definitions that can reference external resources:

```xml
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<foo>&xxe;</foo>
```

If the parser expands `&xxe;`, the server may return contents of `/etc/passwd`. XXE can also make the server perform SSRF requests, exfiltrate files, or cause DoS by huge entity expansions.

**What damage it can do:**

* Local file disclosure (read sensitive files like config, keys).
* Server-side request forgery (make the server request internal services).
* Denial of Service (billion-laughs / entity expansion).
* In some parsers/environments, remote code execution is possible.

**Historical record / references:** XXE is a well-known XML parser misconfiguration class covered by OWASP and appsec sources; guides and writeups (PortSwigger, Imperva, OWASP) explain examples and impacts (file disclosure, SSRF, DoS). ([owasp.org][5])

---

## Practical short mitigations (quick checklist)

* **SSRF:** block server-side requests to internal metadata IPs; validate/allowlist URLs; use timeouts and network egress controls; limit server privileges. ([Appsecco][1])
* **Invalid user input:** server-side input validation, parameterized queries/prepared statements (no string SQL concatenation), output encoding for HTML, and strong testing. ([cheatsheetseries.owasp.org][6])
* **Lack of whitelisting:** prefer allowlists (exact formats/types) over blocklists for inputs, file uploads, and headers. ([mwrcybersec.com][7])
* **Insufficient access control:** enforce server-side authorization checks on every sensitive object access; use least privilege and unguessable IDs if possible. ([portswigger.net][4])
* **XXE:** disable external entity processing in XML parsers; use safe XML libraries or parse to non-XML formats; validate/limit input. ([portswigger.net][8])

---

## Historical summary (one line each)

* **SSRF:** used to steal cloud credentials and access storage — notable example: Capital One breach (2019). ([Appsecco][1])
* **Invalid user input (SQLi/XSS):** long history of data breaches and account takeovers (SQLi remains a common root cause). ([Wikipedia][2])
* **Lack of whitelisting:** frequent cause of bypassable filters and dangerous file uploads — enforcing allowlists reduces risk. ([owasp-top-10-proactive-controls-2018.readthedocs.io][3])
* **Insufficient access control (IDOR):** common source of data leakage when object access isn’t authorized server-side. ([portswigger.net][4])
* **XXE:** XML parser misconfiguration leads to file disclosure/SSRF/DoS; well-documented by OWASP/PortSwigger. ([owasp.org][5])

---

[1]: https://blog.appsecco.com/an-ssrf-privileged-aws-keys-and-the-capital-one-breach-4c3c2cded3af?utm_source=chatgpt.com "An SSRF, privileged AWS keys and the Capital One breach"
[2]: https://en.wikipedia.org/wiki/SQL_injection?utm_source=chatgpt.com "SQL injection"
[3]: https://owasp-top-10-proactive-controls-2018.readthedocs.io/en/latest/c5-validate-all-inputs.html?utm_source=chatgpt.com "C5: Validate All Inputs - OWASP Top 10 Proactive Controls 2018"
[4]: https://portswigger.net/web-security/access-control/idor?utm_source=chatgpt.com "Insecure direct object references (IDOR) - Access control"
[5]: https://owasp.org/www-community/vulnerabilities/XML_External_Entity_%28XXE%29_Processing?utm_source=chatgpt.com "XML External Entity (XXE) Processing"
[6]: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html?utm_source=chatgpt.com "Input Validation - OWASP Cheat Sheet Series"
[7]: https://www.mwrcybersec.com/mwr-appsec-foundations-allowlisting-vs-blocklisting?utm_source=chatgpt.com "Allowlisting vs Blocklisting and a case study of Web ..."
[8]: https://portswigger.net/web-security/xxe?utm_source=chatgpt.com "XML external entity (XXE) injection"
