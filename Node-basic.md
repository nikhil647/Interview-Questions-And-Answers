# Node JS Interview Preparation

**1) What is Node Js ?**
```
It is an open-source, cross-platform JavaScript runtime environment that allows developers to run JavaScript code outside of a web browser.
```
***
**2)What are the benefits of using Node.js?**
```
Fast Execution: Node.js is built on the V8 JavaScript engine from Google Chrome, which compiles JavaScript into machine code, resulting in fast execution of code

Non-Blocking I/O: Node.js uses an event-driven, non-blocking I/O model, allowing it to handle a large number of concurrent connections efficiently.

Scalability: It can handle a large number of simultaneous connections with minimal overhead.

Large Ecosystem:Node.js has a vast ecosystem of packages and libraries available through npm (Node Package Manager).

Real-Time Capabilities: Node.js is well-suited for building real-time applications, such as chat applications, online gaming, collaborative tools, and live streaming platforms, where instant data exchange is crucial.

Microservices Architecture: Node.js is well-suited for a microservices architecture, allowing developers to build small, independent modules that can be developed, deployed, and scaled independently.

Cross-Platform Compatibility: Node.js is cross-platform and runs on various operating systems, including Windows, macOS, and Linux. This ensures that applications developed using Node.js can run consistently across different environments.
```
***

**Popular Node.js frameworks**
```
Express.js, Koa.js, NestJS,Meteor, LoopBack
```
***

**Popular Node libraries**
```
Lodash, Axios, Socket.io, date-fns, Mongoose, Winston (logging), Joi (validating and sanitizing data).
```
***

**Security concerns when using Node.js **
```
Injection Attacks (e.g., SQL Injection, Command Injection)**

Always validate and sanitize user inputs. Use parameterized queries or prepared statements to prevent SQL injection attacks
**Package:**  `validator`

### **Cross-Site Scripting (XSS) Attacks**
Security vulnerability that occurs when an attacker is able to inject malicious scripts (usually in the form of HTML or JavaScript) into web pages viewed by other users.

to prevent - sanitize inputs to prevent malicious scripts from being executed in the browser.
**Package:**  `validator`

**Insecure Dependencies** -
Regularly update dependencies and use tools like `npm audit` to check for known vulnerabilities in your project's dependencies. Avoid using outdated or vulnerable packages.

**Sensitive Data Exposure** - 
Protect sensitive data such as API keys, passwords, and tokens.
Use environment variables or secure configuration files to store sensitive information.

**Denial of Service (DoS) Attacks:**
Implement rate limiting and request validation to prevent attackers from overwhelming your server with too many requests.
**Package:**  `express-rate-limit`

**Logging and Error Handling**
Be cautious about the information logged in error messages. Avoid exposing sensitive data or stack traces to users

**File Upload Security**
If your application allows file uploads, validate file types, restrict file sizes, and store uploaded files in a secure location outside the web root.
```
***
**How can I debug Node.js applications?**
```
**Console.log**
**Debugger Statement**
**There are third-party debugging tools like ndb**
```
***

**What is the use of middleware in Node.js**
```
A middleware is a simple function that has the ability to handle incoming requests and outbound response objects. Middleware is used primarily for the following tasks:

Execution of code (of any type)
Updating request and response objects
Completion of request-response iterations
Calling the next middleware
```
***

**How can I optimize Node.js applications?**
```
Use Latest Node.js Version
Profiling and Performance Analysis.- Use built-in tools like **`console.time`** to measure the execution time of specific parts of your code.
**Asynchronous Programming** - -   Utilize asynchronous programming and callbacks to avoid blocking the event loop.
**Caching** - Implement caching mechanisms (e.g., **Redis**, **Memcached**) to store frequently accessed data and reduce database or API calls.
**Optimize Database Queries** - 
-   Index your database queries appropriately for faster search operations.
**Minimize Dependencies** - -   Keep your dependencies minimal. Unused or unnecessary packages can bloat your application and slow down startup times.

**Load Balancing** - Employ load balancers to distribute traffic across multiple instances of your application to improve response times and handle more concurrent connections.

**Memory Management:**
Monitor memory usage using tools like **`heapdump`** and **`ndb`**.

**HTTP/2 and HTTPS**
Use HTTP/2 and enable HTTPS to improve the efficiency of data transfer and security.

**Compression**
Compress response data (e.g., using **`zlib`** or middlewares like **`compression`**) to reduce the size of data sent over the network.

**Error Handling**
-   Implement effective error handling to prevent crashes. Log errors and handle them gracefully without bringing down the entire application.
 
**Use CDNs**
Utilize Content Delivery Networks (CDNs) for serving static assets. CDNs can distribute content geographically, reducing latency for user.

**Automate Testing**
-   Implement unit tests, integration tests, and performance tests to identify bottlenecks early in the development process.
-   Use tools like **`ab`** (Apache Benchmark) or **`siege`** to stress-test your APIs and identify performance issues
```
***

