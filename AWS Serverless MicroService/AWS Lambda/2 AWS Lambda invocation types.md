# ⚡ AWS Lambda --- Invocation Types

## 🧭 Overview

AWS Lambda can be invoked in multiple ways depending on the **use case**
and **event source**.\
Each invocation type determines **how the function is executed**, **how
responses are handled**, and **how errors are retried**.

------------------------------------------------------------------------

## 🔄 Invocation Types

### 1️⃣ Synchronous Invocation

-   The **caller waits for a response** from the function before
    continuing.
-   Ideal for **real-time** or **request-response** scenarios.
-   The client gets the function's response directly.
-   Common in **API-based workflows** or **interactive applications**.

**✅ Use cases:** - API requests from **API Gateway** - **Web or mobile
apps** calling Lambda directly - **Real-time data validation** or
transformations

**🧠 Notes:** - Errors are returned directly to the caller. - Caller is
responsible for handling retries or failures.

------------------------------------------------------------------------

### 2️⃣ Asynchronous Invocation

-   The **caller doesn't wait** for the function's response.
-   Lambda automatically queues the event and executes the function **in
    the background**.
-   Suitable for **event-driven** or **deferred processing**.

**✅ Use cases:** - **SNS notifications** - **S3 bucket events** (e.g.,
image upload → resize) - **CloudWatch alarms** - Background data
processing or logging

**🧠 Notes:** - AWS Lambda automatically retries failed invocations
**twice** (for a total of three attempts). - You can configure **Dead
Letter Queues (DLQs)** or **Event Destinations** to capture failures.

------------------------------------------------------------------------

### 3️⃣ Event Source Mapping (Stream-based Invocation)

-   Used when Lambda **polls event sources** such as streams or queues.
-   AWS automatically manages polling, batching, and invocation.
-   When new data is available, Lambda invokes the function **with event
    batches**.

**✅ Supported sources:** - **Kinesis Data Streams** - **DynamoDB
Streams** - **Amazon SQS (Standard and FIFO queues)**

**🧠 Notes:** - Lambda maintains a **polling loop** for each shard or
queue. - It handles **batching, checkpointing,** and **error retries**
automatically. - Great for **real-time streaming analytics** or **event
ingestion pipelines**.

------------------------------------------------------------------------

## 🧩 Summary Table

  -----------------------------------------------------------------------------------
  Invocation Type    Caller Waits?  Typical Use Case     Retry Mechanism Examples
  ------------------ -------------- -------------------- --------------- ------------
  **Synchronous**    ✅ Yes         Real-time APIs,      Caller handles  API Gateway,
                                    Direct calls         retries         SDK call

  **Asynchronous**   ❌ No          Event-driven         Lambda          S3, SNS,
                                    workflows            auto-retries    CloudWatch
                                                         twice           

  **Event Source     ⚙️ Polled      Stream/Queue-based   Lambda manages  Kinesis,
  Mapping**                         data                 retries         DynamoDB,
                                                                         SQS
  -----------------------------------------------------------------------------------

------------------------------------------------------------------------

## 💡 Key Takeaway

Choosing the right invocation type depends on **how tightly coupled**
your system components are, and whether you need **immediate responses**
or **background processing**.


# 🌐 AWS Lambda --- Function URLs

## 🧭 Overview

**Function URLs** provide a **built-in HTTPS endpoint** for your AWS
Lambda function, allowing it to be invoked directly over the web ---
**without needing an API Gateway**.\
They're ideal for lightweight use cases like **webhooks, prototypes, or
internal tools** where you need quick HTTP access to Lambda logic.

------------------------------------------------------------------------

## ⚙️ Key Features

### ✅ Built-in HTTPS Endpoint

-   Every Lambda function can have a **dedicated HTTPS URL**.
-   No need to set up or manage an **API Gateway**.
-   Simplifies the process of exposing Lambda to external clients.

### 🔐 Security Options

-   Supports **IAM authentication** (for secure access within AWS
    accounts).
-   **AWS-managed TLS** ensures secure HTTPS communication.
-   Can be made **publicly accessible** or **restricted** via IAM and
    resource policies.

### 🌍 CORS (Cross-Origin Resource Sharing)

-   Function URLs support **CORS configuration** directly.
-   Useful when calling Lambda from **web browsers** or **frontend
    applications**.

------------------------------------------------------------------------

## 🚀 Common Use Cases

### 1️⃣ Webhooks

-   Receive and process events from external services (e.g., Stripe,
    GitHub, or Slack).
-   Acts as a simple **HTTP endpoint** for automation and integrations.

### 2️⃣ Microservices

-   Create **serverless microservices** where each function handles a
    specific route or logic.
-   Can replace complex REST setups for internal APIs.

### 3️⃣ Prototyping and Testing

-   Perfect for **quick prototypes**, **POCs**, or **demo endpoints**.
-   Enables fast iteration without managing full API infrastructure.

------------------------------------------------------------------------

## 🧩 Comparison: Function URL vs API Gateway

  ------------------------------------------------------------------------
  Feature            Function URL                 API Gateway
  ------------------ ---------------------------- ------------------------
  **Setup            Very low                     Moderate to high
  Complexity**                                    

  **Security         IAM / Public                 IAM, Cognito, Custom
  Options**                                       Authorizers

  **Advanced         Basic (no throttling,        Rich (stages,
  Features**         caching)                     versioning, throttling)

  **Cost**           Lower                        Higher (based on
                                                  requests + features)

  **Use Case**       Webhooks, POCs, lightweight  Production-grade APIs,
                     APIs                         integrations
  ------------------------------------------------------------------------

------------------------------------------------------------------------

## 💡 Best Practices

-   Use **Function URLs** for lightweight use cases where simplicity and
    speed matter.
-   For complex routing, rate limiting, or authentication logic ---
    prefer **API Gateway**.
-   Always enable **IAM** or **resource-based policies** for security
    when exposing functions to the internet.

------------------------------------------------------------------------

## 🧠 Summary

**Function URLs** are a simple, fast, and cost-effective way to expose
Lambda functions over HTTPS.\
They remove the need for API Gateway in many use cases, making them
ideal for **webhooks, integrations, and quick API endpoints**.

