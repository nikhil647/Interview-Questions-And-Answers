# React Js inteview Preparation  

**1) What is GraphQL ?**
```
 GraphQL is a query language for APIs that was developed by Facebook in 2012 and released as an open-source project in 2015. It was originally created to address limitation and shortcomings of REST

  Key characteristics and concepts associated with GraphQL

  Declarative Data Fetching:  With GraphQL, clients can request exactly the data they need, and nothing more
  This is in contrast to REST APIs, where endpoints typically return fixed data structures.

  Single Endpoint:  GraphQL typically exposes a single endpoint for all data operations.

  Hierarchical Structure: GraphQL queries are hierarchical in nature, mirroring the structure of the data you want to retrieve.This makes it easy to understand and work with.

  Real-time Data: GraphQL can be used for real-time applications as it supports subscriptions

  Batched Requests: Clients can send multiple queries in a single request to avoid over-fetching or making multiple round trips to the server.

  Custom Resolvers: GraphQL servers have custom resolvers for each field in a query, allowing developers to define how to fetch or compute the data for each field

  Validation and Type Checking: GraphQL queries are validated and type-checked by the server before execution, helping to prevent runtime errors and ensuring data consistency

  Versioning: GraphQL can eliminate the need for API versioning, as clients can request only the fields they are interested in, and the schema can evolve without breaking existing clients.

  Strongly Typed: GraphQL APIs are strongly typed, meaning they define a schema that specifies the types of data that can be queried.

GraphQL has gained popularity in recent years because of its flexibility and efficiency, especially in scenarios where clients have diverse data requirements

```
***

**2) is graph ql database tech ?**
```
GraphQL itself is not a database technology. Instead, it is a query language for APIs, designed to allow clients to request specific data from a server.
```
***

**3) What is exclamanation ! in graphql ?**
```
In GraphQL, the exclamation mark (!) is used to indicate that a field is non-nullable.
```
***


**4) what is diffrence between mutation and query  ?**
```
both queries and mutations are used to request data from a GraphQL server, but they serve different purposes

 Queries are used for fetching data from the server. They are read-only operations and do not modify the data or have any side-effects on the server.

 Mutations are used for modifying data on the server. They are write operations and can create, update, or delete data.
```
***

**5)what is graph ql schema?**
```
In GraphQL, a schema defines the types of data that can be queried and the relationships between them. It serves as a contract between the client and the server, providing a clear structure for the API.

```
***

**6)where is graph ql usefull?**
```
> Client-Specific Data Requirements:
GraphQL allows clients to specify the exact data they need, avoiding over-fetching (receiving more data than necessary) and under-fetching (not receiving enough data).

>Aggregating Data from Multiple Sources:
GraphQL APIs can serve as a unified layer that aggregates data from multiple sources, including databases, REST APIs, and other services.

>Evolving APIs:
GraphQL APIs can be evolved without breaking existing clients. Fields can be deprecated, and new fields or types can be introduced without disrupting existing queries.

>Data-driven Platforms:
For platforms that rely heavily on data, such as analytics dashboards and data visualization tools, GraphQL's flexibility allows clients to request specific datasets and aggregations tailored to their visualization needs.

>Mobile Applications:
GraphQL is particularly beneficial for mobile applications, where bandwidth and data usage are critical concerns. By enabling clients to request only the necessary data, GraphQL optimizes the communication between mobile apps and servers,
```

**7)How to do error handling in graph ql?**
```
 Throwing Errors in Resolvers - In your resolver functions, you can throw errors when something goes wrong. 
```
***

**8)Key concepts in graph ql**
```
Schema: The GraphQL schema defines the types of data that can be queried and the relationships between them.

Types: GraphQL allows you to define custom types for your data, including scalar types (integers, strings, booleans, etc.) and complex types (objects, enums, interfaces, unions).

Queries: Queries in GraphQL are used to request specific data from the server.

Mutations: Mutations are used to modify data on the server.

Subscriptions: Subscriptions enable real-time communication between the client and the server.

Fields: Fields are the basic unit of data in a GraphQL query.
```
***

**9) diffrence between REST and graph ql ?**
```
GraphQL are both approaches for designing APIs

1) Endpoint Structure

REST APIs have fixed endpoints for different resources. For example, you might have endpoints like /users, /posts, and /comments.

GraphQL: GraphQL has a single endpoint (/graphql by convention).

2) Data Fetching

In REST, the server determines the structure of the response.

GraphQL: Clients specify the structure of the response. 

3) Versioning

REST: REST APIs often require versioning to manage changes.

GraphQL: GraphQL APIs are designed to be backward-compatible. Clients can request the specific fields they need, and the schema can evolve without affecting existing queries.

4) Tooling and Introspection:

REST: REST APIs typically lack standardized introspection capabilities, making it challenging for clients to understand the API's capabilities dynamically.

GraphQL: GraphQL APIs are self-documenting. Clients can introspect the schema to discover available types, queries, mutations, and their respective structures.

```
***

**10) are there any disadvantages of graph ql ?**
```
 Complexity of Implementation - Implementing a GraphQL server can be more complex than setting up a traditional REST API.

 Learning Curve - Developers who are new to GraphQL may face a learning curve, especially when it comes to understanding concepts like schemas, resolvers, and the GraphQL query language

 Security Challenges - 
 Poorly implemented GraphQL APIs can be susceptible to security vulnerabilities, such as excessive or deeply nested queries leading to denial-of-service (DoS) attacks.

 Tooling and Libraries - While GraphQL has a rich ecosystem, some specific libraries or tools that are readily available for REST might be less mature or non-existent in the GraphQL ecosystem.

```
***

**11)is graph ql only available for react java script ?**
```
No, GraphQL is not limited to React or JavaScript. GraphQL is a query language for APIs, which means it can be used with any programming language and any framework.
```
***

