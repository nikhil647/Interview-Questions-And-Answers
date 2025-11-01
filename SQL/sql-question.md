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
Normalization’s main goal is indeed:

To reduce redundancy and improve data integrity.
redundancy - data duplication
data integrity - the assurance that data is accurate
---

## 🧱 Before Normalization (Unnormalized Table)

Imagine we have a table storing **customer orders**:

| CustomerID | CustomerName | CustomerEmail                               | OrderID | ProductName | ProductPrice |
| ---------- | ------------ | ------------------------------------------- | ------- | ----------- | ------------ |
| 1          | Nikhil       | [nikhil@gmail.com](mailto:nikhil@gmail.com) | 101     | Laptop      | 70,000       |
| 1          | Nikhil       | [nikhil@gmail.com](mailto:nikhil@gmail.com) | 102     | Mouse       | 1,000        |
| 2          | Raj          | [raj@gmail.com](mailto:raj@gmail.com)       | 103     | Keyboard    | 2,000        |
| 2          | Raj          | [raj@gmail.com](mailto:raj@gmail.com)       | 104     | Mouse       | 1,000        |

---

### 🧩 Problems (Redundancy + Integrity)

1. **Redundancy (Duplicate Data)**

   * Customer details (`Name`, `Email`) are repeated for every order.
   * If Nikhil changes his email, we must update it in **multiple rows**.

2. **Update Anomalies**

   * If one row gets updated but another doesn’t, data becomes **inconsistent**.

3. **Insert Anomalies**

   * Can’t add a new customer until they place an order.

4. **Delete Anomalies**

   * If Nikhil’s last order is deleted, his customer info disappears too.

---

## 🔧 After Normalization (Let’s Normalize to 2NF)

We break it into **separate tables** with relationships.

### 🧍 Customers Table

| CustomerID | CustomerName | CustomerEmail                               |
| ---------- | ------------ | ------------------------------------------- |
| 1          | Nikhil       | [nikhil@gmail.com](mailto:nikhil@gmail.com) |
| 2          | Raj          | [raj@gmail.com](mailto:raj@gmail.com)       |
| 3          | Govind       | [govind@gmail.com](mailto:govind@gmail.com) |

### 🧾 Orders Table

| OrderID | CustomerID | ProductID |
| ------- | ---------- | --------- |
| 101     | 1          | 1         |
| 102     | 1          | 2         |
| 103     | 2          | 3         |
| 104     | 2          | 2         |
| 105     | 1          | 1         |

### 📦 Products Table

| ProductID | ProductName | Price        |
 |
| --------- | ----------- | ------------ |
| 1         | Laptop      | 70,000       |
| 2         | Mouse       | 1,000        |
| 3         | Keyboard    | 2,000        |

---

### ✅ Benefits After Normalization

| Issue               | Before                           | After                            |
| ------------------- | -------------------------------- | -------------------------------- |
| **Redundancy**      | Customer info repeated per order | Stored once in `Customers` table |
| **Data Integrity**  | Risk of inconsistent data        | All references use `CustomerID`  |
| **Storage**         | Wastes space with duplicates     | Compact and efficient            |
| **Updates**         | Multiple rows to change          | Single row to update             |
| **Inserts/Deletes** | Limited flexibility              | Easy and safe                    |

---

### ⚡ Querying Example

To get all orders by Nikhil:

```sql
SELECT c.CustomerName, p.ProductName, p.ProductPrice
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
JOIN Products p ON o.ProductID = p.ProductID
WHERE c.CustomerName = 'Nikhil';
```

Even though we use `JOIN`s, the **data is clean, consistent, and scalable** — that’s the power of normalization.

---

### ❓ What is De-normalization?
De-normalization is a database optimization technique where you intentionally introduce redundancy (duplicate data)
into a normalized database to improve read performance — typically at the cost of more complex write operations.

🔹 When to Use De-normalization

✅ When read operations are far more frequent than writes.
✅ In analytical/reporting databases (OLAP systems).
✅ When performance is more important than strict consistency.
✅ When joins are too costly or slow.

