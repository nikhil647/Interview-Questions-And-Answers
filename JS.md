# JS inteview Preparation  

**1) What is JS?**
```
 Java Script is lightweight / Interpreted programming language with Object Oriented Capability
 that allow you to build interactivity into other static HTML.

 data types -->  undefined, null, boolean, string, Symbol, Number, Object
```
***

**2) Feature of JS**
```
Lightweight and Interpreted
integrated Network Centric
Open & Cross platform
```
***
**3)Scope**
```
Region of your program in which is is defined
Types - Local & Global
```
***

**Q) var, let & const**

![image](https://github.com/nikhil647/Interview-Questions-And-Answers/assets/15242726/bdaa0449-f7fc-4232-8f09-88a2356177d3)



**4)Some Built In Methods in JS**
```
charAt - used to get the character at a specific index within a string
string.charAt(index);
let text = "Hello World"
text.charAt(1);   // e 
```

```
forEach - The forEach() method is used to iterate over an array and execute a
provided function once for each array element. 
It does not create a new array; it simply executes a function for each element in the array.
array.forEach(function(currentValue, index, array) {
  // code to be executed for each element
});

currentValue: The current element being processed in the array.
index: The index of the current element being processed.
array: The array that forEach() is being applied to.
```
```
map
The map() method creates a new array by calling a provided function on every element in the calling array. 
It returns a new array where each element is the result of applying the provided function
to the original array's elements. 
Here's the syntax:
let newArray = array.map(function(currentValue, index, array) {
  // return element for newArray
});
```
```
indexOf - 
The indexOf() method in JavaScript is used to search for a specified element within an array or a string
array.indexOf(searchElement, startIndex);

let fruits = ['apple', 'banana', 'orange', 'grape'];
let index = fruits.indexOf('banana');
console.log(index); // Output: 1
```

```
length - It return the length of the string
var text = 'hello world'
console.log(text.length); // 11
```

```
shift - The shift() method removes the first element from an array and returns that removed element. 
It also updates the length property of the array.

Example:
let fruits = ['apple', 'banana', 'orange'];
let removedFruit = fruits.shift();
console.log(removedFruit); // Output: 'apple'
console.log(fruits); // Output: ['banana', 'orange']
```

```
unshift - The unshift() method adds one or more elements to the beginning of an array
and returns the new length of the array.

let fruits = ['banana', 'orange'];
let newLength = fruits.unshift('apple', 'grape');
console.log(newLength); // Output: 4
console.log(fruits); // Output: ['apple', 'grape', 'banana', 'orange']
```

```
pop
The pop() method removes the last element from an array and returns that removed element.
It also updates the length property of the array.

let fruits = ['apple', 'banana', 'orange'];
let removedFruit = fruits.pop();
console.log(removedFruit); // Output: 'orange'
console.log(fruits); // Output: ['apple', 'banana']
```

```
push
The push() method adds one or more elements to the end of an array and returns the new length of the array.

let fruits = ['apple', 'banana'];
let newLength = fruits.push('orange', 'grape');
console.log(newLength); // Output: 4
console.log(fruits);
```

```
reverse
The reverse() method reverses the elements of an array in place. The first element becomes the last,
and the last element becomes the first.

let numbers = [1, 2, 3, 4];
numbers.reverse();
console.log(numbers); // Output: [4, 3, 2, 1]
```
```
splice
The splice() method allows you to modify the contents of an array by removing, replacing,
or adding elements at a specific index.
let array = [1, 2, 3, 4, 5];
array.splice(2, 1, 'a', 'b'); // Replaces 1 element at index 2 with 'a' and 'b'
console.log(array); // Output: [1, 2, 'a', 'b', 4, 5]
```

```
typeof - type of operand
```

