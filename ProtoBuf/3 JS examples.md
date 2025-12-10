

SECTION (Node.js Version)
-----------------------------

## Important Message — 1 min (Node.js)

Protocol Buffers work the same in all languages.
Difference is only the **runtime library** and **code generation** commands.

In Node.js we use:

* `google-protobuf` (official library)
* `protoc` compiler
* Output is **JavaScript** or **TypeScript** files

Use format:

* For JS: `--js_out=import_style=commonjs`
* For TS: `--ts_out=...` (needs `protoc-gen-ts`)

---

## Setup & Code Download in Node.js — 1 min

### Install deps

```bash
npm init -y
npm install google-protobuf @protobuf-ts/plugin
```

### Install protoc

Download from: [https://github.com/protocolbuffers/protobuf/releases](https://github.com/protocolbuffers/protobuf/releases)

---

## Code generation in Node.js — 3 min

### Example proto:

user.proto

```proto
syntax = "proto3";

message User {
  string id = 1;
  string name = 2;
}
```

### Generate JS output:

```bash
protoc \
  --js_out=import_style=commonjs,binary:./generated \
  user.proto
```

### Generate TypeScript output (recommended):

```bash
protoc \
  --plugin=./node_modules/.bin/protoc-gen-ts \
  --ts_out=./generated \
  user.proto
```

Output will contain:

* user_pb.js
* user_pb.d.ts (if TS)

---

## Simple Proto Message in Node.js — 3 min

Proto:

```proto
message User {
  string id = 1;
  string name = 2;
}
```

### JS example:

```js
const { User } = require("./generated/user_pb");

// create
const u = new User();
u.setId("123");
u.setName("Nikhil");

// serialize to buffer
const buffer = u.serializeBinary();

// deserialize back
const user2 = User.deserializeBinary(buffer);

console.log(user2.getName());
```

### Notes:

* Every field has `setX`, `getX` functions (JS naming).
* `.serializeBinary()` gives protobuf bytes.
* `.deserializeBinary(buf)` reconstructs message.

---

## Complex Proto Message in Node.js — 4 min

Proto:

```proto
message Address {
  string city = 1;
  string country = 2;
}

message User {
  string id = 1;
  string name = 2;
  Address address = 3;
}
```

### JS example:

```js
const { User, Address } = require("./generated/user_pb");

const addr = new Address();
addr.setCity("Mumbai");
addr.setCountry("India");

const user = new User();
user.setId("001");
user.setName("Nikhil");
user.setAddress(addr);

// serialize + deserialize
const bytes = user.serializeBinary();
const user2 = User.deserializeBinary(bytes);

console.log(user2.getAddress().getCity());
```

---

## Enum Proto Message in Node.js — 4 min

Proto:

```proto
enum EyeColor {
  EYE_COLOR_UNSPECIFIED = 0;
  EYE_COLOR_GREEN = 1;
  EYE_COLOR_BLUE = 2;
}

message Person {
  string name = 1;
  EyeColor color = 2;
}
```

### JS example:

```js
const { Person, EyeColor } = require("./generated/person_pb");

const p = new Person();
p.setName("John");
p.setColor(EyeColor.EYE_COLOR_BLUE);

console.log(p.getColor()); // returns enum number: 2
```

Note:

* All enums compile to a JS object with numeric values.

---

## Handling OneOfs in Node.js — 3 min

Proto:

```proto
message Shape {
  oneof shape_type {
    double radius = 1;
    double side = 2;
  }
}
```

### JS usage:

```js
const { Shape } = require("./generated/shape_pb");

const s = new Shape();
s.setRadius(10);

// check which field is set
console.log(s.getShapeTypeCase());  
// returns: Shape.ShapeTypeCase.RADIUS
```

Important note:

* Setting one field automatically clears the other.

---

## Handling Maps in Node.js — 3 min

Proto:

```proto
message User {
  map<string, int32> scores = 1;
}
```

### JS usage:

```js
const { User } = require("./generated/user_pb");

const u = new User();
const map = u.getScoresMap();

map.set("match1", 10);
map.set("match2", 20);

console.log(map.get("match1")); // 10
```

---

## Reading and Writing to Disk — 4 min

Write binary:

```js
const fs = require("fs");
const { User } = require("./generated/user_pb");

const u = new User();
u.setId("123");
u.setName("Nikhil");

fs.writeFileSync("user.bin", u.serializeBinary());
```

Read binary:

```js
const bytes = fs.readFileSync("user.bin");
const user2 = User.deserializeBinary(bytes);

console.log(user2.getName());
```

---

## Reading and Writing to JSON — 6 min

Proto JSON is also supported but manual conversion is needed.

### Convert proto → plain JSON

```js
const obj = {
  id: u.getId(),
  name: u.getName()
};

console.log(JSON.stringify(obj));
```

### Convert JSON → proto

```js
const json = { id: "99", name: "Test" };

const u = new User();
u.setId(json.id);
u.setName(json.name);
```

Note:

* Protobuf JS does not have automatic JSON conversion like Python; we do manual mapping or use `@protobuf-ts` which has better JSON helpers.