---

### ❓What is an Index and how does it improve performance?

Perfect 👌 — let’s start with the **basics of an index** before diving into clustered or non-clustered types.

---

## 🧠 What is an Index (in Databases)?

An **index** is like a **shortcut** or **search directory** for your database — it helps speed up **data retrieval**.

Without an index, when you run a query like:

```sql
SELECT * FROM Employees WHERE Name = 'Nikhil';
```

👉 The database has to **scan every row** in the table — this is called a **full table scan**.

If you have **10 rows**, no problem.
But if you have **10 million rows**, that’s very slow ⚠️

---

## ⚡ What an Index Does

An **index** improves query performance by allowing the database to **find data faster**, similar to how an index in a **book** helps you find a topic quickly without reading every page.

📘 Example:

```sql
CREATE INDEX IX_Employees_Name
ON Employees (Name);
```

Now, when you query:

```sql
SELECT * FROM Employees WHERE Name = 'Nikhil';
```

The database will **look into the index** to quickly find the location of "Nikhil" — instead of scanning every row.

---

## 🧩 How It Works (Simplified)

* An index is usually stored as a **B-tree** (balanced tree) structure.
* It keeps the indexed column(s) **sorted** and allows **fast searching, insertion, and deletion**.
* Each index entry stores:

  * The **key** (like `Name = Nikhil`)
  * A **pointer** to the actual data row in the table

So it’s like:

```
Index:
-----------------
Name      | Row Pointer
-----------------
Amit      | Row 1
Nikhil    | Row 5
Ravi      | Row 8
```

When you search for `Nikhil`, the database goes straight to **Row 5** instead of reading all rows.

---

## 🧾 Advantages of Using Indexes

✅ **Faster SELECT queries**
✅ **Improves performance on WHERE, ORDER BY, and JOIN**
✅ **Reduces disk I/O** (fewer rows scanned)

---

## ⚠️ Disadvantages of Indexes

❌ **Slower INSERT/UPDATE/DELETE** — because the index must also be updated
❌ **Takes extra storage space**
❌ **Too many indexes** can hurt performance

---

## 🪄 Key Notes

* Index ≠ Data
  → It’s a **separate structure** that helps locate data faster.
* Primary keys and unique constraints **automatically create indexes**.
* You should **index columns that are searched or sorted often**, not every column.

### ❓ What is a Clustered and Non-Clustered Index?

Good question 👍 — let’s break it down simply and clearly 👇

---

### 🔹 **Clustered Index**

A **clustered index** determines **how the data is physically stored** in a table.

* It **sorts and stores the rows** of data in the table **based on the index key**.
* Each table can have **only one clustered index** because the data rows themselves can be stored in only one order.

📘 **Example:**

```sql
CREATE CLUSTERED INDEX IX_Employee_Id
ON Employees (EmployeeID);
```

Now, the `Employees` table’s data will be **physically sorted** by `EmployeeID`.

📦 Think of it like a **dictionary** arranged alphabetically — the pages themselves (data) are in order.

🧠 **Key Points:**

* The table data is stored **in the order of the clustered index**.
* **Primary Key** automatically creates a clustered index (by default, unless you specify otherwise).
* **Only one per table**.

---

### 🔹 **Non-Clustered Index**

A **non-clustered index** creates a **separate structure** from the data.

* It **stores pointers** to the data rows (not the actual data).
* You can have **multiple non-clustered indexes** on a table.

📘 **Example:**

```sql
CREATE NONCLUSTERED INDEX IX_Employee_Name
ON Employees (EmployeeName);
```

Now, a **separate index structure** stores EmployeeName values **with pointers** to where those rows exist in the actual table.

📦 Think of it like an **index at the back of a book** — it lists words (keys) and page numbers (pointers).

🧠 **Key Points:**

* Does **not change the physical order** of table data.
* You can have **many** non-clustered indexes.
* Useful for **searches, filters, and JOINs**.

---

### 🔍 **Comparison Table**