***5)Cookies***
```

Cookies are small text files that are stored on the user's computer by a website.
Cookies are sent as HTTP headers between the web server and the browser, and they are used for various purposes

Session Management: Cookies can store session information, allowing users to stay logged in as
they navigate between pages or if they revisit a website later.

Personalization: Websites can use cookies to remember user preferences, such as language settings,
themes, or other customizable options.

Tracking and Analytics: Cookies enable website owners to track user behavior, such as which pages were visited, 
how long users stayed on a site, and which links were clicked. This information is valuable for website analytics
and improving user experience.

Shopping Carts: In e-commerce websites, cookies can store items in a user's shopping cart, allowing users to continue shopping 
without losing the items they have already selected.

Authentication: Cookies can be used to authenticate users, allowing them to access secure areas of a website after logging in.

Types of Cookies:
Session Cookies: These cookies are temporary and are erased from the user's device when the web browser is closed. 
They are often used for session management and user authentication. 
(The expire attribute shows the date the cookie will expire.
If this is blank, the cookie will expire when the visitor quits the browser)

Persistent Cookies: Persistent cookies are stored on the user's device even after the browser is closed. 
They have an expiration date and remain valid until that date is reached unless manually deleted by the user.

Secure and HttpOnly Cookies: Secure cookies are transmitted over secure, encrypted connections (HTTPS), 
ensuring that the cookie data is not intercepted during transmission. HttpOnly cookies are not accessible via JavaScript, 
providing an additional layer of security against cross-site scripting (XSS) attacks.

Set and Get cookies by this.
document.cookie
function setCookie(name, value, expires) {
  const date = new Date();
  date.setTime(date.getTime() + expires * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
}
```
***
***6)== && === Operator***
```
== only Checks the value and also does type coercion before comparing
=== Chekcs the type and value
```
***

**7)null && undefined Operator**
```
undefined - declare but not assigned any value.
null - assigned value (represent no value)
```

**8)window & Document**
window and document are both objects in JavaScript.
```
Window Object:
The window object represents the browser window or a tab in a web browser.
It is serves as the global object for JavaScript in a web page.

window.location, window.localStorage / window.sessionStorage, window.console

```

```
Document Object:
The document object represents the web page or document displayed in the browser window.
It provides access to the structure and content of the document and allows manipulation of the
HTML elements and their attributes
```


***9)Ways in which JS code can be involved***
```
Internal - <script> console.log('Hello World'); </script>
External - <script src="https://www.w3schools.com/js/myScript.js"></script>
```
***

***10)Diffrence between local storage and session storage***
```
Local Storage 
```
Local Storage is a web storage solution in web browsers that allows websites to store key-value pairs locally
within a user's web browser. 
This data persists even after the browser is closed and can be accessed and manipulated via JavaScript

localStorage.setItem('key', 'value');
let storedValue = localStorage.getItem('key');
console.log(storedValue); // Output: 'value'

Removing Data from Local Storage:
localStorage.removeItem('key');

Storage Limit: Local Storage has a storage limit (typically around 5-10 MB per domain, although this can vary between browsers).

Data Type: Local Storage can only store strings. If you want to store complex objects, you'll need to serialize and deserialize them 
(for example, using JSON.stringify() and JSON.parse()).

Same-Origin Policy: Local Storage data is only accessible to pages from the same origin (same protocol, domain, and port.

***11)Session Storage***
```
Session Storage is another web storage solution in web browsers similar to Local Storage.
It allows websites to store key-value pairs, but the data is accessible only for the duration of the page session.
```

