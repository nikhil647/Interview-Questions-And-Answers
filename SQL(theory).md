# SQL Interview Question

**What is Database?**
```
A database is a structured collection of data that is organized and stored in a computer system.
It is designed to efficiently manage, store, and retrieve information.

types of databases
including relational databases (such as MySQL, PostgreSQL, and Oracle),
NoSQL databases (such as MongoDB and Cassandra)
```

**What is DBMS?**
```
DBMS stands for Database Management System. DBMS is a system software responsible for the creation, retrieval, updation, and management of the database

It ensures that our data is consistent, organized, and is easily accessible by serving as an interface between the database and its end-users or application software
```

**What is SQL?**
```
SQL stands for Structured Query Language. It is the standard language for relational database management systems
```

**What are Tables and Fields?**
```
A table is an organized collection of data stored in the form of rows and columns.
Columns can be categorized as vertical and rows as horizontal.
The columns in a table are called fields while the rows can be referred to as records
```
** What are Constraints in SQL **
```
Constraints are used to specify the rules concerning data in the table

Primary Key Constraint:  Ensures that a column (or a group of columns) uniquely identifies each record in a table.
It implies that the column cannot contain NULL values and must have unique values within the table.
eg: StudentID INT PRIMARY KEY

Foreign Key Constraint: Establishes a link between data in two tables,
where the foreign key column in one table refers to the primary key column in another table.
eg: OrderID INT PRIMARY KEY
FOREIGN KEY (ProductID) REFERENCES Products(ProductID),

Unique Constraint: Ensures that all values in a column (or a group of columns) are unique, except for NULL values
eg:  SSN VARCHAR(11) UNIQUE

Check Constraint: Defines a condition that the data in a column must satisfy. 
eg: Price DECIMAL(10, 2),
    Quantity INT,
    CHECK (Price > 0 AND Quantity >= 0)

Not Null Constraint: Ensures that a column cannot contain NULL values.
eg:     Name VARCHAR(255) NOT NULL

Default: DEFAULT constraint is used to provide a default value.
    column1 datatype DEFAULT default_value,
```

**What is a Join? List its different types**
```
The SQL Join clause is used to combine records (rows) from two or more tables in a SQL database based on a related column between the two.

There are four different types of JOINs in SQL:
(INNER) JOIN: Retrieves records that have matching values in both tables involved in the join. This is the widely used join for queries.
LEFT (OUTER) JOIN: Retrieves all the records/rows from the left and the matched records/rows from the right table.
RIGHT (OUTER) JOIN: Retrieves all the records/rows from the right and the matched records/rows from the left table.
FULL (OUTER) JOIN: Retrieves all the records where there is a match and remaining in either the left or right table.

SELECT employees.employee_id, employees.employee_name, departments.department_name
FROM employees
INNER JOIN departments ON employees.department_id = departments.department_id;

Instead of INNER JOIN we can have LEFT, RIGHT, FULL.
```

**What is a Self-Join?**
```
A self JOIN is a case of regular join where a table is joined to itself based on some relation between its own column(s).
```
**What is a Cross-Join?
```
A cross join, also known as a Cartesian join  that produces the Cartesian product of two tables.
In other words, it returns every combination of rows from the two tables,
where each row from the first table is combined with every row from the second table
```

**What is an Index? Explain its different types**
```.
It enhances the speed of operations accessing data from a database table at the
cost of additional writes and memory to maintain the index data structure.

CREATE INDEX index_name   /* Create Index */
ON table_name (column_1, column_2);
DROP INDEX index_name;
```

**What is a Subquery? What are its types?**
```
A subquery is a query within another query, also known as a nested query or inner query.
It is used to restrict or enhance the data to be queried by the main query.

SELECT name, email, mob, address
FROM myDb.contacts
WHERE roll_no IN (
 SELECT roll_no
 FROM myDb.students
 WHERE subject = 'Maths');
```