| Feature             | Clustered Index          | Non-Clustered Index              |
| ------------------- | ------------------------ | -------------------------------- |
| Physical data order | Sorted as per index key  | Separate structure               |
| Number per table    | Only 1                   | Many allowed                     |
| Storage             | Data pages themselves    | Separate from data               |
| Access speed        | Faster for range queries | Slower, needs lookup             |
| Example use         | Primary key              | Search/filter on non-key columns |

---

### 💡 Quick Example

```sql
CREATE TABLE Employees (
  EmployeeID INT PRIMARY KEY,     -- clustered index by default
  Name VARCHAR(100),
  Department VARCHAR(50)
);

CREATE NONCLUSTERED INDEX IX_Dept ON Employees (Department);
```

Here:

* `EmployeeID` → **Clustered Index**
* `Department` → **Non-Clustered Index**

---

### ❓ What are Constraints?

Sure 👍 Let’s go step-by-step —

---

### 🧩 **What are Constraints in SQL?**

**Constraints** are **rules** applied on columns in a table to ensure **data accuracy and integrity**.

They control what kind of data can go into a table.

---

### ⚙️ **Types of Constraints with Examples**

#### 1. **NOT NULL**

👉 Ensures that a column **cannot have NULL (empty)** values.

```sql
CREATE TABLE Students (
  id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  age INT
);
```

✅ Here, both `id` and `name` **must have a value** when inserting a record.

---

#### 2. **UNIQUE**

👉 Ensures that **all values in a column are different** (no duplicates).

```sql
CREATE TABLE Employees (
  emp_id INT UNIQUE,
  email VARCHAR(100) UNIQUE,
  name VARCHAR(50)
);
```

✅ Each `emp_id` and `email` must be **unique** in the table.

---

#### 3. **PRIMARY KEY**

👉 Combines **NOT NULL + UNIQUE**.
It **uniquely identifies each record** in a table.

```sql
CREATE TABLE Customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(50),
  city VARCHAR(50)
);
```

✅ `customer_id` must be unique and cannot be NULL.

---

#### 4. **FOREIGN KEY**

👉 Used to **link two tables**.
It ensures that the value in one table **exists in another** (referential integrity).

```sql
CREATE TABLE Orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
```

✅ You cannot insert an order for a customer that doesn’t exist in the `Customers` table.

---

#### 5. **CHECK**

👉 Ensures that the value in a column **meets a specific condition**.

```sql
CREATE TABLE Products (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  price DECIMAL(10,2) CHECK (price > 0)
);
```

✅ Prevents inserting a product with a `price ≤ 0`.

---

#### 6. **DEFAULT**

👉 Assigns a **default value** if no value is provided.

```sql
CREATE TABLE Users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  country VARCHAR(50) DEFAULT 'India'
);
```

✅ If you don’t specify `country`, it automatically becomes `'India'`.

---

### ✅ Example Summary

| Constraint      | Purpose                              | Example                                          |
| --------------- | ------------------------------------ | ------------------------------------------------ |
| **NOT NULL**    | Value must not be NULL               | `name VARCHAR(50) NOT NULL`                      |
| **UNIQUE**      | No duplicate values                  | `email VARCHAR(100) UNIQUE`                      |
| **PRIMARY KEY** | Uniquely identifies each row         | `id INT PRIMARY KEY`                             |
| **FOREIGN KEY** | Enforces relationship between tables | `FOREIGN KEY (cust_id) REFERENCES Customers(id)` |
| **CHECK**       | Validates data based on a condition  | `CHECK (age >= 18)`                              |
| **DEFAULT**     | Sets default value                   | `DEFAULT 'India'`                                |

---

### ❓ Define Referential Integrity

### 🔗 **Referential Integrity — Definition**

**Referential Integrity** is a **rule in relational databases** that ensures the **relationship between two tables remains consistent**.

> It means that a **foreign key value** in one table **must always refer to an existing primary key value** in another table.

---

### 🧠 **Why It’s Important**

