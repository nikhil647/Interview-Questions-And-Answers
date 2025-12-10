Here are your clean, structured **Markdown notes** for ProtoBuf scalar types and a sample message.

---

# 📌 Protocol Buffers (proto3) — Notes

---

## 📨 **Our First Message**

```proto
syntax = "proto3";

message Account {
    uint32 id = 1;
    string name = 2;
    bool is_verified = 3;
}
```

---

## 🔥 **Defaults in proto3**

* **When a field is not set → it is *not serialized***.
* On the receiving end, it appears with its **default value**.
* This reduces payload size and improves performance.

---

# 🧱 Scalar Types in Proto3

---

## 🔢 **Scalar Types: Numbers**

ProtoBuf supports multiple numeric formats:

* `int32`, `int64`, `sint32`, `sint64`
* `uint32`, `uint64`
* `fixed32`, `fixed64`
* `sfixed32`, `sfixed64`
* `float`, `double`

**Default value:** `0`

---

## 🔘 **Scalar Type: Boolean**

* Keyword: `bool`
* Values: `true` / `false`
* **Default:** `false`

---

## 🔤 **Scalar Type: String**

* Keyword: `string`
* Value: arbitrary-length text
* **Default:** empty string `""`
* ⚠️ **Important:** Only accepts **UTF-8** or **7-bit ASCII**

---

## 🧩 **Scalar Type: Bytes**

* Keyword: `bytes`
* Value: arbitrary-length raw bytes
* **Default:** empty bytes
* Interpretation is **application-defined** (you decide how to use those bytes)

---

# 🛠 Example: Creating a Richer Message

Fields we want:

* Age
* Account name
* Small picture (thumbnail)
* Profile verified
* Height

## 📄 **account.proto**

```proto
syntax = "proto3";

message Account {
    uint32 id = 1;         // Age or unique identifier
    string name = 2;       // Account name
    bytes thumbnail = 3;   // Small profile picture
    bool is_verified = 4;  // Verification flag
    float height = 5;      // Height in float
}
```

Below are **clear, minimal, production-ready notes in Markdown** explaining **tags in Protocol Buffers**, especially **why most-populated fields should use the smallest tag numbers**, with **a clean example**.

---

# Protocol Buffers – Tag Rules (Dead Simple Notes)

## 1. What are Tags?

Tags are numeric identifiers used in ProtoBuf serialization.
Field names do **not** matter for serialization; **tags matter**.

```
message User {
  string name = 1;    // tag = 1
  int32 age = 2;      // tag = 2
}
```

---

## 2. Tag Number Rules

* **Smallest allowed tag:** 1
* **Largest allowed tag:** 536,870,911
* **Reserved range:** 19,000 – 19,999 (cannot use these)

---

## 3. Wire Size Impact

Tag numbers directly affect the number of bytes on the wire.

ProtoBuf encodes tag+wiretype using **varints**:

| Tag Range     | Bytes Used  |
| ------------- | ----------- |
| **1 – 15**    | **1 byte**  |
| **16 – 2047** | **2 bytes** |
| 2048 – ...    | More bytes  |

Smaller tags → smaller payloads.

---

## 4. Why “Most Populated Fields Should Use Smallest Tag Numbers”?

**Most populated field = field that appears in majority of messages.**

Example:

```
message Product {
  string id = 1;             // appears in 100% of messages
  string title = 2;          // appears in 100%
  string description = 30000; // appears in 5%
  string discountCode = 40000; // appears in 1%
}
```

### Explanation

* `id` and `title` appear **in every message**.
* They use tags **1 and 2**, so each consumes **1 byte** for the key.

If we wrongly used:

```
string id = 45000;           // would take 2 or 3 bytes per occurrence
```

Since `id` appears in **every message**, the encoded payload becomes significantly larger.

### Better Example (Concrete Numbers)

Assume you send **10 million Product messages**.

### Case A: `id` uses tag **1**

* 1 byte per occurrence
* Total tag bytes = **10M bytes**

### Case B: `id` uses tag **2048**

* 2 bytes per occurrence
* Total tag bytes = **20M bytes**

You wasted **10 MB** just because of a poor tag assignment.

---

## 5. Rule of Thumb

* Fields that appear **always or very frequently** → use tag **1–15**
* Fields that appear **rarely** → higher tags are fine
* Never renumber tags once published (breaks compatibility)

---

# Final Summary (For Revision)

* Tags matter, names don’t.
* Smaller tags produce smaller payloads.
* Use smallest tags for **high-frequency fields**.
* Reserved tags 19000–19999.
* Tag ranges affect byte size:

  * 1–15 → 1 byte
  * 16–2047 → 2 bytes
* Optimise based on how often a field appears in real data.
---

Here is a **clean, minimal, production-ready summary** you can put directly in your notes, including the last example as a reference.

