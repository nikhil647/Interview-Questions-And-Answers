# NEXT Js inteview Preparation  

**If you want to explore more please checkout below Nexjs 13 playlist, link below**
***
**[https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&index=1](https://www.youtube.com/watch?v=y0ecd_bGKb4&list=PL8p2I9GklV44sj_Ikp8jQSvwD-m9htnHT&index=2)**

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

** 5) How can you fetch data in Next.js? **
```
Next.js provides several methods for fetching data. You can use the getStaticProps function to fetch data at build time and pre-render pages. This is useful for static content that doesn't change frequently. If you need to fetch data on each request, you can use the getServerSideProps function. Additionally, Next.js supports making API requests directly from your components using the useSWR hook or the fetch function.
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

**7) How does Next.js handle SEO optimization?**
```
Next.js is designed to be SEO-friendly out of the box. It supports server-side rendering, which allows search engines to crawl and index your pages easily. Next.js also provides automatic code splitting and lazy loading, improving page load times. Additionally, you can customize meta tags and titles using the Head component provided by Next.js.
```
***

**8) How do you configure routing in a Next.js application?**
```
write file name under pages dir and that's it route created eg.to create /about route create pages/about.js.
```
***

**9) Explain the concept of API routes in Next.js. **
```
API routes in Next.js allow you to create serverless functions that can be accessed from both the client and the server. These functions can handle API requests and perform server-side logic. API routes are stored in the pages/api directory and are automatically deployed as serverless functions when you deploy your Next.js application.
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
Next.js doesn’t have built-in support for authentication, but you can easily integrate popular authentication libraries like NextAuth.js or Firebase Authentication. These libraries provide authentication APIs that can be used in your Next.js application. You can also implement your own authentication logic using cookies or JWT tokens
```
***

** Explain the concept of ISR (Incremental Static Regeneration) in Next.js. **
```
ISR is a feature in Next.js that allows you to update static pages at runtime without rebuilding the entire application. With ISR, you can define a revalidation time for each page, and Next.js will automatically regenerate the page when it’s requested after the revalidation time has passed. This allows you to have both static and dynamic content in your Next.js application.
```
***

**20) What is the purpose of the _app.js file in Next.js?**
```
The _app.js file is used to wrap the entire application and provides global styles, layout components, and context providers. This file is called on every page request and can be used to add common functionality to your application.
```
***

**20) What is the purpose of the Link component in Next.js**
```
The Link component in Next.js is used for client-side navigation between pages. It automatically preloads the linked page in the background, improving the user experience. The Link component also handles the active state of the link, adding an active class to the active link. It is recommended to use the Link component instead of the anchor (<a>) tag for internal navigation in Next.js applications.
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
***