It prevents:

* Orphan records (records pointing to non-existing entries)
* Broken relationships between tables
* Data inconsistency

---

### 💡 **Example**

```sql
CREATE TABLE Customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE Orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
```

#### ✅ Valid Case:

```sql
INSERT INTO Customers VALUES (1, 'Nikhil');
INSERT INTO Orders VALUES (101, 1);   -- ✅ Works (Customer 1 exists)
```

#### ❌ Invalid Case:

```sql
INSERT INTO Orders VALUES (102, 5);   -- ❌ Error: No customer with ID 5
```

👉 The second insert fails because **customer_id = 5** doesn’t exist in the `Customers` table — this is **Referential Integrity** in action.

---

### 🧾 **In Short**

| Term                      | Meaning                                              |
| ------------------------- | ---------------------------------------------------- |
| **Referential Integrity** | Ensures relationships between tables remain valid    |
| **Key Used**              | `FOREIGN KEY`                                        |
| **Purpose**               | Prevents invalid or orphan references between tables |


---

### ❓ What is an Entity-Relationship Diagram (ERD)?
An ERD (Entity Relationship Diagram) is a visual representation of a database structure.
It shows how tables (entities) are related to each other and what attributes (columns) they contain.

---

### ❓ What is an Alternate Key?
An Alternate Key is any candidate key that is not chosen as the Primary Key.
It can still uniquely identify a record in a table — but it’s not the main (primary) key.

When a table has more than one unique column, one becomes the Primary Key,
and the others are called Alternate Keys.

```sql
CREATE TABLE Employees (
  emp_id INT UNIQUE,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15) UNIQUE,
  PRIMARY KEY (emp_id)
);
```
emp_id, email, and phone can uniquely identify an employee.
We chose emp_id as the Primary Key.
Therefore, email and phone become Alternate Keys.

| Term              | Description                                                | Example                    |
| ----------------- | ---------------------------------------------------------- | -------------------------- |
| **Candidate Key** | A column (or combination) that can uniquely identify a row | `emp_id`, `email`, `phone` |
| **Primary Key**   | The chosen candidate key to uniquely identify rows         | `emp_id`                   |
| **Alternate Key** | Other candidate keys not chosen as Primary Key             | `email`, `phone`           |


---
Perfect 👍 Here’s your same content — beautifully formatted and typo-fixed for GitHub (Markdown ready).
I didn’t shorten or lengthen anything — just polished layout, indentation, and consistency.

---

# 🧠 Intermediate Level — Stored Procedures & Functions

## ❓ What is a Stored Procedure?

A **Stored Procedure** is a precompiled block of SQL code that you can save and reuse in a database.
Think of it like a **function in programming** — it performs a specific task, can take inputs, execute logic or queries, and return outputs.

---

### ⚙️ Scenario 1: Without Stored Procedure

You have a Node.js route to update a user’s balance.

```js
// updateBalance.js
app.post("/update-balance", async (req, res) => {
  const { userId, amount } = req.body;

  const query = `
    UPDATE users 
    SET balance = balance + ? 
    WHERE id = ?;
  `;

  await db.execute(query, [amount, userId]);

  res.send("Balance updated!");
});
```

✅ Works fine, right?

But imagine your business logic grows:

* If balance < 0 → reject.
* Log every transaction.
* Update last modified date.
* Call 3 queries together (transaction).

Your Node.js code becomes a **mess of SQL statements** and transaction management.

---

### ⚙️ Scenario 2: With Stored Procedure

You move the logic to the database once.

```sql
CREATE PROCEDURE UpdateUserBalance(
  IN userId INT,
  IN amount DECIMAL(10,2)
)
BEGIN
  DECLARE newBalance DECIMAL(10,2);

  SELECT balance INTO newBalance FROM users WHERE id = userId;

  IF newBalance + amount < 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient balance';
  ELSE
    UPDATE users 
    SET balance = newBalance + amount, updated_at = NOW() 
    WHERE id = userId;

    INSERT INTO transactions (user_id, amount, created_at) 
    VALUES (userId, amount, NOW());
  END IF;
END;
```

