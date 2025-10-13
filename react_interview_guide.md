# ⚛️ React Interview Preparation Guide

## 📚 Table of Contents
1. [React Basics](#react-basics)
2. [React Hooks](#react-hooks)
3. [Performance Optimization](#performance-optimization)
4. [React Architecture](#react-architecture)
5. [React Router](#react-router)
6. [State Management](#state-management)
7. [Advanced Concepts](#advanced-concepts)
8. [React vs Angular](#react-vs-angular)

---

## 🎯 React Basics

### 1️⃣ What is React?

React is an open-source JavaScript library for building user interfaces. It is maintained by Meta (Facebook) and focuses on component-based architecture for creating interactive UIs.

---

### 2️⃣ Core Features of React

**JSX (JavaScript XML)**
- Write HTML-like syntax in JavaScript
- Gets transpiled to `React.createElement()` calls

**Component Structure**
- Split UI into independent, reusable parts
- Each component can be processed separately

**Virtual DOM**
- Lightweight copy of the real DOM in memory
- React compares old and new Virtual DOM (diffing)
- Only updates changed parts in real DOM
- Result: Better performance than direct DOM manipulation

**Example:**
```javascript
// Direct DOM (slow)
for (let i = 0; i < 10; i++) {
  document.getElementById("count").innerText = i;
}
// → 10 DOM updates

// React (fast)
// → Updates Virtual DOM in memory
// → Only 1 final DOM update
```

---

### 3️⃣ What is an Event?

An event is an action triggered by user or system (mouse click, key press, etc.)

**React event naming:** camelCase (not lowercase like HTML)

```jsx
<button onClick={handleClick}>Click me</button>
```

---

### 4️⃣ Synthetic Events

React wraps browser native events into a consistent API called Synthetic Events. This ensures events work the same across all browsers.

**Example:** `preventDefault()` is a synthetic event

---

### 5️⃣ Event Bubbling vs Event Delegation

**Event Bubbling**
- Events travel UP from child to parent

**Event Delegation**
- Attach ONE listener to parent instead of many to children
- React uses this automatically under the hood

```jsx
function TodoList({ todos }) {
  const handleDelete = (id) => {
    console.log(`Delete ${id}`);
  };
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => handleDelete(todo.id)}>
            Delete
          </button>
          {/* React doesn't attach listener here! */}
        </li>
      ))}
    </ul>
  );
}
```

---

### 6️⃣ Why Keys are Important

Keys help React identify which items have changed, been added, or removed. This optimizes re-rendering.

✅ **Must be unique**
❌ **Don't use array index as key** (causes issues when list changes)

---

### 7️⃣ React Fragments

Wrap multiple children without adding extra DOM nodes.

```jsx
// Short syntax
<>
  <h1>Title</h1>
  <p>Content</p>
</>

// Full syntax (when you need key prop)
<React.Fragment key={id}>
  <h1>Title</h1>
</React.Fragment>
```

---

### 8️⃣ Higher Order Component (HOC)

A function that takes a component and returns a new component.

**Use case:** Code reusability (authentication, logging, etc.)

```jsx
const withAuth = (Component) => {
  return (props) => {
    if (!isAuthenticated) return <Login />;
    return <Component {...props} />;
  };
};
```

---

### 9️⃣ Pure Components

Components that only re-render when props/state actually change.

**Class-based:**
```jsx
import React, { PureComponent } from 'react';

class MyPureComponent extends PureComponent {
  render() {
    return <div>{this.props.text}</div>;
  }
}
```

**Function-based:**
```jsx
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.text}</div>;
});
```

**Note:** Uses shallow comparison of props/state

---

### 🔟 Class Component Lifecycle

| Mounting | Updating | Unmounting |
|----------|----------|------------|
| constructor | shouldComponentUpdate | componentWillUnmount |
| render | componentDidUpdate | |
| getDerivedStateFromProps | componentWillReceiveProps | |
| componentDidMount | | |

**In Function Components:** `useEffect` replaces most lifecycle methods

---

## 🎣 React Hooks

### 1️⃣ useState

Add state to functional components.

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};
```

---

### 2️⃣ useEffect

Handle side effects (data fetching, subscriptions, DOM changes).

```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Setup
    fetchData().then(result => setData(result));
    
    // Cleanup (optional)
    return () => {
      // Cancel subscriptions, etc.
    };
  }, []); // Empty array = run once on mount
  
  return <div>{data ? data : 'Loading...'}</div>;
}
```

---

### 3️⃣ useRef

Used for 3 purposes:
1. Access DOM elements
2. Track previous values
3. Count renders (without causing re-render)

```jsx
import React, { useState, useEffect, useRef } from "react";

function UseRefExample() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const prevCount = useRef(0);
  const renderCount = useRef(0);

  useEffect(() => {
    prevCount.current = count;
    renderCount.current += 1;
  });

  return (
    <div>
      <input ref={inputRef} placeholder="Focus me" />
      <p>Current: {count}</p>
      <p>Previous: {prevCount.current}</p>
      <p>Renders: {renderCount.current}</p>
      
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
    </div>
  );
}
```

---

### 4️⃣ useMemo

Memoize expensive calculations.

```jsx
const MyComponent = ({ propA, propB }) => {
  const memoizedValue = useMemo(() => {
    return computeExpensiveValue(propA, propB);
  }, [propA, propB]);

  return <div>{memoizedValue}</div>;
};
```

---

### 5️⃣ useCallback

Memoize functions to prevent unnecessary re-renders.

```jsx
import React, { useState, useCallback } from 'react';

const Parent = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <ChildComponent onIncrement={increment} />
    </div>
  );
};

const ChildComponent = React.memo(({ onIncrement }) => {
  return <button onClick={onIncrement}>Increment</button>;
});
```

---

### 6️⃣ useReducer

Alternative to `useState` for complex state logic.

```jsx
import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count > 0 ? state.count - 1 : 0 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        -
      </button>
    </div>
  );
};
```

**Pro tip:** Combine `useReducer` + `useContext` to replicate Redux functionality

---

### 7️⃣ useContext

Solve prop drilling by sharing data across components.

```jsx
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext('light');

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemedComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ 
      background: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};
