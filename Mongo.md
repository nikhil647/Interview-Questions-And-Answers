# Mongo Db (Mongoose) Interview Questions

  
**What is MongoDB, and why is it popular?**

```
MongoDB is a NoSQL database that uses a document-oriented data model. It's popular because it's flexible, scalable, and can handle large volumes of unstructured data.
```
****
**What is a BSON in MongoDB**
```
BSON (Binary JSON) is a binary serialization format used by MongoDB to store documents in a binary-encoded format. It supports data types not typically supported by JSON, making it suitable for efficient storage and retrieval of data.
```

***

**Explain the difference between a collection and a document in MongoDB**
```
In MongoDB, a document is a single unit of data and is roughly equivalent to a row in a relational database. A collection is a group of documents and is similar to a table in a relational database.
```
***

**In MongoDB, the primary key is known as the "_id" field. It's unique for each document within a collection**
```
In MongoDB, the primary key is known as the "_id" field. It's unique for each document within a collection.
```
***

**Explain the term "replica set" in MongoDB.**
```
A replica set in MongoDB is a group of MongoDB servers that maintain the same data set. It provides high availability and fault tolerance by ensuring that if one server fails, data can still be retrieved from another server within the set
```
***

**Explain the aggregation framework in MongoDB.**
```
The aggregation framework is a powerful feature in MongoDB that allows you to perform data transformations and calculations on your data
```
***

**What is the purpose of an index in MongoDB, and how can you create one?**
```
used to improve query performance.
You can create an index on one or more fields in a collection to speed up data retrieval.
you can use the `createIndex()` method or specify an index in the document's schema when creating a collection.
```

**What is sharding in MongoDB, and why is it important?**
```
Sharding is a technique used to distribute data across multiple servers or clusters to improve performance and scalability.

Sharding allows MongoDB to distribute data evenly across multiple servers.
```
