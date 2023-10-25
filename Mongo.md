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
Partial Index:
A partial index is an index that only includes documents in the index that meet a specified filter expression. It allows you to create an index on a subset of documents in a collection, based on a specific condition. Partial indexes can improve query performance and reduce the index size by excluding unnecessary documents from the index.

db.collection.createIndex(
  { fieldName: 1 },
  { partialFilterExpression: { status: "active" } }
);

Compound Index:
A compound index is an index that includes multiple fields. It allows you to create an index that covers queries involving multiple fields in the filter criteria. Compound indexes can be beneficial when your queries include more than one field in the query conditions.

db.collection.createIndex({ field1: 1, field2: -1 });
```
***

**What is Authentication and Authorization in MongoDB?**
```
Authentication - Identify valid users of db.
Authorization - Identify what user can do in db.
```
***


**Explain Role-Based Access Control in MongoDB ?**
```
Role-Based Access Control (RBAC) in MongoDB is a security feature that allows you to control a user's access to specific resources and actions within the MongoDB database. 
 the principle of least privilege, where users are granted only the minimum level of access required to perform their duties, reducing the potential impact of security breaches.

MongoDB provides both built-in roles (read, readWrite, dbAdmin, and userAdmin) and user-defined roles.

Examples:
Admin Role - only dbAdmin, and userAdmin - no need to read records and writed data.
Developer Role - read, readWrite - no need to manage other user and db activity
Data Scientist - read - only collecting data no need to create any new rec.
```
***

**Explain SSL Encryption in MongoDB.**
```
SSL (Secure Sockets Layer) encryption in MongoDB is a method of securing the data transmitted between MongoDB clients and servers. It ensures that the data exchanged between the client and the server is encrypted, making it difficult for unauthorized parties to intercept and understand the information being transmitted.

SSL certificates are used to establish the identity of MongoDB servers and clients during the SSL handshake process.
configuration needs to be added which is done by DBA.
```
***

**What is Field-Level Encryption in MongoDB?**
```
Field-Level Encryption in MongoDB is a security feature that allows you to encrypt specific fields within documents in a MongoDB collection.
```
***

**How Do You Monitor and Audit MongoDB for Security?**
```
MongoDB provides auditing capabilities that allow you to log various types of events, such as authentication attempts, authorization successes and failures, and other important actions. Enable MongoDB auditing by configuring the auditLog settings in the MongoDB configuration file.
```
***

**how do you handle data leaks in mongo db?**
```
1) Prevention:

Access Control: Implement strong authentication and authorization mechanisms. Use role-based access control to ensure users have the minimum necessary privileges.
Encryption: Enable encryption at rest and in transit. This ensures that even if unauthorized users gain access to the data files, the data remains encrypted.
Secure Configuration: Follow MongoDB's security best practices. This includes binding MongoDB to localhost, enabling authentication, disabling unnecessary network protocols, and more.
Regular Auditing: Enable MongoDB’s auditing features to log all the operations and access attempts. Regularly review these logs for any suspicious activities.

2. Proactive Monitoring:
Set Up Alerts: Establish alerts for unusual activities such as multiple failed login attempts, unexpected spikes in traffic, or unauthorized access attempts.
Real-Time Monitoring: Utilize monitoring tools to keep an eye on the system's performance and security in real time. This can help you detect any abnormal behavior promptly.
```
***

**what is transaction in mongo db with syntax ?**
```
 Transactions in MongoDB allow you to perform multiple operations on multiple documents, and these operations either complete entirely or have no effect at all.  (kind of automacity for multiple opeartions)

const session = client.startSession();
session.startTransaction();

try {

    const database = client.db('yourDatabaseName');
    const collection = database.collection('yourCollectionName');

    // Perform operations within the transaction
    await collection.insertOne({ key: 'value' }, { session });
    await collection.updateOne({ key: 'value' }, { $set: { key: 'updatedValue' } }, { session });
    await collection.deleteOne({ key: 'value' }, { session });

     await session.commitTransaction();
    session.endSession();
   }
} catch (error) {
    // Abort the transaction if an error occurs
    await session.abortTransaction();
    session.endSession();
    console.error('Transaction aborted due to an error:', error);
  }
```

