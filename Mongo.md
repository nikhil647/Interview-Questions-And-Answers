# Mongo Db (Mongoose) Interview Questions

  
**What is MongoDB, and why is it popular?**

```
MongoDB is a NoSQL database that uses a document-oriented data model. It's popular because it's flexible, scalable, and can handle large volumes of unstructured data.
```
****
**What are some of the advantages of MongoDB?**
```
MongoDB is very easy to scale up or down
MongoDB uses a dynamic database schema
MongoDB has inbuilt support for data partitioning (Sharding).
MongoDB basically uses JavaScript objects in place of procedures.
MongoDB support primary and secondary index on any fields.
```
***
**What is the Mongo Shell?**
```
It is a JavaScript shell that allows interaction with a MongoDB instance from the command line.
With that one can perform administrative functions, inspecting an instance, or exploring MongoDB. 
$ mongod
$ mongo
MongoDB shell version: 4.2.0
>


```
***

**What is a BSON in MongoDB**
```
BSON (Binary JSON) is a binary serialization format used by MongoDB to store documents in a binary-encoded format. It supports data types not typically supported by JSON (Binary data, ObjectId, Regular Expression, JavaScript Code), making it suitable for efficient storage and retrieval of data.
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
//CRUD Question section missing.
***
**In MongoDB, how do you represent relationships between data?**
```
Common ways to represent relationships.
1) Embedding - In embedding, you store related data within a single document. This is suitable for one-to-one and one-to-many relationships.
{
  "_id": 1,
  "username": "user123",
  "comments": [
    {
      "text": "This is a comment.",
      "date": ISODate("2023-10-17T10:00:00Z")
    }
  ]
}

2) References - In referencing, you store a reference to related data by including the "_id" of another document within your document.
 This is suitable for representing many-to-one and many-to-many relationships.

Blog Post Document: { "_id": 101, "title": "Introduction to MongoDB", "author_id": 1 }
User Document: { "_id": 1, "username": "user123", "email": "user@example.com" }
// author_id in Blog Post === _id in Document

3) Denormalization: In denormalization, you duplicate data in multiple documents to reduce the need for frequent joins. This can be useful for read-heavy operations where performance is critical. However, it can lead to data redundancy.
Example: Storing the author's username and email directly in the blog post document.

4) Hybrid Approaches: Sometimes, a combination of embedding and referencing can be used to represent complex relationships. For instance, you can embed some frequently accessed data and reference other less-accessed data.
When designing your MongoDB schema, consider factors like query patterns, write patterns, data volume, and the specific needs of your application. It's important to strike a balance between performance and data consistency. You may also need to handle data integrity and updates manually, depending on your chosen approach.
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
