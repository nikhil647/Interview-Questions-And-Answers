Here are clean, structured notes in **Markdown format** as requested:

---

# 🧪 Unit Testing & Integration Testing

## 1. Unit Testing

* Tests **individual pieces of code in isolation**.
* Scope is small — a *function*, *component*, or *class*.
* Mock external dependencies like API calls, DB, timers, or services.
* Fast to run → gives quick feedback.
* Ideal for testing pure logic.
* Example assertions:

  * A function returns expected output.
  * A component renders with given props.
  * A reducer updates state correctly.

> Think: **Does this specific unit behave correctly on its own?**

---

## 2. Integration Testing

* Tests **how multiple units work together**.
* Covers interactions between components and services.
* Less isolation → fewer mocks compared to unit tests.
* Validates real-world workflow of modules.
* Slightly slower than unit tests.

Examples:

* Component + Redux store.
* Component + API call (mocked backend or real mocked request).
* Form → validation → backend request handling.

> Think: **Do combined pieces of the application work correctly together?**

---

# 🔹 Component Testing

* Focused on testing UI components (often falls under unit or integration depending on scope).
* Tests rendering, props, events, styles, and DOM behaviour.
* Usually uses:

  * **React Testing Library**
  * **Jest & Jest DOM**
* Goal: Test a component **as the user would experience it**, not internal details.

Example checks:

* Does a button render with correct text?
* Does it trigger a function when clicked?
* Does UI update when state changes?

---

# 🧰 Jest & Jest DOM

### Jest

* JavaScript testing framework by Meta.
* Used for unit, integration, and snapshot tests.
* Built-in test runner, assertions, mocks.

Key features:

* `test()`, `describe()`, `expect()`
* Mock functions (`jest.fn()`)
* Mocking modules (`jest.mock()`)

Example:

```js
test("sum adds numbers", () => {
  expect(sum(2, 3)).toBe(5);
});
```

### Jest DOM

* Extends Jest with DOM-specific assertions.
* Used with React Testing Library for UI tests.

Examples:

```js
expect(button).toBeInTheDocument();
expect(element).toHaveTextContent("Login");
expect(input).toHaveValue("Nikhil");
```

---

# 📚 Testing Library / React Testing Library (RTL)

* Library for testing React components.
* Focus on **testing UI behavior, not implementation details**.
* Encourages interaction like a real user:

  * `getByText`
  * `findByRole`
  * `fireEvent` / `userEvent`

Example:

```js
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

test("shows error on invalid submit", () => {
  render(<Login />);
  fireEvent.click(screen.getByText("Submit"));
  expect(screen.getByText("Invalid credentials")).toBeVisible();
});
```

**Core philosophy:**

> Test what the user sees or does, not internals like state or methods.

---

Want me to expand into **E2E Testing**, add **examples**, or generate a **cheat sheet PDF**? 😊