Now in Node.js:

```js
app.post("/update-balance", async (req, res) => {
  const { userId, amount } = req.body;

  try {
    await db.query("CALL UpdateUserBalance(?, ?)", [userId, amount]);
    res.send("Balance updated successfully!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
```

---

### 🚀 Why You’d Use It (as a Node.js Dev)

| Benefit                         | Meaning in Real Life                                                                      |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| 🧩 **Keeps Node.js code clean** | Your backend logic becomes shorter; database rules live in one place.                     |
| ⚡ **Faster execution**          | DB compiles it once — executes faster than sending multiple queries each time.            |
| 🔒 **Security**                 | App users can only `CALL` the procedure — not mess with raw SQL or table structure.       |
| 🧠 **Consistent logic**         | If multiple services use the same DB, they all share the same rules (no duplicate logic). |
| 💾 **Transaction-safe**         | Procedures handle commits/rollbacks inside — less headache in app layer.                  |

---

### 💡 Real Example (Production Use)

Imagine a company with:

* Admin dashboard (React + Node.js)
* Mobile app (API)
* Backend cron jobs

All these need to:

👉 Add order
👉 Deduct stock
👉 Update total sales
👉 Record audit logs

Instead of writing that logic in **3 Node.js services**, you make **one stored procedure**:

```sql
CALL CreateNewOrder(userId, productId, quantity);
```

Now all clients just call this — less duplication, more consistency.

---

### ⚠️ When You *Shouldn’t* Use Them

* For **simple CRUD apps** — plain SQL in Node is fine.
* When your logic changes *frequently* — editing stored procedures is slower than redeploying code.
* When your team prefers everything in **code-based logic** (and DB is just a data store).

---

## ❓ What are the Advantages of Using Stored Procedures?

### ⚡ Better Performance

Instead of sending 5 separate `INSERT` statements from Node.js → DB five times,
you can call one procedure that loops internally.

---

### 🔒 Improved Security

* You can restrict users to only execute stored procedures — not direct SQL queries.
* The app doesn’t need `INSERT`, `UPDATE`, or `DELETE` permissions — only `EXECUTE`.
* Helps prevent SQL injection since inputs are handled as parameters.

---

### 🧠 Code Reusability & Centralized Logic

All your database business logic lives inside the DB — reusable across:

* Node.js backend
* Admin panel
* Mobile API
* Internal scripts

---

### 🔁 Transaction Handling

Stored procedures can handle `BEGIN`, `COMMIT`, and `ROLLBACK` internally.

```sql
CREATE PROCEDURE TransferFunds(...)
BEGIN
  START TRANSACTION;
  -- debit user A, credit user B
  COMMIT;
END;
```

---

### 🧰 Easier Maintenance

**Why:**
Change logic in one place (inside DB) → no need to redeploy the Node.js app.
Useful when DB logic is shared across multiple backends.

**Example:**
Need to update a business rule?
Just modify the procedure in MySQL — no codebase change required.

---

### 💪 Encapsulation

**Why:**
You hide the database structure and logic behind a procedure.
The caller doesn’t need to know what tables or joins are inside.

**Example:**

Instead of letting the API call:

```sql
SELECT u.name, o.amount, p.status 
FROM users u 
JOIN orders o 
JOIN payments p;
```

You expose:

```sql
CALL GetUserOrderDetails(userId);
```

→ Less risk, more abstraction.

---

### 📈 Scalability for Complex Systems

When you have:

* Multiple microservices accessing the same DB
* Heavy reports, analytics, or workflows

You can shift that load to stored procedures — freeing Node.js servers from doing heavy joins and loops.

---

## ❓ What is the Difference Between a Function and a Stored Procedure?

A **Function** performs a calculation or returns a value — think of it as a formula or helper.
You can use it inside `SELECT` statements.
It **cannot** modify data (`INSERT`, `UPDATE`, `DELETE`).

