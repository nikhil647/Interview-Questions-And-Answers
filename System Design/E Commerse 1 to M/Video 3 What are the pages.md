# 3️⃣ What Are the Pages?

When a user types **`fancytshirts.io`** in the browser, they should see a web page and be able to perform certain actions.

## What should the website allow users to do?

*   Login
*   Register
*   Create a new account

These actions are handled by a **server**.  
In our case, the server is **AWS Serverless**.

***

## What is a Web Page?

A **web page** is simply:

> A file downloaded and displayed by the browser.

It is written using:

*   **HTML** → structure
*   **CSS** → styling
*   **JavaScript** → behavior

So the web page files must be **stored somewhere** so users can download them.

***

## Where Can We Store Web Pages?

We have **two main options**:

### 1️⃣ Server (Serverless APIs)

*   User makes an API call
*   Server returns the full page
*   ✅ 100% possible
*   ❌ Expensive
*   ❌ Hard to scale
*   ❌ Slow for global users

***

### 2️⃣ CDN (Content Delivery Network) ✅ *Best choice*

A **CDN** is a network of servers spread across the world.

Examples:

*   Akamai
*   AWS CloudFront
*   Cloudflare

#### How CDN works:

*   Users get the page from the **nearest server**
*   Faster loading
*   Better reliability
*   CDN manages scaling automatically

#### CDN is best for:

*   Static HTML pages
*   Images
*   CSS & JS files
*   Videos
*   Downloads

✅ Cheaper because cost is shared across many customers  
✅ Very fast  
✅ Highly reliable

***

## Serverless vs CDN (Simple Rule)

| Use Case                                | Where to Store        |
| --------------------------------------- | --------------------- |
| Static files (HTML, CSS, JS, images)    | **CDN**               |
| Dynamic data (users, orders, inventory) | **Server / Database** |

***

## Why Not Store Dynamic Data in a CDN?

**Data consistency problem**

### Example:

*   T-shirt stock = **50**
*   Orders:
    *   USA → 40 orders
    *   India → 11 orders

Total orders = **51 ❌**

Why this happens:

*   CDN servers are distributed
*   Updates take time to sync
*   Each region sees **old data**
*   Leads to over-selling

➡️ **Conclusion:**  
Dynamic data must stay on a **central server/database**, not CDN.

***

## How Do Files Get Added to a CDN?

CDNs watch a **storage system**.

### Simple idea:

*   You upload a file
*   CDN detects the new file
*   CDN copies it to servers across the globe

This storage system must:

*   Be reliable
*   Be highly available

***

## File Storage Solution

### ✅ Amazon S3 (Recommended)

*   Distributed file storage
*   Very reliable
*   Cheap
*   Works perfectly with CloudFront

Other examples:

*   Local systems: Hadoop, Ceph
*   But cloud is better for reliability and cost

### Our choice:

*   **Amazon S3** → storage
*   **Amazon CloudFront** → CDN
*   Keep everything under AWS

***

## Domain Name Mapping (fancytshirts.io)

Customer owns the domain **`fancytshirts.io`**.

We need to:

*   Point it to **our CDN**
*   Instead of Shopify or any old IP

***

## How the Web Works (Very Simple)

1.  User types `fancytshirts.io`
2.  Request goes to **DNS**
3.  DNS returns an **IP Address**
4.  Browser requests data from that IP
5.  CDN returns the web page

### DNS Example:

*   `fancytshirts.io → 192.34.45.5`
*   `facebook.com → 192.3.4.56`

DNS is basically a **huge distributed dictionary**:

    Domain Name  →  IP Address

***

## What Database Should We Use?

**Short Answer:**  
Use the database you are most comfortable with.

Both are fine for startups:

*   SQL ✅
*   NoSQL ✅

***

### My Recommendation: SQL ✅

Reasons:

| Feature                     | SQL | NoSQL |
| --------------------------- | --- | ----- |
| Data consistency (Fidelity) | ✅   | ❌     |
| Simplicity                  | ✅   | ❌     |
| Cost‑effective              | ✅   | ✅     |
| Data analysis               | ✅   | ❌     |

***

## ✅ Final Architecture Summary

*   **Static Pages** → S3 + CloudFront
*   **Dynamic APIs** → AWS Serverless
*   **Database** → SQL
*   **Domain** → DNS → CloudFront
