# 🟢 SQL Interview Q&A

## 🧩 Basic Level

### ❓ What is SQL?
SQL (Structured Query Language) is designed for **inserting**, **querying**, **updating**, and **managing** data in a relational database management system (RDBMS).

---

### ❓ What are the differences between DDL, DML, and DCL in SQL?

| Type    | Full Form                  | Purpose                                                                                        | Example Queries                             |
|----------|---------------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------|
| **DDL** | Data Definition Language   | Defines or changes the structure of database objects (like tables, schemas).                   | `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE` |
| **DML** | Data Manipulation Language | Deals with actual data inside tables — inserting, updating, deleting, and **retrieving** data. | `SELECT`, `INSERT`, `UPDATE`, `DELETE`      |
| **DCL** | Data Control Language      | Controls access and permissions to the database.                                               | `GRANT`, `REVOKE`                           |

---

### 🧱 DDL Example
```sql
CREATE TABLE Students (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  age INT
);
```

### 🧩 DML Example
```sql
INSERT INTO Students (id, name, age)
VALUES (1, 'Nikhil', 22);
```

### 🔐 DCL Example
```sql
GRANT SELECT ON Students TO user1;
```
> This gives permission to `user1` to read (SELECT) data from the table **Students**.

---

### ❓ What is a Transaction in SQL?
A **transaction** in SQL is a sequence of operations performed as a single unit of work.  
It ensures that either **all operations succeed (COMMIT)** or **none of them take effect (ROLLBACK)**, maintaining data integrity.

---

### ❓ What is a Database Lock?
A **Database Lock** is like a “DO NOT DISTURB” sign placed on data by a transaction to prevent others from modifying it simultaneously.

**Purpose:** To maintain data integrity by avoiding conflicts between multiple users.

---

### ❓ What are the Types of Locks?

## 🔒 Types of Locks in SQL

---

### **1. Shared Lock (S Lock)**

**Purpose:**  
Allows transactions to **read** a resource (like a row or table) but **not modify** it.  
Multiple transactions can hold shared locks on the same data **at the same time**.

**Example:**
```sql
-- Transaction T1
BEGIN TRANSACTION;
SELECT Balance FROM Accounts WHERE AccountID = 1;  -- Shared Lock (S)
-- Still open...

-- Transaction T2
BEGIN TRANSACTION;
SELECT Balance FROM Accounts WHERE AccountID = 1;  -- Also Shared Lock (S)
```
✅ Both T1 and T2 can read concurrently.  
❌ If T3 tries to UPDATE the same record, it must wait until T1 and T2 release their shared locks.

---

### **2. Exclusive Lock (X Lock)**

**Purpose:**  
Allows a transaction to **read and modify** data.  
No other transaction can **read or write** the same data while this lock is held.

**Example:**
```sql
-- Transaction T1
BEGIN TRANSACTION;
UPDATE Accounts SET Balance = Balance - 1000 WHERE AccountID = 1; -- Exclusive Lock (X)
-- T1 still open...

-- Transaction T2
SELECT Balance FROM Accounts WHERE AccountID = 1; -- Will WAIT (blocked)
```
✅ Only T1 can read/write during the lock.  
❌ T2 must wait until T1 commits or rolls back.

---

### **3. Update Lock (U Lock)**

**Purpose:**  
An **Update Lock** is a **temporary, in-between** lock between Shared (S) and Exclusive (X).  
It’s used when a transaction **reads data with the intention to update it later**.  
The main reason: **to prevent deadlocks** that occur when two transactions try to upgrade from S → X at the same time.

**Without Update Locks (Deadlock-prone):**
```sql
-- Transaction T1
BEGIN TRAN;
SELECT * FROM Accounts WHERE AccountID = 1;  -- Shared Lock (S)
UPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 1;

-- Transaction T2
BEGIN TRAN;
SELECT * FROM Accounts WHERE AccountID = 1;  -- Shared Lock (S)
UPDATE Accounts SET Balance = Balance + 200 WHERE AccountID = 1;
```
Both T1 and T2 read successfully (S locks).  
When both reach `UPDATE`, each tries to upgrade S → X and ends up **waiting for each other → DEADLOCK** ❌

**With Update Locks (No Deadlock):**
```sql
-- Transaction T1
BEGIN TRAN;
SELECT * FROM Accounts WITH (UPDLOCK) WHERE AccountID = 1;  -- Update Lock (U)
UPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 1;  -- Converts U → X

-- Transaction T2
BEGIN TRAN;
SELECT * FROM Accounts WITH (UPDLOCK) WHERE AccountID = 1;  -- Must WAIT
UPDATE Accounts SET Balance = Balance + 200 WHERE AccountID = 1;
```
✅ Only one transaction can hold a U lock at a time.  
✅ When it updates, the U lock upgrades to an X lock.  
✅ Prevents deadlocks safely.