**12)Event Bubling**
```
 When the event occurs in an element inside another element & if both element have registered handle for that event.
  With bubbling the event is first captured by inner most element then propogates to outermost element
```
```
<div id='parent'>
  <button> <h2> Paren </h2> </button>
  <button id='child> <p> Child </p> </button>
</div>
```
***
**13)NaN** - Not a number
```
Always unequal to any number
teo NaN's are not equal.
let p = NaN, q = NaN
p == q // false
Number.isNan(p);
```
***
***14)JS Primitive / Object typed passed in function***
```
By Value --> Creation of Copy Orignal (boolean, String) new variable have it's own address.
By Refrence --> Creation alias of another that array/object will store.
```
***
***15)Type Coriesion***
```
Type coercion is the process of converting value from one type to another.
(such as string to number, object to boolean, and so on)

  true + false          // Result: 1 (true is converted to 1, false is converted to 0, 1 + 0 = 1)
  12 / "6"              // Result: 2 (String "6" is converted to a number, 12 / 6 = 2)
  "number" + 15 + 3     // Result: "number153" (Concatenation, not addition, because the first operand is a string)
  15 + 3 + "number"     // Result: "18number" (Addition first and then concatenation because both operands are numbers)
  [1] > null            // Result: true (Array is converted to a primitive (number), which is 1. Null is converted to 0.)
  "foo" + + "bar"       // Result: "fooNaN" (The first + is a unary plus, attempting to convert "bar"
                                    to a number, which results in NaN)
  'true' == true        // Result: false ('true' is a string, true is a boolean, different types are not equal)
  false == 'false'      // Result: false (false is a boolean, 'false' is a string, different types are not equal)
  null == ''            // Result: false, null == '' 
  !!"false" == !!"true" // Result: true (Both !! convert strings to true, so true == true)
  ['x'] == 'x'          // Result: true,  == operator converts non primitive to primitive by applying toString methods on it.
  [] + null + 1         // Result: "null1" (Empty array is converted to an empty string, then null is converted to "null",
                                    and finally 1 is concatenated as a string)
  [1,2,3] == [1,2,3]    // Result: false (Arrays are objects, and objects are compared by reference,
                                   these two arrays are different objects)
  {}+[]+{}+[1]          // Result: "0[object Object]1" (Explanation: {} is interpreted as an empty code block,
                                   then +[] evaluates to 0. +{} evaluates to [object Object].
                                   [1] is converted to the string "1". The concatenation works from left to right)
  !+[]+[]+![]           //  ??
  new Date(0) - 0       // Result: 0 (Subtracts 0 from the timestamp of the date object, effectively converting the date
                                  to a number)
  new Date(0) + 0       // Result: "Thu Jan 01 1970 02:00:00 GMT+0200 (Eastern European Standard Time)0"
                                   (Converts the date to a string and concatenates 0 as a string)
```
***
**16)Callback**
```
  Way of programming/ pattern when asynchronous function complete the execution we want some code should be executed.
  setTimeout(() => { console.log('After 1 sec') },1000);
```
***

**17)Strict mode in JS**
```
  Strict mode is a feature introduced in ECMAScript 5 (ES5) that allows developers to write safer JavaScript code
  by catching common coding bugs and preventing the use of problematic features

  To enable strict mode in JavaScript
  "use strict";

  Benefits of Strict Mode:
  Variable Declaration: In strict mode, variables must be declared with var, let, or const.
  Undeclared variables result in a ReferenceError.

  Assignment to Read-Only Properties: Assigning values to read-only properties (e.g., global objects, primitive values)
  results in a TypeError
  NaN = 5; // Throws a TypeError: Cannot assign to read-only property 'NaN' of object '#<Primitive>'

  Deleting Variables or Functions: Deleting variables, functions, or function parameters is not allowed in strict mode.
  "use strict";
  delete x; // Throws a SyntaxError in strict mode

  Octal Literal: Octal literals (e.g., 0123) are not allowed in strict mode.
  "use strict";
  var num = 0123; // Throws a SyntaxError in strict mode

  Eval and Arguments: eval and arguments cannot be used as variable names or function parameter names.
  "use strict";
  var eval = 10; // Throws a SyntaxError: Unexpected eval or arguments in strict mode
```
***
**18)this keyword in JS**
```
  this keyword refer to the current object.
```
```
const object = {
    name: 'hello',
    key: function () {
        console.log('Dear '+this.name);
    }
}
object.key()
```
*Bind Keyword*
```
We can explicitly pass context to any function.
```
```
// Example
const person = {
  firstName:"John",
  lastName: "Doe",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  }
}

const member = {
  firstName:"Hege",
  lastName: "Nilsen",
}
let fullName = person.fullName.bind(member);
fullName();
```
But the catch is we need to call returning function in order to execute.
and paramters we pass by comma seprated values (not a array)

