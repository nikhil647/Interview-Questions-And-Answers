
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

Diffing Algorithm

React performs Reconciliation using its Diffing Algorithm to efficiently update the DOM.
To efficiently determine what changed between the two trees, React follows these heuristics:

Different Root Element = Replace Entire Subtree
If the root element type changes (e.g., <div> → <p> or <UserCard> → <ProfileCard>),
React destroys the old tree and builds a new one.

Same Type = Compare Attributes and Children

If the root element type is the same, React:
Keeps the existing DOM node.
Updates only changed attributes/props.
Recursively diffs the child elements.

// Before
<div className="blue" />

// After
<div className="red" />
✅ React updates only the className — no need to replace the element.

Lists and Keys
When rendering lists (like <li> or <tr>), React needs to track elements between renders to understand:
Which items were added
Which were removed
Which stayed but moved

React does this using the key prop.
```

**⚠️ Why Using Index as a Key Is Bad**
```
React uses keys to identify elements between renders.
If you use the array index as a key, problems occur when the list changes order, adds, or removes items.

React may reuse the wrong DOM elements.
It can cause visual glitches, wrong input values, or unexpected component re-renders.

When It’s (Mostly) Okay
If your list:
Never changes order
Has no additions or deletions
```

**React Fiber Architecture**
```
Fiber is React's reconciliation engine that enables interruptible rendering.

Before Fiber, if you had a large update, React would block the main thread 
until complete, causing UI freezes.

Fiber solves this by:

1. Maintaining two fiber trees (linked lists) - one showing what's currently 
   on screen, and one where updates are being built

2. Using a two-phase process:
   - Render phase: React walks through the work-in-progress tree, comparing 
     old and new props/state, and marks which nodes need updates (like 
     "UPDATE", "DELETE", "INSERT"). This phase can be paused between nodes.
   
   - Commit phase: React applies all the marked changes to the actual DOM, 
     runs effects, and swaps the work-in-progress tree to become the current 
     tree. This is fast (~1-3ms) and cannot be paused.

3. Working in small time chunks. The browser needs 16ms per frame for smooth 
   60fps. React works for ~5ms, then pauses to let the browser handle 
   animations and user input, resuming in the next frame.

You can mark updates as low-priority using `startTransition`. High-priority 
updates (like typing) commit immediately, while low-priority ones (like 
filtering a large list) process gradually across frames.

Result: Users see important updates instantly without UI freezing.
```
```
Example: Search with 500-item Filter
Old React (Before Fiber):

User types "a"
  ↓
React processes everything synchronously:
  - Update input (1ms)
  - Show spinner (1ms)
  - Filter all 500 items (150ms)
  ↓
Update DOM with all changes
  ↓
Total: ~152ms of frozen UI
User sees nothing until everything completes


New React (With Fiber + startTransition):

User types "a"
  ↓
Frame 1 (16ms):
  Render Phase:
    - Input (high priority, 1ms)
    - Spinner (high priority, 1ms)
    - Start filtering items (low priority, 12ms) → filters ~50 items, then PAUSE
  Commit Phase:
    - Input shows "a", spinner appears (2ms)
  User sees response immediately!
  
Frame 2-10 (next 144ms):
  Render: Continue filtering in chunks (~50 items per frame)
  Pauses between frames for animations
  Spinner keeps animating smoothly
  
Frame 11:
  Render: Finish last items
  Commit: Display filtered results (50 items)
  
Total: ~160ms, but user saw response in 16ms
UI stayed responsive throughout
```