---

### **4. Intent Locks (IS, IX, SIX, etc.)**

we can use Shared, Exclusive, and Update locks directly in my code. For Intent Locks, while they're automatically managed by SQL Server.

**Purpose:**  
Intent Locks **don’t lock data directly**, they **signal the intention** to acquire locks at a lower level (like rows or pages).  
They help the database engine **detect conflicts quickly** when both row-level and table-level locks exist.

**Types:**
| Lock | Meaning |
|------|----------|
| **IS (Intent Shared)** | Intention to acquire shared locks at lower level |
| **IX (Intent Exclusive)** | Intention to acquire exclusive locks at lower level |
| **SIX (Shared + Intent Exclusive)** | Shared lock on table + intention to get exclusive locks on some rows |

Scenario 1: Compatible Intentions - Both Can Proceed

-- Transaction A (Reading)
```sql
BEGIN TRANSACTION;
SELECT * FROM Employees WHERE Dept = 'IT';
-- Places: Intent Shared (IS) on table + Shared (S) on IT rows
```

-- Transaction B (Reading different rows)  
```sql
SELECT * FROM Employees WHERE Dept = 'HR';
-- Places: Intent Shared (IS) on table + Shared (S) on HR rows
-- ✅ RESULT: Both succeed! IS locks are compatible.
```

Scenario 2: Reading vs Writing - Reader Waits
```sql
-- Transaction A (Writing)
BEGIN TRANSACTION;
UPDATE Employees SET Salary = 50000 WHERE ID = 100;
-- Places: Intent Exclusive (IX) on table + Exclusive (X) on row 100
```

-- Transaction B (Trying to read the same row)
```sql
SELECT * FROM Employees WHERE ID = 100;
-- Tries: Intent Shared (IS) on table + Shared (S) on row 100
-- ❌ RESULT: Transaction B WAITS because IX and S are incompatible
```

Scenario 3: Writing vs Writing - Second Writer Waits
```sql
-- Transaction A 
UPDATE Products SET Stock = Stock - 1 WHERE ProductID = 5;
-- Places: IX on table + X on ProductID 5
```

-- Transaction B
```sql
UPDATE Products SET Price = 19.99 WHERE ProductID = 5;  
-- Tries: IX on table + X on ProductID 5
-- ❌ RESULT: Transaction B WAITS because X and X are incompatible
```

**Example:**
```sql
-- Transaction T1
BEGIN TRAN;
SELECT * FROM Accounts WHERE AccountID = 1;  -- Shared Lock (S) on row
-- Adds Intent Shared (IS) on table

-- Transaction T2
BEGIN TRAN;
UPDATE Accounts SET Balance = 100 WHERE AccountID = 2;  -- Exclusive Lock (X) on row
-- Adds Intent Exclusive (IX) on table
```
✅ Intent locks prevent conflicts between table-level and row-level operations efficiently.

---

### 🧩 Summary Table

| Lock Type | Allows Read | Allows Write | Other Reads Allowed | Purpose |
|------------|--------------|---------------|---------------------|----------|
| **Shared (S)** | ✅ | ❌ | ✅ | Reading data |
| **Exclusive (X)** | ✅ (by owner) | ✅ | ❌ | Updating/deleting data |
| **Update (U)** | ✅ | ❌ (until converted) | ❌ | Prevents deadlocks during updates |
| **Intent (IS/IX)** | — | — | — | Indicates intention to lock lower-level objects |


---

### ❓ What is a Primary Key?
A **Primary Key** uniquely identifies each record in a table. It cannot contain NULL values.

---

### ❓ What is a Composite Key?
A **Composite Key** is made up of **two or more columns** used together to uniquely identify a record.

---

### ❓ What is a Foreign Key?
A **Foreign Key** is a column that creates a relationship between two tables by referencing the Primary Key of another table.

---

### ❓ Difference between HAVING and WHERE Clause

| Clause | Used With | Filters On | Example |
|---------|------------|------------|----------|
| **WHERE** | Rows | Individual rows | `SELECT * FROM Students WHERE age > 18;` |
| **HAVING** | Groups | Aggregate results | `SELECT age, COUNT(*) FROM Students GROUP BY age HAVING COUNT(*) > 1;` |

---

### ❓ What is an Identity Column?
An **Identity Column** automatically generates unique numeric values (often for primary keys).

```sql
CREATE TABLE Employees (
  emp_id INT IDENTITY(1,1),
  name VARCHAR(50)
);
```

---

### ❓ What is a View in SQL and How to Create One?

