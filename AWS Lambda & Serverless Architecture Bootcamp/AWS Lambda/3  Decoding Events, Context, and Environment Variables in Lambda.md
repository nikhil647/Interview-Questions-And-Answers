# 🧩 AWS Lambda --- Event Object, Context Object & Environment Variables

## 🧭 Overview

When an AWS Lambda function executes, it receives three main
components: 1. **Event Object** --- Data about what triggered the
function.\
2. **Context Object** --- Information about the runtime environment.\
3. **Environment Variables** --- Configuration data for customizing
function behavior.

------------------------------------------------------------------------

## 📦 Event Object

### 🧠 Definition

The **Event Object** contains details about the **source event** that
triggered the function.\
Its structure **varies depending on the event source** (e.g., S3, API
Gateway, SNS, DynamoDB, etc.).

### 🧾 Example: Node.js Lambda Function

``` js
exports.handler = async (event) => {
  console.log("Event received:", JSON.stringify(event, null, 2));

  // Example: Accessing event data (API Gateway)
  const name = event.queryStringParameters?.name || "Guest";
  const method = event.httpMethod;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
      methodUsed: method,
    }),
  };
};
```

🧩 **Example Event Structures** - **S3 Trigger:** Includes bucket name,
object key, size, and event time.\
- **API Gateway Trigger:** Includes HTTP method, headers, path, and
query parameters.\
- **SNS Trigger:** Contains message ID, topic ARN, and message body.

------------------------------------------------------------------------

## ⚙️ Context Object

### 🧠 Definition

The **Context Object** provides runtime information about the Lambda
function execution --- useful for **logging, tracking, and
optimization**.

### 📋 Common Properties

  ------------------------------------------------------------------------------
  Property                               Description
  -------------------------------------- ---------------------------------------
  `context.awsRequestId`                 Unique identifier for each request.

  `context.logGroupName`                 CloudWatch Logs group name.

  `context.functionName`                 Name of the executing Lambda function.

  `context.memoryLimitInMB`              Memory allocated to the function.

  `context.getRemainingTimeInMillis()`   Time (in ms) before the function times
                                         out.
  ------------------------------------------------------------------------------

### 🧾 Example: Node.js Usage

``` js
exports.handler = async (event, context) => {
  console.log("Function Name:", context.functionName);
  console.log("Log Group:", context.logGroupName);
  console.log("Request ID:", context.awsRequestId);
  console.log("Memory Limit:", context.memoryLimitInMB);
  console.log("Time Remaining (ms):", context.getRemainingTimeInMillis());

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Lambda context demo complete." }),
  };
};
```

------------------------------------------------------------------------

## 🌍 Environment Variables

### 🧠 Overview

Environment variables allow you to **customize your Lambda function
behavior** without changing its code.\
They are ideal for storing configuration values, secrets, and
environment-specific settings.

### ✅ Benefits

-   Easily **configure function behavior** (e.g., API keys, DB names).\
-   Secure values using **IAM permissions** and **KMS encryption**.\
-   Access via `process.env` in your code.

### 🧾 Example: Accessing Environment Variables in Node.js

``` js
exports.handler = async () => {
  const env = {
    region: process.env.AWS_REGION,
    functionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
    customVar: process.env.MY_CUSTOM_SETTING,
  };

  console.log("Environment Variables:", env);
};
```

### 📋 Common Predefined Environment Variables

  ---------------------------------------------------------------------------
  Variable                            Description
  ----------------------------------- ---------------------------------------
  `_HANDLER`                          Function entry point (e.g.,
                                      `index.handler`).

  `_X_AMZN_TRACE_ID`                  X-Ray tracing header.

  `LAMBDA_TASK_ROOT`                  Path to deployed Lambda code.

  `LAMBDA_RUNTIME_DIR`                Directory for runtime libraries.

  `AWS_LAMBDA_RUNTIME_API`            Runtime API endpoint.

  `AWS_EXECUTION_ENV`                 Lambda runtime environment name (e.g.,
                                      `AWS_Lambda_nodejs20.x`).

  `AWS_LAMBDA_FUNCTION_NAME`          Function name.

  `AWS_LAMBDA_FUNCTION_MEMORY_SIZE`   Memory allocated (in MB).

  `AWS_LAMBDA_FUNCTION_VERSION`       Version of the deployed Lambda.

  `AWS_LAMBDA_LOG_GROUP_NAME`         CloudWatch log group name.

  `AWS_LAMBDA_LOG_STREAM_NAME`        CloudWatch log stream name.

  `AWS_REGION`, `AWS_DEFAULT_REGION`  AWS Region where function is deployed.

  `AWS_ACCESS_KEY_ID`,                Temporary security credentials.
  `AWS_SECRET_ACCESS_KEY`,            
  `AWS_SESSION_TOKEN`                 
  ---------------------------------------------------------------------------

------------------------------------------------------------------------

## 💡 Best Practices

-   Store sensitive values (e.g., DB credentials) in **AWS Secrets
    Manager** or **Parameter Store**, not plain environment variables.\
-   Use **KMS encryption** for any environment variable containing
    sensitive data.\
-   Avoid hardcoding environment-specific configuration in code.

------------------------------------------------------------------------

## 🧠 Summary

  -----------------------------------------------------------------------
  Concept                       Description
  ----------------------------- -----------------------------------------
  **Event Object**              Input data that triggered the Lambda
                                execution.

  **Context Object**            Metadata and runtime info for current
                                execution.

  **Environment Variables**     Key-value pairs for runtime
                                configuration.
  -----------------------------------------------------------------------

Together, these components make Lambda **flexible, event-aware, and
highly configurable**.