**What are the different types of events in Node.js?**
```
In Node.js, events are actions that can be observed and responded to.
Node.js utilizes the EventEmitter class to handle events.

Different types of events in Node.js.
## **Core Events**
-   **'data':** Emitted when data is available to be read from a readable stream.
-   **'end':** Emitted when there is no more data to be read from a readable stream.
-   **'error':** Emitted when an error occurs. It is crucial to handle this event to prevent crashes.
-   **'close':** Emitted when a stream or a connection is closed.

readableStream.on('data', (chunk) => {
	console.log('Received data chunk:', chunk); });
	readableStream.on('end', () => { console.log('End of file reached.');
	});
	
readableStream.on('end', () => { console.log('End of file reached.'); });

readableStream.on('error', (err) => { console.error('Error:', err.message); });

### **Custom Events:**
You can create and emit your own custom events using the EventEmitter class.

const  EventEmitter = require('events');
class  MyEmitter  extends  EventEmitter {}
const myEmitter = new  MyEmitter();
myEmitter.on('customEvent', (arg) => {
      console.log('Custom event occurred with argument:', arg); });
myEmitter.emit('customEvent', 'example argument');
```
***

**How do you use callbacks?**
```
functions that are passed as arguments to other functions and are executed at a later time 
```
***

** fundamental feature in JavaScript for handling asynchronous operations.**
```
 Design pattern used to manage asynchronous tasks and handle the results of those tasks.
Promises have three states:
Pending
Fulfilled 
Rejected

```
***
**What are streams?**
```
It is way to handle data efficiently. They allow you to read and write data in chunks, instead of having to load the entire dataset into memory at once. This is especially useful for working with large datasets, or datasets that are constantly being updated.
```
***

**What are streams?**
```
In Node.js, streams are a key feature that allows you to work with data in a sequential and efficient manner, especially when dealing with large datasets or performing I/O operations.
Streams in Node.js are an implementation of the stream interface, which is an abstract interface for working with data sequences in a variety of ways.

several types
Readable, Writable, Duplex, and Transform.

Readable Streams: Readable streams are used for reading data from a source
const fs = require('fs');
const readableStream = fs.createReadStream('example.txt');
readableStream.on('data', (chunk) => {
  console.log(chunk.toString());
});

Writable Stream:  Writable streams are used for writing data to a destination. 
You can write data chunk by chunk to a writable stream. 
Common destinations for writable streams include files, HTTP responses, or network sockets. 

const fs = require('fs');
const writableStream = fs.createWriteStream('output.txt');
writableStream.write('Hello, world!\n');
writableStream.end('Stream ended.');

Duplex Streams:
Duplex streams are bidirectional, allowing both reading and writing. 

Transform Streams:
Transform streams are a type of duplex stream that allows you to modify or transform data as it flows from the source to the destination. 

Streams in Node.js are designed to be memory-efficient because they process data in small chunks (buffers) rather than loading the entire data set into memory.
You can pipe streams together to create powerful data processing pipelines

const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const transformStream = myTransformFunction();
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(transformStream).pipe(writeStream);
```
***

**What are modules?**
```
Blocks of encapsulated code that talk to other programs or apps based on their related functionality.

Built-in modules.
Local modules.
Third-party modules.

Local Module -->
const greet = name => {
  return `Hello, ${name}!`;
};
module.exports = { greet };


const myModule = require('./myModule');
console.log(myModule.greet('Alice'));

```
***

**What is the event loop in Node.js?**
```
function eventLoopDemo() {
  setTimeout(() => console.log("Timeout"), 0);
  Promise.resolve().then(() => console.log("Promise"));
  console.log("Start");
}
eventLoopDemo();
```