```

---

### 8️⃣ useLayoutEffect

Similar to `useEffect` but fires synchronously BEFORE browser paint.

⚠️ **Use sparingly!** Blocks rendering.

**When to use:**
- DOM measurements
- Prevent visual glitches/flickers
- Scroll position adjustments

```jsx
function ScrollToTop() {
  const ref = useRef();

  useLayoutEffect(() => {
    ref.current.scrollTop = 0;
  }, []);

  return <div ref={ref}>Content</div>;
}
```

**Rule:** Prefer `useEffect` → only use `useLayoutEffect` if you see flickers

---

⚠️ **Use sparingly!** Blocks rendering.

**When to use:**
- DOM measurements
- Prevent visual glitches/flickers
- Scroll position adjustments

```jsx
function ScrollToTop() {
  const ref = useRef();

  useLayoutEffect(() => {
    ref.current.scrollTop = 0;
  }, []);

  return <div ref={ref}>Content</div>;
}
```

**Rule:** Prefer `useEffect` → only use `useLayoutEffect` if you see flickers

---


---

### 9️⃣  useSearchParams

Provides an interface for reading and modifying the query string (the part of the URL after the ?).

```
import React from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import "./styles.css";

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const favoriteFruit = searchParams.get("fruit");
  return (
    <div className="App">
      <h1>Favorite fruit</h1>
      {favoriteFruit ? (
        <p>
          Your favorite fruit is <b>{favoriteFruit}</b>
        </p>
      ) : (
        <i>No favorite fruit selected yet.</i>
      )}

      {["🍒", "🍑", "🍎", "🍌"].map((fruit) => {
        return (
          <p key={fruit}>
            <label htmlFor={`id_${fruit}`}>{fruit}</label>
            <input
              type="radio"
              value={fruit}
              checked={favoriteFruit === fruit}
              onChange={(event) => {
                setSearchParams(
                  createSearchParams({ fruit: event.target.value })
                );
              }}
            />
          </p>
        );
      })}
    </div>
  );
}

```



### 9️⃣ Custom Hooks

Encapsulate reusable logic.

```jsx
// useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setData(await res.json());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

