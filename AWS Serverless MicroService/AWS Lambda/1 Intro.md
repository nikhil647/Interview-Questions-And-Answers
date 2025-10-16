# 🟢 AWS Lambda Notes

## 🌩️ Overview

AWS Lambda is a **serverless compute service** that lets you run code
without managing servers.\
You simply write **functions** that AWS executes when triggered by
specific events.

------------------------------------------------------------------------

## ⚙️ Key Points

### ✅ No Server Management

-   You **don't have to manage servers** --- AWS handles the
    infrastructure.
-   Just **write functions** in the form of code.

### 🧩 Function Architecture

-   Break your application logic into **smaller, independent, stateless
    functions**.
-   Each function runs in isolation and scales automatically.

### ⚡ Triggers

Functions can be triggered by a variety of AWS services and events, such
as: - **File upload** (e.g., to an S3 bucket) - **Database updates**
(e.g., DynamoDB) - **API Gateway requests** - **EventBridge / CloudWatch
events** - **SNS / SQS messages**

### 🚀 Scalability and Performance

-   AWS automatically handles **scalability, performance, and
    availability**.
-   Lambda can run **hundreds or thousands of instances** of your
    function simultaneously.

### 💰 Cost Model

-   **Pay-as-you-go**: You only pay for compute time when your code
    runs.
-   **No charges for idle time** --- making Lambda **highly
    cost-effective**.
-   **Fine-grained billing** --- based on number of requests and
    execution time.

### 🔐 Permission Model

Lambda uses a **decoupled permission model** with two key components: 1.
**Function Policy** -- Controls *who can invoke* the function. 2.
**Execution Role** -- Controls *what actions* the function can perform
(via IAM roles).

------------------------------------------------------------------------

## 🧠 Summary

AWS Lambda allows developers to focus on **writing business logic**
instead of managing infrastructure.\
It's scalable, cost-efficient, event-driven, and perfectly suited for
**microservice architectures**.
