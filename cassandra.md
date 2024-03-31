From 0-to-1 The cassandra distributed database.

# 1) A column Orinted Database

From Decade RDBMS is gold starndar for storing and managing the data. but they don't really scale very well.
for distributed dbms have come in to provide high performance that you need for large amount of data.

Cassandra developed at facebook and it has it's own data mode to store data in columnar model.
CQL - casandra's whole version to read and write database. It is NoSQL database.

Column Oriented Database:
We have company "EasyBuy".

We have many products like mobile, tshirt, books.

there attributes are
books : Title, Author, ISBN, Publisher, Publication Date, Genre, Summary, Cover, Pages, Language, Edition, Format, Price, Reviews, Table of Contents, Acknowledgments.
mobile: Brand, Model, Operating System, Processor, RAM, Storage Capacity, Screen Size, Resolution, Camera Specifications, Battery Capacity, Connectivity, Sensors.
tshirt: Brand, Size, Color, Material Composition, Fit, Neckline Style, Sleeve Length, Design/Pattern, Fabric Care Instructions.

Properties are not same some of them are common but not all.
with if we go with relational dbms will have lot of empty space because not all columns have the value. Empty cells do occupy space on disk.
this is major waste of storge if you have millions of products.

how Cassandra store data in db ? (in form of key value pairs)

| id | Attribute Name | Attribute Value |
|----|--------|--------|
| Mob1 | brand | Samsung |
| Mob1 | color | Black |
| Mob1 | modelId | Galazy S6 |
| Mob1 | title | Samsung Galazy S6 |
| Book1 | author | Khalid |

where Mob1 represent 1 Mobile and there 4 propety span acros 4 rows. similarly Book1 can have data acros multiple columns

What you've just seen is how a column oriented database or a columnar store saves data.

What did we gain with this new layout?

1) Disk Space we saved:
You don't store empty cells. You only store cells which have values.

2) we are not bound to specific table schema.

# 2) Requirement for a product catlog system

A EasyBuy (Our ecommerse) Company Grows and become popular.
We have millions of customers. Everyone wants to buy from our site.
We have tons of orders. The orders have increased to a scale we never imagined.
And we have millions of products.
Data storage in PB

A single Center can not cater to this in high demand.

It will simply not scale., It will be highly constrained., It will not be able to serve that number of operations per second.

What we really need is a cluster of data store machines. So a product catalog needs to be distributed across this cluster of machines in some way.

We require data to be distributed evenly across this cluster. All machines should store data. (It makes no sense to have a bunch of machines and have data just stored on 2 or 3 of them).

Distributed systems have so many advantages.

The biggest advantage being that they can scale to serve any number of operations and hold a huge amount
of data, but they come with their own issues.

Now the question is, if you have an application that wants to interact with this database and extract
information and store information with it, which of these systems does the application interact with?

Which of these machines does it talk to to retrieve the data which is present in this system of machines?
Let's say we choose one, our favorite one.

And we call this node, the interface between the entire cluster and the application.

So our application, which wants access to the data, will talk to this interface.
This interface is the go between, it's the agent and it's what helps us communicate with the rest of
the cluster. interface delegates operations to other nodes.

But trusting one node with so much information can be a recipe for disaster.
The interface you can think of as a single point of failure.

Now the question is how do we avoid spoof or a single point of failure?

We have data distributed across nodes instead of an interface. 
Let's just say that the applications can select any of the node as an interface.

One of these nodes has gone down, has crashed.
What will the application do now?
The application has many interfaces.
The application can continue working exactly as though that particular node hadn't gone down.

so requirement is clear --> We want it to be decentralized.
Now it's time to choose the technology.

we can choose from --> HBase, MongoDB and Cassandra. (we have others as well but most popular)

3) What is Casendra Database ?
A) It is column oriented, Decentralized Architecture, 

we want it to be column oriented --> Mongo DB Out.
we want our product catalog to be decentralized. ---> HBase is out.

we left with casendra.

# 3) What exactly is Cassandra?

1) It is column oriented.
It stores things in the form of row key name value pairs.(This saves space.)

