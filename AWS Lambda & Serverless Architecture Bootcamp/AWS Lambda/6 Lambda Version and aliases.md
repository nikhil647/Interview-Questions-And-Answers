# 🧩 AWS Lambda Versions and Aliases

## ⚙️ Lambda Versions

Lambda **versions** help you manage and track changes to your function code easily.

### 🧠 Key Points
- Each published **version is immutable** (cannot be changed once created).
- Every version has a **unique version number**, like `1`, `2`, `3`, etc.
- The **$LATEST** version is the **unpublished** or **working copy** of your function — you can update this anytime.
- Once your changes are tested and stable, you can **publish** a new version.

### ✅ Example
| Version | Description |
|----------|--------------|
| $LATEST | Editable code, current working state |
| 1 | First stable release |
| 2 | Updated version with new logic |

---

## 🏷️ Lambda Aliases

A **Lambda Alias** acts as a **pointer to a specific version** of your function.  
It helps in managing **environments** like `DEV`, `TEST`, or `PROD` without changing client configurations.

### 🧠 Key Points
- Each alias points to **one version**.
- Aliases make **deployments and rollbacks** simple.
- You can **switch or update** which version an alias points to.

### ✅ Example
| Alias | Points To Version | Description |
|--------|-------------------|-------------|
| DEV | 3 | Development build |
| TEST | 4 | Testing version |
| PROD | 5 | Production release |

---

## 🌀 Blue/Green Deployment (Using Aliases)

Blue/Green deployment helps you **gradually shift traffic** from one version to another without downtime.

### 💡 Example
You can slowly move traffic from **v5 → v6** using the `PROD` alias:

| Version | Traffic Share |
|----------|----------------|
| v5 | 80% |
| v6 | 20% |

Once stable, shift 100% of traffic to **v6** — this ensures a smooth, safe deployment.

---

### ✅ Summary

| Concept | Description |
|----------|--------------|
| **Version** | A fixed copy of your function code |
| **$LATEST** | Editable, mutable version |
| **Alias** | Pointer to a version (like DEV/PROD) |
| **Blue/Green Deployment** | Safely shift traffic between versions |

---

### 🚀 Best Practice
- Use `$LATEST` only for development and testing.
- Always publish a version before deploying to production.
- Use aliases (`DEV`, `PROD`) to simplify environment management.
- Gradually shift traffic to new versions using Blue/Green deployment.
