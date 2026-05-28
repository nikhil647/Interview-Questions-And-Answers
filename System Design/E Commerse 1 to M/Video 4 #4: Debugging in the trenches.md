Below are **clean, structured notes in Markdown format**, rewritten clearly while preserving the original meaning and real‑world engineering context.

***

# #4: Debugging in the Trenches

## Context

*   Website deployed and running smoothly for **1 week**.
*   Suddenly, a friend reports: **Payment Gateway (PG) is failing**.
*   PG provider claims **98% success rate**, and your failure rate is **\~2%**.
*   From a system perspective, this is **expected behavior**.

👉 **But customers don’t care about statistics** — they care about **experience**, especially **slow responses or failed payments**.

***

## Core Problem

*   Debugging is **taking too long**
*   Customers are unhappy due to **lack of quick answers**
*   Engineers need **visibility into what actually happened**

***

## 1. Logging & Monitoring

### Why Logging Is Critical

Logging allows you to **reconstruct events** and answer customer complaints quickly.

### What to Log

For every request:

1.  Incoming request
2.  Important internal events (DB write, PG call, retries, etc.)
3.  External service calls
4.  Final response (success/failure)

### Example Scenario

Customer reports:

> “I am not able to make payment for my order.  
> Email ID: `tarun43@gmail.com`”

### Debugging Steps

1.  Use **email → find Order ID**
2.  Use **Order ID → search logs**
3.  Analyze logs using **regular expressions**
4.  Identify:
    *   Where it failed
    *   Why it failed
    *   How long it took

✅ This is **standard engineering practice**.

***

### Cloud-Native Logging Solutions

Most cloud providers offer managed logging:

| Cloud Provider | Logging Service   |
| -------------- | ----------------- |
| AWS            | Amazon CloudWatch |
| GCP            | Cloud Logging     |
| Azure          | Azure Monitor     |

#### What Cloud Logging Does

*   Collects logs as **events**
*   Stores them in **distributed storage**
*   Allows **querying and filtering at scale**

***

## 2. Observability & Anomaly Detection

### What is Observability?

Observability helps you **understand system health** using:

*   Logs
*   Metrics
*   Traces

You can answer:

*   Is the system slow?
*   Is something failing more than usual?
*   Is user behavior changing?

***

### Business Example

*   Expected daily sales: **100**
*   Actual sales today: **10**

🚨 This is an **anomaly**

### Solution

*   Build **dashboards**
*   Track key business & technical metrics

***

### Analytics & Dashboard Tools

*   **Free / Common**
    *   Google Analytics

*   **Paid / Enterprise**
    *   Power BI
    *   Tableau

⚠️ AWS **does not have a full built‑in analytics dashboard**

*   You must **emit events**
*   Store them in:
    *   Databases
    *   Data warehouses
    *   Analytics tools

***

<img width="1905" height="586" alt="image" src="https://github.com/user-attachments/assets/bc12b497-c3e2-435c-8442-10c61f800302" />
## Reliability & System Design Thinking

### Key Question

> **How reliable is this system?**

***

### Identify Single Points of Failure

Ask:

*   If I remove **one component**, does the whole system fail?
*   If one **network connection** breaks, is everything down?

Common failure points:

*   Network
*   CDN
*   Server
*   Database
*   External APIs

***

### Examples

*   **CDN fails** → Webpage doesn’t load → No orders
*   **Server down** → Entire system unavailable
*   **AWS region failure** → Full outage
*   **Payment Gateway fails** → Payments stop

***

## External Dependencies

### Definition

*   Any third‑party integration = **external dependency**
*   If it’s in the **critical path** → **critical dependency**

Examples:

*   Payment gateways
*   Authentication services
*   Email providers
*   Shipping APIs

***

## How to Avoid Major Failures

### 1. Redundancy

*   Use **multiple vendors/providers**
*   No single dependency should block the business

#### Examples

*   Payment: Razorpay + Stripe + PhonePe
*   Database: backups & replicas
*   Infrastructure: multi‑AZ / multi‑region

⚠️ Trade‑off:  
More components = **more complexity & maintenance**

***

### 2. Use Reliable Cloud Providers

Clouds like:

*   AWS
*   GCP
*   Azure

Provide:

*   High availability
*   Redundancy
*   Fault tolerance

✅ One reason to keep most services **within a single cloud**

***

## Graceful Degradation

### What It Means

When something fails:

*   **Don’t break everything**
*   Reduce functionality safely

### Examples

*   If payment fails → show retry or alternate PG
*   If analytics fails → core site still works
*   If Shopify fails → show a clear fallback page

> **“We are currently unavailable. Please try again later.”**

✅ Better than showing errors or blank pages

***

## Key Takeaways

*   **Prevention is better than cure**
*   Logging + Monitoring = Faster debugging
*   Observability = Early problem detection
*   Redundancy reduces risk
*   External dependencies must be treated carefully
*   Graceful degradation protects user experience

***
