Fundamentals of Database Engineering - Created by Hussein Nasser (27 h)

Course Introduction:- Learn ACID, Indexing, Partitioning, Sharding, Concurrency control, Replication, DB Engines, Best Practices and More!

Section 2: ACID

What is Transaction ?
Atomicity ?
Isolation ?
Consistency ?
Durability ?

Transaction: It is nothing but collection of queries. treated as One unit of work.

eg. transferring amount from 1 account to another. 
so it is nothing but 3 steps
React amount is valid or not. if yes update accoount A and update Account B.


Transaction Lifespan:

always begin with the keyword: Transaction BEGIN
Transaction BEGIN - indicating you are about to start brand new transaction.

Transaction COMMIT - commits till the transaction to commit and to persist the thing to disk.
now just thing when to commit
1) after every query
2) 1 commit for all db transaction (start to end)
3) add transaction block in middle.

there are pros or crons of each way. just thoughts of instrcitor nothing else.

Transaction ROLLBACK - flush everthing from memmory. (nothing will get commited)

Nature of Transaction: 
Usually Transaction are used to change and modify data.
However it is perfectly normal to have read only transaction. (-_-)
example: you want to genrate a report and you want to get consistent snapshot based at the time of transaction.

Send $100 From Account 1 to Account 2 

BEGIN TX1
SELECT BALANCE FROM ACCOUNT WHERE ID = 1
BALANCE > 100    // Checking
UPDATE ACCOUNT SET BALANCE = BALANCE - 100 WHERE ID = 1
UPDATE ACCOUNT SET BALANCE = BALANCE + 100 WHERE ID = 2
COMMIT TX1

# ACID
ACID is an acronym that stands for Atomicity, Consistency, Isolation, and Durability.
These are the four key properties that are desired to ensure reliability and consistency in database transactions


# Atomocity

All queries in a transaction must succeed.
● If one query fails, all prior successful queries in the transaction
should rollback.
● If the database went down prior to a commit of a transaction,
all the successful queries in the transactions should rollback.

classic example:
Transfer 100$ from account A to account B:

After we restarted the machine the first account has been debited but the
other account has not been credited.
● This is really bad as we just lost data, and the information is inconsistent
● An atomic transaction is a transaction that will rollback all queries if one or
more queries failed.
● The database should clean this up after restart

(instrctor also told that if database went down it takes hours to rollback (to clean the data))


# Isolation:

This property ensures that the execution of transactions concurrently does not result in any data inconsistency. Each transaction should be isolated from other transactions until it is completed and committed

Question? can my inflight transaction see changes made by other inflight transaction ?? (inflight means not yet complete)

Read phenomena: 

Isolcation Levels:

Dirty reads: you read something that some other transaction has wrote but didn't really commit yet.
so change could be rollback.

Non-repeatable Read: - you try to read same value from db due to some reasons but two diffrent value comming.

Phantom Read: A phantom read occurs when a transaction executes the same query twice with the same conditions, but the result sets differ. This happens because another transaction inserts or deletes rows that meet the query criteria in between the first and second execution of the query in the first transaction.

Key Differences:

Non-repeatable reads involve modifications (updates) to existing data.
Phantom reads involve insertions or deletions of data that meet the query criteria.

Lost Update:

scenarios involving multiple transactions accessing and modifying the same data concurrently. It refers to a situation where one transaction overwrites changes made by another transaction without being aware of those changes, resulting in the loss of the second transaction's updates.

Transaction A reads a row from a database table.
Transaction B reads the same row from the table.
Transaction A updates the row.
Transaction B updates the same row, unaware of the changes made by Transaction A.
Transaction A commits its changes, overwriting the changes made by Transaction B.
Transaction B commits its changes, which are now lost, as they have been overwritten by Transaction A.

Solution is Lock the row (resource).


## Isolation levels for inflight transaction:

Read uncommited - No Isolation, any change from outside is visible to the transaction, commited or not. - BAD you can get dirty read due to this. (technically - fast)

Read commited - Each Query in a transaction only sees commited changes by other transaction.

Repetable Read - The transaction will make sure that when a query reads a row, that row will remain unchanged while its running.
(db Implementation perspective - how you implement something like this - there is cost for everthing there are n number of transaction going on actual db)

Snapshot - Each query in a transaction only sees that have been commited up to the start of the transaction. like snapshot version of database at that movement.
(postgres does this snapshot isolcation based on timestamp it isolate the things)

Serializable - Transaction are run as if they serialized one after the other

● Each DBMS implements Isolation level differently.

Database Implementation of Isolation
Pessimistic - Row level locks, table locks, page locks to avoid lost updates.
Optimistic - No locks, just track if things changed and fail the transaction if so.

Repeatable read “locks” the rows it reads but it could be expensive if you
read a lot of rows, postgres implements RR as snapshot. That is why you
don’t get phantom reads with postgres in repeatable read.

Serializable are usually implemented with optimistic concurrency control, you
can implement it pessimistically with SELECT FOR UPDATE.

| Isolation level --> Problems <br> Aproach to solve (bottom side)   | Dirty read   | Lost update | Non-repeatable read | Phantom read |
|------------------|--------------|-------------|---------------------|--------------|
| Read uncommitted | may occure   | may occure  | may occure   | may occure  |
| Read Committed   | don't occure | may occure  | may occure   | may occure  |
| Repetable Read   | don't occure | don't occure| don't occure | may occure |
| Serializable     | don't occure | don't occure| don't occure | don't occure |



# Consistency:

properties that ensures the database remains in a valid state before and after transactions.

Strong Consistency: It means that every read request will always return the most up-to-date value or an error if it can't do that
Eventual Consistency: It is a more relaxed model where once data is updated, eventually after a short but unspecified length of time, all read requests will again return the same value.

Youtube-like service to illustrate the two types of consistency. Strong consistency would require blocking all read requests to other servers while the update is replicated across all servers. This can negatively impact performance and availability.

 Strong consistency is better when the negative impact of stale data is high, such as a stock exchange service.
price of stock should be accuate.

# Durability

 It ensures that once a transaction is committed (completed successfully), the changes made by that transaction are permanently stored in the database and will not be lost even if the system crashes or there's a power failure.

 ● Durability techniques 

Durability Techniques in DBMS:
Here's a breakdown of the durability techniques you mentioned:

WAL (Write-Ahead Logging): This is a common technique used to ensure data durability. Here's how it works:

Before any changes are made to the actual database files, they are first written to a transaction log (WAL). This log acts as a temporary record of all modifications.
Only after the transaction log is successfully updated, are the changes applied to the database files.
If a system failure occurs during this process, the database can recover by replaying the unapplied transactions from the WAL during startup.
Asynchronous Snapshot: This technique involves creating periodic backups of the database at specific points in time. These backups can be full or incremental, capturing only the changes since the last snapshot.

Asynchronous means the snapshot creation happens in the background, without interrupting ongoing database operations.
In case of a failure, the database can be restored to the most recent consistent snapshot, minimizing data loss.
AOF (Append-Only File): This technique relies on maintaining a log file where every write operation performed on the database is sequentially appended. Unlike WAL, the AOF file is a permanent record of all changes made to the database.

The advantage of AOF is that it allows for full database reconstruction in case of a crash by replaying all the operations stored in the AOF file.
However, AOF can lead to larger log files compared to WAL due to the continuous append nature.
These techniques offer different trade-offs between durability, performance, and recovery time. The choice of technique depends on specific database requirements and priorities.

