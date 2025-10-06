
**What happens in the React reconciliation process (Virtual DOM & Diffing)**

```
Virtual DOM & Reconciliation

React uses a Virtual DOM (VDOM) — an in-memory lightweight copy of the actual DOM.
Direct manipulation of the real DOM is expensive, so React avoids it as much as possible.

When a component’s state or props change:

React creates a new Virtual DOM tree representing the updated UI.

It then compares (diffs) this new Virtual DOM with the previous Virtual DOM.

The differences (minimal set of changes) are calculated.

Finally, React updates only those changed parts in the real DOM.
This process is called Reconciliation.

💡 React batches multiple state updates together (especially in events or concurrent mode) to minimize re-rendering and DOM operations, improving performance.

Diffing Algorithm

To efficiently determine what changed between the two trees, React follows these heuristics:

Different Root Element = Replace Entire Subtree
If the root element type changes (e.g., <div> → <p> or <UserCard> → <ProfileCard>),
React destroys the old tree and builds a new one.

Same Type = Compare Attributes and Children
If the elements have the same type, React compares their props and recursively diffs their children.

Lists and Keys

When rendering lists (<li>, <tr>, etc.), React uses the key prop to track elements between renders.

Keys help React identify which items were added, removed, or moved.

Without unique keys, React may unnecessarily re-render or reorder items, hurting performance.
```
```
if you make 10 small updates:

for (let i = 0; i < 10; i++) {
  document.getElementById("count").innerText = i;
}
you’re forcing 10 DOM updates, even if only the final value matters.

In React (Virtual DOM)

React doesn’t touch the real DOM right away.

It updates its Virtual DOM (a JS object in memory).

Then React compares (diffs) the old and new Virtual DOMs.

Finally, it applies only the necessary minimal changes to the real DOM — and it often batches them together.

So, for those same 10 updates:

React only changes the DOM once, with the final result.
```
**React Fiber Architecture**
```
# React Fiber Architecture

## What is Fiber?

React Fiber is a complete rewrite of React's reconciliation algorithm (React 16+). It enables **incremental rendering** - splitting rendering work into chunks across multiple frames.

## The Problem It Solves

Before Fiber, React's reconciliation was synchronous and uninterruptible. Large updates would:
- Block the main thread
- Cause dropped frames and janky animations
- Make UI unresponsive

## How It Works

### Two Phases

**1. Render Phase (Interruptible)**
- Walks the Fiber tree
- Calculates what changed
- Can pause, abort, or restart

**2. Commit Phase (Synchronous)**
- Applies changes to DOM
- Runs lifecycle methods
- Cannot be interrupted

### Key Concepts

**Fiber Node**: A JavaScript object representing a unit of work. Contains:
- Component state/props
- Links to parent, child, sibling (linked list)
- Work priority

**Work Loop**: React checks time availability before processing each unit
```javascript
while (workInProgress && !shouldYield()) {
  workInProgress = performUnitOfWork(workInProgress);
}
```

**Prioritization**: Different updates have different priorities
- User input > Animation > Data fetching
- High-priority work interrupts low-priority work

## Features Enabled

- Concurrent rendering
- Suspense
- useTransition / useDeferredValue
- Automatic batching

## Interview Answer Template

"Fiber is React's reconciliation engine that breaks rendering into interruptible units of work. It uses a two-phase process: an interruptible render phase that calculates changes, and a synchronous commit phase that applies them. This enables priority-based scheduling where urgent updates can interrupt less important work, keeping the UI responsive."

```
