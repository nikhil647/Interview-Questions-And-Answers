# 🧠 AWS Lambda Concurrency Explained

## 🚀 What is Lambda Concurrency?
**Concurrency** in AWS Lambda means **how many function instances can run at the same time** to handle incoming requests.

Each request that comes in is handled by a **separate execution environment** (container).  
If multiple requests arrive together → multiple environments run in parallel.

---

## ⚙️ How It Works
- Every Lambda function runs inside an **isolated environment**.
- AWS Lambda automatically **creates new environments** as new requests come in.
- Each environment handles **only one request at a time**.

---

## 📊 Regional Concurrency Limit
- **Default (Soft) Limit:** 1000 concurrent executions **per AWS region**.
- This means only 1000 instances (across all Lambda functions in that region) can run at once.
- You can request AWS Support to **increase** this limit.

**If limit = 1000 and 1100 requests come in → 100 are throttled.**

---

## 🔒 Reserved Concurrency
Reserved concurrency allows you to:
- Guarantee a **minimum number** of concurrent executions for a specific function.
- Set a **maximum cap** for that function (it cannot scale beyond this).

### ✅ Example:
| Function | Reserved Concurrency | Effect |
|-----------|----------------------|---------|
| Function A | 200 | Can handle up to 200 requests |
| Function B | 100 | Can handle up to 100 requests |
| Region Total | 1000 | Remaining 700 shared by others |

> ⚠️ Reserved concurrency reduces available concurrency for other functions in the region.

---

## ⚡ Provisioned Concurrency
Provisioned concurrency **keeps Lambda environments pre-initialized** — ready to respond instantly.

- **Removes cold starts** (no waiting for environment setup)
- Ensures **low latency**, ideal for real-time apps (e.g., APIs, chat apps)
- **Costs extra** — you pay for the always-ready instances

### Example:
If you set **provisioned concurrency = 10**,  
→ 10 environments are always warm, ready to respond immediately.  
If more than 10 requests come at once,  
→ new environments will be created (causing cold starts again).

---

## 🧩 Relationship Diagram
```
                          ┌──────────────────────────────┐
                          │      Incoming Requests       │
                          └──────────────┬───────────────┘
                                         │
                                         ▼
                  ┌─────────────────────────────────────────────┐
                  │        Lambda Concurrency System            │
                  ├─────────────────────────────────────────────┤
                  │  - Regional Limit: 1000                     │
                  │  - Reserved Concurrency per Function         │
                  │  - Provisioned Concurrency (Pre-warmed)      │
                  └────────────────┬────────────────────────────┘
                                   │
        ┌──────────────────────────┴──────────────────────────┐
        ▼                                                     ▼
Pre-warmed Environments                             On-demand Environments
(Low latency, costs more)                            (Cold start possible)
```

---

## ⚠️ Throttling Behavior
If all concurrency units are busy:
- New requests are **throttled** (HTTP 429 “Too Many Requests”)
- Retries may happen depending on your event source (e.g., SQS retries automatically)

---

## 🧩 Summary Table

| Concept | Description | Effect | Cost |
|----------|--------------|--------|------|
| **Regional Concurrency Limit** | Max concurrent executions per region (default 1000) | Throttles beyond limit | No extra cost |
| **Reserved Concurrency** | Locks concurrency for one function | Prevents overuse | No extra cost |
| **Provisioned Concurrency** | Pre-warms instances | No cold starts | Extra charge |

---

## ✅ Best Practices
- Use **Provisioned Concurrency** for latency-critical apps (APIs).
- Use **Reserved Concurrency** to control traffic spikes and protect key functions.
- Monitor concurrency metrics in **CloudWatch → ConcurrentExecutions**.
- Increase **Regional Limit** via AWS Support if needed.