```
# 🌀 Node.js Event Loop, Call Stack, and Queues Explained

Node.js utilizes an **event-driven**, **non-blocking I/O model**, powered by three key components:  
the **Event Loop**, the **Call Stack**, and various **Queues**.  

---

## ⚙️ 1. The Call Stack

The **Call Stack** is a **LIFO (Last-In, First-Out)** data structure that keeps track of function execution contexts.

- When a function is called, a new **execution context (frame)** is **pushed** onto the stack.  
- When a function completes, its frame is **popped** off the stack.  
- **Synchronous code** executes directly on the Call Stack.

✅ **In short:** The Call Stack handles synchronous execution.

---

## 📬 2. The Queues

Node.js maintains two main types of queues to manage asynchronous callbacks.

### 🕒 Macrotask Queue  
(Also called the **Callback Queue** or **Task Queue**)

- Stores callbacks for asynchronous operations like:
  - `setTimeout`
  - `setInterval`
  - I/O operations (e.g., file system, network)
  - `setImmediate`
- These tasks are processed **after** all Microtasks are complete.

### ⚡ Microtask Queue  
Has **higher priority** than the Macrotask Queue.

- Holds callbacks for:
  - `process.nextTick()`
  - Promises (`.then()`, `.catch()`, `.finally()`)
- Internally, it consists of two sub-queues:
  1. **NextTick Queue** (for `process.nextTick`)
  2. **Promise Queue** (for Promises)

✅ **In short:** Microtasks always run before Macrotasks in each Event Loop iteration.

---

## 🔁 3. The Event Loop

The **Event Loop** is the central orchestrator that ensures smooth asynchronous execution.

### 🧭 Its main role:
- Continuously monitor the **Call Stack** and the **Queues**.  
- Move callbacks from Queues → Call Stack **only when the Call Stack is empty**.

---

## ⏱️ Event Loop Phases

The Node.js Event Loop executes in **phases**, each managing specific queues:

| **Phase** | **Description** |
|------------|----------------|
| **Timers** | Executes callbacks for `setTimeout()` and `setInterval()` |
| **Pending Callbacks** | Runs I/O callbacks deferred from the previous cycle |
| **Idle, Prepare** | Internal operations (used by Node.js core) |
| **Poll** | Retrieves new I/O events and executes related callbacks. If no I/O is pending, it checks for `setImmediate()` callbacks |
| **Check** | Executes `setImmediate()` callbacks |
| **Close Callbacks** | Executes `close` event callbacks (e.g., sockets, streams) |

---

## ⚡ How They Work Together

1. **Synchronous code** runs directly on the **Call Stack**.  
2. When an **asynchronous operation** (like `setTimeout` or file read) starts:
   - Its callback is **registered** and offloaded to **Libuv** (Node.js’s underlying C library).  
   - The main thread continues executing other synchronous code.  
3. Once the async operation completes:
   - Its **callback** is placed into the appropriate **Queue** (Macrotask or Microtask).  
4. The **Event Loop** checks if the **Call Stack** is empty:
   - If **empty**, it first executes **Microtasks** (`process.nextTick`, Promises).  
   - Once all Microtasks finish, it executes the **next Macrotask** from the current phase.  
5. This process **repeats indefinitely**, allowing Node.js to handle asynchronous tasks efficiently without blocking the main thread.

---

### 🧩 Summary Diagram (Conceptually)

```
        ┌──────────────────┐
        │   Call Stack     │
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │   Microtask Queue│ ← process.nextTick, Promises
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │   Macrotask Queue│ ← setTimeout, setInterval, setImmediate, I/O
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │   Event Loop     │
        └──────────────────┘
```

---

### 🚀 TL;DR

- **Call Stack:** Runs synchronous code.  
- **Microtask Queue:** Runs `process.nextTick` and Promise callbacks (highest priority).  
- **Macrotask Queue:** Runs timers, I/O, and `setImmediate` callbacks.  
- **Event Loop:** Manages execution order and keeps Node.js non-blocking.

```
***
**How does Node.js handle I/O operations ?**
```
Node.js handles I/O operations using an event-driven, non-blocking I/O model. This means that Node.js does not block the main thread while waiting for I/O operations to complete. Instead, it uses an event loop to monitor I/O operations and execute callbacks when they are complete.

When a Node.js application performs an I/O operation, the event loop schedules a callback function to be executed when the operation is complete. The callback function is typically defined by the developer and contains the code that should be executed when the I/O operation is complete.
```
***

**How does Node.js manage concurrency?**
```
Node.js manages concurrency using an event loop. The event loop is a single thread that is responsible for executing all JavaScript code in Node.js, as well as monitoring all I/O operations and executing callbacks when they are complete.
```
***

**What is clustering? in node js**
```
Clustering in Node.js is a technique that allows you to run multiple instances of your application on the same machine. This can be useful for improving performance and scalability, as well as for providing redundancy.

To create a clustered Node.js application, you use the cluster module. The cluster module provides a number of APIs for managing and communicating with worker processes.

When you start a clustered Node.js application, the parent process creates a number of child processes, called worker processes. The worker processes are responsible for handling requests from clients.

The parent process is responsible for managing the worker processes, such as starting and stopping them, and distributing requests to them.
```
***

