# Containers

A **container** is a lightweight, standalone, executable package that includes everything needed to run an application.

---

## Key Features

- **Portable** – Runs consistently across different environments.
- **Isolated** – Works independently from other containers.
- **Lightweight** – Shares the **host OS kernel** instead of using a full virtual machine.  
  - **Meaning**: Containers do *not* include their own operating system.  
    They reuse the host machine's OS kernel (the core of the operating system).  
    This makes containers smaller and faster than VMs.

---

## How Containers Work

1. Developers build an application and package it into a container.
2. A container runtime (like Docker) runs it on any system with Docker installed.
3. Multiple containers can run on the same host, each isolated from others.

---

## Containerization

Containerization is the process of packaging an application and its dependencies into a container.

---

## Benefits

- **Consistency** – Works the same across development, testing, and production.
- **Efficiency** – Uses fewer resources than traditional virtual machines.
- **Scalability** – Easy to deploy and scale in microservices architecture.
- **Rapid Deployment** – Faster build, test, and deployment cycles.

---

## Popular Tools

- **Docker**
- **Kubernetes** (for orchestration)