*Call*
```
It is similar to bind just we don't need to explicitly call the function.
```
*Apply*
```
Very Similar to call only change is type of argument it takes []
```
***
*How to empty an array ?*
```
Pass = [] or array.length = 0 (make .length = 0)
```
***
**19)Delete Operator**
```
The delete operator removes a property from an object.
```
```
const Employee = {
  firstname: 'John',
  lastname: 'Doe',
};

console.log(Employee.firstname);
// Expected output: "John"

delete Employee.firstname;

console.log(Employee.firstname);
// Expected output: undefined
```
***
**20)IIFE** - Immediately Invoked Function Expression
```
An IIFE is function that runs as soon as it is defined
```
```
(() => {
    var a = 10, b= 20;
    console.log(a+b)
})();
console.log(c);

Making variables and functions private
Allowing public access to methods while retaining privacy for variables defined within the function.
To avoid polluting the global namespace: (earlier only var was the option).
To avoid conflict of variable names between libraries and programs:

```
***

**21)currying**
```
Currying is a functional programming technique in JavaScript where a function is transformed
into a sequence of functions, each taking a single argument.

// Currying the function manually
function curryAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

// Usage
let curriedAdd = curryAdd(1)(2)(3);
console.log(curriedAdd); // Output: 6
```

**22)Infinite currying**
```
  sum(a)(b)(c).....(n)();
  let sun = a => b => b ? sum(a+b) : a
```
***

**23)Higher Order Function**
```
 Function that opearates on antother function either by taking them as argument or by returning them
```
***
**24)Promise.all() and Promise.allSettled()**
```
are both methods in JavaScript used with Promises, but they behave differently in how they
handle the resolving  of multiple promises.

Promise.all() -->
Promise.all() is a method that takes an array of promises and returns a new promise that resolves to an array of the results
when all of the input promises are resolved. If any of the input promises are rejected, the Promise.all() method immediately
rejects with the reason of the first rejected promise.

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.reject("Error");

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // This line won't be executed due to the rejection of promise3
  })
  .catch(error => {
    console.error(error); // Output: Error
  });


Promise.allSettled()
Promise.allSettled() is a method that takes an array of promises and returns a new promise that resolves to an
array of objects representing the outcome of each promise, whether it is fulfilled or rejected.

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.reject("Error");

Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    console.log(results);
    // Output: [{ status: 'fulfilled', value: 1 }, { status: 'fulfilled', value: 2 }, { status: 'rejected', reason: 'Error' }]
  });
```
***
**25)Difference between normal function and arrow function ?**
```
They differ in several ways, including syntax, behavior of the this keyword, and handling of arguments.

1) Syntax
function add(a, b) {
    return a + b;
}
const add = (a, b) => a + b;

2) Binding of this:
Normal Function:

The value of this in normal functions is dynamically scoped, which means it is determined by how the function is called.
You can change the value of this using bind(), call(), or apply() methods.

Arrow Function:

Arrow functions lexically bind the this value, meaning they inherit this from the surrounding code.
You cannot change the value of this in arrow functions using bind(), call(), or apply().

3) The arguments object is a local variable available within all functions and contains an array-like
structure of all the arguments passed to the function.
function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
console.log(sum(1, 2, 3, 4)); // Output: 10

Arrow Function with Rest Parameter:
const sum = (...args) => {
    return args.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // Output: 10
```
***