**PM2 in node js**
```
PM2 is a daemon process manager that will help you manage and keep your application online. It can be used to start, stop, monitor, and restart your Node.js applications. PM2 also provides a number of other features, such as:

Load balancing: PM2 can distribute traffic across multiple instances of your application, which can improve performance and scalability.
Clustering: PM2 can start multiple instances of your application on the same machine, which can also improve performance and scalability.
Logging: PM2 can collect and aggregate logs from your application, which can help you to troubleshoot and debug problems.
Monitoring: PM2 can monitor your application's performance and health, and alert you to any problems.
```
***

**Differentiate between process.nextTick() and setImmediate()?**
```
The process.nextTick callback is executed immediately after the current operations (before End),
while the setImmediate callback is executed in the next event loop iteration, after the current operations have completed.

console.log('Start');

process.nextTick(() => {
  console.log('process.nextTick callback');
});

setImmediate(() => {
  console.log('setImmediate callback');
});

console.log('End');

O/p:
Start
End
process.nextTick callback
setImmediate callback
```
***

**What is an EventEmitter in Node.js?**
```
It is used for working with events, event-driven programming, and creating custom event-driven APIs. The EventEmitter module allows you to emit named events and register event listeners to respond to those events
```
***

**Explain the concept of middleware in Node.js?**
```
 It refers to a set of functions that are executed sequentially during the processing of an HTTP request or response.
Middleware has a wide range of applications in Node.js and web development in general
Request Logging, Authentication and Authorization, Data Validation, Error Handling, CORS, Request Parsing, Rate Limiting and Security
```
***

**how to improve speed of node js application ?**
```
Caching - use Redis, Memcache
Asynchronous Programming - if we use sync for file it will block event loop.
Load Balancing - distribute incoming traffic across multiple server instances
Code Optimization - optimize your JavaScript code for bottlenecks, such as tight loops, unnecessary function calls, and inefficient data structures.
Minimize Dependencies - Fewer dependencies can lead to faster installation and startup times
Parallel Processing - Take advantage of multi-core processors by utilizing the cluster module to create multiple Node.js processes that can handle requests concurrently.
GZIP Compression - Enable GZIP compression for HTTP responses to reduce data transfer size.
```
***

libuv is a cross platform open source library written in C language.

handles asynchronouse non-blocking opearation in node js.

How ?  Thread Pool & Even Loop. (ofcouse there is more but fine for explanation point of view).

Thread Pool --> 

see node js example

const fs - require('node:fs');

console.log('First');

fs.readFile('./file.txt','utf-8',(err,data) => {
	console.log('File Contents');
});

console.log('Last');

Output: -->

First
Last
File Contents

How does this works ??
why file operation is not blocking in node js ?
how node js handle this ??

Answer is libuv's Thread pool.

In node js we have main thread. when it encounter asyncronouse opearion.

Hey libuv I need to read file contents but that is time consuming task. I don't want to block further code from beign executed during this time.
Can I offload this task to you ?

Libuv: 

Sure main thread Unlike you, who is single threaded, I have pool of threads that I can use to run some of these time consuming tasks. when the task is done the file contents are retrived and associated callback function can be run.

will take another example.

const crypto = require('node:crypto')
const start = Date.noe();
crypto.pbkdf2Sync('password','salt',1000000,512,"sha512");
console.log('Hash: ',Date.now() - start);

It is synchronous function.

output: 261 ms  <-- Output may varry as machine changes.

if we double the operation.

const start = Date.noe();
crypto.pbkdf2Sync('password','salt',1000000,512,"sha512");
crypto.pbkdf2Sync('password','salt',1000000,512,"sha512");
console.log('Hash: ',Date.now() - start);

output: 523 ms  <-- Output may varry as machine changes.

If we tripple 

const start = Date.noe();
crypto.pbkdf2Sync('password','salt',1000000,512,"sha512");
crypto.pbkdf2Sync('password','salt',1000000,512,"sha512");
crypto.pbkdf2Sync('password','salt',1000000,512,"sha512");
console.log('Hash: ',Date.now() - start);

output: 783 ms.


So inference from observation is 

Every method in node js that has the sync suffic always runs on the main thread and is blocking.

if we use async version of above code ?? then let's see the output.

const crypto = require('node:crypto');

const MAX_CALLS = 2;
const start = Date.now();

for(let i = 0; i < MAX_CALLS; i++) {
	crypto.pbkdf2('password','salt',1000000,512,"sha512',() => {
		console.log('Hash : ${i+1}`,Date.now() - start);
	});
}

Now we are calling same function (async version) 2 times.

Hash: 1 264
Hash: 1 269

Both calls took aproximetly 260 ms.
Achived paralled execution is possible.
