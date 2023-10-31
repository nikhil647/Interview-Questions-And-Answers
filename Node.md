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

The Node.js event loop is customized for handling I/O operations, such as reading files, making network requests, and handling concurrent connection.

Node.js's event loop includes additional phases like "Timers," "Pending Callbacks," "Poll," "Check," and "Close Callbacks" to handle various asynchronous operations efficiently.

Timers: Execute callbacks scheduled with setTimeout() or setInterval().
Pending Callbacks: Execute I/O callbacks that were deferred in the previous cycle.
Poll: Retrieve new I/O events and execute their callbacks. This is where most of the time is spent.
Check: Execute setImmediate() callbacks.
Close Callbacks: Execute close event callbacks, e.g., when a socket or a file is closed.
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
