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