// Usage
function App() {
  const { data, loading, error } = useFetch('/api/posts');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

---

### 🔟 useDebounce (Custom Hook)

Delay API calls until user stops typing.

```jsx
// useDebounce.js
import { useState, useEffect } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Usage
function SearchBox() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (debouncedQuery) {
      // API call here
      console.log("Searching:", debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

## ⚡ Performance Optimization

### 1️⃣ Prevent Unnecessary Re-renders

**Techniques:**
- `React.memo` (for components)
- `useMemo` (for values)
- `useCallback` (for functions)

---

### 2️⃣ Code Splitting & Lazy Loading

```jsx
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => 
  import('./HeavyComponent')
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

### 3️⃣ Virtualization

Only render visible items in long lists.

**Library:** `react-window` or `react-virtualized`

---

### 4️⃣ Debouncing & Throttling

**Debouncing:** Wait until user stops action
```
Think: "Wait 500ms after user stops typing"
```

**Throttling:** Limit function calls per time period
```
Think: "Only run once per second, ignore extra calls"
```

---

### 5️⃣ Use Form Libraries

For complex forms, use `react-hook-form` or `formik`.

**Benefits:**
- Better performance
- Built-in validation
- Less boilerplate

---

### 6️⃣ Avoid Inline Objects/Arrays

❌ **Bad:**
```jsx
<Component style={{ margin: 10 }} />
// Creates new object on every render
```

✅ **Good:**
```jsx
const style = { margin: 10 };
<Component style={style} />
```

---

### 7️⃣ Optimize Context

Split contexts to avoid unnecessary re-renders:

```jsx
// ❌ Bad - one big context
<AppContext.Provider value={{ user, theme, settings }}>

// ✅ Good - separate contexts
<UserContext.Provider value={user}>
  <ThemeContext.Provider value={theme}>
    <SettingsContext.Provider value={settings}>
```

---

## 🏗️ React Architecture

### 1️⃣ Virtual DOM & Reconciliation

**Process:**
1. State/props change
2. React creates new Virtual DOM tree
3. Compares (diffs) with previous Virtual DOM
4. Calculates minimal changes
5. Updates only changed parts in real DOM

**Result:** Fast, efficient updates

---

### 2️⃣ Diffing Algorithm

**Rules:**

**Different Root = Replace Entire Tree**
```jsx
// Before
<div><UserCard /></div>

// After
<p><ProfileCard /></p>
// → React destroys old tree, builds new one
```

**Same Type = Update Attributes**
```jsx
// Before
<div className="blue" />

// After
<div className="red" />
// → React updates only className
```

**Lists Need Keys**
```jsx
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}
```

---

### 3️⃣ Why Not to Use Index as Key

❌ **Problems:**
- Causes bugs when list order changes
- Wrong DOM elements get reused
- Input values get mixed up
- Unnecessary re-renders

✅ **When it's okay:**
- List never changes order
- No additions/deletions
- Static list

---

### 4️⃣ React Fiber Architecture

Fiber enables **interruptible rendering**.

**How it works:**

1. **Two Trees:**
   - Current tree (on screen)
   - Work-in-progress tree (being built)

2. **Two Phases:**
   - **Render Phase:** Calculate changes (can pause)
   - **Commit Phase:** Apply to DOM (fast, cannot pause)

3. **Time Slicing:**
   - Browser needs 16ms per frame (60fps)
   - React works for ~5ms
   - Pauses to let browser handle animations/input
   - Resumes in next frame

**Example:**
```
User types "a" in search box with 500 items:

Old React (Before Fiber):
→ UI freezes for 152ms
→ User sees nothing until complete

New React (With Fiber):
→ Frame 1: Show "a" immediately (16ms)
→ Frames 2-10: Filter in background
→ Frame 11: Show results
→ UI never freezes!
```

**Priority Updates:**
```jsx
import { startTransition } from 'react';

// High priority (immediate)
setInputValue(value);

// Low priority (can be interrupted)
startTransition(() => {
  setFilteredList(filtered);
});
```

---

### 5️⃣ Error Boundaries

Catch JavaScript errors in component tree.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

---

### 6️⃣ Race Conditions

Occurs when multiple async operations compete.

**Problem:**
```jsx
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`/api/data/${id}`);
    const data = await response.json();
    setData(data);
  };
  fetchData();
}, [id]);
// If 'id' changes quickly, multiple fetches race
```

**Solution:**
```jsx
useEffect(() => {
  let cancelled = false;
  
  const fetchData = async () => {
    const response = await fetch(`/api/data/${id}`);
    const data = await response.json();
    if (!cancelled) {
      setData(data);
    }
  };
  
  fetchData();
  
  return () => {
    cancelled = true;
  };
}, [id]);
```

---

## 🗺️ React Router

### 1️⃣ What is React Router DOM?

Library for navigation and routing in React apps.

---

### 2️⃣ Main Components

- `BrowserRouter` - Foundation (uses HTML5 history)
- `Route` - Renders component for path
- `Link` - Navigate without page reload
- `Switch` - Renders first matching route
- `Redirect` - Redirect to another route

---

### 3️⃣ How is it Different?

**React Router:**
- Only history object changes
- No HTTP request
- No full page reload

**Traditional Routing:**
- HTTP request to server
- Server sends new page
- Full page reload

---

### 4️⃣ useHistory Hook

Programmatic navigation.

```jsx
import { useHistory } from 'react-router-dom';

function MyComponent() {
  const history = useHistory();
  
  const goToHome = () => {
    history.push('/home');
  };
  
  return <button onClick={goToHome}>Go Home</button>;
}
```

---

### 5️⃣ exact Prop

Ensures exact path match.

```jsx
// Without exact - matches /about AND /about/team
<Route path="/about" component={About} />

// With exact - only matches /about
<Route exact path="/about" component={About} />
```

---

### 6️⃣ Route Parameters

```jsx
// Define route
<Route path="/user/:id" component={User} />

// Access in component
import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

---

### 7️⃣ Nested Routes

```jsx
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Route path="/dashboard/settings" component={Settings} />
      <Route path="/dashboard/profile" component={Profile} />
    </div>
  );
}
```

---

### 8️⃣ 404 Not Found

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route component={NotFound} />
</Switch>
```