**26)Reduce method**
```
The reduce() method in JavaScript is a powerful and versatile array method that is used to
reduce an array to a single value.
It executes a provided function for each element of the array (from left to right) and
accumulates the result into a single value.
Here's the basic syntax of the reduce() method.

array.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)

const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);

console.log(sum); // Output: 15
```
***
**27) Various Copy's**
```
1) Copying Refrence
const a = { x: 10 };
const b = a;

b.x = 1;
console.log(a.x); // return 1

2) Shallow Copy 
A shallow copy would create a new object and copy the top-level properties of the original object into the new object.
Shallow copies do not create copies of nested objects or arrays;

const a = { x: 0, y: { z: 0 }};
const b = {...a};

b.x = 1;
b.y.z = 1;
console.log('a.y.z',a) //return a.y.z { x: 0, y: { z: 1 } }

3) Deep Copy
A deep copy in JavaScript means creating a new object or array with new references
to all nested objects and arrays within the original object.

const a = { x: 0, y: { z: 0 }};
const b = JSON.parse(JSON.stringify(a));
b.x = 1;
b.y.z = 1;
console.log(a)
```
***
**28)Closure**
```
Function along with it's lexical scope bundle together that forms a closure

Closures allow a function to access and manipulate variables from an outer function,
even after the outer function has finished executing.

function x() {
  var a = 7;
  function y() {
    console.log(a);
  }
  return y;
}
let p = x();
p();
```
```
Usage: Currying, memoize, setTimeout
```
***
**29)Event Loop**
```
JS is synchronouse and single threaded language can do 1 thing at a time.

Event loop is secret behind JS asynchronouse programming.

JS execute all opearation on a single thread but using a smart data structure it gives
illuision of multithreading.

## Event Loop
- Monitors the Call Stack and Callback Queue.
- Manages the flow of the program, ensuring asynchronous operations are handled.

## Call Stack
- A stack data structure that keeps track of function calls in the program.
- Functions are pushed onto the stack when called and popped off when they complete execution.

### Call Stack Operations
1. Function Calls (Pushed onto the stack)
2. Function Execution (Popped off the stack)

## Callback Queue
- A queue data structure that holds callback functions from asynchronous operations.
- Callbacks are moved to the Call Stack when the Call Stack is empty and the Event Loop is active.

there are two main types of queues: the Callback Queue (Task Queue) and the Microtask Queue (Job Queue).

Callback Queue (Task Queue): Asynchronous operations, such as setTimeout callbacks or event handlers,
are placed in the Callback Queue when they are ready to be executed

Microtask Queue (Job Queue): Promises and certain APIs schedule their callbacks as microtasks. 
```

**29) Promise  **
```
Promise is an object representing the eventual completion (or failure) of an asynchronous operation.
Promises are used to handle asynchronous operations in a more comfortable
manner than using callbacks and events.

Promise states:

Pending: The initial state. The Promise is neither fulfilled nor rejected.
Fulfilled (Resolved): The operation completed successfully, and the Promise has a resulting value.
Rejected: The operation failed, and the Promise has a reason for the failure.

let myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation (e.g., fetching data from an API)
    let success = true; // Simulating a successful operation
    if (success) {
        resolve("Operation completed successfully!"); // Resolve the Promise with a value
    } else {
        reject("Operation failed!"); // Reject the Promise with a reason
    }
});

myPromise.then((successMessage) => {
    console.log(successMessage); // Output: Operation completed successfully!
}).catch((errorMessage) => {
    console.error(errorMessage); // Output: Operation failed!
});
```

** Variables declared with var are function-scoped **
```
var:

Variables declared with var are function-scoped. They are not block-scoped like let and const.
var variables are hoisted to the top of their function or global scope.
This means you can use a variable before it's declared, but it will have an initial value of undefined.

let: Variables declared with let are block-scoped. They exist only within the block, statement,
or expression on which they are defined.
let variables are also hoisted to the top of their block scope, but they are not initialized until the
actual declaration is encountered during the code execution.
Unlike var, redeclaring a variable with let in the same scope is not allowed.

const:
Variables declared with const are block-scoped, like let.
The key difference is that const variables cannot be reassigned after they are initialized. 

const variables must be initialized at the time of declaration.
```
** diff between re-rendering & mounting **
```
Mounting refers to the process of creating an instance of a React component and
inserting it into the DOM (Document Object Model).

Re-rendering occurs when a component's state or props change, and React needs to
update the UI to reflect those changes.
Re-rendering doesn't involve creating a new instance of the component;
```
###

** Lifting State Up **
```
 It refers to the practice of moving the state of a component higher up in the component hierarchy,
 making it a shared state that can be accessed by multiple components.
```
###

**  how to avoid re-rendering of child component in react **
```
Pure Components or React.memo:

Use React.memo to memoize functional components. This prevents a functional component
from re-rendering if its props have not changed.

Use of useCallback : This can be helpful when passing callbacks or values to child components,
preventing unnecessary re-renders.
```
###

