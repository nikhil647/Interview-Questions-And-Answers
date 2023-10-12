# Redux inteview Preparation  

**1) What is Redux ?**
```
 Redux is a predictable state container for JavaScript applications. In React it is used to solve prop drilling problem. by centrlizing all the state date in a store.
```
***

**2) State the core principles of Redux ?**
```
Single Source of Truth:
Redux stores the entire state of the application in a single JavaScript object. This makes it easier to manage and debug the state since there is only one source of truth.

State is Read-Only:
State is Read-Only:
The state in Redux is immutable. You cannot modify the state directly. Instead, to change the state, you dispatch actions

Changes are Made with Pure Functions:
Reducers are pure functions that take the previous state and an action and return a new state. They do not modify the previous state directly. Pure functions are functions whose output value is determined only by its input values, without observable side effect.
```
***

**3) What is middleware in Redux?**
```
A: Middleware in Redux provides a third-party extension point between dispatching an action and the moment it reaches the reducer. It can be used for logging, crash reporting, asynchronous API calls, routing, and more
```
***

**4) What is the purpose of Redux Thunk middleware?**
```
  Redux Thunk is middleware that allows action creators to return functions instead of plain action objects.
```
***

**5)How do you connect Redux to a React application?**
```
Redux can be connected to a React application using the connect() function from the react-redux library.
```
***

**6)What is the Provider component in React-Redux??**
```
 The <Provider> component is a wrapper component from the react-redux library that makes the Redux store available to the entire React application. It is placed at the root level of the component tree.
```
***

**7)mapStateToProps & mapDispatchToProps**
```
mapStateToProps - The mapStateToProps() method is used to render the stored data to the component.
mapDispatchToProps - The mapDispatchToProps() method is used to render the action creators with props to the component.
```
***

# Redux toolikit inteview Preparation  

**1)what is redux toolkit ?**
```
 It is designed to simplify the process of writing Redux logic by providing utility functions that reduce the boilerplate code associated with Redux.

 CreateSlice: Redux Toolkit introduces the createSlice() function, which allows you to create a Redux slice containing both the reducer and the actions. 

 configureStore: Redux Toolkit provides the configureStore() function, which simplifies the process of creating a Redux store. It automatically sets up various middleware such as Redux Thunk, Redux DevTools Extension, and more. 
```
***

**2)Redux Toolkit Query**
```
Purpose: Redux Toolkit Query (RTK Query) is an additional library built on top of Redux Toolkit. It simplifies the process of making API requests and managing the resulting data in Redux stores.
//Personal notes --> only use if we use lot's of data that needs to store in redux store and lot's of manipulation present at many pages of application. (it's rare scenation most of the time we store auth data in redux store and if any other data if required)
```
***
