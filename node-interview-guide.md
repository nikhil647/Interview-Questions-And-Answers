# Node.js Interview Guide - Complete Reference

## Table of Contents
1. [libuv & Async I/O](#episode-6-libuv--async-io)
2. [Sync vs Async & setTimeoutZero](#episode-7-sync-vs-async--settimeoutzero)
3. [V8 JavaScript Engine](#episode-8-v8-javascript-engine)
4. [Event Loop & libuv](#episode-9-event-loop--libuv)
5. [Thread Pool in libuv](#episode-10-thread-pool-in-libuv)
6. [Creating a Server](#episode-11-creating-a-server)
7. [SQL vs NoSQL](#episode-12-sql-vs-nosql)
8. [MongoDB & Database](#episode-13-mongodb--creating-database)
9. [Non-Blocking I/O Model](#non-blocking-io-model-explained)
10. [Interview Cheat Sheet](#quick-interview-cheat-sheet)

---

## Episode 6: libuv & Async I/O

### What is libuv?
- Cross-platform C library that's the backbone of Node.js
- Handles ALL asynchronous operations (file system, networking, child processes)
- Provides the event loop and thread pool

### Why it matters:
- When you do `fs.readFile()`, libuv handles it in the background
- Keeps Node.js non-blocking even though JS is single-threaded
- Works differently on Windows vs Linux/Mac but you don't need to care

### Key concept:
```javascript
// This doesn't block your code
fs.readFile('file.txt', (err, data) => {
  // libuv handled this in background
  console.log(data);
});
console.log('This runs immediately');
```

---

## Episode 7: Sync vs Async & setTimeoutZero

### Synchronous Code:
```javascript
const data = fs.readFileSync('file.txt'); // BLOCKS HERE
console.log('This waits for file to load');
```
- Stops execution until operation completes
- Bad for servers - freezes all requests

### Asynchronous Code:
```javascript
fs.readFile('file.txt', (err, data) => {
  console.log('File loaded');
});
console.log('This runs first');
```
- Non-blocking, continues execution
- Uses callbacks, promises, or async/await

### setTimeout(fn, 0):
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Output: 1, 3, 2
```
- Doesn't run immediately even with 0ms
- Goes to task queue, waits for call stack to clear
- Useful to defer heavy operations

---

## Episode 8: V8 JavaScript Engine

### What is V8?
- Open-source JS engine by Google (powers Chrome)
- Written in C++
- Compiles JavaScript directly to machine code (not bytecode first)

### Key Features:

#### 1. JIT Compilation (Just-In-Time)
- Interprets code first for fast startup
- "Hot" functions get compiled to optimized machine code
- Makes JS nearly as fast as compiled languages

#### 2. Memory Management
- Heap: stores objects and functions
- Stack: stores primitive values and function calls
- Garbage Collector: automatically frees unused memory

#### 3. Hidden Classes
V8 creates internal "shapes" for objects. Objects with same properties get same class = faster access

```javascript
// Good - same hidden class
const obj1 = { x: 1, y: 2 };
const obj2 = { x: 3, y: 4 };

// Bad - different order = different classes
const obj3 = { y: 5, x: 6 };
```

### Why it matters:
- Understanding V8 helps you write faster code
- Know how memory works to avoid leaks
- Node.js performance depends on V8 optimizations

---

## Episode 9: Event Loop & libuv

### The Event Loop - MOST IMPORTANT CONCEPT

Think of it as a never-ending while loop that processes tasks.

### 6 Phases (in order):

1. **Timers** - Executes `setTimeout()` and `setInterval()` callbacks
2. **Pending callbacks** - System operations (like TCP errors)
3. **Idle, prepare** - Internal use only
4. **Poll** - Retrieves new I/O events, executes I/O callbacks
5. **Check** - Executes `setImmediate()` callbacks
6. **Close callbacks** - Handles `socket.on('close')`

### How it works:
```javascript
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);
setImmediate(() => console.log('Immediate'));

fs.readFile('file.txt', () => {
  console.log('File read');
  setTimeout(() => console.log('Inner timeout'), 0);
  setImmediate(() => console.log('Inner immediate'));
});

console.log('End');
```

### Execution order:
1. Synchronous code first: "Start", "End"
2. Timer phase: "Timeout"
3. Poll phase: "File read"
4. Check phase: "Immediate", "Inner immediate"
5. Next timer phase: "Inner timeout"

### Critical Interview Point:
**Microtasks** (Promises) run BETWEEN each phase. `process.nextTick()` runs BEFORE microtasks (highest priority)

```javascript
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
console.log('sync');

// Output: sync, nextTick, promise, timeout
```

---

## Episode 10: Thread Pool in libuv

### Why threads in "single-threaded" Node.js?
- Some operations are too heavy for event loop
- Can't be done asynchronously by OS
- libuv uses a thread pool for these

**Default: 4 threads** (can change with `UV_THREADPOOL_SIZE`)

### What uses thread pool:
- File system operations: `fs.readFile()`, `fs.writeFile()`
- DNS lookups: `dns.lookup()`
- Crypto operations: `crypto.pbkdf2()`, `crypto.randomBytes()`
- Zlib compression

### What DOESN'T use thread pool:
- Network I/O (HTTP, TCP) - uses OS-level async
- Timers - managed by event loop directly

### Example showing thread pool:
```javascript
const crypto = require('crypto');

// These 4 run in parallel (on 4 threads)
// The 5th waits for a thread to free up
for (let i = 0; i < 5; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {
    console.log(`Hash ${i + 1} done`);
  });
}
```

**Interview tip:** Network operations are faster because they don't compete for thread pool.

---

## Episode 11: Creating a Server

### Basic HTTP Server:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // req = incoming request
  // res = outgoing response
  
  // Set response headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Send response
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Routing:
```javascript
const server = http.createCreate((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.end('Home Page');
  } else if (req.url === '/api' && req.method === 'POST') {
    res.end('API endpoint');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});
```

### Handling POST data:
```javascript
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      console.log('Received:', body);
      res.end('Data received');
    });
  }
});
```

### Key concepts:
- Server is event-driven (uses event emitters)
- Request and response are streams
- Non-blocking - handles thousands of concurrent connections

---

## Episode 12: SQL vs NoSQL

### SQL Databases (Relational)

**Examples:** PostgreSQL, MySQL, SQLite

**Structure:**
- Data in tables with rows and columns
- Fixed schema (must define structure first)
- Relationships using foreign keys

```sql
-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

-- Posts table (related to users)
CREATE TABLE posts (
  id INT PRIMARY KEY,
  user_id INT,
  title VARCHAR(200),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Pros:**
- ACID compliance (reliable transactions)
- Complex queries with JOINs
- Data integrity and consistency
- Great for financial apps, e-commerce

**Cons:**
- Rigid schema (hard to change structure)
- Vertical scaling (need bigger server)
- Can be slower for simple reads/writes

---

### NoSQL Databases (Non-relational)

**Examples:** MongoDB, Redis, Cassandra, DynamoDB

**Types:**
1. **Document** (MongoDB) - JSON-like documents
2. **Key-Value** (Redis) - Simple key-value pairs
3. **Column** (Cassandra) - Wide-column stores
4. **Graph** (Neo4j) - Nodes and relationships

**MongoDB example:**
```javascript
// No fixed schema - flexible
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  posts: [
    { title: "First Post", content: "..." },
    { title: "Second Post", content: "..." }
  ]
}
```

**Pros:**
- Flexible schema (easy to evolve)
- Horizontal scaling (add more servers)
- Fast for large-scale applications
- Better for unstructured data

**Cons:**
- Less data consistency guarantees
- Complex relationships are harder
- No JOIN operations (in most)

### When to use what:

**Use SQL when:**
- Complex relationships between data
- Need ACID transactions (banking, inventory)
- Data structure is stable and well-defined
- Need complex queries and reporting

**Use NoSQL when:**
- Rapid development with changing requirements
- Need to scale horizontally
- Working with unstructured/semi-structured data
- High-volume, high-velocity data (social media, IoT)

---

## Episode 13: MongoDB & Creating Database

### Setting up MongoDB with Node.js:

```javascript
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main() {
  // Connect to MongoDB
  await client.connect();
  console.log('Connected to MongoDB');
  
  // Select database and collection
  const db = client.db('myapp');
  const users = db.collection('users');
  
  return { db, users };
}
```

### CRUD Operations:

#### 1. Create (Insert):
```javascript
// Insert one document
await users.insertOne({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

// Insert multiple documents
await users.insertMany([
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' }
]);
```

#### 2. Read (Find):
```javascript
// Find all users
const allUsers = await users.find({}).toArray();

// Find one user
const user = await users.findOne({ name: 'John Doe' });

// Find with conditions
const adults = await users.find({ age: { $gte: 18 } }).toArray();

// Find with projection (select specific fields)
const names = await users.find({}, { projection: { name: 1, email: 1 } }).toArray();
```

#### 3. Update:
```javascript
// Update one document
await users.updateOne(
  { name: 'John Doe' },
  { $set: { age: 31 } }
);

// Update multiple documents
await users.updateMany(
  { age: { $lt: 18 } },
  { $set: { minor: true } }
);

// Upsert (insert if doesn't exist)
await users.updateOne(
  { email: 'new@example.com' },
  { $set: { name: 'New User' } },
  { upsert: true }
);
```

#### 4. Delete:
```javascript
// Delete one document
await users.deleteOne({ name: 'John Doe' });

// Delete multiple documents
await users.deleteMany({ age: { $lt: 18 } });
```

### Advanced Queries:

```javascript
// Sorting
await users.find({}).sort({ age: -1 }).toArray(); // descending

// Limiting results
await users.find({}).limit(10).toArray();

// Skip (pagination)
await users.find({}).skip(20).limit(10).toArray();

// Counting
const count = await users.countDocuments({ age: { $gte: 18 } });

// Aggregation (complex operations)
const result = await users.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $group: { _id: '$city', count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).toArray();
```

### Best Practices:

#### 1. Indexing for performance:
```javascript
await users.createIndex({ email: 1 }, { unique: true });
await users.createIndex({ name: 1, age: -1 });
```

#### 2. Schema validation (optional but recommended):
```javascript
await db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email'],
      properties: {
        name: { bsonType: 'string' },
        email: { bsonType: 'string' },
        age: { bsonType: 'int', minimum: 0 }
      }
    }
  }
});
```

#### 3. Error handling:
```javascript
try {
  await users.insertOne({ name: 'Test' });
} catch (error) {
  console.error('Database error:', error);
} finally {
  await client.close();
}
```

---

## Non-Blocking I/O Model Explained

### Blocking vs Non-Blocking - Simple Analogy:

**Blocking (Traditional):**
- Like standing in line at a coffee shop
- You wait for your order before the next person can order
- If your order takes 5 minutes, everyone waits

**Non-Blocking (Node.js):**
- Like a restaurant with a buzzer system
- You order, get a buzzer, and sit down
- Others can order immediately
- When your food is ready, the buzzer goes off
- Server handles many customers at once

### How It Works in Code:

#### Blocking I/O (Synchronous):
```javascript
// This STOPS everything until file is read
const data = fs.readFileSync('bigfile.txt');
console.log(data);
console.log('This has to wait'); // Waits for file read
```
- Thread is **blocked** (frozen) during I/O operation
- Nothing else can run
- If 100 users request files, they all wait in line

#### Non-Blocking I/O (Asynchronous):
```javascript
// This DOESN'T STOP anything
fs.readFile('bigfile.txt', (err, data) => {
  console.log(data); // Runs LATER when ready
});
console.log('This runs immediately'); // Doesn't wait!
```
- Thread continues to next line immediately
- File reading happens in background
- When done, callback is executed
- Can handle 1000s of requests concurrently

### The Non-Blocking I/O Model in Detail:

#### 1. Request comes in:
```javascript
app.get('/users', async (req, res) => {
  // User requests data
  const users = await db.find(); // I/O operation
  res.json(users);
});
```

#### 2. What happens behind the scenes:

```
┌─────────────────────────────────────────┐
│   JavaScript Thread (Single Thread)     │
│   - Executes your code                  │
│   - Registers I/O operations            │
│   - Processes callbacks                 │
└─────────────────────────────────────────┘
           │                    ▲
           │ Delegates          │ Notifies when
           │ I/O operation      │ complete
           ▼                    │
┌─────────────────────────────────────────┐
│   libuv (C library)                     │
│   - Event Loop                          │
│   - Manages I/O operations              │
│   - Thread Pool (for some operations)   │
└─────────────────────────────────────────┘
           │                    ▲
           │ System calls       │ OS response
           ▼                    │
┌─────────────────────────────────────────┐
│   Operating System                      │
│   - Kernel handles I/O                  │
│   - Disk, Network, etc.                 │
└─────────────────────────────────────────┘
```

#### 3. Step-by-step flow:

```javascript
console.log('1. Start');

fs.readFile('file.txt', (err, data) => {
  console.log('3. File content:', data);
});

console.log('2. End');

// Output:
// 1. Start
// 2. End
// 3. File content: [file content]
```

**What happens:**
1. Line 1 executes: prints "1. Start"
2. Line 3: Node says "Hey OS, read this file. Call me back when done"
3. **Doesn't wait!** Moves to line 7 immediately
4. Line 7 executes: prints "2. End"
5. Meanwhile, OS is reading file
6. When file is ready, callback executes: prints "3. File content"

### Real-World Example - Server Handling Multiple Requests:

#### Blocking Model (PHP, Traditional):
```
Request 1 arrives → Thread reads DB (waits 100ms) → Response 1
                    |
Request 2 arrives → | (BLOCKED - waiting)
                    |
Request 3 arrives → | (BLOCKED - waiting)
                    ▼
                    Thread reads DB (waits 100ms) → Response 2
                    Thread reads DB (waits 100ms) → Response 3

Total time: 300ms for 3 requests
Needs multiple threads to handle concurrent requests
```

#### Non-Blocking Model (Node.js):
```
Request 1 arrives → Register DB read → Continue
Request 2 arrives → Register DB read → Continue  
Request 3 arrives → Register DB read → Continue

All DB reads happen in parallel (100ms)
DB 1 done → Callback 1 → Response 1
DB 2 done → Callback 2 → Response 2
DB 3 done → Callback 3 → Response 3

Total time: ~100ms for 3 requests
Single thread handles all requests
```

### Types of I/O Operations:

**Common I/O Operations (Non-Blocking in Node.js):**
- **File System:** Reading/writing files
- **Network:** HTTP requests, database queries
- **Timers:** setTimeout, setInterval
- **Child processes:** Running external programs

**CPU-Intensive Operations (NOT I/O):**
- Complex calculations
- Image processing
- Video encoding
- These WILL block because they need CPU, not waiting for I/O

### Why Non-Blocking is Powerful:

**Example: 10,000 concurrent users**

**Traditional Blocking (Apache/PHP):**
- Needs 10,000 threads
- Each thread = ~2MB memory
- Total: ~20GB RAM just for threads!
- Context switching overhead

**Node.js Non-Blocking:**
- 1 thread for JavaScript execution
- Small thread pool (4-8 threads) for heavy operations
- Total: ~100MB RAM
- Handles all 10,000 users efficiently

### The Pattern in Code:

**All these are non-blocking:**

```javascript
// Callbacks
fs.readFile('file.txt', (err, data) => {
  console.log(data);
});

// Promises
fs.promises.readFile('file.txt')
  .then(data => console.log(data));

// Async/Await (still non-blocking!)
async function readData() {
  const data = await fs.promises.readFile('file.txt');
  console.log(data);
  // Other code can run while waiting
}
```

**Key Point:** `await` doesn't block the thread - it just pauses that function while allowing other code to run.

### Quick Mental Model:

Think of Node.js as a restaurant waiter:
- **Blocking:** Waiter takes order, stands at kitchen, waits for food, delivers, then takes next order
- **Non-Blocking:** Waiter takes order, gives ticket to kitchen, takes next order, takes another order, kitchen calls when ready, delivers food

Same waiter (single thread) serves many customers (requests) efficiently!

---

## Quick Interview Cheat Sheet

### Most Likely Questions:

#### 1. "Explain the event loop"
**Answer:** Single-threaded, non-blocking loop with 6 phases. Handles async operations via callbacks. Microtasks run between phases. Process.nextTick has highest priority.

#### 2. "Is Node.js single-threaded?"
**Answer:** JS execution is single-threaded, but libuv uses thread pool (4 threads) for heavy I/O operations. Network I/O uses OS-level async (no threads needed).

#### 3. "Why is Node.js fast?"
**Answer:** 
- Non-blocking I/O
- Event-driven architecture
- V8 JIT compilation
- Efficient for I/O-bound operations

#### 4. "SQL vs NoSQL?"
**Answer:** 
- SQL: structured, ACID, complex queries, good for relational data
- NoSQL: flexible, scalable, fast for simple operations
- Choice depends on data structure and requirements

#### 5. "What is libuv?"
**Answer:** C library handling async operations. Provides event loop and thread pool. Makes Node.js cross-platform.

#### 6. "What is non-blocking I/O?"
**Answer:** Node.js doesn't wait for I/O operations to complete. When you read a file or query a database, Node.js delegates that operation to the system (via libuv), continues executing other code, and runs a callback when the operation finishes. This allows a single thread to handle thousands of concurrent requests efficiently.

---

## Additional Tips for Interview:

1. **Be confident about async concepts** - This is the core of Node.js
2. **Know when NOT to use Node.js** - CPU-intensive tasks (video encoding, image processing)
3. **Understand the difference** between concurrency and parallelism
4. **Be familiar with common patterns** - callbacks, promises, async/await
5. **Know about error handling** - try/catch with async/await, .catch() with promises
6. **Understand streams** - for handling large files efficiently
7. **Know about clustering** - for utilizing multiple CPU cores

---

Good luck with your interview! 🚀