** React Lifecycle **
```
Mounting: These methods are called when an instance of the component is being created and inserted into the DOM.

constructor():
Called when the component is initialized. You can set up state and bind event handlers here.

static getDerivedStateFromProps(props, state):
A static method that is called when the component is instantiated as well as when it receives new props.
It returns an object to update the state or null to indicate no state updates are necessary.

render():
The only required method in a class component. It returns the JSX that represents the component's UI.

componentDidMount():
Called after the component is inserted into the DOM. It is often used for data fetching and subscriptions.

Updating:
These methods are called when a component is being re-rendered as a result of changes to either its props or state.

static getDerivedStateFromProps(nextProps, nextState):
    Similar to the mounting phase, this method is also called during updates.

shouldComponentUpdate(nextProps, nextState):
   Returns a boolean that determines whether the component should re-render

render()
   Renders the updated UI.

getSnapshotBeforeUpdate(prevProps, prevState):
    Called right before the changes from the DOM are to be reflected in the UI.
    It returns a value that is passed to componentDidUpdate.

componentDidUpdate()
    Called after the component is re-rendered. It can be used for side effects,
    such as interacting with the DOM or performing network requests

Unmounting:-  This method is called when a component is being removed from the DOM.
```
###

# Q) JavaScript Iterators 
```
The iterator protocol defines how to produce a sequence of values from an object.

An object becomes an iterator when it implements a next() method.

The next() method must return an object with two properties:

value (the next value)
done (true or false)

function fruiteIterator(values) {
    let nextIndex = 0;
    return {
        next: function() {
            if ( nextIndex < values.length ) {
                return {
                    value: values[nextIndex++],
                    done: false
                }
            }
            else {
                return {
                    done: true
                }
            }
        }
    }
}

const fruits = ['Mango','Apple','Pine-Apple','KiWi'];
const fruitsIt = fruiteIterator(fruits);
console.log(fruitsIt.next().value);
console.log(fruitsIt.next().value);
console.log(fruitsIt.next().value);
console.log(fruitsIt.next().value);
console.log(fruitsIt.next().value);
```

# Genrator in JS
```
A generator in JS is a special function that can pause and resume execution using the yield keyword.

function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = myGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

# What is prototype & __proto__
```
The __proto__ is an object within every object that points out (references) the prototype
that has been set for that object.

var house = {color: "brown",
            size: "huge",
            expensive: true}

house.prototype // undefined
house.__proto__ // {constructor: ƒ, __defineGetter__: ƒ, __defineSet... (__pro

if you try to access proprty in object if it is not present there it will go and find in it's prototype.
if you assign prototype = another Object. it will find here and if not present in object then
it will look into that object's prototype.

Add property into prototype.
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
};

```

# 30)
async Attribute:
When you include the async attribute in a <script> tag, it tells the browser to download 
the script asynchronously while continuing to parse the HTML document.
Scripts with async attributes don't block the rendering of the page.

defer Attribute:
 it tells the browser to download the script asynchronously while continuing to parse the HTML document.
The script will be executed in order after the HTML parsing is complete.
right before the DOMContentLoaded event is fired.

Rendering Blocking:

Both async and defer: Scripts with these attributes do not block the rendering of the page.

![alt text](https://i.stack.imgur.com/pI1Wn.png)

// to do
Cookies what httpOnly flag, secure flag, sameSiteFlag?

# 31) What are the possible ways to create objects in JavaScript

Object literal syntax:

1) The object literal syntax (or object initializer), is a comma-separated set of
   name-value pairs wrapped in curly braces.

var object = {
     name: "Sudheer",
     age: 34
};

2) The simplest way to create an empty object is using the Object constructor. Currently this approach is not recommended.

var object = new Object();
The Object() is a built-in constructor function so "new" keyword is not required.

3) The create method of Object is used to create a new object by passing the
   specificied prototype object and properties as arguments.

const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
 // Inherited properties can be overwritten

me.printIntroduction();

4) Function constructor
create any function and apply the new operator to create object instances

function Person(name) {
  this.name = name;
  this.age = 21;
}
var object = new Person("Sudheer");

5) ES6 Class syntax
class Person {
  constructor(name) {
    this.name = name;
  }
}

var object = new Person("Sudheer");

# Math.random() - gives number between 0,1
```
Random number between 0 and N-1
Math.floor(Math.random() * N);

Math.floor(Math.random() * 10); // 0 to 9

Random number between min and max (inclusive)
Math.floor(Math.random() * (max - min + 1)) + min;
```

