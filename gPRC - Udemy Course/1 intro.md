# gRPC Introduction

## Microservices Everywhere

When two microservices communicate, they must agree on multiple aspects of the interaction:

### They must align on:

* API contract for data exchange
* Data format
* Error patterns
* Additional communication rules (timeouts, retries, versioning, etc.)

### Engineering considerations:

* Payload size
* Latency constraints
* Scalability (from 1,000 to 1,000,000 clients)
* Load balancing
* Language interoperability (e.g., Node.js ↔ Java ↔ Go)
* Authentication, monitoring, and logging requirements

### The Problem

Building distributed systems requires significant effort to solve communication, performance, and interoperability issues.
Developers often wish to focus solely on the **data and business logic** rather than the heavy lifting around transport and tooling.

### The Solution: gRPC

* gRPC is a **free and open-source RPC framework** developed by Google.
* It is part of the **Cloud Native Computing Foundation (CNCF)** ecosystem, alongside Docker, Kubernetes, and other major cloud-native technologies.
* gRPC enables you to call functions on remote services as if they were local — this is known as a **Remote Procedure Call (RPC)**.
* It abstracts complex networking details and provides:

  * Efficient binary serialization (Protocol Buffers)
  * Strongly typed contracts
  * High performance and low latency
  * Cross-language interoperability
  * Built-in support for streaming, load balancing, and authentication

---

# Course Structure

1. **Theory**
2. **Practice**
3. **Advanced Concepts**

---

# Pre-requisites

* Familiarity with a programming language
* Understanding of Protocol Buffers (proto3)
* Basic knowledge of asynchronous programming

---
