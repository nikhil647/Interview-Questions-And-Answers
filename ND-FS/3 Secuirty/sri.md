 🔐 Subresource Integrity (SRI)

**Subresource Integrity (SRI)** ensures that any CSS or JS file loaded from a CDN has **not been tampered with**.  
The browser verifies the file’s **cryptographic hash** before using it.

If the file is modified → the hash won’t match → browser blocks it.

---

## ✔️ Example: Using Bootstrap with SRI

### **Bootstrap CSS**
```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-5G8RRVA1CCfMEJw7xs12dF0xwhL5IIeH+VqVjNKX0SP7P8dudRRWVOxv7K4n1p7P"
  crossorigin="anonymous"
/>
```

### **Bootstrap JS**
```html
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-6c5WZ6blXvbLUG1W9eB8I7xEY76H0t3KjY3oNnVlphACqMZAF1uZm0q1EomGRF38"
  crossorigin="anonymous">
</script>
```

---

# 🧩 What is the `integrity` attribute?

`integrity="sha384-..."` contains the expected **hash of the file**.

The browser:

1. Downloads the file  
2. Computes its own hash  
3. Compares them  
4. Loads the file **only if they match**

### Outcomes:
- ✔️ **Match** → Safe → File loads  
- ❌ **Mismatch** → Suspicious → File blocked

---

# 🧩 Why do we add `crossorigin="anonymous"`?

When loading a resource from a CDN (**different origin**), the browser needs permission to read the file for hash verification.

`crossorigin="anonymous"` tells browser:

- Load the file **without cookies or credentials**
- Use it **only for SRI validation**

Some browsers fail SRI validation without this attribute.

---

# 🧪 Summary

| Concept | Meaning |
|--------|---------|
| **SRI** | Protects you from tampered CDN JS/CSS |
| **integrity** | Contains the file’s cryptographic hash |
| **crossorigin="anonymous"** | Allows browser to verify hash for cross-origin files |
| **Bootstrap Example** | Shown above with prop