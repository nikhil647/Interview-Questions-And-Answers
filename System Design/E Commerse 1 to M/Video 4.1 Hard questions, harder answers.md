## 4.1 Hard Questions, Harder Answers

### Current State

*   We currently run on a **monolith architecture**.

### Question: Should we move to microservices?

#### ✅ Advantages of Microservices

*   Easier to work with **large teams**
*   Independent deployments
*   Better fault isolation
*   Scale individual services independently

#### ❌ Drawbacks of Microservices

*   Higher complexity (networking, observability, DevOps)
*   More infrastructure cost
*   Harder local development
*   Requires strong engineering maturity

#### ✅ Recommendation (My Opinion)

> At the current scale, **stick with the monolith**.

Premature microservices usually slow teams down more than they help.

***

## Backend Language Choice

### Question: Is Node.js slower than Python / Java / Go?

*   ✅ **Yes**, Node.js is generally slower than **Java / Go**
*   ❗ Performance is not the only factor

### Important Reality

*   Cloud lets you **scale horizontally**
*   You can always add **more servers**
*   Hiring speed matters

### Practical Decision Criteria

Ask this:

*   Is it easier to **hire Node.js developers**?
*   Or cheaper to **pay more AWS costs**?

👉 If hiring Node.js devs is easier, **Node.js is a valid choice**

### Business-Focused Rule

> Pick what optimizes **business velocity**, not just benchmarks.

✅ Do a **cost–benefit analysis** with:

*   Founder
*   Product Manager

#### Example (Very Rough Numbers)

*   Node.js infra cost: +₹50,000 / month
*   Faster hiring saves: 1 engineer × ₹2,00,000 / month

✅ **Hiring wins**

***

## Implementing a New Feature

### Feature Requirement

**Try T‑shirts from home using phone front camera**

*   Real-time video rendering
*   Store **all user videos** for data analysis

***

## Cost Breakdown

### 1️⃣ Cost of Implementing the Feature

#### Tech Cost

*   Engineering time
*   AR / CV expertise
*   Frontend + backend + infra

#### Usage Assumptions

*   Active users: **10,000**
*   Feature usage: **10%**

<!---->

    Daily users = 10,000 × 10% = 1,000

*   Avg API calls per user: 1
*   Daily API calls = **1,000**
*   Monthly API calls:

<!---->

    30 × 1,000 = 30,000 API calls / month

> Actual API cost depends on:

*   Video processing
*   Rendering
*   ML models
*   Third‑party SDKs

This is a **simple estimation model**, not exact math.

***

### 2️⃣ Cost of Storing Video Data

#### Assumptions

*   1 API call = 1 MB video data

<!---->

    1,000 calls × 1 MB = 1 GB / day

*   Monthly storage:

<!---->

    1 GB × 30 days = 30 GB / month

> Storage cost seems small initially  
> Becomes expensive **at scale over time**

***

## Key Engineering Principles (Always Remember)

*   ✅ Meet all requirements
*   ✅ Keep it simple
*   ✅ Optimize later, not first

### Very Important Insight

> **How you expose your system matters more than how you write the code**

***

## What Really Matters at Scale

### 1️⃣ API Contracts

*   Clear request/response formats
*   Backward compatibility
*   Versioning strategy

### 2️⃣ Service Level Agreements (SLAs)

*   Availability
*   Latency expectations
*   Error budgets

***

### Final Thought

**Technology decisions are business decisions.**  
Always optimize for:

*   Team velocity
*   Hiring
*   Cost over time
*   User impact

Not hype. Not trends. ✅
