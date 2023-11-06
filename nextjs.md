# NEXT Js inteview Preparation  

12.0 and below Questions 13.0 is at end.

** 1) What is Next.js, and how is it different from React? **
```
Next.js is a React-based open-source framework that helps developers build server-side rendered React applications.
The key difference between React and Next.js is the way they handle routing. React uses client-side routing,
Next.js provides server-side routing, which means that the server handles the routing and sends the pre-rendered pages to the client, resulting in faster page loads and better SEO.
Next.js also provides additional features like automatic code splitting, static site generation.

```
***

** 2) advantages of using Next.js over React? **
```
1) server-side rendering
2) automatic code splitting.
3) static site generation
4) optimized performance
5) easy deployment.

```
***

** 3) What is server-side rendering, and why is it important? **
```
Server-side rendering (SSR) is the process of rendering a web page on the server before sending it to the client's browser.
SSR is important because it allows search engines to crawl and index your website's content, which can improve your website's SEO
```
***


** 4) What is client-side rendering, and how does it differ from server-side rendering? **
```
Client-side rendering (CSR) is the process of rendering a web page on the client's browser using JavaScript after receiving the initial HTML, CSS, and JavaScript from the server.
CSR sends an empty HTML page that is populated by JavaScript.SSR sends a fully rendered HTML page to the client's browser

```
***

** 5) What is client-side rendering, and how does it differ from server-side rendering? **
```
Client-side rendering (CSR) is the process of rendering a web page on the client's browser using JavaScript after receiving the initial HTML, CSS, and JavaScript from the server.
CSR sends an empty HTML page that is populated by JavaScript.SSR sends a fully rendered HTML page to the client's browser

```
***

** 6) What is static site generation, and how does it differ from server-side rendering? **
```
Static Site Generation: In SSG, the web pages are pre-rendered at build time. This means that the content is generated and HTML files are created before they are served to the client. The generated HTML files are static and do not change for different users.

for eg. we can have pages like about us, contact us , privacy policy as SSG.

Server-Side Rendering (SSR):  In SSR, web pages are generated dynamically on the server in response to a user's request.
SSR can be more resource-intensive because it involves running code on the server for each user request

```
***

**7) What is static site generation, and how does it differ from server-side rendering?**
```
Static Site Generation: In SSG, the web pages are pre-rendered at build time. This means that the content is generated and HTML files are created before they are served to the client. The generated HTML files are static and do not change for different users.

for eg. we can have pages like about us, contact us , privacy policy as SSG.

Server-Side Rendering (SSR):  In SSR, web pages are generated dynamically on the server in response to a user's request.
SSR can be more resource-intensive because it involves running code on the server for each user request

```
***


**8) How do you configure routing in a Next.js application?**
```
write file name under pages dir and that's it route created eg.to create /about route create pages/about.js.
```
***

** 9) What is the purpose of the getStaticProps function in Next.js?**
```
The getStaticProps function is used to fetch data at build time for static site generation. This function is called during the build process and can be used to fetch data from an external API or database.
```

**10) How do you pass data between pages in a Next.js application?**
```
query parameters, the Router API, and state management libraries like Redux or React Context.
```
***

**11) How do you deploy a Next.js application? **
```
Next.js applications can be deployed to a variety of platforms, including cloud services like AWS, Google Cloud Platform, and Microsoft Azure, as well as platforms like Vercel and Netlify. 
```
***

Difficulty Level: Intermediate

**12) What is serverless architecture, and how does it relate to Next.js? **
```
Serverless architecture is a cloud computing model where the cloud provider manages the infrastructure and automatically scales the resources based on demand.
Next.js can be used with serverless architecture by deploying the application to a serverless platform like AWS Lambda or Google Cloud Functions.
```
***

**13) What is the purpose of the getStaticPaths function in Next.js**
```
It allows you to specify dynamic routes for your pages during Static Site Generation (SSG).
It's commonly used with "getStaticProps" to fetch data for those dynamic routes.

It allows you to specify which paths should be pre-rendered at build time.

return {
    paths,
    fallback: true, // or false if you want to return a 404 page for non-matching paths
};



```
***

**14) What is the purpose of the getStaticPaths function in Next.js**
```
It allows you to specify dynamic routes for your pages during Static Site Generation (SSG).
It's commonly used with "getStaticProps" to fetch data for those dynamic routes.
```
***

