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
