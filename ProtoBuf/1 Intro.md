# **Protocol Buffers (Protobuf) — Notes**

## **1. Evolution of Data Formats**

### **CSV (Comma-Separated Values)**

**Example**

```
id,fname,lname,bday
1,Nikhil,Patil,1998-03-10
```

### **Advantages**

* Very easy to read
* Simple to parse

### **Disadvantages**

* **Type inference** → computer must guess data types (slow + error-prone)
* Parsing becomes difficult if fields contain commas
* Column names may be missing
* Very **shaky** format for structured data

---

## **2. Relational Database Schema**

**Example**

```sql
CREATE TABLE user (
  id INTEGER PRIMARY KEY,
  lname VARCHAR,
  fname VARCHAR,
  bday DATE
);
```

### **Advantages**

* Fully typed
* Schema-first design
* Enforces structure

### **Disadvantages**

* No native support for lists/arrays (data must be flat)
* Hard to share schema across systems
* Usually requires an ORM to map DB to code

---

## **3. JSON — A Major Evolution**

**Example**

```json
{
  "app": {
    "user": {}
  }
}
```

### **Advantages**

* Easy to share over a network
* Supports arrays
* Every language supports JSON
* Very flexible & dynamic

### **Disadvantages**

* **Dynamic structure** → no strict schema enforcement
* Not inherently backward/forward compatible
* No guarantee on field order
* Redundant (keys repeated everywhere)
* Bigger payload size compared to binary formats
* No comments → no metadata

---

# **4. Enter Protocol Buffers (Protobuf)**

### **Example `.proto` Schema**

```proto
syntax = "proto3";
import "google/protobuf/timestamp.proto";

message User {
  uint32 id = 1;
  string lname = 2;
  string fname = 3;
  google.protobuf.Timestamp bday = 4;
}
```

---

## **Advantages of Protobuf**

* Fully **typed** data
* Auto-generated code (Java, Go, Python, C++, etc.)
* **Schema evolution** supported
* Supports **comments** in schema
* Compact **binary encoding** (much smaller than JSON/XML)
* Faster, less CPU-intensive parsing

### **Performance Numbers**

* **3–10× smaller** than JSON
* **20–100× faster** than XML
* For JS:

  * 34% smaller payload
  * 21% faster availability
* In compressed context (JS):

  * 9% smaller
  * 4% faster availability

### **If Google uses it at scale, it will probably work for you too.**

---

## **Disadvantages of Protobuf**

* Not human readable (binary)
* Slightly lower ecosystem support compared to JSON
* Requires code generation

---

# **5. How Protobuf Works**

### Step 1 — Define Schema

```proto
syntax = "proto3";

message MyMessage {
  uint32 id = 1;
}
```

### Step 2 — Compile/Generate Code

You run:

```
protoc --python_out=. my_message.proto
```

This generates strongly-typed code in:

* Java
* Go
* Python
* C++
* Ruby
* Dart
* Many others

### Step 3 — Encoding

The binary output may look like:

```
08 AC 02   (hex)
```

### Step 4 — Decoding

Reverse algorithm reconstructs the structured message.

---

# **6. Most Common Use Case: Communication**

```
gRPC Server (C++ Server)
        |
        |----> gRPC Stub (Ruby Client)
        |----> gRPC Stub (Android Java Client)
```

Protobuf is the default serialization format for **gRPC**.

### **Used By**

* Google
* Cisco
* Netflix
* CoreOS
* Juniper
* Square
* CockroachDB

---

# **7. Course Structure**

### **You will learn**

* How Protocol Buffers work internally
* Comparison with CSV, JSON, XML
* Writing Message & Service definitions
* Advanced Protobuf concepts
* Practical usage with gRPC

---

If you'd like, I can also create:

✅ A visual diagram of Protobuf workflow
✅ A comparison table (CSV vs JSON vs DB vs ProtoBuf)
✅ A cheat-sheet for `.proto` syntax
✅ Real example of encoding/decoding bytes
