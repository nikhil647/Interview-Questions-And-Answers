# React Js inteview Preparation  

**1) What is React Js?**
```
React.js, commonly referred to as React, is an open-source JavaScript library for building user interfaces or UI components. It is maintained by (Meta) Facebook and a community of individual developers and companies.
```
***
**2) Features of React Js?**
```
JSX - Java script XML, we can write HTML like structure  which is basically JS.

Component Structure - Split the user interface into independent reusable part. it can process separately.

Virtual Dom - The Virtual DOM (VDOM) is a concept used by React to improve the performance.

Real DOM: When you update the DOM directly, the browser has to re-render the entire DOM tree, which can be slow and inefficient.

Virtual DOM:
-When a React component is rendered, it creates a virtual representation of the DOM called the Virtual DOM tree.
-When the state of a React component changes.It is compared with the previous one using a process called "diffing.".
-Once the differences are identified, React determines the most efficient way to update the real DOM to match the new Virtual DOM tree.
-Finally, React updates the real DOM based on the calculated differences, ensuring that the user interface reflects the updated state of the application.
```
*** Event Bubbling - Events Travel Up***
```
  When an event fires on an element, it bubbles up through all its ancestors.
```
***

**3) What is Event ?**
```
An event is an action that a user or system may trigger such as pressing a key or mouse click.

React event are named using camelCase rather than lowercase in HTML.
<Button onPress={callRef} />
```
***

**Race condition**
```
A race condition in React occurs when multiple asynchronous operations, such as data fetching or state updates, are initiated and their completion order is not guaranteed.

useEffect(() => {
  const fetchData = async () => {
  const response = await fetch(/api/data/${id});
  const data = await response.json(); setData(data); };
  fetchData();
}, [id]); // If 'id' changes quickly, multiple fetches can race.
```
**4)Synthetic Event**
```
Combines the response of diffrent browser native events into 1 API. in other words
consisten regardless of the browser is it running eg preventDeafult is synthetic event.
```
***

**5)Need of keys in react**
```
It helps to which component needs to rerender instead of rerendering all the components. 
and it must be uniqe.
```
***
**6)Why to function based components ?**
```
-we can write cleaner code.
-1 hook replace multiple life cycle method. useEffect -didMount, didUpdate, willUnmount
-compared to classbased they are lightweight (babel transpilation of classbased components are messy compared to function based)
```
***

## Throttling
**Definition:**  
Throttling limits how often a function can run within a specific time period.

**Example (Machine Gun Analogy):**  
Imagine a **machine gun** that can shoot bullets continuously if you keep pressing the trigger.  
But throttling acts like a **cooldown mechanism** — even if you keep pressing the trigger,  
it allows **only one bullet per second**, ignoring extra presses until time resets.

**7)React Lifecycle Methods ?**
| Mounting | Updating| Unmounting |
| :---: | :---: | :---: |
| Constructor | shouldComponentUpdate | componentWillUnmount |
| render | ComponentDidUpdate | |
| getDerivedStateFromProps | componentWillReceiveProps | |
| compoenentDidMount | | |
***

## Debouncing (Definition + Simple Explanation)

**Definition:**  
Debouncing is a technique that **delays** the execution of a function until a certain amount of **time has passed without any new event**.

**Simple Explanation:**  
Think of it like saying — “Wait until the user stops typing for 500 ms, then run the code.”

**8)React Fragment ?**
```
 look like <> </> empty tags or another syntax <React.Fragment>
 Advantage we get is we can wrap multiple child element as 1 element without creating extra div or span or p on dom.
```
**9) Higher Order Component**
```
-take compoent as argument
-used for code reusability eg authentication
```
***

**10) How react router dom is diffrent than convetional routing ?**
```
Only history object changes and we move to diffrent page but in normal routing http req is send to server & ask for new pages
```
***

**Event delegation**
```
Instead of attaching listeners to many elements, attach ONE listener to their parent.
React automatically uses event delegation under the hood!

function TodoList({ todos }) {
  const handleDelete = (id) => {
    console.log(`Delete ${id}`);
  };
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
          {/* React doesn't attach listener here! */}
        </li>
      ))}
    </ul>
  );
}
```

**11)Pure Component**
 - The main difference between a regular component and a pure component lies in how they handle shouldComponentUpdate().

