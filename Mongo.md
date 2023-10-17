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
**What is the maximum document size in MongoDB?**
```
16 MB
```
***

**What is the maximum Collection size in MongoDB?**
```
Practically speaking, the maximum collection size is determined by the available storage space on the MongoDB server and the limitations of the storage system.
If a collection's size exceeds the available storage space or the BSON document size limit, you would need to consider strategies such as sharding or archiving to manage your data effectively.
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

** Types of Relationship with example and how to implement ? **
```
One to One: (Patient -  Disease), (Person -  Passports)
    Embed (Most of the time) - Refrence (also possible Person - Car).

One to Many: (Question - Answers), (City - Citizen) 
            Embed (if nested douments are less and can not grow in huge numbers)
            Refrence

Many to Many: (Customer - Product) 
         Create another collenction to represent relation (create Order table in this case).
         Embed document to 1 of the entity.  
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
***

**How can you ensure data consistency when using denormalized data in MongoDB?**
```
```
***
**types of index in mongo db with example**
```
1. Single Field Index: A single field index is the most basic type of index. It indexes a single field of a document.
db.collection.createIndex({ fieldName: 1 });

2. Compound Index:
A compound index indexes multiple fields of a document together.
db.collection.createIndex({ field1: 1, field2: -1 });

3. Multikey Index:
A multikey index is used to index arrays.
db.collection.createIndex({ tags: 1 });

4 Text Index
A text index is used for text search operations.
db.collection.createIndex({ content: "text" });

5 Geospatial Index
A geospatial index is used for geospatial queries.

6 Hashed Index
A hashed index is useful for equality queries but not range queries.

7 Wildcard Index:
A wildcard index is used to index all fields in a document.

8) Time-to-Live (TTL) Index:
A TTL index allows documents to expire after a specified amount of time, which can be useful for data that has a limited lifespan, such as session data or temporary cache

```
***

**diffrence between Partial Filters index and compound index?**
```
```
***
