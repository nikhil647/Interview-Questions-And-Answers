
# 📘 NoSQL & Database Basics – Notes

## 🔹 What is NoSQL?

* **Full Form:** *Not Only SQL*
* It refers to databases that **do not rely solely on SQL** for querying.
* Designed for **flexibility, scalability, and handling unstructured data**.

### ✅ Key Characteristics:

* Schema-less (no fixed structure)
* Horizontally scalable (easy to scale across servers)
* High performance for large datasets

### ✅ Types of NoSQL Databases:

* **Key-Value Store** → Data stored as `Key : Value`
* **Document-Oriented Database** → Stores data in JSON-like documents
* (Other types for reference:)
  * Column-based
  * Graph databases

***

## 🔹 Can NoSQL be Queried Using SQL?

* ❌ Traditionally, NoSQL databases **cannot be queried using standard SQL**
* ✅ Some modern NoSQL systems provide **SQL-like query support**, but it is not universal

***

## 🔹 Are Databases a Single Source of Truth?

* ✅ **Answer:** *Depends on the application*

### 📌 Explanation:

* In some cases, **eventual consistency is acceptable**, e.g.:
  * Number of likes on a post
  * Number of views on a video
* These values **do not need to be perfectly up-to-date**

### ✅ Key Concepts:

* **Consistency** → Data is accurate and up-to-date
* **Availability** → System responds to requests even during failures

👉 Trade-off between these is explained by **CAP Theorem** (Consistency, Availability, Partition Tolerance)

***

## 🔹 Properties of Databases

* Generally aim to:
  * ✅ Be **consistent**
  * ✅ Be **available** for incoming requests
* Some systems relax consistency for better scalability (like NoSQL)

***

## 🔹 What is a Database Management System (DBMS)?

A **DBMS (Database Management System)** is software that manages databases.

### ✅ Responsibilities:

* Decides **how and where data is stored**
* Manages **data configuration and structure**
* Handles **data retrieval and storage efficiently**
* Supports:
  * ✅ **Read replicas** (copies of database for faster reads)
  * ✅ **Coordination across distributed systems**
* Ensures:
  * Data integrity
  * Security
  * Concurrency control

***

## 🔹 Summary

* NoSQL = flexible, scalable, non-relational databases
* Used when:
  * Data is large-scale or unstructured
  * Strict consistency is not always required
* DBMS helps manage storage, access, and coordination of data
* Not all databases act as a strict single source of truth—it depends on use case

***