**14. 1) fallback inside getStaticPath **
```
getStaticPaths function determines how to handle paths that were not generated at build time.
fallback: false -->  it means that any paths not returned by the getStaticPaths function will result in a 404 page.
                     In other words, if a user tries to access a path that wasn't pre-rendered at build time, they will see a "Not Found" page.

fallback: true -->   This shell will contain basic HTML and JavaScript, allowing the page to be rendered on the client-side.
                      Meanwhile, Next.js will start generating the static page in the background. Once the static page is generated, subsequent requests to the same path will serve the fully generated static page.

fallback: 'blocking --> it means that Next.js will server-render the page on-demand for the paths that were not pre-rendered at build time. The server will generate the page and cache it for future requests, providing a fully static page to the use
```
***


**15)How do you configure dynamic routes in a Next.js application?**
```
Next.js uses square brackets [] to denote dynamic segments in a URL path.
For example, to create a dynamic route for blog posts with the URL path /blog/[slug]. you would create a file called [slug].js
```
***


**16) How does Next.js handle code splitting, and why is it important?**
```
Next.js automatically splits your code into smaller chunks that can be loaded on demand when the user navigates to a new page. This helps to reduce the initial page load time and improve the performance of your application.
```
***


**17) How does Next.js handle code splitting, and why is it important?**
```
Next.js automatically splits your code into smaller chunks that can be loaded on demand when the user navigates to a new page. This helps to reduce the initial page load time and improve the performance of your application.
```
***

**18) What is the purpose of the _app.js file in Next.js?**
```
The _app.js file is used to wrap the entire application and provides global styles, layout components, and context providers. This file is called on every page request and can be used to add common functionality to your application.
```
***

**19)How do you implement authentication in a Next.js application?**
```
Next.js provides several options for implementing authentication, including JSON Web Tokens (JWT), OAuth, and third-party libraries like NextAuth.js. You can also use server-side rendering and session management to implement server-side authentication.
```
***

**20) What is the purpose of the _app.js file in Next.js?**
```
The _app.js file is used to wrap the entire application and provides global styles, layout components, and context providers. This file is called on every page request and can be used to add common functionality to your application.
```
***

**20) What is the purpose of the _app.js file in Next.js?**
```
The _app.js file is used to wrap the entire application and provides global styles, layout components, and context providers. This file is called on every page request and can be used to add common functionality to your application.
```
***


**21)Next.js application involves managing both client-side and server-side errors.**
```
Next.js application involves managing both client-side and server-side errors.
Client-Side Errors: Form Validation & Error Boundaries
Server-Side Errors: API Route Error Handling, Error Pages: Define custom error pages in Next.js to provide a consistent user experience for various HTTP error statuses
```
***


**22) How do you implement internationalization (i18n) in a Next.js application?**
```
Next.js provides built-in support for i18n through the next-i18next library.
```
***

**23) How do you implement serverless functions in a Next.js application?**
```
You can create a serverless function by creating a file in the pages/api directory with the desired endpoint name and implementing the server-side logic.
```
***

**24) How do you implement serverless functions in a Next.js application?**
```
You can create a serverless function by creating a file in the pages/api directory with the desired endpoint name and implementing the server-side logic.
```
***

**25) How do you implement testing and continuous integration in a Next.js application?**
```
Select a testing framework to write and run tests for your Next.js application. Some popular choices include Jest, Mocha, and Ava. Jest is a common choice for Next.js 
Write tests for your application. You can create test files for individual components, pages, or APIs. Next.js automatically supports testing using Jest for your project.

You'll need to create a configuration file for your chosen CI platform.
we need to create YAML file and conect to CI platform
```
***

**26)New Next 13 Features**
```

App Router built on top of React Server Components with support for layouts, nested routing, loading states, error handling, and more.

Name Should be page.js to render the page. (index.js)
layout.tsx - UI that serves entire app. good for writing things like global navbar. we can have layouts in subdir too when we have layout in subdir it will be only applicable to that route.

slug is same as page router.
Next.js 13 now gives you the ability to control component states very easily and at a very granular level.
[alt text](https://miro.medium.com/v2/resize:fit:1400/1*Kc3K73j16s1teZUt60sD4w.jpeg)

by default every component is server component (pre-genarated on server) and for client we need to specify 'use client'


getServerSideProps for real-time data and getStaticProps for cached data.
Next.js 13 has removed these functions and replaced them with the fetching formats listed below:

Fetch with Cached Data

This request would be cached until manually invalidated. 
//Similar to 'getStaticProps'
fetch(API_URL, { cache: 'force-cache' })

Fetch with Dynamic Data
// This request should be refetched on every request.
// Similar to 'getServerSideProps'
fetch(API_URL, { cache: 'no-store' })


Fetch with Revalidating Data
We can achieve a mix between Dynamic Data and Cached Data if we use the revalidate flag:
// This request should be cached with a lifetime of 10 seconds.
// Similar to 'getStaticProps' with the 'revalidate' option.
fetch(API_URL, { next: { revalidate: 10 } });


Server Action ?

```
***






