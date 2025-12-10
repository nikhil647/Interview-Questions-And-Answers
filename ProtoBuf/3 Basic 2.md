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
