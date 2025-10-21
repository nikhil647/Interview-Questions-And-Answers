
# Security Overview — Simple Explanations + How to Prevent

Each topic has a short description (what it is) and a short prevention tip (how to reduce the risk) written in simple language.

---

## XSS (Cross-Site Scripting)
What it is: XSS happens when an attacker injects malicious JavaScript into a web page that other users see.  
How to prevent: Always escape or encode user input before showing it on pages and use Content Security Policy (CSP).

## CSRF (Cross-Site Request Forgery)
What it is: CSRF tricks a logged-in user’s browser into making requests the user didn't intend.  
How to prevent: Use anti-CSRF tokens, check the `Origin`/`Referer` headers, and set cookies with `SameSite` attributes.

## Authentication / Authorization
What it is: Authentication proves who a user is; authorization controls what that user can do.  
How to prevent issues: Use strong password policies, multi-factor authentication, and role-based access controls (RBAC).

## Input Validation
What it is: Checking that user input matches the expected format and values.  
How to prevent issues: Validate inputs on the server (and client as helpful) using whitelists and clear rules.

## Sanitization
What it is: Removing or neutralizing dangerous parts of user input so it can't do harm.  
How to prevent issues: Sanitize HTML, remove scripts, and normalize inputs before processing or storing.

## HTTPS
What it is: HTTPS encrypts traffic between the browser and server so others can't read or tamper with it.  
How to prevent issues: Always use valid TLS certificates, redirect HTTP to HTTPS, and disable old TLS versions.

## Security Headers
What it is: HTTP headers that tell browsers to apply extra protections (e.g., CSP, HSTS).  
How to prevent issues: Add and configure headers like `Content-Security-Policy`, `Strict-Transport-Security`, and `X-Content-Type-Options`.

## Iframe Protection
What it is: Frames can be used to trick users (clickjacking) or embed your site in unsafe places.  
How to prevent issues: Use `X-Frame-Options: DENY` or `Content-Security-Policy: frame-ancestors` to block unwanted framing.

## Dependency Injection
What it is: A coding pattern for supplying components their dependencies; note this is different from injection attacks.  
How to prevent issues: Use secure DI frameworks, avoid executing untrusted code or templates, and keep dependencies up to date.

## Client Storage Security
What it is: Storing data in the browser (localStorage, sessionStorage, cookies). Sensitive data here can be stolen.  
How to prevent issues: Avoid storing secrets on the client, use secure, httpOnly cookies for session tokens, and encrypt any necessary data.

## Compliances and Regulations (GDPR)
What it is: Laws like GDPR set rules for how to collect, store, and handle personal data.  
How to prevent issues: Minimize data collection, get clear consent, allow data access/deletion, and document processing activities.

## SSRF (Server-Side Request Forgery)
What it is: SSRF tricks your server into making requests to internal or external systems the attacker chooses.  
How to prevent issues: Validate and whitelist allowed URLs, block internal IP ranges, and restrict outbound network access.

## SSJI (Server-Side JavaScript Injection)
What it is: When untrusted input ends up executing as JavaScript on the server (e.g., `eval`), allowing attackers to run code.  
How to prevent issues: Never use `eval` on user input, use safe templating, and validate inputs strictly.

## Feature Flag
What it is: A switch to turn features on or off; misused flags can accidentally expose hidden functionality.  
How to prevent issues: Protect flag controls, use environment-based gating, and audit who can change flags.

## Subresource Integrity (SRI)
What it is: SRI is a way to ensure external scripts or styles haven't been modified by checking their hashes.  
How to prevent issues: Add `integrity` attributes to external `<script>`/`<link>` tags and serve resources from trusted CDNs.

## CORS (Cross-Origin Resource Sharing)
What it is: CORS is a browser mechanism that controls how resources are shared across different origins.  
How to prevent issues: Configure server CORS policies to allow only trusted origins and avoid using `Access-Control-Allow-Origin: *` for sensitive endpoints.

---