---

## 🗄️ State Management

### Redux vs Context vs Zustand vs Recoil

| Use Case | Recommended |
|----------|-------------|
| Small app, basic state | **Context API** |
| Medium app, low boilerplate | **Zustand** |
| Large app, team environment | **Redux Toolkit** |
| Complex reactive data | **Recoil** |

---

### Redux Toolkit vs Zustand

| Feature | Redux Toolkit | Zustand |
|---------|--------------|---------|
| Architecture | Centralized, strict | Flexible, simple |
| Boilerplate | Moderate | Minimal |
| DevTools | Rich | Basic |
| Async logic | Built-in | Manual |
| Team workflows | Standardized | Freedom |
| Scalability | Excellent for large apps | Good for medium |
| Learning curve | Moderate | Easy |

---

## 🚀 Advanced Concepts

### React 18 Features

**1. Concurrent Rendering (createRoot)**
```jsx
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

**2. Automatic Batching**
```jsx
// React 17: Two renders
// React 18: One render (batched)
setTimeout(() => {
  setCount(c => c + 1);
  setText('Updated');
}, 1000);
```

**3. Transitions API**
```jsx
import { useTransition } from 'react';

function SearchBox() {
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    startTransition(() => {
      // Low priority update
      setList(generateHugeList(e.target.value));
    });
  };

  return (
    <>
      <input onChange={handleChange} />
      {isPending && <Spinner />}
      <List items={list} />
    </>
  );
}
```

**4. useDeferredValue**
```jsx
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  // UI stays responsive while list updates
  const results = useMemo(
    () => filterHugeList(deferredQuery),
    [deferredQuery]
  );
  
  return <List items={results} />;
}
```

**5. useId**
```jsx
function FormField() {
  const id = useId();
  
  return (
    <>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </>
  );
}
```

**6. Suspense for Data Fetching**
```jsx
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile />
    </Suspense>
  );
}
```

---

### React 19 Features

**1. use() API**
```jsx
import { use } from 'react';

function UserInfo() {
  const user = use(fetchUser()); // Use Promise directly
  return <h1>Hello, {user.name}</h1>;
}
```

**2. Server Actions**
```jsx
"use client";
import { useActionState } from 'react';

async function saveData(_, formData) {
  const name = formData.get('name');
  return `Saved: ${name}`;
}

function Form() {
  const [message, formAction] = useActionState(saveData, null);
  
  return (
    <form action={formAction}>
      <input name="name" />
      <button>Save</button>
      <p>{message}</p>
    </form>
  );
}
```

**3. No More forwardRef**
```jsx
// React 19
function Input({ placeholder }, ref) {
  return <input ref={ref} placeholder={placeholder} />;
}

// Usage
<Input ref={inputRef} placeholder="Type..." />
```

**4. Resource Preloading**
```jsx
import { preload, preinit } from 'react-dom';