A View in SQL is like a virtual table — it doesn’t store data itself but displays data stored in one or more underlying tables.

You can think of it as a saved SQL query

```sql
CREATE VIEW IT_Employees AS
SELECT name, salary
FROM employees
WHERE department = 'IT';
```
apply query on view
```sql
SELECT AVG(salary) AS avg_it_salary
FROM IT_Employees;
```
---

### ❓ Uses of a View
- Simplifies complex queries  
- Restricts access to specific columns  
- Provides logical data independence
---

### 🧩 What is a JOIN?

A **JOIN** combines rows from **two or more tables** using a related column — usually a **primary key** in one table and a **foreign key** in another.

We’ll use two sample tables for examples:

**Table: `Customers`**

| CustomerID | Name    |
| ---------- | ------- |
| 1          | Alice   |
| 2          | Bob     |
| 3          | Charlie |

**Table: `Orders`**

| OrderID | CustomerID | Product  |
| ------- | ---------- | -------- |
| 101     | 1          | Laptop   |
| 102     | 2          | Keyboard |
| 103     | 4          | Mouse    |

---

## 1️⃣ INNER JOIN

Returns **only the matching rows** from both tables.

```sql
SELECT Customers.Name, Orders.Product
FROM Customers
INNER JOIN Orders
ON Customers.CustomerID = Orders.CustomerID;
```

**Result:**

| Name  | Product  |
| ----- | -------- |
| Alice | Laptop   |
| Bob   | Keyboard |

✅ Only customers who **have placed orders** appear (1 and 2).
❌ Charlie (no order) and OrderID 103 (no matching customer) are excluded.

---

## 2️⃣ LEFT JOIN (LEFT OUTER JOIN)

Returns **all rows from the left table**, and the **matching rows from the right table**.
If no match → NULLs are shown.

```sql
SELECT Customers.Name, Orders.Product
FROM Customers
LEFT JOIN Orders
ON Customers.CustomerID = Orders.CustomerID;
```

**Result:**

| Name    | Product  |
| ------- | -------- |
| Alice   | Laptop   |
| Bob     | Keyboard |
| Charlie | NULL     |

✅ Shows **all customers**, even if they didn’t order.
❌ Order with CustomerID 4 not shown.

---

## 3️⃣ RIGHT JOIN (RIGHT OUTER JOIN)

Opposite of LEFT JOIN — returns **all rows from the right table**, and matches from the left.

```sql
SELECT Customers.Name, Orders.Product
FROM Customers
RIGHT JOIN Orders
ON Customers.CustomerID = Orders.CustomerID;
```

**Result:**

| Name  | Product  |
| ----- | -------- |
| Alice | Laptop   |
| Bob   | Keyboard |
| NULL  | Mouse    |

✅ Shows **all orders**, even if customer not found (CustomerID 4 → NULL name).

---

## 4️⃣ FULL OUTER JOIN

Returns **all rows from both tables**, whether they match or not.
Missing values → filled with NULLs.

```sql
SELECT Customers.Name, Orders.Product
FROM Customers
FULL OUTER JOIN Orders
ON Customers.CustomerID = Orders.CustomerID;
```

**Result:**

| Name    | Product  |
| ------- | -------- |
| Alice   | Laptop   |
| Bob     | Keyboard |
| Charlie | NULL     |
| NULL    | Mouse    |

✅ Combines results of LEFT + RIGHT JOIN.

---

## 5️⃣ CROSS JOIN

Returns the **Cartesian product** — every combination of rows between two tables.
⚠️ No `ON` condition is used.

```sql
SELECT Customers.Name, Orders.Product
FROM Customers
CROSS JOIN Orders;
```

**Result:**

| Name    | Product  |
| ------- | -------- |
| Alice   | Laptop   |
| Alice   | Keyboard |
| Alice   | Mouse    |
| Bob     | Laptop   |
| Bob     | Keyboard |
| Bob     | Mouse    |
| Charlie | Laptop   |
| Charlie | Keyboard |
| Charlie | Mouse    |

✅ Used rarely — mostly for generating all combinations.

---

## 6️⃣ SELF JOIN

A table joins with **itself** — useful for hierarchical or relational data within the same table.

**Example:**
`Employees` table:

| EmpID | Name  | ManagerID |
| ----- | ----- | --------- |
| 1     | Asha  | NULL      |
| 2     | Ravi  | 1         |
| 3     | Neha  | 1         |
| 4     | Kiran | 2         |

```sql
SELECT e.Name AS Employee, m.Name AS Manager
FROM Employees e
LEFT JOIN Employees m
ON e.ManagerID = m.EmpID;
```

**Result:**