2) It has a decentralized architecture.
It does not have a single point of failure.

Cassandra is distributed, runs on a cluster of machines, and it's decentralized.

3) It's elastically, scalable.
What does that mean?

Say you need more machines to store additional data or to get more throughput from your data. To serve more requests.
You simply add more machines to your cluster, and the new machines will automatically become part of the cluster and your data will distribute itself across it.

4) It has tunable consistency.

Consistency means what you've written and you read back.

You'll get the updated data.
So any application which reads the same data will get the same information.
That is consistency.
Cassandra is not fully consistent, but you can tune how consistent it can be.

5) And finally it has high availability.
Any data which supports an e-commerce system has to be available, any database, and Cassandra fulfills that.

Cassandra as a database, has other good things going for it as well because it's decentralized and the data in the nodes is replicated.
Any data that you store in Cassandra is not stored on a single node.
It's stored on multiple nodes.
It's replicated.
It makes Cassandra fault tolerant.

That means if a node goes down, your data doesn't disappear.
It's still available on some other nodes you can access Cassandra and query it using a SQL like query
language called CQL. (Cassandra Query Language).


And finally, secondary indexes.
Secondary indices are very common in relational databases and very useful.
The ability to index on something other than the primary key.

Cassandra supports this, and people who use Cassandra find this an extremely useful feature.
There are certain use cases where Cassandra is an amazing fit.


It's the perfect database for you. What are those?

When you have data in petabytes where your data is huge large number of records and when the data is columnar.

What is columnar data mean? Every unit has different attributes where it's not clear.

Where it's not fully structured.
eg. Catalogue Data Notification Data.
When the attributes are not the same for every unit, data is columnar.

Cassandra, though, has a few limitations when you compare it with a relational database management system.

Relational database have acid properties atomicity consistency, integrity and durability.
Cassandra does not follow this model simply because of the nature of its architecture.

Let's take the example of consistency.

Cassandra provides consistency that's tunable.

You can change how consistent Cassandra is so you can make it more consistent, but your availability will suffer.
So you can have stronger consistency at the expense of availability.

To understand tunable consistency, you first have to understand how Cassandra works on update Now to ensure fault tolerance.
There are multiple copies of data stored on different nodes.
Any file will be stored on multiple nodes in the cluster.


Let's say you have data for a single mobile `mob1` and this data is stored on three nodes, as you can
see on screen, any three nodes of this cluster.
Now an application comes in and makes some kind of update to this mobile data.

This cell phone has some new attributes, new values, application updates that data by default.
Cassandra returns success for update.
When data on one node is updated, all the application has to do is talk to one of the nodes which has
the data update it, and Cassandra will say Update was successful.

Why does it do that?
That's because behind the scene, Cassandra then takes care of updating the remaining nodes.
The data will then be updated on other nodes where the copy of that data is present.
So here the update will flow from the first node to the second.
Now what might happen?
Two nodes are updated.


One is not.
So while data is being updated, what if the application reads from a non updated copy?
The application might query the third node which has old data for that mobile data is not consistent
and application reading old data will get different information from an application reading from another
node and you can't control which node a particular application reads from.
This clearly shows that Cassandra is not acid compliant, it doesn't have the acid properties.
Data is not consistent here.


We made the statement several times that Cassandra provides tunable consistency.
Now it's time to see what it means.


So the consistency of data in Cassandra can be configured such that Cassandra can return success at different points in time.
So once a write is done on the nodes in Cassandra.
Cassandra can return success when all nodes have updated the data or a set of nodes have updated the data.

you can have stronger consistency at the expense of availability.
Based on what you require from your data storage.
There are certain instances where Cassandra should not be used.

If you have data that can be managed on a single system, there is no reason to use a distributed database.
Just make sure you back up the data in that single server so you won't use Cassandra in such a situation.

Bank accounts or product orders.
The same applies for the order management system in an e-commerce site.

If a product if a user has placed an order for a product, that information should be instantly available
everywhere.
Which is why it makes sense to use Cassandra for a catalog management system, but not for the order management system.