| Feature                  | **Stored Procedure**                                       | **Function**                              |
| ------------------------ | ---------------------------------------------------------- | ----------------------------------------- |
| **Purpose**              | Perform an action (insert/update/delete/business logic)    | Perform a calculation and return a value  |
| **Return Type**          | Optional (can return 0 or many values using OUT params)    | Mandatory (must return one value)         |
| **Usage in SQL**         | Called with `CALL procedure_name()`                        | Used inside `SELECT`, `WHERE`, etc.       |
| **Allowed Statements**   | Can contain `INSERT`, `UPDATE`, `DELETE`, `CREATE`, `DROP` | Cannot modify data (only read/compute)    |
| **Transaction Handling** | Yes (supports `COMMIT` and `ROLLBACK`)                     | No transactions allowed                   |
| **Error Handling**       | Can use `DECLARE HANDLER` and custom errors                | Very limited                              |
| **Performance Use**      | Multi-step tasks, complex DB operations                    | Small reusable calculations or conditions |
| **Return Mechanism**     | `OUT` parameters or result sets                            | `RETURN` keyword only                     |
| **Called By**            | `CALL procedure_name()`                                    | Inside queries: `SELECT function_name()`  |

---

### ⚙️ Realistic Example — `GetCustomerLifetimeValue()`

💥 Boom — now the database computes everything internally,
no round-trips, no data-fetching loops in Node.js.

```sql
DELIMITER $$

CREATE FUNCTION GetCustomerLifetimeValue(cust_id INT)
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN
  DECLARE total_spent DECIMAL(12,2);

  SELECT SUM(o.total_amount - o.discount_amount)
  INTO total_spent
  FROM orders o
  WHERE o.customer_id = cust_id
    AND o.status = 'COMPLETED';

  RETURN IFNULL(total_spent, 0);
END$$

DELIMITER ;
```

✅ **What it does:**

* Looks up all completed orders for a given customer.
* Subtracts discounts.
* Returns the lifetime total spent (computed inside the database).

---

```sql
SELECT 
  c.id,
  c.name,
  GetCustomerLifetimeValue(c.id) AS lifetime_value
FROM customers c
ORDER BY lifetime_value DESC
LIMIT 10;
```

---

### 🧮 If You Tried This in Node.js…

```js
const orders = await prisma.order.findMany({
  where: { customerId: id, status: 'COMPLETED' },
  select: { totalAmount: true, discountAmount: true }
});

const total = orders.reduce((sum, o) => sum + (o.totalAmount - o.discountAmount), 0);
```

Looks simple —
but scale it to 1 million customers, and it becomes painfully slow.
You’d need batching, pagination, aggregation logic in Node, high memory usage, and more DB traffic.

Meanwhile, MySQL performs this aggregation **in compiled C code, in-memory, near the data** — much faster.

---

## 🚀 Why Function Calls Are Better in DB Than in Node.js

| Reason                    | Explanation                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| ⚡ **Performance**         | MySQL’s aggregation engine is C-based and parallel — 100x faster than JS loops.                         |
| 📦 **Less Data Transfer** | Node.js doesn’t need to pull 1M rows to compute totals — only gets final results.                       |
| 🧮 **Query Integration**  | You can use this function *inside* `SELECT`, `WHERE`, `ORDER BY` — Node.js can’t integrate that deeply. |
| 🔒 **Consistency**        | Always computes totals based on the same rules — no mismatch between backend services.                  |
| 🔁 **Reusability**        | Use it in dashboards, reports, and triggers — all reuse the same computation.                           |

---



- What is a Trigger?

Absolutely 👍 Here’s a **clean, structured, and note-ready version** — formatted perfectly for GitHub or your personal notes.
It includes clear definitions, examples, and SQL code blocks for all **INSERT**, **UPDATE**, and **DELETE** triggers.

---

## ❓ What is a Trigger?

A **Trigger** is a special kind of stored procedure that runs **automatically** when a specified event occurs on a table (like an `INSERT`, `UPDATE`, or `DELETE`).
It allows the database to **react to changes** without requiring any manual call from your application.