This method performs a shallow comparison of the component's current props and state with the next props and state. 

If there are no differences, the component doesn't re-render, thus optimizing performance by preventing unnecessary rendering cycles.

```
//Class Based
import React, { PureComponent } from 'react';
class MyPureComponent extends PureComponent {
  render() {
    return <div>{this.props.text}</div>;
  }
}

//Function Based
const MyComponent = React.memo(function MyComponent(props) {
  /* render your component based on props */
});

export default MyComponent;
```
***

***
What can be done for react optimisation?
```
1) Prevent Unnecessary Re-renders 

use memo, useMemo,useCallback

2) Code Splitting & Lazy Loading

3) Virtualization - Only renders visible items (package- react-window)

4) use Debouncing & Throttling wherever needed

5) if form is complex always prefer form library like react-hooks-form

6) Use Keys Properly

7) Avoid Inline Objects/Arrays (react style)
```
***

**12) Hooks in React ?** 
```
useRef - this hook mainly use for 3 purpose
        1) Accessing DOM element
        2) Keep track of prev element
        3) to track application render

Usage: 
    import React, { useState, useEffect, useRef } from "react";

function UseRefExample() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);      // 1️⃣ Access DOM
  const prevCount = useRef(0);        // 2️⃣ Track previous value
  const renderCount = useRef(0);      // 3️⃣ Count renders

  useEffect(() => {
    prevCount.current = count;        // store previous value
    renderCount.current += 1;         // count re-renders
  });

  const focusInput = () => {
    inputRef.current.focus();         // direct DOM access
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>useRef Example</h2>

      <input ref={inputRef} placeholder="Click button to focus me" />

      <div style={{ marginTop: "10px" }}>
        <p>Count: {count}</p>
        <p>Previous Count: {prevCount.current}</p>
        <p>Render Count: {renderCount.current}</p>

        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={focusInput} style={{ marginLeft: "10px" }}>
          Focus Input
        </button>
      </div>
    </div>
  );
}

export default UseRefExample;

```

```
useState - It allows you to add state management to functional components in React

import React, { useState } from 'react';
const ToggleButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div>
      {isVisible && <button>Click me!</button>}
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
    </div>
  );
};
export default ToggleButton;
```
***

```
useEffect -  Side effects can include data fetching, subscriptions, manually changing the DOM, and more. It is a replacement for lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount in class components.

import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(result => setData(result));
    return () => {/* Cleanup code */};
  }, []);
  return <div>{data ? <p>Data: {data}</p> : <p>Loading...</p>}</div>;
}
export default MyComponent;
```

```
useMemo - hook in React is used for memoization.  It memoizes the result of a function and returns the memoized value

const MyComponent = ({ propA, propB }) => {
  const memoizedValue = useMemo(() => {
    return computeExpensiveValue(propA, propB);
  }, [propA, propB]); // Dependency array (list of dependencies)

  return <div>{memoizedValue}</div>;
};
```

```
useCallback - The useCallback hook in React is used to memoize functions, similar to useMemo but specifically for functions. It is particularly useful when passing callbacks to child components, as it ensures that the callbacks do not change on every re-render, preventing unnecessary re-renders of child components

import React, { useState, useCallback } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  // useCallback memoizes the increment function
  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]); // Dependency array (list of dependencies)

  return (
    <div>
      <h1>Count: {count}</h1>
      {/* Pass the memoized function to a child component */}
      <ChildComponent onIncrement={increment} />
    </div>
  );
};

const ChildComponent = ({ onIncrement }) => {
  // Child component uses the memoized callback function
  return <button onClick={onIncrement}>Increment</button>;
};

export default MyComponent;
```
```
useReducer - The useReducer hook in React is a powerful alternative to useState for managing complex state logic in functional components.

 It is especially useful when state transitions depend on the previous state, or when the next state is determined by multiple actions.

 If we smartly use useContext with useReducer we can replicate redux functinality.

eg.
import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      // Check if the count is already 0 before decrementing
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
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};

export default Counter;
```