**What is the SELECT statement?**
```
SQL is used to select data from a database. The data returned is stored in a result table, called the result-set.

SELECT * FROM myDB.students;
```

**What are some common clauses used with SELECT query in SQL?**
```
SQL clauses used in conjuction with a SELECT query are as follows.

SELECT *
FROM myDB.students
WHERE graduation_year = 2019
ORDER BY studentID DESC;
```
***

**What are some common clauses used with SELECT query in SQL?**
```
Some common SQL clauses used in conjuction with a SELECT query are as follows
WHERE clause in SQL is used to filter records that are necessary, based on specific conditions.
ORDER BY clause in SQL is used to sort the records based on some field(s) in ascending (ASC) or descending order (DESC).

SELECT *
FROM myDB.students
WHERE graduation_year = 2019
ORDER BY studentID DESC;

GROUP BY clause in SQL is used to group records with identical data and can be used in conjunction with some aggregation functions to produce summarized results from the database.
HAVING clause in SQL is used to filter records in combination with the GROUP BY clause. It is different from WHERE, since the WHERE clause cannot filter aggregated records.

SELECT COUNT(studentId), country
FROM myDB.students
WHERE country != "INDIA"
GROUP BY country
HAVING COUNT(studentID) > 5;
```
***

**What are UNION, MINUS and INTERSECT commands?**
```
UNION: The UNION operator combines and returns the result-set retrieved by two or more SELECT statements.
MINUS: MINUS or EXCEPT is used to retrieve the rows that exist in the result set of the first
       SELECT statement but not in the result set of the second SELECT statement.
INTERSECT: INTERSECT is used to retrieve the common rows that exist in both the result
           set of the first SELECT statement and the result set of the second SELECT statement.

SELECT column1, column2 FROM table1
INTERSECT
SELECT column1, column2 FROM table2;
```

**What are Entities and Relationships?**
```
Entity: An entity can be a real-world object, either tangible or intangible,
        that can be easily identifiable. For example, in a college database, students, professors, workers.

Relationships: Relations or links between entities that have something to do with each other.
 For example - The employee's table in a company's database can be associated with the salary table in the same database.
```
***

**List the different types of relationships in SQL.**
```
One-to-One - This can be defined as the relationship between two tables where each record in one table is associated with the maximum of one record in the other table.
One-to-Many & Many-to-One - This is the most commonly used relationship where a record in a table is associated with multiple records in the other table.
Many-to-Many - This is used in cases when multiple instances on both sides are needed for defining a relationship.
Self-Referencing Relationships - This is used when a table needs to define a relationship with itself.
```
***

**What is an Alias in SQL?**
```
An alias is a feature of SQL that is supported by most,
if not all, RDBMSs. It is a temporary name assigned to the table or table column for the purpose of a particular SQL query.

SELECT A.emp_name AS "Employee"  /* Alias using AS keyword */
B.emp_name AS "Supervisor"
FROM employee A, employee B   /* Alias without AS keyword */
WHERE A.emp_sup = B.emp_id;
```

**What is a View?**
```
a view is a virtual table that is based on the result of a SELECT query.
Unlike a physical table, a view does not store the data itself;
instead, it is a saved query that can be treated as if it were a table.

CREATE VIEW IT_employ_view AS
SELECT employee_id, first_name, last_name, department
FROM employees
WHERE department = 'IT';
```
***

**What is Normalization & De-Normalization.  various forms of Normalization**
```
??
```
****

**What are the TRUNCATE, DELETE and DROP statements?**
```
DELETE statement is used to delete rows from a table.

DELETE FROM Candidates
WHERE CandidateId > 1000;

TRUNCATE command is used to delete all the rows from the table and free the space containing the table.

TRUNCATE TABLE Candidates;

DROP command is used to remove an object from the database. If you drop a table, all the rows in the table are deleted and the table structure is removed from the database.

DROP TABLE Candidates;
```


