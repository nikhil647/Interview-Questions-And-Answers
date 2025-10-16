# AWS API Gateway + AWS Lambda — Step‑by‑Step Guide

**Goal:** Create an API Gateway (first with Mock integration) and a Lambda function, then integrate API Gateway with Lambda so that calling the API endpoint invokes the Lambda. Detailed steps + CLI examples, sample **Node.js** Lambda code, permissions, testing, CloudWatch logs and troubleshooting.

---

## Table of contents

1. Prerequisites
2. Part A — Create an API Gateway with a Mock Integration (to test stages)
3. Part B — Create an AWS Lambda function (Node.js) and verify logs
4. Part C — Integrate API Gateway with Lambda (proxy integration)
5. Test the end-to-end flow
6. Troubleshooting & common problems
7. Appendix: Useful CLI commands

---

## 1) Prerequisites

- AWS account with permissions to create API Gateway, Lambda, IAM roles, and CloudWatch logs.
- AWS CLI configured (`aws configure`) or AWS Console access.
- Node.js installed locally (optional for testing).

> Note: This guide uses REST API (API Gateway v1). HTTP API (v2) steps are similar but with simpler UI.

---

## 2) Part A — Create API Gateway (Mock integration)

**Why mock first?**  
Mock integrations let you test routes, stages, and deployments before connecting to Lambda.

### Console steps

1. Go to **API Gateway** → **Create API** → **REST API** → **Build**.
2. Name it `MyMockAPI` → **Create API**.
3. Click **Actions → Create Resource**.
   - Resource Name: `message`
   - Resource Path: `/message`
   - Leave *Configure as proxy resource* unchecked.
   - **Create Resource**.
4. Select `/message` → **Actions → Create Method** → choose `GET` → checkmark.
5. Integration type: **Mock** → **Save**.
6. Under **Method Response**, add a 200 status with header `Content-Type`.
7. Under **Integration Response**, map `application/json` to this body:

```json
{
  "message": "Hello from API Gateway Mock"
}
```

8. **Actions → Deploy API** → new stage `dev` → **Deploy**.
9. Note the **Invoke URL**:  
`https://{restapi-id}.execute-api.{region}.amazonaws.com/dev/message`

### Test the Mock endpoint

```bash
curl -i https://{restapi-id}.execute-api.{region}.amazonaws.com/dev/message
```

✅ Should return `{"message":"Hello from API Gateway Mock"}`.

If you get `403 Forbidden`, check that you’re using the **stage URL** and not the console test path.

---

## 3) Part B — Create Lambda function (Node.js)

### Step 1: Create the function

1. Go to **AWS Lambda** → **Create function** → **Author from scratch**.
2. Name: `MyApiLambda`
3. Runtime: **Node.js 18.x**
4. Role: Create new role with **Basic Lambda permissions**.
5. Click **Create function**.

### Step 2: Replace default handler code

**index.js:**

```js
exports.handler = async (event) => {
  console.log('EVENT:', JSON.stringify(event, null, 2));

  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Hello from Lambda',
      received: event
    })
  };

  return response;
};
```

Click **Deploy**.

### Step 3: Test Lambda and check logs

- Click **Test**, create sample event → **Save and Test** → Response 200 expected.
- Check **CloudWatch Logs**: `/aws/lambda/MyApiLambda` for console output.

### CLI alternative

```bash
zip function.zip index.js
aws lambda create-function \
  --function-name MyApiLambda \
  --runtime nodejs18.x \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --role arn:aws:iam::ACCOUNT_ID:role/service-role/MyLambdaRole
```

Replace with your actual IAM role ARN.

---

## 4) Part C — Integrate API Gateway with Lambda

### Steps (Console)

1. Go to **API Gateway** → `MyMockAPI`.
2. On `/message`, delete Mock method (optional) → **Actions → Create Method → GET**.
3. Integration type: **Lambda Function**.
4. Tick **Use Lambda Proxy integration**.
5. Choose your region → enter `MyApiLambda` → **Save**.
6. Allow API Gateway to invoke Lambda when prompted.
7. **Actions → Deploy API** → choose stage `dev` → **Deploy**.

### Add permission manually (if not auto‑added)

```bash
aws lambda add-permission \
  --function-name MyApiLambda \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn arn:aws:execute-api:{region}:{account-id}:{restapi-id}/*/GET/message
```

---

## 5) Test end-to-end flow

Call the API:

```bash
curl -i https://{restapi-id}.execute-api.{region}.amazonaws.com/dev/message
```

✅ Expected Response:

```json
{
  "message": "Hello from Lambda",
  "received": {...}
}
```

Check CloudWatch logs — the Lambda should log the API event details.

### Example with query parameters

```bash
curl -i 'https://{restapi-id}.execute-api.{region}.amazonaws.com/dev/message?name=Sayali'
```

The `event.queryStringParameters` in Lambda will show `{ name: "Sayali" }`.

---

## 6) Troubleshooting

| Issue | Cause | Fix |
|-------|--------|-----|
| `403 Forbidden` | Using wrong stage URL or missing permission | Use correct URL or add Lambda permission |
| `502 Bad Gateway` | Lambda returned invalid format | Ensure `body` is JSON.stringified and `statusCode` is present |
| `504 Timeout` | Lambda timed out | Increase timeout in Lambda config |
| `Execution failed: Malformed Lambda proxy response` | `body` not string | Wrap response in `JSON.stringify()` |
| CORS errors | Missing CORS headers | Add `Access-Control-Allow-Origin` header |
| No CloudWatch logs | IAM role lacks permissions | Attach `AWSLambdaBasicExecutionRole` |

---

## 7) Appendix — Useful CLI Commands

### Lambda

```bash
# Invoke Lambda manually
aws lambda invoke --function-name MyApiLambda output.json

# Tail logs
aws logs tail /aws/lambda/MyApiLambda --follow

# Add API Gateway invoke permission
aws lambda add-permission --function-name MyApiLambda --statement-id apigw --action lambda:InvokeFunction --principal apigateway.amazonaws.com --source-arn arn:aws:execute-api:{region}:{account-id}:{restapi-id}/*/GET/message
```

### API Gateway

```bash
# List REST APIs
aws apigateway get-rest-apis

# Get resources
aws apigateway get-resources --rest-api-id {id}

# Deploy API
aws apigateway create-deployment --rest-api-id {id} --stage-name dev
```

---

✅ **Summary:**
- Create Mock API to test stage.
- Create Node.js Lambda.
- Integrate API Gateway → Lambda (proxy).
- Test URL to confirm Lambda is invoked.
- Check CloudWatch logs for event details.

---

**End of Document — Node.js version**

