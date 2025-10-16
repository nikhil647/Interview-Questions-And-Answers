# 🪵 AWS Lambda --- Logging, Tracing, and Error Handling

## 🧭 Overview

AWS Lambda automatically captures logs, performance data, and error
events to help you **monitor, troubleshoot, and optimize** your
serverless applications.

------------------------------------------------------------------------

## 📝 Logging in AWS Lambda

### 🔹 Key Points

-   Lambda **automatically sends logs** to **Amazon CloudWatch Logs**.
-   You can log messages using standard language commands:

  Language      Logging Command
  ------------- ------------------------
  **Node.js**   `console.log()`
  **Python**    `print()`
  **Java**      `System.out.println()`

### 💡 Best Practices

-   Use **structured logging** (e.g., JSON format) for better filtering
    and analysis.

    ``` js
    console.log(JSON.stringify({ level: "info", message: "Function executed successfully", requestId }));
    ```

-   **Avoid logging sensitive data** such as credentials or PII.

-   Configure **log retention policies** in CloudWatch to control
    storage costs.

------------------------------------------------------------------------

## 🔍 Tracing in AWS Lambda

### 🧠 What is Tracing?

**Tracing** helps you understand how requests move through your system.\
Lambda integrates with **AWS X-Ray**, which provides **end-to-end
request tracking** and **visual insights**.

### ⚙️ Key Features

-   **X-Ray** collects data about requests as they pass through your
    Lambda function and other AWS services.
-   Generates a **service map** that shows how components interact.
-   Helps identify:
    -   **Invocation latency**
    -   **Errors and performance bottlenecks**
    -   **Cold start times**
    -   **Service dependencies**

### 📊 Additional Capabilities

-   **Annotations:** Add searchable tags to traces (e.g., `userId`,
    `region`).\
-   **Metadata:** Attach extra, non-indexed info for context (e.g.,
    request payload).\
-   **SDK Options:**
    -   **X-Ray SDK** --- Direct integration for AWS services.
    -   **ADOT (AWS Distro for OpenTelemetry)** --- Open standard for
        collecting and exporting trace data.

### ✅ Example

To enable tracing: 1. Go to your **Lambda function \> Configuration \>
Monitoring and Operations tools**.\
2. Enable **Active tracing** with AWS X-Ray.

------------------------------------------------------------------------

## ⚠️ Error Handling in AWS Lambda

### 🔹 Function Errors

  ----------------------------------------------------------------------------
  Invocation Type                       Error Behavior
  ------------------------------------- --------------------------------------
  **Synchronous**                       Errors are **returned directly** to
                                        the caller (client or API Gateway).

  **Asynchronous**                      Lambda **automatically retries twice**
                                        before discarding the event or sending
                                        it to a **Dead Letter Queue (DLQ)**.

  **Timeout**                           Use
                                        `context.getRemainingTimeInMillis()`
                                        to detect timeouts and handle
                                        long-running processes.
  ----------------------------------------------------------------------------

### 🧾 Example (Node.js)

``` js
exports.handler = async (event, context) => {
  try {
    // Main logic
    if (!event.data) throw new Error("Missing input data");

    return { statusCode: 200, body: "Success" };
  } catch (err) {
    console.error("Error occurred:", err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
```

### 💡 Best Practices

-   Always wrap logic in **try-catch** blocks.
-   Return **meaningful error messages** for easier debugging.
-   Set a reasonable **timeout value** based on expected execution
    duration.

------------------------------------------------------------------------

## 🔁 Asynchronous Error Handling

### 🔹 Automatic Retries

-   For **asynchronous invocations**, Lambda **retries twice**
    automatically on failure.

### 🔹 Dead Letter Queues (DLQs)

-   Use **Amazon SQS** or **SNS** as a **DLQ** to capture failed
    events.\
-   Failed events can later be **retried, analyzed, or processed
    manually**.

### 🔹 EventBridge for Notifications

-   Use **EventBridge rules** to trigger alerts, workflows, or automated
    responses when events fail.

------------------------------------------------------------------------

## 🎯 Lambda Destinations

### 🧠 What is a Lambda Destination?

Lambda **Destinations** provide a **more powerful alternative to DLQs**
for handling function outcomes (success or failure).\
They give **detailed execution information** such as: - Stack traces\
- Payload details\
- Execution status and duration

### ⚙️ Supported Destination Services

-   **Amazon SQS**
-   **Amazon SNS**
-   **EventBridge**
-   **Another Lambda function**

### ✅ Benefits

-   Can work **with or without DLQs**.
-   Offer **more visibility** and **richer debugging context** than
    traditional DLQs.

------------------------------------------------------------------------

## 🧠 Summary

  -----------------------------------------------------------------------
  Category                         Key Points
  -------------------------------- --------------------------------------
  **Logging**                      Logs go to CloudWatch automatically;
                                   use JSON logging and retention
                                   policies.

  **Tracing**                      Use AWS X-Ray or ADOT to visualize
                                   request flow, performance, and
                                   dependencies.

  **Error Handling**               Use try-catch, handle timeouts,
                                   configure DLQs or Destinations for
                                   failed events.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 💡 Quick Takeaway

AWS Lambda provides **built-in observability and resilience tools** ---
CloudWatch for logs, X-Ray for tracing, and Destinations or DLQs for
handling failures.\
Together, they ensure your serverless applications are **reliable,
traceable, and easy to debug**.
