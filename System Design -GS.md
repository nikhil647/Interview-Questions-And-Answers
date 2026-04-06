# Module 1: Basics
## Chapter 1: Building an E‑Commerce App – From 1 to 1M Users

---

## Video 1: What Is System Design?

In this video, we introduce **System Design** using a real-world **E‑Commerce application** as an example.

We will primarily focus on **Distributed Systems** and how they are designed to meet **business requirements**.

**Design** here means:
- Placement of different components
- How these components interact with each other
- How decisions affect scalability, reliability, and cost

---

## What You Will Learn

By the end of this module, you will understand:

- How to design **distributed systems**
- Common **algorithms, design patterns, and tools** that power distributed systems
- How to **clearly communicate system design ideas** during:
  - Team discussions
  - Architecture reviews
  - System design interviews

---

## How to Evaluate Any System Design

Whenever you design or evaluate a system, always keep these **3 principles** in mind:

1. **Simplicity**  
   - The system should be easy to understand and explain
2. **Fidelity**  
   - The solution should correctly solve the real business problem
3. **Cost Effectiveness**  
   - The system should be sustainable and economical

> ⚠️ Never jump directly into coding.  
> Always evaluate the problem first.

---

## A Real-World Scenario

Your friend approaches you for help.  
You are the **technical expert**.

**Friend:**  
> “I have an offline T‑shirt store, but I want to sell online.”

**You:**  
> “Sure. Let’s figure out the best approach.”

---

### Step 1: Avoid Reinventing the Wheel

You suggest:
- Amazon
- Myntra

**Friend:**  
> “These platforms don’t allow enough customization.”

---

### Step 2: Existing SaaS Solutions

You suggest:
- **Shopify**

Your friend explores Shopify features and is happy.

✅ Launches the store  
✅ No custom development  
✅ Goes live quickly

---

## 3 Months Later…

The business is doing well:
- ✅ ~100 sales per day

But **two serious problems** appear:

### Problem 1: Order Tracking
- Customers **cannot track orders**
- Customer support is overwhelmed with calls

### Problem 2: International Payments
- Payment gateway does not accept:
  - USD
  - GBP
- Losing **10–20% of sales**

---

## Attempted Fixes

You ask:
> “Can Shopify or other partners fix this?”

**Friend:**  
> “I already tried. Shopify and delivery partners refuse to support these requirements.”

---

## Decision: Custom System Design

At this point, **System Design officially begins**.

We now design a **custom solution** focused on solving:

1. **Delivery Tracking**
2. **International Payments**

---

## High-Level Solution Approach

We keep Shopify as the main store but **extend it** using custom services.

### Required Integrations from Shopify

We need **2 redirect URLs** from Shopify:

1. **Payment Page**
   - Integrate with:
     - Razorpay
     - PayPal
     - Other international payment gateways
2. **Order Tracking Page**
   - Customers enter:
     - Order ID
   - They see:
     - Current delivery status

---

## High-Level Architecture Diagram (Concept)

[ Shopify ] —— [ Payment Page ]
      |
      |
[ Order Tracking Page ]

- Shopify remains the main storefront
- Payment and tracking are handled by **external services**

---

## Backend Server & APIs

To support these pages:

- We need a **server**
- The server exposes **APIs**
- Pages communicate with the server using APIs

### What Is an API?

**API (Application Programming Interface)**:
- A contract between:
  - Frontend (web pages)
  - Backend (server logic)

### API Languages

APIs can be written in:
- Python
- Java
- Go
- Node.js
- Any language of your choice

---
