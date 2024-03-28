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



