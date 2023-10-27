# Testing Library

**Drawbacks of Manual testing: -**
```
1. Time consuming 
2. Complex repetitve task has risk of human error
3.  You may not get a chance to test all the features you should
```
***
**What is automation testing?**
```
Writing code to test the software code
Additional effort required when you develop a feature
```
**Advantages of automated testing:-**
```
1. Not time consuming 
2. Reliable consistent and not error prone
3. Easy to identify and fixture that break tests
4. Gives confidence when shipping software
```
***
**RTL vs Jest**
```
Jest:- 
Jest is javascript testing framework 
Jest is a test runner that finds tests ,runs the test , determine whether the tests passed or failed and reports it back in human readable manner

RTL :-
Javascript testing utility that provides virtual DOM for testing React components
RTL provides virtual DOM which we can use to interact with and verify the behaviour  if react component
 The core library is called DOM Testing library and RTL is simply a wrapper around this core library to test react application in an easier way. 
```

***
**Types of test:-**
```
1) Unit Tests
Focus is on texting the indivisual building blocks of an application such as a class or function or a component
Each unit and building block is tested in isolation independent of other units 
Run in very short amount of time and make it very easy to pinpoint failures
Relatively easier to write and maintain 

2) Integration tests
Focus is on testing a combination of units  and ensuring they work together
Takes longer than unit tests

3) E2E tests
Focus is on testing entire application flow and ensuring it works as designed from start to finish 
Involves in a real UI, real backend database, real services etc
Take the longest  as they cover the most amount of code 
Have a cost implication as you interact with real APIs that may charge based on number of requests

etc..
```
***

**Format of jest:-**
```
test(name, fn, timeout)

The first argument is the test name used to identify the test
The second argument is a function that contains the expectation to test 
The third argument is optional for specifying how long to wait before aborting the test. The default timeout value is 5 seconds.
```
***

**What is TDD(Test driven development)?**
```
Test driven development is a software development process where you write tests before writing the software code 
Once the tests have been written,  you then write the code to ensure the tests pass
3 phases in tdd:
1) create test that verify the functionality of a specific feature 
2) write software code that will run the tests successfully when re-executed 
3) Refactor the code for optimization while ensuring the tests continue to pass
It's also called red-green testing as all tests go from a red failed state to green passed state
```
***
**whta is Jest watch mode?**
```
Watch mode is an option that we can pass to jest asking to which files have changed since the last commit and execute test-related only those changed files.
An optimization designed to make your tests run fast regardless of how many tests you have.
```
***

**What is Grouping Tests in jest?**
```
describe(name, fn)
The first argument is the group name 
The second argument is the function that contains the the expectations to test
```

**File name conventions:-**
```
Files with .test.js or .test.tsx / .spec.js or .spec.tsx suffix
Files with .js or .tsx suffix in _tests_ folders.

The recommendation is to always put your tests next to the code they are testing so that relative imports are shorter.
```

**what is Code coverage?**
```
A metric that can help you understand how much of software  code is tested 
1) Statement coverage: - how many of the statements in the software have been executed
2) Branches coverage:- how many branches of control structures (if statements for instance) have been executed
3) Function coverage:- how many of the functions defined have been called 
4) Line coverage:- how many lines of source code have been tested

eg. command for it npm test -- --coverage --watchAll --collectCoverageFrom='src/components/**/*.{ts,tsx}'
collectCoverageFrom is optional it specifies which files should be covered while testing, since coverage command run through every file.
```
***

**what is Assertions?**
```
When writing tests, we often need to check that values meet certain conditions
Assertion decides if a test passes or fails.

expect(value).toBe(expectedValue)
The argument should be the value that your code produces 
Typically, you will use expect along with the "matcher" function  to assert something about a value
A matcher can optionally accept an argument which is the correct expected value
```
***

**While testing what should we test and what we shouldn't?**
```
Test component renders
Test component renders with props 
Test component renders in different states
Test component reacts to events
```
**What not to test?**
```
Implementation details
Third-party code 
Code that is not important from user point of view
```
***