---

## ⚙️ How It Works

* Triggers are **event-driven** — they fire automatically after or before a DML operation.
* They can access two pseudo-records:

  | Keyword | Description                                                       |
  | ------- | ----------------------------------------------------------------- |
  | `NEW`   | Refers to the new row being inserted or updated                   |
  | `OLD`   | Refers to the existing row before update or the row being deleted |

---

## 🎯 Real-World Use Case

You want to maintain an **audit trail** for your `Orders` table — every time a record is inserted, updated, or deleted, a corresponding entry should be stored in a `OrderLogs` table automatically.

---

## 🧩 Table Setup

### 1️⃣ Main Table — `Orders`

```sql
CREATE TABLE Orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'CREATED',  -- e.g. CREATED, PAID, SHIPPED
  created_at DATETIME DEFAULT NOW(),
  updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
);
```

### 2️⃣ Log Table — `OrderLogs`

```sql
CREATE TABLE OrderLogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  action VARCHAR(20) NOT NULL,      -- e.g. Inserted / Updated / Deleted
  old_status VARCHAR(20) NULL,
  new_status VARCHAR(20) NULL,
  created_at DATETIME DEFAULT NOW()
);
```

---

## 🚀 Triggers Implementation

### 🟢 INSERT Trigger

```sql
DELIMITER $$

CREATE TRIGGER after_order_insert
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    INSERT INTO OrderLogs (order_id, action, new_status, created_at)
    VALUES (NEW.id, 'Inserted', NEW.status, NOW());
END$$

DELIMITER ;
```

**Purpose:**

* Fires **after a new record** is added to `Orders`
* Logs the event as `Inserted`
* Captures the `new_status` from the inserted row

---

### 🟡 UPDATE Trigger

```sql
DELIMITER $$

CREATE TRIGGER after_order_update
AFTER UPDATE ON Orders
FOR EACH ROW
BEGIN
    INSERT INTO OrderLogs (order_id, action, old_status, new_status, created_at)
    VALUES (NEW.id, 'Updated', OLD.status, NEW.status, NOW());
END$$

DELIMITER ;
```

**Purpose:**

* Fires **after any update** to `Orders`
* Logs the event as `Updated`
* Records both old and new status values

---

### 🔴 DELETE Trigger

```sql
DELIMITER $$

CREATE TRIGGER after_order_delete
AFTER DELETE ON Orders
FOR EACH ROW
BEGIN
    INSERT INTO OrderLogs (order_id, action, old_status, created_at)
    VALUES (OLD.id, 'Deleted', OLD.status, NOW());
END$$

DELIMITER ;
```

**Purpose:**

* Fires **after a record is deleted** from `Orders`
* Logs the event as `Deleted`
* Captures the status before deletion

---

## ✅ Final Output Example

### When inserting:

```sql
INSERT INTO Orders (customer_id, total_amount, status)
VALUES (101, 999.00, 'CREATED');
```

**OrderLogs**

| id | order_id | action   | old_status | new_status | created_at          |
| -- | -------- | -------- | ---------- | ---------- | ------------------- |
| 1  | 1        | Inserted | NULL       | CREATED    | 2025-10-31 16:25:12 |

---

### When updating:

```sql
UPDATE Orders SET status = 'PAID' WHERE id = 1;
```

**OrderLogs**

| id | order_id | action  | old_status | new_status | created_at          |
| -- | -------- | ------- | ---------- | ---------- | ------------------- |
| 2  | 1        | Updated | CREATED    | PAID       | 2025-10-31 16:30:45 |

---

### When deleting:

```sql
DELETE FROM Orders WHERE id = 1;
```

**OrderLogs**

| id | order_id | action  | old_status | new_status | created_at          |
| -- | -------- | ------- | ---------- | ---------- | ------------------- |
| 3  | 1        | Deleted | PAID       | NULL       | 2025-10-31 16:40:18 |

---

## 🧠 Key Takeaways