preload('/api/data.json', { as: 'fetch' });
preinit('/styles.css', { as: 'style' });
```

---

### React Server Components (RSC)

**What are they?**
- Components that render ONLY on server
- Never included in client JS bundle
- Can access backend resources directly (DB, files)

**RSC vs SSR vs SSG**

| Feature | RSC | SSR | SSG |
|---------|-----|-----|-----|
| Render location | Server only | Server + client | Build time |
| Client JS | ❌ Not included | ✅ Included | ✅ Included |
| Data fetching | Direct DB access | On each request | At build time |
| Use case | Dynamic + minimal JS | Fresh data | Static content |

**Next.js Implementation:**
```jsx
// All components are RSC by default

// Make it a Client Component
'use client'
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>
    {count}
  </button>;
}
```

---

### Hydration in SSR

**What is it?**
Server sends HTML → React "hydrates" it (attaches event listeners)

**Hydration Mismatch:**
When server HTML ≠ client-rendered HTML

**Problems:**
- React replaces DOM nodes
- Flickering UI
- Lost state

**Solution:**
```jsx
function BrowserComponent() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return <div>{window.location.href}</div>;
}
```

---

## ⚛️ React vs 🅰️ Angular

### Quick Comparison

| Aspect | React | Angular |
|--------|-------|---------|
| Type | Library | Framework |
| Maintained by | Meta | Google |
| Language | JavaScript (JSX) | TypeScript (required) |
| Learning curve | Easy | Steep |
| Bundle size | ~170 KB | ~500 KB |
| Job market | 2-3× more jobs | Enterprise-heavy |
| Mobile | React Native (native) | Ionic (hybrid) |
| Philosophy | Bring your own tools | Batteries included |

---

### When to Choose What?

**Choose React:**
- Startups, fast-moving projects
- Want flexibility
- Easier learning curve
- More job opportunities

**Choose Angular:**
- Enterprise applications
- Need strict structure
- Type safety required
- Team already knows TypeScript

---

### Next.js vs Angular

| Feature | Next.js | Angular |
|---------|---------|---------|
| Routing | File-based (simple) | Config-based |
| SSR | Built-in | Angular Universal |
| Full-stack | ✅ Yes (API routes) | ❌ Frontend only |
| Server Components | ✅ Revolutionary | ❌ Not supported |
| Boilerplate | Minimal | Verbose |

---

## 🎯 Common Interview Questions

### Q: Optimize a list with 1000+ items?

**Solutions:**
1. **Virtualization** (react-window)
2. **Pagination** or Infinite scroll
3. **Debounce** search/filter
4. **Memoization** (React.memo)
5. **Proper keys**

---

### Q: Managing complex form state (15+ fields)?

**Best option:** `react-hook-form`

**Why?**
- Better performance
- Less re-renders
- Built-in validation
- Less code

---

### Q: Implement debounced search?

See [useDebounce custom hook](#🔟-usedebounce-custom-hook) above.

---

### Q: What are common mistakes?

1. Using index as key
2. Mutating state directly
3. Not cleaning up useEffect
4. Prop drilling instead of Context
5. Not memoizing expensive calculations
6. Inline objects/functions in render
7. Too many useState (use useReducer)
8. Not handling loading/error states

---

## 📝 Quick Reference

### Debugging Tools

**debugger statement:**
```jsx
function MyComponent() {
  debugger; // Pauses execution
  return <div>Test</div>;
}
```

**React DevTools:**
- Components tab (inspect props/state)
- Profiler tab (performance)

---

### Static vs Dynamic Imports

**Static:**
```jsx
import Component from './Component';
// Loaded at compile time
```

**Dynamic:**
```jsx
const Component = lazy(() => import('./Component'));
// Loaded at runtime (lazy loading)
```

---

## 🎓 Summary

**Key Takeaways:**

1. **React Basics:** Components, JSX, Virtual DOM
2. **Hooks:** useState, useEffect, useRef, useMemo, useCallback
3. **Performance:** Memoization, lazy loading, virtualization
4. **Architecture:** Fiber, reconciliation, error boundaries
5. **Routing:** React Router for navigation
6. **State:** Context, Redux, Zustand (choose wisely)
7. **Advanced:** Server Components, Suspense, Concurrent Rendering

**Best Practices:**

- Keep components small and focused
- Use proper keys in lists
- Memoize expensive operations
- Clean up side effects
- Handle errors gracefully
- Optimize for production
- Write clean, readable code

---

**Good luck with your interview! 🚀**
