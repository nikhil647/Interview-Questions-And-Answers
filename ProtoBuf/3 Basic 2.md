# Notes: Defining Multiple Messages in One Protobuf File

**1. You can define unlimited messages inside a single `.proto` file.**
This keeps related data models grouped together.

**2. Messages can reference each other.**
Example: `User` can have a field of type `Address`.

**3. The order of messages does not matter.**
Protobuf compiler resolves everything internally.

**4. Each message becomes a separate TypeScript interface** after code generation.

**5. This is the most common structure for domain models** like User, Product, Order, etc.

---

# Example `.proto` File (multiple messages)

`models.proto`

```
syntax = "proto3";

package models;

// Address message
message Address {
  string city = 1;
  string country = 2;
}

// User message
message User {
  string id = 1;
  string name = 2;
  Address address = 3;
}

// Product message
message Product {
  string productId = 1;
  string title = 2;
}
```

---

# Notes on the Example

* All three messages (`Address`, `User`, `Product`) are defined in the same file.
* `User` uses another message (`Address`) as a typed field.
* Tag numbers (`= 1`, `= 2`, etc.) uniquely identify fields for serialization.

---

# Example of Generated TypeScript Interfaces

(What you will get after protobuf → TypeScript generation)

```
export interface Address {
  city: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  address?: Address;
}

export interface Product {
  productId: string;
  title: string;
}
```

---

# Notes on Generated TS Example

* Every protobuf `message` becomes a TypeScript `interface`.
* You use them in code like any normal TS type.
* `address?: Address` means the field is optional (common in protobuf).

---

# Example Usage in TypeScript

```
const address: Address = {
  city: "Pune",
  country: "India",
};

const user: User = {
  id: "U001",
  name: "Nikhil",
  address,
};

const product: Product = {
  productId: "P100",
  title: "Black T-Shirt",
};
```

---

# Final Short Notes

* Put multiple models in one `.proto` file for simplicity.
* Messages = TS interfaces.
* Messages can reference each other normally.

---

# Protobuf Notes: **PACKAGE + IMPORT**
---

# 1. What is a `package` in protobuf?

**Notes:**

1. A `package` is like a **namespace** (similar to folders/modules in TypeScript).
2. It groups related messages together.
3. Files with the **same package** are considered part of the same logical module.
4. Files with **different packages** are separated into different namespaces.

### TS analogy:

```
package demo;        → like folder "demo/"
package auth;        → like folder "auth/"
```

---

# 2. What is `import` in protobuf?

**Notes:**

1. `import "file.proto";` makes another `.proto` file’s messages available.
2. Works just like `import` in TypeScript.
3. You import a file **when one message needs another message’s type**.

---

# 3. When to use the SAME package?

Use the same package when:

* Files contain related models
* Example: `User`, `Address`, `Product`
* You want simple references without prefixing

### Benefits:

* No namespace prefix needed
* Clean, easy structure
* Perfect for shared domain models

---

# 4. When to use DIFFERENT packages?

Use different packages when:

* Models belong to different domains
* Example: `auth`, `payment`, `common`
* You want modular separation

### Behavior:

* You must prefix the type with the package name in `.proto`

---

# 5. Combined Examples

(Shows how package & import work together)

---

## Example A: **Same Package (simple, common case)**

### address.proto

```
syntax = "proto3";
package demo;

message Address {
  string city = 1;
  string country = 2;
}
```

### user.proto

```
syntax = "proto3";
package demo;

import "address.proto";

message User {
  string id = 1;
  string name = 2;
  Address address = 3;  // no prefix needed
}
```

### Generated TypeScript

```
export interface Address {
  city: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  address?: Address;
}
```

**Summary:**
Same package → no prefix → cleanest setup.

---

## Example B: **Different Packages (namespaced)**

### address.proto

```
syntax = "proto3";
package common;

message Address {
  string city = 1;
  string country = 2;
}
```

### user.proto

```
syntax = "proto3";
package auth;

import "address.proto";

message User {
  string id = 1;
  string name = 2;
  common.Address address = 3; // prefix required
}
```

### Generated TypeScript

```
import { Address } from "../common/address";

export interface User {
  id: string;
  name: string;
  address?: Address;
}
```

**Summary:**
Different package → must prefix → useful for organizing large systems.

---

# 6. SUPER-SIMPLE RULE (memorize this)

**If models belong together → same package.
If models belong to different domains → different packages.**

And:

**If you need a type from another file → import that file.**

---

# 7. Final Notes

* `package` = namespace
* `import` = bring another file’s messages into scope
* Same package → simpler references
* Different packages → cleaner modular separation
* TypeScript output always becomes normal `import { ... } from "..."`

---