**RTL Queries:-**
```
Every test we write generally involves the following basic steps
1) Render the component
2) Find an element rendered by component
3) Assert against the element found in step 2 which  will pass or fail test 

To render the component, we use  the render method from RTL
For assertion, we use expect  passing in a value and combine it with a matcher function from jest or jest-dom.

Queries are the methods that testing library provides to find the elements on page
To find a single element on page we have
getBy..
queryBy..
findBy

TO find multiple elements 
getAllBy..
queryAllby..
findAllBy..

above query combines with
The suffix can be one of Role, LabelText,  PlaceHolderText, Text, DisplayValue, AltText, Title and finally TestId
```
***
**Below are the actual queries**
```
1)getByRole
getByRole queries for elements with given role
By default many semantic elements in HTML have role
eg, the Button element has a button role, the anchor element has a link role, h1 to h6 has a heading role etc

If you are working with elements that do not have a default role or if you want  to specify different role, the role attribute  can be used to add desired role
To use anchor element as a button in the navbar, you can add role='button'

2)getByRole options
(name)
The accessible name is for simple cases equal to
1) the label of a form element
2) the text content of a button or
3) the value of aria-label attribute 

some options other than name
level, hidden, selected, checked, pressed

3)getByLabelText 
getByLabelText will search for the label that matches the given text , then find the element associated with that label. 

4)geByPlaceholdertext
it will search for all elements with a placeholder attribute and find one that matches the given text.

5)getByText
getByText will search for all elements that have text node with textContent matching the given text 
Typically you'd use this to find paragraph, span , or dic elements.

6)getByDisplayValue
It returns the input, textarea , or select element that has matching display value
we pass value prop to element then check it to be presesnt

7)getByAltText
It will return the element that has the given alt text 
This method only supports elements which accept an alt attribute like <img/>, input , area or custom HTML elements

8)getByTestid
It returns the element that has the matching data-testid attribute
```
***

**Priority order for queries:-**
```
Your test should resemble  how users interact with your code (component, page etc.) as much possible
1) getByRole
2) getByLabelText 
3) getByPlaceholderText 
4) getByText
5) getByDisplayValue
6)getByAltText
7) getByTitle
8) getByTestId
```
**Query Multiple Elements:-**
```
It helps to find multiple elements 
'getAllBy' returns an array of all matching nodes for a query and throws error if no elements match
```

***
**How Debugging works**
```
screen.debug() will give us dom tree snapshot which will help us to know what is rendered on the screen. 
```
Note: Testing playground is a great Chrome extension to get query suggestion for elements .
***

**User Interactions**
```
A click using a mouse or a key press using  a keyboard
software has to respond to such interactions 
Tests should ensure the interactions are handled as expected
```

**User-event library**
```
A companion library for testing library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser
It is a recommended way to test user interactions with RTL
```

**Pointer interactions**
```
Convenience APIs: 
click()
dblcCick()
tripleClick()
hover()
unHover()

Pointer APIs:
pointer({keys: '[MouseLeft]'})
pointer({keys: '[MouseLeft][MouseRight]'})
pointer('[MouseLeft][MouseRight]')
pointer('[MouseLeft>]')
pointer('[/MouseLeft]')

Recommended to use Convenience Apis as they easy to read and write.
```

**Keyboard interaction**
```
Utility Api:
type()
clear()
selectOptions()
deSelectOptions()
upload()
etc..

Convenience APIs:
tab()

Clipboard APIs:
copy()
cut()
paste()

Keyboard API:
keyboard('foo') // translates to f,o,o
keyboard('{shift>}A{/shift}') // translates to shift(down), A,   shift(up)
```
***

**Custom render function:-**
```
In the context of testing with React Testing Library (RTL), a custom render function refers to a user-defined or customized rendering function that wraps the RTL's render function. Custom render functions are used to set up the testing environment to your specific requirements or to encapsulate common configurations, behaviors, or context providers for your tests.

A custom render function typically includes the following steps:
Importing Dependencies: You import the necessary RTL functions and other dependencies you want to include.

Wrapping the render Function: You wrap the RTL render function, which is responsible for rendering your React component, and return the result.

Configuration and Context Providers: You can add additional configurations, context providers, or setup code to customize the rendering environment. This is where you can add global context providers, set initial state, or apply custom themes.

Return the Rendered Component: Finally, your custom render function returns the result of the render function. This typically includes the rendered component, queries for interacting with the component, and any other information necessary for your tests.
```

**Custom render hooks**
```
It involves testing custom hooks if they are executing the right.
In compare to the render function which we use to render components we use renderHook to execute the custom hook. then we get the result object which contains values return by hook
eg. const {result} = renderHook(useCounter)
```
***