| Concept            | Explanation                                                        |
| ------------------ | ------------------------------------------------------------------ |
| **Trigger**        | A special procedure that executes automatically on database events |
| **Purpose**        | Maintain data integrity, audit logs, or enforce rules              |
| **`NEW` / `OLD`**  | Access new or previous row values inside trigger                   |
| **Best Practices** | Keep triggers lightweight, avoid heavy logic inside                |
| **Common Use**     | Logging, auditing, automatic timestamps, data syncing              |

---
- What is a Cursor and how is it used?

A cursor acts like a pointer that goes through the result of a SQL query one row at a time.

sometimes you need to process each row individually, for example:
Logging or auditing each row separately.
Performing calculations that depend on previous rows.
Calling stored procedures per row.

eg calculating credit score for each user.
we might need to call take help from multiple table (transaction, loans etc) and to get updated value.

simple curser example 
```sql
-- 1. Declare the cursor.
DECLARE employee_cursor CURSOR FOR
SELECT name FROM Employees;

-- 2. Open the cursor.
OPEN employee_cursor;

-- 3. Fetch rows from the cursor.
DECLARE @employee_name NVARCHAR(100);

FETCH NEXT FROM employee_cursor INTO @employee_name;
WHILE @@FETCH_STATUS = 0
BEGIN
    PRINT @employee_name;  -- process each row
    FETCH NEXT FROM employee_cursor INTO @employee_name;
END;

-- 4. Close and deallocate
CLOSE employee_cursor;
DEALLOCATE employee_cursor;
```

- What is a Sub-query? Explain its properties.

A subquery (also called an inner query or nested query) is a query inside another SQL query.
It is used to fetch data that will be used by the main query.

```sql
SELECT name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```


- What is a Nested Trigger?

A Nested Trigger is a trigger that fires another trigger — meaning one trigger’s action causes another trigger to execute automatically.

Avoid deep nesting — it makes debugging and performance tuning hard.
Always ensure no cyclic dependency (trigger A → B → A)

- How to implement One-to-One, One-to-Many, and Many-to-Many relationships?
```
https://chatgpt.com/c/690614b4-37ec-8321-b177-08e1e67ced43
```

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


# List all customers along with their orders (show customer name and order ID)
SELECT c.CustomerName, o.OrderID FROM Customers c INNER JOIN Orders o ON c.CustomerID = o.CustomerID;

# Show all products purchased by each customer (customer name + product name).
SELECT c.CustomerName, p.ProductName from Customers c INNER JOIN Orders o ON c.CustomerID = o.CustomerID INNER JOIN Products p ON o.ProductID = p.ProductID;


# 💰 Calculate total amount spent by each customer.
Select c.CustomerName, SUM(p.ProductPrice) from Customers c INNER JOIN Orders o ON c.CustomerID = o.CustomerID INNER JOIN Products p on p.ProductID = o.ProductID group by c.CustomerName;


# Find all customers who have not placed any order yet.
Select c.CustomerName, o.OrderID from Customers c LEFT JOIN Orders o on c.CustomerID = o.CustomerID WHERE o.OrderID IS NULL;

#List all products that have never been ordered.
SELECT p.ProductName FROM Orders o RIGHT JOIN Products p ON o.ProductID = p.ProductID WHERE o.OrderID is NULL;

# Show all order details with customer name, product name, and product price — sorted by highest price first.
SELECT C.CustomerName, P.ProductName, P.ProductPrice FROM Customers C INNER JOIN Orders O ON C.CustomerID = O.CustomerID INNER JOIN Products P ON P.ProductID = O.ProductID ORDER BY P.ProductPrice DESC;

# Find customers who ordered the same product more than once.
SELECT CustomerID FROM Orders GROUP BY CustomerID, ProductID HAVING COUNT(CustomerID) > 1  

#Show average order value per customer
SELECT O.CustomerID, AVG(P.ProductPrice) FROM Orders O INNER JOIN Products P ON P.ProductID = O.ProductID GROUP BY CustomerID;