**useLayoutEffect**
```
we should use useLayoutEffect only DOM mutations that must happen before paint.
useLayoutEffect BLOCKS the browser - if your code is slow, UI freezes


function ScrollToTop() {
  const ref = useRef();

  useLayoutEffect(() => {
    // Scroll MUST happen before user sees content
    ref.current.scrollTop = 0;
  }, []);

  return <div ref={ref}>Content</div>;
}

always prefer useEffect → only use useLayoutEffect if you see visual glitches/flickers that need fixing
```

**13) React context's API ?** <br>
It is used to solve prop drilling problem.
```
import React, { createContext, useState, useContext } from 'react';

// Create a context with a default value
const ThemeContext = createContext('light');

// ThemeProvider component provides the theme to its children
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Use useContext hook to access the context value in components
const ThemedComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// Wrap your components in the ThemeProvider to provide the theme context
const App = () => {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );
};

```
***
**14)Create your own hook**
```
import "./styles.css";
import { useState } from "react";
import useFetch from "../useFetch";

export default function App() {
  const [string, setString] = useState("https://jsonplaceholder.typicode.com/posts");
  const { data, loader, error } = useFetch(string);
  if (error) {
    return <div> MT </div>;
  }
  return (
    <div className="App">
      <h1 onClick={() => setString("https://jsonplaceholder.typicode.com/todos")}>
        Hello CodeSandbox
      </h1>
      <h2 onClick={() => setString("https://jsonplaceholder.typicode.com/posts")}>
        Start editing to see some magic happen!
      </h2>
    </div>
  );
}


import { useState, useEffect } from 'react';
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => { // Define the async function
      setLoader(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        setData(await res.json());
      } catch (err) {
        setError(err);
      } finally {
        setLoader(false);
      }
    };
    
    fetchData(); // Call the async function immediately
    
    // Cleanup function (optional but good practice to prevent state update on unmounted component)
    // You could make this even more concise by removing the cleanup, but it's recommended!
    return () => {
      // Logic to cancel the fetch if using an AbortController
    };
  }, [url]);

  return { data, loader, error };
};

export default useFetch;
```
**15)Error Boundary**
```
Error boundaries are a feature in React that allows components to catch JavaScript errors anywhere in their component tree and log those errors, display a fallback UI, or prevent the application from crashing.

To create an error boundary component, you define a special method called componentDidCatch(error, info) in a class component.
```
***

# React Router Dom Questions
**16)What is React Router DOM?**
```
React Router DOM is a popular library for implementing navigation and routing functionality in React applications.
```
***

**17)What are the main components provided by React Router DOM?**
```
BrowserRouter: Provides the foundation for routing in your application using HTML5 history API.
Route: Renders a component based on the current location.
Link: Provides a declarative way to navigate to a different route.
Switch: Renders the first <Route> or <Redirect> that matches the current location.
Redirect: Redirects the user to another route.
```
***

**18)How does useHistory hook work in React Router DOM?**
```
useHistory is a hook provided by React Router DOM that returns the history object. You can use this hook to programmatically navigate your application to different routes.
```
***

**19)What is the purpose of the exact prop in the <Route> component?**
```
The exact prop ensures that the route is only matched if the path is an exact match. It prevents partial matching of routes.
```
***

**20)How can you pass parameters to routes in React Router DOM?**
```
You can pass parameters to routes using the :paramName syntax in the path of the <Route> component. These parameters can be accessed in the component using the useParams hook.
```
***

**21)What is the purpose of the withRouter higher-order component in React Router DOM?**
```
withRouter is a higher-order component that provides access to the history, location, and match props in components that are not directly rendered by a <Route>. It's useful when you need to access the routing-related props outside the matched components.
```
***

**22)Explain how nested routes work in React Router DOM**
```
Nested routes involve defining routes inside the components rendered by other routes. This allows for a hierarchical structure in your application where certain components are only visible when navigating to specific sub-routes
```
***

**23)How can you handle "404 Not Found" pages in React Router DOM?**
```
You can handle "404 Not Found" pages by placing a <Route> component with no path prop at the end of your <Switch> component. This route will match any location, serving as a fallback when no other routes are matched
```
***

**24) why to use key in listing **
```
 The key prop is a special attribute that helps React identify which items have changed, been added, or been removed from a list. It is important for performance and the correct behavior of component
```
***

