# Multi-Tab Form Challenge ⚡

## Build This in 45 Minutes

**Tech Stack:** React + react-hook-form + localStorage

---

## The Tabs

### 📋 Profile Tab
```
First Name * (required)
Age * (number, 1-120, required)  
Email * (valid format, required)
```

### 💼 Interest Tab
```
Domain Preference * (radio: Frontend/Backend/Full Stack, required)
Framework (dropdown: React/Vue/Angular)
Skills (checkboxes: JavaScript/TypeScript/Node.js)
```

### ⚙️ Settings Tab
```
Expected Salary (number, positive)
Preferred Location (dropdown: Remote/On-site/Hybrid)
Newsletter (checkbox)
```

---

## Core Rules

1. **Tab Switching** - Click any tab, data stays
2. **Validation** - Show red error messages below inputs when invalid
3. **Data Persistence** - Use localStorage, survives page refresh
4. **Submit Button** - Only appears on Settings tab (last tab)
5. **On Submit** - Console log all data, alert success, clear localStorage

---

## Quick Checklist

```javascript
✅ 3 tabs work
✅ Switch tabs without losing data
✅ Required fields show errors
✅ Email validates with regex
✅ Age only accepts numbers
✅ Radio buttons work
✅ Submit button only on last tab
✅ localStorage persists data
✅ Clear storage after submit
```

---

## Visual Guide

```
┌────────────────────────────────────┐
│ [Profile*] [Interest] [Settings]   │ ← Highlight active
├────────────────────────────────────┤
│ First Name *                       │
│ [____________]                     │
│ ❌ Name is required                │ ← Red error
│                                    │
│ Age *                              │
│ [____________]                     │
│                                    │
│        [Submit] ← Only last tab    │
└────────────────────────────────────┘
```

---

## Expected Output

```javascript
// Console on submit:
{
  firstName: "John",
  age: 25,
  email: "john@example.com",
  domainPref: "frontend",
  framework: "react",
  skills: ["javascript"],
  salary: 50000,
  location: "remote",
  newsletter: true
}
```

---

## Common Bugs (Don't Do This!)

❌ Register email as "age" instead of "email"  
❌ Forget to show error messages  
❌ Submit button on all tabs  
❌ Lose data when switching tabs  
❌ Bad email regex

---

## Interview Questions They'll Ask

**"How would you scale this to 50+ fields?"**  
→ Config-driven approach with field objects

**"How to avoid re-renders?"**  
→ React.memo, useMemo, proper state structure

**"What if localStorage is disabled?"**  
→ Try-catch, fallback to state only

---

## That's It! 🚀

**Time yourself: 45 minutes**  
**Start with tabs → add fields → add validation → add persistence**