---

# ProtoBuf Tag Numbering – Thumb Rules

## 1. Tag size logic (practical view)

* Tags **1–15** always produce the **smallest encoded size (1 byte)**.
* Tags **16–2047** produce **2-byte** keys.
* Tags **2048+** produce **3+ byte** keys.

Smaller tag numbers → smaller payload.

---

## 2. Thumb Rules for Choosing Tag Numbers

### Rule 1 — Put the **most frequently sent fields** in **1–15**

Examples:
id, name, email, timestamps, status, type.

### Rule 2 — Put regular/medium-frequency fields in **16–2047**

Examples:
address, description, metadata, price.

### Rule 3 — Put rarely-used or optional fields in **2048+**

Examples:
debug info, experimental flags, internal tracking.

### Rule 4 — If your entire message has **≤ 15 fields**,

you may safely assign **all fields** tag numbers in **1–15**
because there is no downside and it maximizes efficiency.

### **Critical Rule: Never Renumber Tags**

Once a field has a tag number and is used in production, **you must never change, move, or reuse that tag**.
You may **only add new fields with new tag numbers**.
This preserves backward and forward compatibility.

---
If you want it even shorter:
**After release: tags are permanent; only add new ones.**
---

## 3. Example (10 fields, all assigned 1–10)

```
message User {
  string id = 1;
  string name = 2;
  string email = 3;
  string avatar = 4;
  string country = 5;
  string city = 6;
  string bio = 7;
  int32 followers = 8;
  int32 following = 9;
  bool isPremium = 10;
}
```

* Total fields: 10
* All fit within **1–15**
* All get the **1-byte tag cost**, which is optimal
* Recommended when schema is small and stable
---

# Repeated Fields in Protocol Buffers (Proto3)

## Definition

A **repeated field** represents a list of values of the same type.

### Syntax

```
repeated <type> <name> = <tag>;
```

### Characteristics

* **Value:** Can store 0 or more elements.
* **Default value:** Empty list `[]`.
* **Ordering:** Order is preserved.

---

## Example: Adding Phone Numbers

### Proto Definition

```proto
syntax = "proto3";

message Account {
  uint32 id = 1;
  string name = 2;

  repeated string phones = 6;
}
```

---

## JSON Example (e.g., gRPC-Gateway or debugging)

```json
{
  "id": 101,
  "name": "Nikhil",
  "phones": [
    "+91-9876543210",
    "+91-9123456789"
  ]
}
```

If no phone numbers are provided:

```json
{
  "id": 101,
  "name": "Nikhil",
  "phones": []
}
```

---

## TypeScript Example

```ts
const account: Account = {
  id: 101,
  name: "Nikhil",
  phones: ["+91-9876543210", "+91-9123456789"],
};
```
# Enums in Protocol Buffers (Proto3)

## Definition

Enums represent a set of predefined constant values.

### Syntax

```
enum <Name> {
  <CONST_NAME> = <tag>;
}
```

### Characteristics

* **Keyword:** `enum`
* **Default value:** The **first value** in the enum.
* **Tag rule:**

  * The **first tag must be 0** (required in proto3).
  * This rule is **specific to enums**; other fields start from tag 1.

---

## Example: Adding Eye Color

### Enum Definition

```proto
syntax = "proto3";

enum EyeColor {
  EYE_COLOR_UNSPECIFIED = 0;
  EYE_COLOR_GREEN = 1;
  EYE_COLOR_BLUE = 2;
  EYE_COLOR_BROWN = 3;
}
```

### Message Using the Enum

```proto
message Account {
  uint32 id = 1;
  string name = 2;

  repeated string phones = 6;
  EyeColor eye_color = 7;
}
```

---

## JSON Example (for debugging or gateway outputs)

```json
{
  "id": 101,
  "name": "Nikhil",
  "phones": ["+91-9876543210"],
  "eyeColor": "EYE_COLOR_GREEN"
}
```

If no value is provided:

```json
{
  "eyeColor": "EYE_COLOR_UNSPECIFIED"
}
```

---

## TypeScript Example

```ts
const account: Account = {
  id: 101,
  name: "Nikhil",
  phones: ["+91-9876543210"],
  eyeColor: EyeColor.EYE_COLOR_BLUE
};
```

# Comments in Protocol Buffers

## Types of Comments

### Single-line Comment

Use `//` for short, one-line explanations.

```proto
// This is a single-line comment
string name = 1;
```

### Multi-line Comment

Use `/* ... */` for longer descriptions.

```proto
/*
 Multi-line comments are useful
 when providing detailed explanations.
*/
uint32 id = 1;
```

---

## Important Notes

* Comments help document your schema and make messages easier to understand.
* Comments placed **above fields, enums, or messages** are also used by tooling to generate documentation.
* Both comment types are ignored by the compiler.