** debugger  **
```
In JavaScript, the debugger statement is a powerful tool for debugging your code.
When the JavaScript interpreter encounters the debugger statement during the execution of your code, it automatically pauses the execution and launches any debugging functionality that is available.
 
```
** static and dynamic import **
```
Static imports are resolved and evaluated during the compile-time.
 static imports are typically used for importing dependencies.

Dynamic imports allow you to load modules asynchronously during runtime. This is particularly useful when you only need a module under certain conditions or when you want to lazy-load parts of your application.
```

# ⚛️ React vs 🅰️ Angular — Detailed Comparison

---

## 🌟 Common Benefits (Both React & Angular)

- Building **complex apps** is MUCH easier  
- Code stays **maintainable** as it grows  
- **Team collaboration** is standardized  
- Rich **ecosystem** of tools and libraries  

---

## 🧩 Core Difference

| Aspect | React | Angular |
|--------|--------|----------|
| Type | **Library** | **Framework** |
| Maintained by | Meta (Facebook) | Google |
| Philosophy | "Bring your own tools" | "Batteries included" |

---

## 📚 Learning Curve

### ⚛️ React
- Uses **JavaScript (JSX)** → basically **JS + HTML**
- ✅ Easier to learn
- ✅ Less setup & fewer concepts

### 🅰️ Angular
- ❌ Must learn **TypeScript**
- ❌ Must learn **RxJS** (Observables everywhere)
- ❌ Must understand Angular-specific concepts:
  - Decorators  
  - Dependency Injection  
  - Modules  
  - Directives  
  - Pipes  

---

## 💼 Job Market & Community

| Aspect | React | Angular |
|--------|--------|----------|
| Jobs | 🔥 2–3× more React jobs | ✅ Enterprise-heavy |
| Community | 🔥 Larger and faster-growing | ✅ Strong, stable base |
| Typical users | Startups, modern apps | Enterprises (banks, large orgs) |
| Used by | Facebook, Netflix, Airbnb, Uber | Google, Gmail, Forbes, PayPal |

---

## ⚡ Bundle Size & Performance (Hello World)

| Metric | React | Angular |
|---------|--------|----------|
| Bundle Size | ~170 KB | ~500+ KB |
| Performance | Fast & minimal | Larger, but optimized |
| Optimization Tools | External (Webpack, Vite, etc.) | Built-in (Tree-shaking, Lazy Loading) |

---

## 📝 TypeScript Support

| Aspect | React | Angular |
|--------|--------|----------|
| TypeScript | ✅ Optional | ✅ Required |
| Type Safety | ❌ Optional | ✅ Enforced |
| Learning Curve | Easier | Steeper (mandatory TS) |

---

## 📱 Mobile Development

| Aspect | React | Angular |
|--------|--------|----------|
| Framework | React Native | Ionic |
| Output | ✅ Truly native apps | ⚠️ Hybrid apps |
| Code Reuse | High (same JS/TS logic) | Medium |

---

## 🌐 Next.js vs Angular

| Aspect | Next.js (React Ecosystem) | Angular |
|--------|-----------------------------|----------|
| Type | React-based Framework | Full Framework |
| Routing | ✅ File-based (simple) | ⚠️ Configuration-based |
| SSR (Server-Side Rendering) | 🏆 Built-in and simple | ⚠️ Angular Universal (extra setup) |
| Full-Stack Capabilities | 🏆 Yes (API routes, DB access) | ❌ Frontend only |
| Server Components | ✅ Revolutionary — zero JS for static content | ❌ Not supported |
| Image Optimization | ✅ Built-in (automatic) | ⚠️ Requires `ng-optimized-image` |
| Boilerplate | ✅ Minimal | ⚠️ Verbose |

---

## 🏁 Summary

| Category | Winner |
|-----------|---------|
| Simplicity & Learning | **React** |
| Enterprise Features | **Angular** |
| Flexibility | **React** |
| Type Safety | **Angular** |
| Performance (small apps) | **React** |
| Large-scale apps | **Angular** |
| SSR / Full-stack | **Next.js (React)** |

---

## 

### 💡 Final Thought
> React is lightweight and flexible — perfect for fast-moving projects and startups.  
> Angular is structured and opinionated — ideal for large, enterprise-grade applications.



redux (redux toolkit) <br>
How to make performant react app ? <br>
react-hooks-form (ealpha) <br>
react query <br>
