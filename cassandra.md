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

we want it to be column oriented --> Mongo DB Out.
we want our product catalog to be decentralized. ---> HBase is out.

we left with casendra.