| Employee | Manager |
| -------- | ------- |
| Asha     | NULL    |
| Ravi     | Asha    |
| Neha     | Asha    |
| Kiran    | Ravi    |

✅ Great for hierarchical relationships (manager → employee).

---

### ⚡ Summary Table

| Join Type      | Returns                    |
| -------------- | -------------------------- |
| **INNER JOIN** | Matching rows only         |
| **LEFT JOIN**  | All from left + matches    |
| **RIGHT JOIN** | All from right + matches   |
| **FULL JOIN**  | All from both              |
| **CROSS JOIN** | All combinations           |
| **SELF JOIN**  | A table joined with itself |


---

### ❓ What is Normalization?
**Normalization** is the process of organizing data to reduce redundancy and improve data integrity.

---

### ❓ What is De-normalization?
**De-normalization** adds redundancy to improve query performance by combining related tables.

---

### ❓ What is a Clustered and Non-Clustered Index?
- **Clustered Index:** Rearranges the actual data in the table. (One per table)  
- **Non-Clustered Index:** Creates a separate structure that points to the data.

---

### ❓ What are Constraints?
Constraints are rules enforced on data columns — such as **NOT NULL**, **UNIQUE**, **CHECK**, **DEFAULT**, **PRIMARY KEY**, and **FOREIGN KEY**.

---

### ❓ Define Referential Integrity
It ensures relationships between tables remain consistent — a foreign key value must always refer to an existing primary key.

---

### ❓ What is an Entity-Relationship Diagram (ERD)?
An **ERD** visually represents tables (entities), their attributes, and the relationships between them.

---

### ❓ What is an Alternate Key?
An **Alternate Key** is any candidate key that is not chosen as the primary key.

---

## 🧠 Intermediate Level

- What is a Stored Procedure?
- What are the advantages of using Stored Procedures?
- What is the difference between Function and Stored Procedure?
- What is a Trigger?
- What is a Cursor and how is it used?
- What is a Sub-query? Explain its properties.
- What is a Nested Trigger?
- What is a Linked Server?
- What is Collation?
- What is a CTE (Common Table Expression)?
- What is a MERGE Statement?
- What is a Filtered Index?
- What are Sparse Columns?
- What does the TOP Operator do?
- What is an Index and how does it improve performance?
- What is Policy Management in SQL Server?
- What are Master, TempDB, Model, and MSDB databases?
- How to implement One-to-One, One-to-Many, and Many-to-Many relationships?
- What are Primary Keys and Foreign Keys?
- What is RDBMS and what are its features?

---

## 🚀 Advanced Level

- What is a Data Warehouse?
- What are Dimension and Fact Tables?
- What is Data Mining?
- What is Replication and Database Mirroring?
- What is Service Broker?
- Can SQL Servers be linked to other databases like Oracle?
- What are new data types in SQL Server 2008?  
  *(Geometry, Geography, Date, Time, DateTimeOffset, DateTime2)*

---

## 🏆 Bonus: Common SQL Queries

```sql
-- Find the second highest salary of an employee
SELECT MAX(salary) FROM Employees
WHERE salary < (SELECT MAX(salary) FROM Employees);

-- Find maximum salary from each department
SELECT department, MAX(salary) FROM Employees GROUP BY department;

-- Display the current date
SELECT GETDATE();

-- List distinct employee names whose DOB is between given dates
SELECT DISTINCT name FROM Employees WHERE DOB BETWEEN '1990-01-01' AND '2000-12-31';

-- Fetch all records from two tables but show common records only once
SELECT * FROM table1
UNION
SELECT * FROM table2;

-- Fetch only common records
SELECT * FROM table1
INTERSECT
SELECT * FROM table2;

-- Retrieve records present in one table but not in another
SELECT * FROM table1
EXCEPT
SELECT * FROM table2;

-- Count total salary department-wise where more than 2 employees exist
SELECT department, SUM(salary) FROM Employees
GROUP BY department
HAVING COUNT(*) > 2;

-- Display employees who have worked more than 5 years
SELECT name FROM Employees
WHERE DATEDIFF(YEAR, join_date, GETDATE()) > 5;

-- Display employees who joined before June 1990 or after December 1990
SELECT name FROM Employees
WHERE join_date < '1990-06-01' OR join_date > '1990-12-31';

-- Show employees working in department 10, 20, or 40, or as clerks, salesmen, or analysts
SELECT * FROM Employees
WHERE dept_no IN (10, 20, 40)
OR job IN ('CLERK', 'SALESMAN', 'ANALYST');

-- Display employee names starting with 'S'
SELECT name FROM Employees WHERE name LIKE 'S%';

-- Display employee names ending with 'S'
SELECT name FROM Employees WHERE name LIKE '%S';
```
