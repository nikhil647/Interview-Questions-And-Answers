# 🧠 GraphQL Notes

<img width="788" height="351" alt="Untitled Diagram drawio" src="https://github.com/user-attachments/assets/fde8cd32-01ff-4d59-9dc8-b8828902396e" />

## 📖 Definition
**GraphQL** is a query language and runtime for APIs that lets clients request exactly the data they need — nothing more, nothing less.  
It was developed by **Facebook in 2012** and open-sourced in **2015**.

---

## ⚙️ Key Benefits (One-Line Explanations)

| Benefit | Explanation |
|----------|--------------|
| **Avoid Overfetching** | Client gets only the fields it asks for — no extra unused data. |
| **Avoid Underfetching** | A single query can get related data (e.g., user + posts) in one request. |
| **Mobile Performance** | Reduces payload size — faster responses for low-bandwidth clients. |
| **Efficient & Precise** | Tailored queries deliver only what’s needed for each UI view. |
| **Declarative Data Fetching** | Client declares its data needs, server responds accordingly. |
| **Structured Data Fetching** | Responses mirror the shape of the query — predictable structure. |
| **Strongly Typed** | Schema defines data types — ensures validation and type safety. |
| **Introspection** | Clients can query the schema itself to discover available fields/types. |
| **Real-Time Capability (Subscriptions)** | Supports live updates via WebSocket-based subscriptions. |

---

## 🔄 REST vs GraphQL Comparison

| Aspect | REST | GraphQL |
|--------|------|----------|
| **Data Fetching** | Multiple endpoints per resource | Single endpoint for all queries |
| **Request Structure** | Fixed per endpoint (GET, POST, etc.) | Flexible query language defined by client |
| **Overfetching / Underfetching** | Common problem (too much / too little data) | Avoided through precise queries |
| **Response Size** | Often large & redundant | Minimal and customized |
| **Versioning** | Requires `/v1`, `/v2` routes | Handled via schema evolution |
| **Schema Definition** | Implicit or via OpenAPI | Strongly typed with SDL (Schema Definition Language) |
| **Real-Time Capabilities** | Limited (polling, SSE) | Built-in via Subscriptions |
| **Tooling Support** | Mature (Postman, Swagger) | Strong ecosystem (Apollo, GraphiQL, Hasura) |
| **Caching** | Easy with HTTP layer | Handled at client or resolver level |
| **Clear Cache** | Through URL/version changes | Managed via query signatures or libraries |
| **Adoption & Community** | Very mature & widespread | Rapidly growing & strong support |

---

## 🧩 Building Blocks

### 1. Creator (Server Side)
- Defines **Schema** and **Resolvers**
- Libraries:
  - `graphql`
  - `apollo-server`
  - `express-graphql`
  - `envelop`, `Yoga GraphQL`

### 2. Consumer (Client Side)
- Sends queries or mutations to the GraphQL endpoint.
- Libraries:
  - `Apollo Client`
  - `urql`
  - `Relay`
  - Native `fetch` with custom query strings

---

## 🏗️ GraphQL Core Building Blocks

| Block | Description |
|--------|-------------|
| **Schema / Types** | Blueprint of available data types and relationships |
| **Query / Mutation** | Query = Read data; Mutation = Write/Update/Delete data |
| **Resolver** | Functions that map schema fields to backend logic (DB/API calls) |

---

## 💻 Node.js Example — GraphQL Server

### Setup
Install dependencies:
```bash
npm install graphql @apollo/server graphql-tag
```

### Code: `index.js`
```js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 1️⃣ Define schema (types)
const typeDefs = `
  type User {
    id: ID!
    name: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!): User
  }
`;

// 2️⃣ Define sample data
const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" }
];

const posts = [
  { id: "101", title: "GraphQL Basics", content: "Intro to GraphQL", userId: "1" },
  { id: "102", title: "Node & GraphQL", content: "Using Apollo Server", userId: "2" }
];

// 3️⃣ Define resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(u => u.id === id)
  },
  Mutation: {
    addUser: (_, { name }) => {
      const newUser = { id: String(users.length + 1), name };
      users.push(newUser);
      return newUser;
    }
  },
  User: {
    // Nested data handling (custom resolver logic)
    posts: (user) => posts.filter(p => p.userId === user.id)
  }
};

// 4️⃣ Start server
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 GraphQL Server ready at ${url}`);
```

---

## 🧠 Example Query

```graphql
query {
  users {
    id
    name
    posts {
      title
    }
  }
}
```

### Response:
```json
{
  "data": {
    "users": [
      { "id": "1", "name": "Alice", "posts": [{ "title": "GraphQL Basics" }] },
      { "id": "2", "name": "Bob", "posts": [{ "title": "Node & GraphQL" }] }
    ]
  }
}
```

👉 Here, the client asked for **nested posts** of each user, and the **server resolved** it via the custom `User.posts` resolver — preventing underfetching.

---

## 🧭 Summary
GraphQL gives developers a **precise**, **declarative**, and **strongly-typed** way to interact with APIs.  
It solves REST’s major limitations (over/underfetching) while adding **introspection**, **schema-driven design**, and **real-time subscriptions**.