**26)New Next 14 Features**
```
Below is the notes for next Js 14

All the components are server components by default, we use 'use client' string top of our component to make it client component.
even though we use 'use client' string and make it client component, the component get's render on server one time, that is important to keep in mind.

For creating server compnenet, we need to make component async componenet
export default async function ServerComponent(){
    // Your Jsx code
}
 
In server component we can't use event handlers, hooks etc of conventional react features. 

Server Actions: 
In server component to make a function run on server we use 'use server' string in that top of function, those function are also known as server actions.

async function serveAction(){
    'use server'
    //async code to execute (eg. fetching data, creating data etc)
}

Server actions (functions that run in server) can't be define in client component, but there are two ways we can use server actions in client component
1) We can pass server actions in client component through props if parent component is a server component
2) We write multiple server actions in separate file and then import it
eg actions.ts file

'use server'
async function serveAction(){
    //async code to execute (eg. fetching data, creating data etc)
}
async function serveAction2(){
    //async code to execute (eg. fetching data, creating data etc)
}

But to execute server action in client component we need to use below methods

import { editSnippet } from '@/actions'
import {startTransition} from 'react // if we use inbuild react function 
export default function SnippetEditForm({snippet} : SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code)

  const handleEditorChange = (value: string = '' )=>{
    setCode(value)
  }
  const edit = editSnippet.bind(null, snippet.id, code)// this is server action
  const edit2 = () =>{
    startTransition(async()=>{
        await editSnippet(snippet.id, code)
    })
} 
  
  return (
    <div>
    // code...
        <form action={edit}>
            <button type='submit'>Save</button>
        </form>
        or
        <button onClick={edit2}>Save</button>
    </div>
  )
} 



Dynamic Routes
In case of server components, to access the route params, we can use props passed to that component.
export default async function ServerComponent(props){
    console.log(props) // { params: { id: '2' }, searchParams: {} }
    // Your Jsx code
}

File names which we can create
page.tsx, layout.tsx, not-found.tsx, loading.tsx, error.tsx, route.tsx

Server Side validation with Server Action(Using useFormState hook):

We use useFormState hook to get the errors from server action if any, from submitted form.
eg.
import { createSnippet } from '@/actions';
import { useFormState } from 'react-dom';

export default function SnippetCreatePage() {
  const [formState, action] = useFormState(createSnippet, {message: ''})
  // const createSnippetFunc = createSnippet.bind(null)
  return (
    <form action={action}>
        // Form Code
        {formState && 
          <div className='my-2 p-2 bg-red-200 border rounded border-red-400'>{formState.message}</div>
        }
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}

createSnippet Action
eg.
export async function createSnippet(formState: {message :string} , formData: FormData) {
  
  // Check the user's inputs and make sure they're valid
  const title = formData.get('title');
  const code = formData.get('code');
  
  if (typeof title !== 'string' || title.length < 3) {
    return {
      message: 'Title must be longer',
    };
  }
  if (typeof code !== 'string' || code.length < 10) {
    return {
      message: 'Code must be longer',
    };
  }
    // create snippet server code
}
```
***

**26)New Next 14 Features - Caching**
```
There are 4 types of caching in next js 14
Data cache:- Responses from requests made with fetch are stored and used across requests. 
Ruter cache:- 'Soft' navigation between routes are cached in the browser and reused when a user revisits page. 
Request memoization:- Make 2 or more 'GET' requests with fetch during a user's request to your server? Only one 'GET' is actually executed.
Full Route Cache:- At build time, Next decides if your route is static or dynamic. If it is static, page is rendered and result is stored.
                    In production, users are given this pre-rendered result.     

All the pages are static by default 
To make page dynamic, we will use below methods

1)Calling a 'dynamic function' or referencing a 'dynamic variable' when your route renders 
eg. coockies.set() - coockies.delete(), useSearchParams(), searchParams Prop

2) Assignning specific 'route segment config' options
eg. export const dynamic = 'force-dynamic'
eg. export const revalidate = 0

//Server Component
export const dynamic = 'force-dynamic' || export const revalidate = 0 // This is the way we will assign route segment config options

export default function SnippetCreatePage() {
  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
        // code for creating
    </form>
  );
}

3) Calling 'fetch' and opting out of caching of response 
eg. fetch('...url', {next: {revalidate: 0}});

4) Using dynamic route
eg. /snippets/[id]/page.tsx
eg. /snippets/[id]/edit/page.tsx 

Three ways to control caching
Time Based :-
Using revalidate on top of server comonent
export const revaildate = 3 // number of seconds after rerender will happen 

On-Demand :-
Dumping cache for everything in a page
import {revalidatePath} from 'next/cache'
// When we think data that the '/snippets' route changed
revalidatePath('/snippets') 

Disable caching :-
By defining below exprts in that page
export const dynamic = 'force-dynamic' ||  export const revalidate = 0

How can we cached dynamic routes for fast render? 
We can cached dynamic routes using generateStaticParams() function in server component.
This function should return an array of all possible dynamic routes

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { deleteSnippet } from '@/actions';

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }
  const deleteSnippetFunc = deleteSnippet.bind(null, snippet.id)
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetFunc}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
// This is how we write function, it is somewhat like getStaticPaths from pages router
// It will pre generate all pages on server.
export async function generateStaticParams(){
  const snippets = await db.snippet.findMany()
  
  return snippets.map(snippet=>{
    return {
      id: snippet.id.toString()
    }
  })
}
```
***




 
