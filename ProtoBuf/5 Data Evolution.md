Below are **concise, practical notes + examples** focused **only on Proto3** and using **JS/TS** for explanation.

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AaZ8CJ8El7mOh9P3GftmlBQ.jpeg?utm_source=chatgpt.com)

![Image](https://www.xenonstack.com/hs-fs/hubfs/google-protocol-buffers-xenonstack.png?height=720\&name=google-protocol-buffers-xenonstack.png\&width=1280\&utm_source=chatgpt.com)

---

# 1. Renaming Fields

**Key rule:**
You can **change the field name** anytime, but you **cannot change its tag number**.

ProtoBuf serialization depends on **tag numbers**, not names. Renaming is completely safe when the tag stays the same.

### Notes

* Change name → OK
* Change tag → NOT OK (breaks backward compatibility)

### Example (renaming is safe)

Old:

```proto
message User {
  string full_name = 1;
}
```

Renamed:

```proto
message User {
  string name = 1;  // same tag = safe
}
```

JS/TS decode will still work because wire-format uses tag `1`.

---

# 2. Removing Fields

You **must not simply delete a field** because older clients might still send it. If you delete it, ProtoBuf will treat incoming tag as unknown and **drop it silently**, but the bigger issue is **tag reuse**.

**Rule:**
If you remove a field, **DO NOT reuse its tag number** for a new field.

### Correct way (make field optional + stop using it)

Old:

```proto
message User {
  string username = 1;
  string old_email = 2;
}
```

You want to remove `old_email`.

Safe removal:

```proto
message User {
  string username = 1;
  reserved 2;      // prevents future reuse
}
```

If you skip `reserved`, a teammate may later add:

```proto
string new_field = 2;   // dangerous – old clients think it's old_email
```

---

# 3. Reserved Fields & Reserved Names

**Purpose:**
Helps avoid accidental reuse of tags or names from deleted fields.

### Notes

* Use **reserved numbers** to protect tags.
* Use **reserved names** to avoid reusing old field names.
* Prevents accidental backward-incompatible changes.

### Example

```proto
message User {
  string username = 1;

  reserved 2, 3, 10 to 20;  // reserved tag numbers
  reserved "old_email", "legacy_phone";  // reserved field names
}
```

If someone tries to add:

```proto
string phone = 2;
```

Compiler error → saves your production.

---

# 4. Beware of Defaults (Proto3)

Proto3 assigns **implicit defaults** when fields are missing.

### Default values

* string → `""`
* numbers (int32, float) → `0`
* bool → `false`
* enums → first value (usually `0`)
* repeated → empty array `[]`
* message fields → default instance or `undefined` depending on language

### Why this is dangerous

Because you cannot differentiate between:

* “field was not sent”
* “field was sent but value is zero/empty”

Hence “missing” and “default” look the same.

### Example problem

Proto:

```proto
message Product {
  int32 price = 1;
}
```

Server sends nothing for `price`.
Client sees:

```ts
product.price === 0
```

But 0 might mean:

* actual price is 0
* OR server didn’t send the value

### How to handle safely

* Use **wrapper types** if you must detect missing fields
  Example: `google.protobuf.Int32Value`
* Or add an explicit `bool hasPrice`
* Or restructure your API to avoid ambiguous defaults.

---

# Full Combined Notes (Short)

* **Renaming fields:** Safe if tag number remains same.
* **Removing fields:** Never reuse tag numbers. Reserve them.
* **Reserved fields:** Tag numbers and names reserved to prevent future conflicts.
* **Beware of defaults:** Proto3 default values hide missing fields; use wrappers when necessary.

---
