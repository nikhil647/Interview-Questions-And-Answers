# 🚀 Next.js Interview Preparation Guide

> A comprehensive guide covering Next.js from basics to advanced concepts for interview preparation

---

## 📚 Table of Contents

1. [Introduction to Next.js](#1-introduction-to-nextjs)
2. [Rendering Strategies](#2-rendering-strategies)
3. [Routing Systems](#3-routing-systems)
4. [Data Fetching Patterns](#4-data-fetching-patterns)
5. [API Routes vs Route Handlers](#5-api-routes-vs-route-handlers)
6. [Layouts and Nested Layouts](#6-layouts-and-nested-layouts)
7. [Loading and Error Handling](#7-loading-and-error-handling)
8. [Server vs Client Components](#8-server-vs-client-components)
9. [Streaming and Suspense](#9-streaming-and-suspense)
10. [Image Optimization](#10-image-optimization)
11. [Metadata and SEO](#11-metadata-and-seo)
12. [Middleware](#12-middleware)
13. [Environment Variables](#13-environment-variables)
14. [Deployment & Performance](#14-deployment--performance)
15. [Common Interview Questions](#15-common-interview-questions)
16. [Migration Guide](#16-migration-guide)
17. [Version Features Comparison](#17-version-features-comparison)
18. [Quick Reference](#18-quick-reference)

---

## 1. Introduction to Next.js

### 🤔 What is Next.js?

Next.js is a **React framework** for building full-stack web applications. It provides:
- Server-side rendering (SSR)
- Static site generation (SSG)
- File-based routing
- API routes
- Built-in optimizations

**Analogy**: If React is the engine, Next.js is the complete car with GPS, air conditioning, and autopilot features.

### 💡 Why Use Next.js?

**Benefits:**
1. **SEO-Friendly**: Server-side rendering improves search engine visibility
2. **Performance**: Automatic code splitting, image optimization
3. **Developer Experience**: Hot reloading, TypeScript support
4. **Flexibility**: Choose rendering strategy per page
5. **Full-Stack**: Built-in API routes

**When to Use:**
- Content-heavy websites (blogs, e-commerce)
- Applications requiring SEO
- Projects needing multiple rendering strategies
- When you want React with less configuration

**When NOT to Use:**
- Simple static sites (use vanilla HTML/CSS)
- Pure client-side SPAs (use Create React App)
- Real-time apps with constant updates (consider WebSocket-focused frameworks)

---

## 2. Rendering Strategies

### 📊 Overview

Next.js supports four main rendering strategies:

**Strategy Comparison:**

| Strategy | Acronym | Renders | Use Case |
|----------|---------|---------|----------|
| Client-Side Rendering | CSR | Browser | Interactive dashboards |
| Server-Side Rendering | SSR | Server (per request) | Dynamic content |
| Static Site Generation | SSG | Build time | Blogs, docs |
| Incremental Static Regeneration | ISR | Build + revalidate | E-commerce products |

### 🔄 1. Client-Side Rendering (CSR)

**What it is:** Content rendered in the browser using JavaScript.

**Page Router Example:**
```jsx
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;
  return <div>{data.message}</div>;
}
```

**App Router Example:**
```jsx
'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{data?.message || 'Loading...'}</div>;
}
```

**✅ Pros:**
- Fast subsequent navigation
- Reduced server load
- Rich interactivity

**❌ Cons:**
- Poor SEO
- Slower initial load
- JavaScript required

### 🖥️ 2. Server-Side Rendering (SSR)

**What it is:** HTML generated on the server for each request.

**Page Router Example:**
```jsx
// pages/product/[id].js
export default function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://api.example.com/products/${id}`);
  const product = await res.json();

  return {
    props: { product }
  };
}
```

**App Router Example:**
```jsx
// app/product/[id]/page.js
async function getProduct(id) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    cache: 'no-store' // Equivalent to SSR
  });
  return res.json();
}

export default async function Product({ params }) {
  const product = await getProduct(params.id);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
```

**✅ Pros:**
- Always up-to-date data
- Great SEO
- Works without JavaScript

**❌ Cons:**
- Slower than SSG
- Server load per request
- Higher hosting costs

**🎯 When to Use:**
- User-specific content (dashboards)
- Real-time data (stock prices)
- Frequently changing content

### 📄 3. Static Site Generation (SSG)

**What it is:** HTML generated at build time.

**Page Router Example:**
```jsx
// pages/blog/[slug].js
export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`);
  const post = await res.json();

  return {
    props: { post },
    revalidate: 60 // ISR: revalidate every 60 seconds
  };
}

export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: 'blocking' // or false, true
  };
}
```

**App Router Example:**
```jsx
// app/blog/[slug]/page.js
async function getPost(slug) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 60 } // ISR
  });
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return posts.map(post => ({
    slug: post.slug
  }));
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
```

**✅ Pros:**
- Blazing fast
- Low server costs
- Best SEO
- Can be served from CDN

**❌ Cons:**
- Build time increases with pages
- Data can become stale
- Not suitable for user-specific content

**🎯 When to Use:**
- Blogs and marketing sites
- Documentation
- Product pages
- Any content that doesn't change per user

### 🔄 4. Incremental Static Regeneration (ISR)

**What it is:** SSG with periodic updates in the background.

**Key Concepts:**
- `revalidate`: Time in seconds before regeneration
- Stale-while-revalidate pattern
- On-demand revalidation available

**Page Router:**
```jsx
export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 10 // Regenerate every 10 seconds
  };
}
```

**App Router:**
```jsx
// Automatic revalidation
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 10 }
});

// On-demand revalidation (in Route Handler)
import { revalidatePath } from 'next/cache';

export async function POST() {
  revalidatePath('/blog');
  return Response.json({ revalidated: true });
}
```

**⚡ Pro Tip:** Use ISR for e-commerce product pages - they're fast like static pages but stay updated.

---

## 3. Routing Systems

### 🗂️ Page Router (Next.js 12-13)

**File Structure:**
```
pages/
├── index.js           → /
├── about.js           → /about
├── blog/
│   ├── index.js       → /blog
│   └── [slug].js      → /blog/:slug
└── api/
    └── users.js       → /api/users
```

**Dynamic Routes:**
```jsx
// pages/posts/[id].js → /posts/123
export default function Post({ id }) {
  return <div>Post {id}</div>;
}

export function getServerSideProps({ params }) {
  return { props: { id: params.id } };
}
```

**Catch-All Routes:**
```jsx
// pages/docs/[...slug].js → /docs/a/b/c
export default function Docs({ slug }) {
  return <div>Path: {slug.join('/')}</div>;
}

export function getServerSideProps({ params }) {
  return { props: { slug: params.slug } };
}
```

**Optional Catch-All:**
```jsx
// pages/docs/[[...slug]].js → /docs AND /docs/a/b/c
```

### 📁 App Router (Next.js 13+)

**File Structure:**
```
app/
├── page.js            → /
├── about/
│   └── page.js        → /about
├── blog/
│   ├── page.js        → /blog
│   └── [slug]/
│       └── page.js    → /blog/:slug
└── api/
    └── users/
        └── route.js   → /api/users
```

**Special Files:**
- `page.js` - UI for a route
- `layout.js` - Shared UI wrapper
- `loading.js` - Loading UI
- `error.js` - Error UI
- `not-found.js` - 404 UI
- `route.js` - API endpoint

**Dynamic Routes:**
```jsx
// app/posts/[id]/page.js
export default function Post({ params }) {
  return <div>Post {params.id}</div>;
}
```

**Catch-All Routes:**
```jsx
// app/docs/[...slug]/page.js
export default function Docs({ params }) {
  return <div>Path: {params.slug.join('/')}</div>;
}
```

**Route Groups (Organization):**
```
app/
├── (marketing)/
│   ├── about/
│   └── contact/
└── (shop)/
    ├── products/
    └── checkout/
```
*Route groups don't affect the URL path*

### 🔀 Navigation

**Page Router:**
```jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
  const router = useRouter();

  return (
    <>
      <Link href="/about">About</Link>
      <button onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </button>
    </>
  );
}
```

**App Router:**
```jsx
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Different import!

export default function Nav() {
  const router = useRouter();

  return (
    <>
      <Link href="/about">About</Link>
      <button onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </button>
    </>
  );
}
```

**⚠️ Common Mistake:** Importing `useRouter` from wrong package in App Router.

---

## 4. Data Fetching Patterns

### 📥 Page Router Methods

#### 1. getServerSideProps (SSR)

```jsx
export async function getServerSideProps(context) {
  const { params, query, req, res } = context;
  
  // Access cookies
  const token = context.req.cookies.token;
  
  // Fetch data
  const data = await fetch('https://api.example.com/data');
  
  // Redirect
  if (!data.ok) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  
  // Not found
  if (!data) {
    return {
      notFound: true
    };
  }
  
  return {
    props: { data: await data.json() }
  };
}
```

#### 2. getStaticProps (SSG)

```jsx
export async function getStaticProps(context) {
  const data = await fetch('https://api.example.com/data');
  
  return {
    props: { data: await data.json() },
    revalidate: 60 // ISR
  };
}
```

#### 3. getStaticPaths (Dynamic SSG)

```jsx
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: 'blocking' // false | true | 'blocking'
  };
}
```

**Fallback Options:**
- `false`: 404 for non-generated paths
- `true`: Show fallback UI, then generate
- `'blocking'`: SSR-style generation (no fallback UI)

#### 4. Client-Side with SWR

```jsx
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);
  
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return <div>Hello {data.name}!</div>;
}
```

### 🆕 App Router Methods

#### 1. Server Components (Default)

```jsx
// app/page.js - This is a Server Component by default
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache' // SSG (default)
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.message}</div>;
}
```

#### 2. Cache Options

```jsx
// SSG (Static) - Default
fetch('https://api.example.com/data', {
  cache: 'force-cache'
});

// SSR (Dynamic)
fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// ISR (Revalidate)
fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
});
```

#### 3. Parallel Data Fetching

```jsx
export default async function Page() {
  // These run in parallel
  const [users, posts] = await Promise.all([
    fetch('https://api.example.com/users').then(r => r.json()),
    fetch('https://api.example.com/posts').then(r => r.json())
  ]);
  
  return (
    <div>
      <Users data={users} />
      <Posts data={posts} />
    </div>
  );
}
```

#### 4. Sequential Data Fetching

```jsx
export default async function Page({ params }) {
  // Wait for user
  const user = await fetch(`/api/users/${params.id}`).then(r => r.json());
  
  // Then fetch user's posts
  const posts = await fetch(`/api/posts?userId=${user.id}`).then(r => r.json());
  
  return <UserProfile user={user} posts={posts} />;
}
```

#### 5. Client Components with useEffect

```jsx
'use client';

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData);
  }, []);

  return <div>{data?.message}</div>;
}
```

**🎯 Pro Tip:** Use Server Components whenever possible - they're faster and don't increase bundle size.

---

## 5. API Routes vs Route Handlers

### 🔌 Page Router: API Routes

**File:** `pages/api/users.js`

```jsx
export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return res.status(200).json({ users: [] });
    
    case 'POST':
      const { name } = req.body;
      return res.status(201).json({ id: 1, name });
    
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```

**Dynamic API Routes:**
```jsx
// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  res.status(200).json({ userId: id });
}
```

**Middleware Configuration:**
```jsx
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    },
    responseLimit: '4mb'
  }
};
```

### 🆕 App Router: Route Handlers

**File:** `app/api/users/route.js`

```jsx
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  
  return Response.json({ users: [] });
}

export async function POST(request) {
  const body = await request.json();
  
  return Response.json(
    { id: 1, name: body.name },
    { status: 201 }
  );
}
```

**Dynamic Routes:**
```jsx
// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const id = params.id;
  return Response.json({ userId: id });
}
```

**Headers and Cookies:**
```jsx
import { cookies, headers } from 'next/headers';

export async function GET(request) {
  // Read headers
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  
  // Read cookies
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  // Set cookies
  cookieStore.set('session', 'value', {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 // 1 day
  });
  
  return Response.json({ success: true });
}
```

**Streaming Response:**
```jsx
export async function GET() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('Hello '));
      await new Promise(resolve => setTimeout(resolve, 1000));
      controller.enqueue(encoder.encode('World!'));
      controller.close();
    }
  });
  
  return new Response(stream);
}
```

### 📊 Comparison

| Feature | Page Router | App Router |
|---------|-------------|------------|
| File location | pages/api/ | app/api/ |
| Syntax | req/res | Request/Response |
| Type safety | Less typed | Web standard |
| Streaming | Limited | Native support |
| Middleware | Separate | Built-in |

---

## 6. Layouts and Nested Layouts

### 📐 Page Router: Custom App

**File:** `pages/_app.js`

```jsx
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <header>
        <nav>Navigation</nav>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
```

**Per-Page Layouts:**
```jsx
// components/layouts/MainLayout.js
export default function MainLayout({ children }) {
  return (
    <div>
      <header>Header</header>
      {children}
      <footer>Footer</footer>
    </div>
  );
}

// pages/about.js
import MainLayout from '@/components/layouts/MainLayout';

export default function About() {
  return <div>About Page</div>;
}

About.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
```

### 🆕 App Router: Layouts

**Root Layout (Required):**
```jsx
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Nested Layouts:**
```
app/
├── layout.js          (Root layout)
├── page.js            (Home page)
└── dashboard/
    ├── layout.js      (Dashboard layout)
    ├── page.js        (Dashboard home)
    └── settings/
        └── page.js    (Settings page)
```

```jsx
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <aside>
        <nav>
          <a href="/dashboard">Home</a>
          <a href="/dashboard/settings">Settings</a>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
```

**Templates (Re-render on Navigation):**
```jsx
// app/template.js
export default function Template({ children }) {
  // This re-renders on every navigation
  return <div>{children}</div>;
}
```

**Layout vs Template:**
- **Layout**: Persists across navigations (state preserved)
- **Template**: Re-mounts on every navigation (state reset)

**🎯 Pro Tip:** Use layouts for persistent UI (navigation), templates for animations that should trigger on every page change.

---

## 7. Loading and Error Handling

### ⏳ Page Router

**Loading States:**
```jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading && <div>Loading...</div>}
      <Component {...pageProps} />
    </>
  );
}
```

**Error Pages:**
```jsx
// pages/_error.js
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
```

**404 Page:**
```jsx
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```

### 🆕 App Router

**Loading UI:**
```jsx
// app/dashboard/loading.js
export default function Loading() {
  return (
    <div className="spinner">
      <div>Loading dashboard...</div>
    </div>
  );
}
```

**Error Handling:**
```jsx
// app/dashboard/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

**Global Error:**
```jsx
// app/global-error.js
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Global Error</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
```

**Not Found:**
```jsx
// app/dashboard/not-found.js
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
}

// Trigger in page
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const data = await getData(params.id);
  
  if (!data) {
    notFound(); // Renders not-found.js
  }
  
  return <div>{data.name}</div>;
}
```

**File Hierarchy:**
```
app/
├── layout.js
├── error.js           (Catches errors in layout + children)
├── loading.js         (Shows while page loads)
├── not-found.js       (404 page)
└── page.js            (Page content)
```

**⚡ Pro Tip:** `error.js` must be a Client Component because it uses hooks like `useEffect`.

---

## 8. Server vs Client Components

### 🖥️ Server Components (Default in App Router)

**What they are:** Components that render on the server.

**Default Behavior:**
```jsx
// app/page.js - Server Component by default
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data.message}</div>;
}
```

**✅ Benefits:**
- Smaller bundle size
- Direct database access
- Secure (API keys stay on server)
- Better performance
- SEO friendly

**❌ Cannot Use:**
- useState, useEffect, hooks
- Browser APIs (localStorage, window)
- Event handlers (onClick)
- Context providers

**🎯 Use When:**
- Fetching data
- Accessing backend resources
- Keeping sensitive info on server
- Reducing client-side JavaScript

### 💻 Client Components

**Opt-in with directive:**
```jsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**✅ Can Use:**
- All React hooks
- Browser APIs
- Event handlers
- State and effects
- Third-party libraries with browser dependencies

**❌ Cannot:**
- Directly access backend resources
- Use async/await in component body

**🎯 Use When:**
- Need interactivity
- Using browser APIs
- Managing state
- Using event listeners

### 🔄 Composition Patterns

**Pattern 1: Server Component wrapping Client Component**
```jsx
// app/page.js (Server Component)
import ClientComponent from './ClientComponent';

export default async function Page() {
  const data = await fetchData();
  
  return (
    <div>
      <h1>Server rendered: {data.title}</h1>
      <ClientComponent initialData={data} />
    </div>
  );
}
```

**Pattern 2: Passing Server Components as children**
```jsx
// ClientWrapper.js
'use client';

export default function ClientWrapper({ children }) {
  return <div className="client-wrapper">{children}</div>;
}

// app/page.js (Server Component)
import ClientWrapper from './ClientWrapper';

export default async function Page() {
  const data = await fetchData();
  
  return (
    <ClientWrapper>
      {/* This stays a Server Component! */}
      <div>Server data: {data.message}</div>
    </ClientWrapper>
  );
}
```

**Pattern 3: Moving Client Components down**
```jsx
// ❌ Bad: Entire tree becomes client-side
'use client';

export default function Page() {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <ServerSideData />  {/* Can't be server component now */}
      <button onClick={() => setOpen(!open)}>Toggle</button>
    </div>
  );
}

// ✅ Good: Only button is client-side
export default function Page() {
  return (
    <div>
      <ServerSideData />  {/* Still a Server Component */}
      <ToggleButton />    {/* Client Component */}
    </div>
  );
}
```

### 📊 Decision Matrix

| Need | Server | Client |
|------|--------|--------|
| Fetch data | ✅ | ✅ |
| Access database | ✅ | ❌ |
| Use hooks | ❌ | ✅ |
| Event handlers | ❌ | ✅ |
| SEO | ✅ | ⚠️ |
| Browser APIs | ❌ | ✅ |

**⚠️ Common Mistakes:**
1. Adding `'use client'` to every component
2. Fetching data in Client Components unnecessarily
3. Not using children prop pattern for composition

---

## 9. Streaming and Suspense

### 🌊 What is Streaming?

Streaming sends HTML to the client progressively, allowing users to see parts of the page before everything is ready.

**Traditional SSR:**
```
Server: [Fetch all data] → [Render complete page] → Send to client
Client: [Blank screen] → [Full page appears]
```

**With Streaming:**
```
Server: [Start sending] → [Stream data as ready] → [Complete]
Client: [Show shell] → [Progressive updates] → [Full page]
```

### 🎯 App Router: Suspense

**Basic Usage:**
```jsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>My Dashboard</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments />
      </Suspense>
    </div>
  );
}

// Posts component (Server Component)
async function Posts() {
  const posts = await fetch('https://api.example.com/posts');
  const data = await posts.json();
  
  return (
    <ul>
      {data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

**How it works:**
1. Page shell renders immediately
2. "Loading posts..." shows while Posts fetches
3. Posts content streams in when ready
4. Process repeats for Comments

**Multiple Suspense Boundaries:**
```jsx
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Fast component - renders first */}
      <UserProfile />
      
      {/* Slow component - suspends */}
      <Suspense fallback={<Skeleton />}>
        <SlowDataComponent />
      </Suspense>
      
      {/* Another slow component - independent */}
      <Suspense fallback={<Skeleton />}>
        <AnotherSlowComponent />
      </Suspense>
    </div>
  );
}
```

**Nested Suspense:**
```jsx
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Layout>
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<ContentSkeleton />}>
          <Content />
        </Suspense>
      </Layout>
    </Suspense>
  );
}
```

### 🔄 Streaming with loading.js

```jsx
// app/dashboard/loading.js
export default function Loading() {
  return <DashboardSkeleton />;
}

// Automatically wraps page in Suspense:
// <Suspense fallback={<Loading />}>
//   <Page />
// </Suspense>
```

### ⚡ Route-level Streaming

**Force dynamic rendering:**
```jsx
// app/page.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const data = await fetchData();
  return <div>{data.message}</div>;
}
```

**Segment Config Options:**
```jsx
export const dynamic = 'auto' | 'force-dynamic' | 'error' | 'force-static';
export const dynamicParams = true | false;
export const revalidate = false | 0 | number;
export const fetchCache = 'auto' | 'default-cache' | 'only-cache' | 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store';
export const runtime = 'nodejs' | 'edge';
export const preferredRegion = 'auto' | 'global' | 'home' | string[];
```

### 🎨 Practical Example: E-commerce Product Page

```jsx
// app/product/[id]/page.js
import { Suspense } from 'react';

export default function ProductPage({ params }) {
  return (
    <div>
      {/* Critical content loads first */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails id={params.id} />
      </Suspense>
      
      {/* Reviews load independently */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews id={params.id} />
      </Suspense>
      
      {/* Recommendations load last */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations id={params.id} />
      </Suspense>
    </div>
  );
}

async function ProductDetails({ id }) {
  const product = await fetch(`/api/products/${id}`);
  const data = await product.json();
  return <div>{/* Product UI */}</div>;
}

async function Reviews({ id }) {
  // Artificial delay to show streaming
  await new Promise(resolve => setTimeout(resolve, 2000));
  const reviews = await fetch(`/api/reviews/${id}`);
  return <div>{/* Reviews UI */}</div>;
}
```

**⚡ Pro Tip:** Place Suspense boundaries around slow data fetches, not fast UI components.

---

## 10. Image Optimization

### 🖼️ Next.js Image Component

**Basic Usage:**
```jsx
import Image from 'next/image';

export default function Page() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority // For above-the-fold images
    />
  );
}
```

### 📐 Layout Options

**1. Intrinsic (Default):**
```jsx
<Image
  src="/image.jpg"
  width={500}
  height={300}
  alt="Description"
/>
```

**2. Fill (Responsive):**
```jsx
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src="/image.jpg"
    alt="Description"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>
```

**3. Responsive:**
```jsx
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 🌐 Remote Images

**Configuration (next.config.js):**
```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};
```

**Usage:**
```jsx
<Image
  src="https://example.com/images/photo.jpg"
  alt="Remote image"
  width={800}
  height={600}
/>
```

### ⚙️ Advanced Configuration

**next.config.js:**
```js
module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

### 🎯 Image Loading Strategies

**Priority (LCP images):**
```jsx
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

**Lazy Loading (default):**
```jsx
<Image
  src="/feature.jpg"
  alt="Feature"
  width={800}
  height={600}
  loading="lazy" // Default, can be omitted
/>
```

**Blur Placeholder:**
```jsx
import Image from 'next/image';
import heroImage from '@/public/hero.jpg'; // Static import

export default function Page() {
  return (
    <Image
      src={heroImage}
      alt="Hero"
      placeholder="blur" // Automatic blur-up
    />
  );
}
```

**Custom Blur Placeholder:**
```jsx
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>
```

### 📊 Quality and Performance

**Quality Setting:**
```jsx
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={75} // Default is 75, range: 1-100
/>
```

**Comparison:**

| Use Case | Quality | File Size |
|----------|---------|-----------|
| Thumbnails | 50-60 | Smallest |
| Standard images | 75 | Balanced |
| High-quality photos | 90-95 | Larger |
| Print/download | 100 | Largest |

### 🔧 Custom Loader

```jsx
// next.config.js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './my-loader.js',
  },
};

// my-loader.js
export default function myImageLoader({ src, width, quality }) {
  return `https://cdn.example.com/${src}?w=${width}&q=${quality || 75}`;
}
```

**⚠️ Common Mistakes:**
1. Not using `priority` for above-the-fold images
2. Forgetting `width` and `height` (causes layout shift)
3. Using regular `<img>` tags instead of `Image`
4. Not configuring `remotePatterns` for external images

---

## 11. Metadata and SEO

### 🔍 Page Router: Head Component

**Basic Usage:**
```jsx
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="Page description" />
        <meta property="og:title" content="My Page Title" />
        <meta property="og:description" content="Page description" />
        <meta property="og:image" content="https://example.com/og.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Page Content</div>
    </>
  );
}
```

**Dynamic Metadata:**
```jsx
export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={post.coverImage} />
      </Head>
      <article>{post.content}</article>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post } };
}
```

### 🆕 App Router: Metadata API

**Static Metadata:**
```jsx
// app/page.js
export const metadata = {
  title: 'Home | My Site',
  description: 'Welcome to my site',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'John Doe', url: 'https://johndoe.com' }],
  openGraph: {
    title: 'Home | My Site',
    description: 'Welcome to my site',
    url: 'https://mysite.com',
    siteName: 'My Site',
    images: [
      {
        url: 'https://mysite.com/og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | My Site',
    description: 'Welcome to my site',
    images: ['https://mysite.com/twitter.jpg'],
    creator: '@username',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Page() {
  return <div>Home Page</div>;
}
```

**Dynamic Metadata:**
```jsx
// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
```

**Metadata with Parent:**
```jsx
// app/layout.js
export const metadata = {
  title: {
    default: 'My Site',
    template: '%s | My Site',
  },
};

// app/blog/page.js
export const metadata = {
  title: 'Blog', // Becomes "Blog | My Site"
};
```

### 🎨 Advanced Metadata

**JSON-LD (Structured Data):**
```jsx
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Product Name',
    image: 'https://example.com/product.jpg',
    description: 'Product description',
    brand: {
      '@type': 'Brand',
      name: 'Brand Name',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://example.com/product',
      priceCurrency: 'USD',
      price: '99.99',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>Product Page</div>
    </>
  );
}
```

**Viewport and Theme Color:**
```jsx
// app/layout.js
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};
```

**Alternate URLs (i18n):**
```jsx
export const metadata = {
  alternates: {
    canonical: 'https://example.com',
    languages: {
      'en-US': 'https://example.com/en-US',
      'de-DE': 'https://example.com/de-DE',
    },
  },
};
```

### 🗺️ Sitemap and Robots

**Sitemap (app/sitemap.js):**
```jsx
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://example.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}
```

**Dynamic Sitemap:**
```jsx
export default async function sitemap() {
  const posts = await getAllPosts();
  
  const postUrls = posts.map(post => ({
    url: `https://example.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      priority: 1,
    },
    ...postUrls,
  ];
}
```

**Robots.txt (app/robots.js):**
```jsx
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

**🎯 Pro Tip:** Always use `generateMetadata` for dynamic pages - it runs on the server and prevents SEO issues.

---

## 12. Middleware

### 🛡️ What is Middleware?

Middleware runs before a request is completed, allowing you to:
- Redirect users
- Rewrite URLs
- Modify headers
- Implement authentication
- A/B testing
- Localization

### 📝 Basic Setup

**File:** `middleware.js` (or `middleware.ts`) in project root

```jsx
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Log all requests
  console.log('Request:', request.url);
  
  // Continue to the requested page
  return NextResponse.next();
}
```

### 🎯 Matching Paths

**Config matcher:**
```jsx
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

**Multiple matchers:**
```jsx
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};
```

### 🔐 Authentication Example

```jsx
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard');
  
  // Redirect to login if accessing protected route without token
  if (isProtected && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  // Redirect to dashboard if already logged in
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
```

### 🌍 Internationalization Example

```jsx
import { NextResponse } from 'next/server';

const locales = ['en', 'fr', 'es'];
const defaultLocale = 'en';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return NextResponse.next();
  
  // Detect locale from Accept-Language header
  const locale = request.headers
    .get('accept-language')
    ?.split(',')[0]
    ?.split('-')[0] || defaultLocale;
  
  // Redirect with locale
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
```

### 🔄 URL Rewriting

```jsx
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Rewrite /old-blog/* to /blog/*
  if (request.nextUrl.pathname.startsWith('/old-blog')) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.replace('/old-blog', '/blog');
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}
```

### 📊 A/B Testing Example

```jsx
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get or create A/B test variant
  let variant = request.cookies.get('variant')?.value;
  
  if (!variant) {
    variant = Math.random() < 0.5 ? 'a' : 'b';
  }
  
  const response = NextResponse.next();
  
  // Set variant cookie
  response.cookies.set('variant', variant, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  
  // Add custom header
  response.headers.set('x-variant', variant);
  
  return response;
}
```

### 🔧 Modifying Headers

```jsx
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Add custom headers
  response.headers.set('x-custom-header', 'my-value');
  response.headers.set('x-request-time', Date.now().toString());
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  return response;
}
```

### ⚡ Edge Runtime

Middleware runs on the Edge runtime by default:

```jsx
// Explicitly set runtime (optional, default is 'edge')
export const config = {
  runtime: 'edge',
  matcher: '/api/:path*',
};
```

**Edge Runtime Limitations:**
- No Node.js APIs
- Limited npm packages
- 4MB code size limit
- Optimized for speed

**⚠️ Common Mistakes:**
1. Using Node.js APIs in middleware (not available in Edge)
2. Expensive operations (middleware should be fast)
3. Not returning a response
4. Forgetting to set the `matcher` config

---

## 13. Environment Variables

### 🔐 Types of Environment Variables

**1. Server-side only (default):**
```bash
# .env.local
DATABASE_URL=postgresql://...
API_SECRET=secret_key_123
```

```jsx
// Only accessible in Server Components and API routes
export default async function Page() {
  const db = connect(process.env.DATABASE_URL);
  // ...
}
```

**2. Browser-accessible (NEXT_PUBLIC_ prefix):**
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=UA-000000-1
```

```jsx
// Accessible in both server and client
'use client';

export default function Component() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // ...
}
```

### 📁 Environment Files

**Priority order (highest to lowest):**
1. `.env.production.local` (production builds)
2. `.env.development.local` (dev mode)
3. `.env.local` (always, except test)
4. `.env.production` (production)
5. `.env.development` (dev mode)
6. `.env` (always)

**Example structure:**
```
.env.local          # Secret keys, local overrides (add to .gitignore)
.env.development    # Development defaults
.env.production     # Production defaults
.env                # Shared defaults
```

### 🔧 Usage Examples

**Server Component:**
```jsx
// app/page.js
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET}`,
    },
  });
  
  return <div>Data fetched</div>;
}
```

**API Route (Page Router):**
```jsx
// pages/api/user.js
export default function handler(req, res) {
  const dbUrl = process.env.DATABASE_URL;
  // Connect to database...
  res.status(200).json({ success: true });
}
```

**Route Handler (App Router):**
```jsx
// app/api/user/route.js
export async function GET() {
  const secret = process.env.API_SECRET;
  // Use secret...
  return Response.json({ success: true });
}
```

**Client Component:**
```jsx
'use client';

export default function Analytics() {
  useEffect(() => {
    // Only NEXT_PUBLIC_ variables work here
    const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
    initAnalytics(analyticsId);
  }, []);
  
  return null;
}
```

### 🛠️ next.config.js Integration

**Expose to browser:**
```js
// next.config.js
module.exports = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};
```

**Public runtime config:**
```js
module.exports = {
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },
  serverRuntimeConfig: {
    apiSecret: process.env.API_SECRET,
  },
};

// Usage
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
```

### ✅ Best Practices

**1. Use .env.local for secrets:**
```bash
# .env.local (DO NOT commit)
DATABASE_URL=postgresql://localhost:5432/mydb
API_SECRET=super_secret_key
```

**2. Provide defaults in .env:**
```bash
# .env (commit this)
DATABASE_URL=postgresql://localhost:5432/defaultdb
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**3. Type safety with TypeScript:**
```typescript
// env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      API_SECRET: string;
      NEXT_PUBLIC_API_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
```

**4. Validation at startup:**
```js
// lib/env.js
const requiredEnvVars = [
  'DATABASE_URL',
  'API_SECRET',
  'NEXT_PUBLIC_API_URL',
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required env var: ${envVar}`);
  }
});
```

### 🔒 Security Tips

**❌ DON'T:**
```jsx
// Never expose secrets to client
'use client';

export default function Bad() {
  // This will be undefined (good!)
  const secret = process.env.API_SECRET;
  
  // This works but exposes the key to client
  const publicKey = process.env.NEXT_PUBLIC_API_KEY;
  return <div>{publicKey}</div>; // Visible in browser!
}
```

**✅ DO:**
```jsx
// Server Component
export default async function Good() {
  const data = await fetch('https://api.example.com/data', {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET}`,
    },
  });
  
  return <div>Data: {data.message}</div>;
}
```

**⚠️ Common Mistakes:**
1. Committing `.env.local` to Git
2. Using non-prefixed variables in Client Components
3. Not validating required variables
4. Exposing secrets with `NEXT_PUBLIC_` prefix

---

## 14. Deployment & Performance

### 🚀 Deployment Options

**1. Vercel (Recommended)**
- Zero configuration
- Automatic deployments from Git
- Edge network
- Preview deployments
- Analytics built-in

**2. Self-hosted (Node.js)**
```bash
# Build
npm run build

# Start production server
npm start
# or
node server.js
```

**Custom server.js:**
```js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

**3. Docker**
```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

**next.config.js for Docker:**
```js
module.exports = {
  output: 'standalone',
};
```

**4. Static Export**
```js
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
};
```

```bash
npm run build
# Creates 'out' directory with static files
```

### ⚡ Performance Optimization

**1. Code Splitting**

Automatic in Next.js, but you can optimize further:

```jsx
// Dynamic imports
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr:

---

# 🚀 Next.js Interview Guide - Part 2

## 13. Environment Variables

### 🔐 Types of Environment Variables

**1. Server-side only (default):**
```bash
# .env.local
DATABASE_URL=postgresql://...
API_SECRET=secret_key_123
```

```jsx
// Only accessible in Server Components and API routes
export default async function Page() {
  const db = connect(process.env.DATABASE_URL);
  // ...
}
```

**2. Browser-accessible (NEXT_PUBLIC_ prefix):**
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=UA-000000-1
```

```jsx
// Accessible in both server and client
'use client';

export default function Component() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // ...
}
```

### 📁 Environment Files

**Priority order (highest to lowest):**
1. `.env.production.local` (production builds)
2. `.env.development.local` (dev mode)
3. `.env.local` (always, except test)
4. `.env.production` (production)
5. `.env.development` (dev mode)
6. `.env` (always)

**Example structure:**
```
.env.local          # Secret keys, local overrides (add to .gitignore)
.env.development    # Development defaults
.env.production     # Production defaults
.env                # Shared defaults
```

### 🔧 Usage Examples

**Server Component:**
```jsx
// app/page.js
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET}`,
    },
  });
  
  return <div>Data fetched</div>;
}
```

**API Route (Page Router):**
```jsx
// pages/api/user.js
export default function handler(req, res) {
  const dbUrl = process.env.DATABASE_URL;
  // Connect to database...
  res.status(200).json({ success: true });
}
```

**Route Handler (App Router):**
```jsx
// app/api/user/route.js
export async function GET() {
  const secret = process.env.API_SECRET;
  // Use secret...
  return Response.json({ success: true });
}
```

**Client Component:**
```jsx
'use client';

import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Only NEXT_PUBLIC_ variables work here
    const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
    initAnalytics(analyticsId);
  }, []);
  
  return null;
}
```

### 🛠️ next.config.js Integration

**Expose to browser:**
```js
// next.config.js
module.exports = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};
```

**Public runtime config:**
```js
module.exports = {
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },
  serverRuntimeConfig: {
    apiSecret: process.env.API_SECRET,
  },
};

// Usage
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
```

### ✅ Best Practices

**1. Use .env.local for secrets:**
```bash
# .env.local (DO NOT commit)
DATABASE_URL=postgresql://localhost:5432/mydb
API_SECRET=super_secret_key
STRIPE_SECRET_KEY=sk_test_...
```

**2. Provide defaults in .env:**
```bash
# .env (commit this)
DATABASE_URL=postgresql://localhost:5432/defaultdb
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**3. Type safety with TypeScript:**
```typescript
// env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      API_SECRET: string;
      NEXT_PUBLIC_API_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
```

**4. Validation at startup:**
```js
// lib/env.js
const requiredEnvVars = [
  'DATABASE_URL',
  'API_SECRET',
  'NEXT_PUBLIC_API_URL',
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required env var: ${envVar}`);
  }
});
```

### 🔒 Security Tips

**❌ DON'T:**
```jsx
// Never expose secrets to client
'use client';

export default function Bad() {
  // This will be undefined (good!)
  const secret = process.env.API_SECRET;
  
  // This works but exposes the key to client
  const publicKey = process.env.NEXT_PUBLIC_API_KEY;
  return <div>{publicKey}</div>; // Visible in browser source!
}
```

**✅ DO:**
```jsx
// Server Component
export default async function Good() {
  const data = await fetch('https://api.example.com/data', {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET}`,
    },
  });
  
  return <div>Data: {data.message}</div>;
}
```

**⚠️ Common Mistakes:**
1. Committing `.env.local` to Git
2. Using non-prefixed variables in Client Components
3. Not validating required variables
4. Exposing secrets with `NEXT_PUBLIC_` prefix
5. Hardcoding secrets in code

---

## 14. Deployment & Performance

### 🚀 Deployment Options

#### 1. Vercel (Recommended)

**Features:**
- Zero configuration
- Automatic deployments from Git
- Edge network (global CDN)
- Preview deployments for PRs
- Built-in analytics
- Environment variable management

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**vercel.json configuration:**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database-url"
  }
}
```

#### 2. Self-hosted (Node.js)

**Build and start:**
```bash
# Build for production
npm run build

# Start production server
npm start

# With custom port
PORT=8080 npm start
```

**Custom server.js:**
```js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

**PM2 for production:**
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "nextjs-app" -- start

# Monitor
pm2 monit

# Auto-restart on file changes
pm2 restart nextjs-app --watch

# Startup script
pm2 startup
pm2 save
```

#### 3. Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**next.config.js for Docker:**
```js
module.exports = {
  output: 'standalone',
};
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/mydb
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

#### 4. Static Export

**Configuration:**
```js
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Optional: adds trailing slash to URLs
};
```

**Build:**
```bash
npm run build
# Creates 'out' directory with static HTML/CSS/JS
```

**Deploy to:**
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

**Limitations:**
- No API Routes
- No Server-Side Rendering
- No Incremental Static Regeneration
- No Image Optimization (unless using external service)
- No middleware

### ⚡ Performance Optimization

#### 1. Code Splitting & Dynamic Imports

**Dynamic imports:**
```jsx
import dynamic from 'next/dynamic';

// Basic dynamic import
const HeavyComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR for this component
});

// With named export
const Chart = dynamic(() => import('../components/Chart').then(mod => mod.Chart), {
  loading: () => <div>Loading chart...</div>,
});

// Usage
export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyComponent />
    </div>
  );
}
```

**Conditional loading:**
```jsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('../components/Modal'));

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}
```

#### 2. Font Optimization

**Using next/font:**
```jsx
// app/layout.js
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Custom fonts:**
```jsx
import localFont from 'next/font/local';

const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
  variable: '--font-custom',
});
```

#### 3. Caching Strategies

**App Router fetch caching:**
```jsx
// Default: cache until manually invalidated
fetch('https://api.example.com/data');

// No caching (SSR)
fetch('https://api.example.com/data', { cache: 'no-store' });

// Revalidate every 60 seconds (ISR)
fetch('https://api.example.com/data', { next: { revalidate: 60 } });

// Cache with specific tags
fetch('https://api.example.com/data', {
  next: { tags: ['products'] }
});
```

**On-demand revalidation:**
```jsx
// app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
  const body = await request.json();
  
  // Revalidate specific path
  revalidatePath('/blog');
  
  // Or revalidate by tag
  revalidateTag('products');
  
  return Response.json({ revalidated: true, now: Date.now() });
}
```

#### 4. Bundle Analysis

**Setup:**
```bash
npm install @next/bundle-analyzer
```

**next.config.js:**
```js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your Next.js config
});
```

**Analyze:**
```bash
ANALYZE=true npm run build
```

#### 5. Performance Best Practices

**✅ DO:**
```jsx
// 1. Use Server Components by default
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// 2. Prefetch links
<Link href="/about" prefetch={true}>About</Link>

// 3. Optimize images
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority // For LCP images
  alt="Hero"
/>

// 4. Use Suspense boundaries
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>

// 5. Implement ISR for data that changes occasionally
fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // 1 hour
});
```

**❌ DON'T:**
```jsx
// 1. Don't use 'use client' unnecessarily
'use client'; // Remove if not needed

// 2. Don't load large libraries on initial page
import _ from 'lodash'; // Use lodash-es or import specific functions

// 3. Don't use large images without optimization
<img src="/huge-image.jpg" /> // Use next/image instead

// 4. Don't fetch data in useEffect when you can use Server Components
useEffect(() => {
  fetch('/api/data'); // Prefer Server Component data fetching
}, []);
```

#### 6. Core Web Vitals Optimization

**Largest Contentful Paint (LCP):**
```jsx
// Use priority for above-the-fold images
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority
  alt="Hero"
/>

// Preload critical resources
<link rel="preload" href="/fonts/my-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
```

**First Input Delay (FID):**
```jsx
// Code split heavy JavaScript
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  ssr: false,
});

// Defer non-critical scripts
<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload"
/>
```

**Cumulative Layout Shift (CLS):**
```jsx
// Always specify dimensions for images
<Image
  src="/image.jpg"
  width={800}
  height={600}
  alt="Description"
/>

// Reserve space for dynamic content
<div style={{ minHeight: '200px' }}>
  <Suspense fallback={<Skeleton />}>
    <DynamicContent />
  </Suspense>
</div>
```

### 📊 Monitoring Performance

**Vercel Analytics:**
```jsx
// app/layout.js
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Custom monitoring:**
```jsx
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// Track Web Vitals
export function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics
  if (metric.label === 'web-vital') {
    sendToAnalytics(metric);
  }
}
```

---

## 15. Common Interview Questions

### 🎯 Beginner Level

**Q1: What is Next.js and how is it different from Create React App?**

**Answer:**
Next.js is a React framework that provides:
- Server-Side Rendering (SSR) and Static Site Generation (SSG)
- File-based routing
- API routes
- Built-in optimizations (images, fonts, code splitting)
- Zero config needed

Create React App (CRA) only provides:
- Client-Side Rendering (CSR)
- Manual routing setup needed (React Router)
- No built-in backend capabilities
- Basic configuration

**When to use:**
- Next.js: SEO-critical apps, e-commerce, blogs, full-stack apps
- CRA: Simple SPAs, internal dashboards, prototypes

---

**Q2: Explain the different rendering methods in Next.js**

**Answer:**
Next.js supports four rendering methods:

1. **SSR (Server-Side Rendering)**: Page rendered on each request. Use `getServerSideProps` (Page Router) or `cache: 'no-store'` (App Router). Good for user-specific or real-time data.

2. **SSG (Static Site Generation)**: Page rendered at build time. Use `getStaticProps` (Page Router) or default fetch behavior (App Router). Best for content that doesn't change often.

3. **ISR (Incremental Static Regeneration)**: SSG with periodic updates. Use `revalidate` option. Perfect for e-commerce product pages.

4. **CSR (Client-Side Rendering)**: Rendering in browser. Use `useEffect` or SWR. Good for dashboards and highly interactive UIs.

**Example:**
```jsx
// SSR (App Router)
const data = await fetch(url, { cache: 'no-store' });

// SSG
const data = await fetch(url); // Default cached

// ISR
const data = await fetch(url, { next: { revalidate: 60 } });
```

---

**Q3: What is the purpose of _app.js and _document.js in Page Router?**

**Answer:**

**_app.js:**
- Wraps all pages
- Initializes pages
- Adds global CSS
- Maintains layout between page changes
- Adds global state (providers)

```jsx
// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
```

**_document.js:**
- Customizes HTML and body tags
- Runs only on server
- Used for server-side rendering modifications
- Cannot include event handlers

```jsx
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

### 🎯 Intermediate Level

**Q4: How does file-based routing work in both Page and App Router?**

**Answer:**

**Page Router:**
```
pages/
├── index.js           → /
├── about.js           → /about
├── blog/
│   ├── index.js       → /blog
│   └── [slug].js      → /blog/hello-world
└── api/
    └── users.js       → /api/users
```

**App Router:**
```
app/
├── page.js            → /
├── about/
│   └── page.js        → /about
├── blog/
│   ├── page.js        → /blog
│   └── [slug]/
│       └── page.js    → /blog/hello-world
└── api/
    └── users/
        └── route.js   → /api/users
```

**Key differences:**
- Page Router: file = route
- App Router: folder + page.js = route
- App Router has special files: layout.js, loading.js, error.js

---

**Q5: Explain Server Components vs Client Components**

**Answer:**

**Server Components (default in App Router):**
- Render on server
- Can access backend directly
- Reduce bundle size
- Cannot use hooks or browser APIs
- Cannot have event handlers

```jsx
// Server Component (default)
export default async function Page() {
  const data = await db.query('SELECT * FROM posts');
  return <div>{data.map(post => <Post key={post.id} {...post} />)}</div>;
}
```

**Client Components:**
- Must add `'use client'` directive
- Can use hooks (useState, useEffect)
- Can use browser APIs
- Can have interactivity

```jsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Composition pattern:**
```jsx
// Server Component
export default function Page() {
  return (
    <div>
      <ServerData />  {/* Server Component */}
      <InteractiveButton />  {/* Client Component */}
    </div>
  );
}
```

---

**Q6: How do you handle data fetching in Next.js App Router?**

**Answer:**

**1. In Server Components (recommended):**
```jsx
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // or 'force-cache', or { next: { revalidate: 60 } }
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.message}</div>;
}
```

**2. Parallel data fetching:**
```jsx
export default async function Page() {
  const [users, posts] = await Promise.all([
    fetch(usersUrl).then(r => r.json()),
    fetch(postsUrl).then(r => r.json())
  ]);
  
  return <div>...</div>;
}
```

**3. Sequential when dependent:**
```jsx
export default async function Page({ params }) {
  const user = await getUser(params.id);
  const posts = await getUserPosts(user.id); // Waits for user
  
  return <div>...</div>;
}
```

**4. Client-side with useEffect:**
```jsx
'use client';

export default function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  
  return <div>{data?.message}</div>;
}
```

---

**Q7: What is Middleware and when would you use it?**

**Answer:**

Middleware runs before a request is completed, on the Edge runtime.

**Common use cases:**
1. Authentication
2. Redirects
3. Localization
4. A/B testing
5. Bot protection

**Example - Authentication:**
```jsx
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
```

**Key points:**
- Runs on Edge (fast, globally distributed)
- Cannot use Node.js APIs
- Runs before page/API route
- Can modify headers, redirect, rewrite

---

### 🎯 Advanced Level

**Q8: How does Streaming and Suspense work in Next.js 13+?**

**Answer:**

Streaming allows sending HTML progressively to the client instead of waiting for all data.

**How it works:**
1. Page shell sends immediately
2. Suspense boundaries show fallback
3. Content streams in as ready
4. React hydrates progressively

**Example:**
```jsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Fast content renders immediately */}
      <UserProfile />
      
      {/* Slow content shows fallback, then streams in */}
      <Suspense fallback={<Skeleton />}>
        <SlowDataComponent />
      </Suspense>
      
      <Suspense fallback={<Skeleton />}>
        <AnotherSlowComponent />
      </Suspense>
    </div>
  );
}

async function SlowDataComponent() {
  const data = await slowFetch(); // Takes 3 seconds
  return <div>{data}</div>;
}
```

**Benefits:**
- Better Time To First Byte (TTFB)
- Progressive rendering
- Better user experience
- Independent loading states

**loading.js equivalent:**
```jsx
// app/dashboard/loading.js automatically wraps page in Suspense
export default function Loading() {
  return <Skeleton />;
}
```

---

**Q9: Explain the caching strategies in Next.js App Router**

**Answer:**

Next.js App Router has multiple cache layers:

**1. Request Memoization (automatic):**
- Same fetch URL in one render deduped
- Only for GET requests
- Lasts for server request lifetime

**2. Data Cache (persistent):**
```jsx
// Cached indefinitely (SSG)
fetch(url); // default

// No caching (SSR)
fetch(url, { cache: 'no-store' });

// Revalidate after 60s (ISR)
fetch(url, { next: { revalidate: 60 } });

// Tag-based caching
fetch(url, { next: { tags: ['products'] } });
```

**3. Full Route Cache:**
- Static routes cached at build time
- Dynamic routes not cached

**4. Router Cache (client-side):**
- Caches visited routes
- Soft navigation uses cache
- Timeout: 30s (dynamic), 5min (static)

**On-demand revalidation:**
```jsx
import { revalidatePath, revalidateTag } from 'next/cache';

// Revalidate specific path
revalidatePath('/blog');

// Revalidate by tag
revalidateTag('products');
```

**Opt-out of caching:**
```jsx
// Route segment config
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

---

**Q10: How do you optimize performance in a Next.js application?**

**Answer:**

**1. Use Server Components by default**
```jsx
// Server Component - no JavaScript sent to client
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

**2. Implement code splitting**
```jsx
import dynamic from 'next/dynamic';

const Heavy = dynamic(() => import('./Heavy'), {
  loading: () => <Loading />,
  ssr: false
});
```

**3. Optimize images**
```jsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority // For LCP
  alt="Hero"
/>
```

**4. Use appropriate rendering strategy**
- SSG for static content (blogs)
- ISR for semi-dynamic (products)
- SSR for user-specific (dashboards)
- CSR for highly interactive (canvas, games)

**5. Implement proper caching**
```jsx
// ISR for data that changes hourly
fetch(url, { next: { revalidate: 3600 } });
```

**6. Use Suspense boundaries**
```jsx
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>
```

**7. Optimize fonts**
```jsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

**8. Bundle analysis**
```bash
ANALYZE=true npm run build
```

**9. Prefetch links**
```jsx
<Link href="/about" prefetch={true}>About</Link>
```

**10. Monitor Core Web Vitals**
- Use Vercel Analytics or similar
- Track LCP, FID, CLS
- Optimize based on real user data

---

**Q11: What are the differences between Page Router and App Router?**

**Answer:**

| Feature | Page Router | App Router |
|---------|-------------|------------|
| Default rendering | Pages are CSR by default | Server Components by default |
| Routing | File = route | Folder + page.js = route |
| Layouts | Manual (via _app.js) | Built-in (layout.js) |
| Loading states | Manual implementation | loading.js |
| Error handling | _error.js (global) | error.js (per route) |
| Data fetching | getServerSideProps, getStaticProps | async/await in components |
| API routes | pages/api/route.js | app/api/route/route.js |
| Streaming | Limited | Native Suspense support |
| Metadata | next/head component | Metadata API |
| Middleware | Separate middleware.js | Same middleware.js |

**Migration approach:**
- Both can coexist in same project
- Migrate incrementally
- Start with new routes in app/
- Move existing routes gradually

---

**Q12: Explain getStaticPaths and its fallback options

---

# 🚀 Next.js Interview Guide - Final Part

## 15. Common Interview Questions (Advanced Level - Continued)

### 🎯 Advanced Level

**Q12: Explain getStaticPaths and its fallback options**

**Answer:**

`getStaticPaths` is used with `getStaticProps` to pre-render dynamic routes at build time.

**Basic usage:**
```jsx
// pages/posts/[id].js
export async function getStaticPaths() {
  const posts = await getAllPosts();
  
  const paths = posts.map(post => ({
    params: { id: post.id }
  }));
  
  return {
    paths,
    fallback: false // or true, 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.id);
  return { props: { post } };
}
```

**Fallback options:**

**1. fallback: false**
```jsx
return {
  paths: [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ],
  fallback: false
};
```
- Only pre-rendered paths returned
- Any other path returns 404
- Best for: Small number of pages, all known at build time

**2. fallback: true**
```jsx
return {
  paths: [
    { params: { id: '1' } } // Only pre-render most popular
  ],
  fallback: true
};

// In component
export default function Post({ post }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return <div>{post.title}</div>;
}
```
- Show fallback UI while generating page
- Page generated on first request
- Cached for subsequent requests
- Best for: Large number of pages, generate on-demand

**3. fallback: 'blocking'**
```jsx
return {
  paths: [
    { params: { id: '1' } }
  ],
  fallback: 'blocking'
};
```
- No fallback UI shown
- SSR-like behavior for first request
- Page generated and cached
- No need for `router.isFallback` check
- Best for: SEO-critical pages, no loading state wanted

**Comparison:**

| Fallback | 404 for unknown | Shows loading | SSR first visit | Use case |
|----------|----------------|---------------|-----------------|----------|
| false | Yes | No | No | Small, known set |
| true | No | Yes | No | Large set, UX priority |
| 'blocking' | No | No | Yes | Large set, SEO priority |

---

**Q13: How do you implement internationalization (i18n) in Next.js?**

**Answer:**

**Built-in i18n (Page Router):**

```js
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
    localeDetection: true, // Auto-detect from Accept-Language header
  },
};
```

```jsx
// pages/index.js
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  
  return (
    <div>
      <p>Current locale: {locale}</p>
      <Link href="/" locale="fr">French</Link>
      <Link href="/" locale="es">Spanish</Link>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../lang/${locale}.json`)).default
    }
  };
}
```

**App Router (Middleware approach):**

```jsx
// middleware.js
import { NextResponse } from 'next/server';

const locales = ['en', 'fr', 'es'];
const defaultLocale = 'en';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // Detect locale from Accept-Language
  const locale = request.headers
    .get('accept-language')
    ?.split(',')[0]
    ?.split('-')[0] || defaultLocale;
  
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

```jsx
// app/[lang]/layout.js
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
```

**Using next-intl (recommended for App Router):**

```bash
npm install next-intl
```

```js
// next.config.js
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  // Your config
});
```

```jsx
// app/[locale]/layout.js
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```jsx
// app/[locale]/page.js
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

---

**Q14: How do you handle authentication in Next.js?**

**Answer:**

**1. Session-based with Middleware:**

```jsx
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('session')?.value;
  
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

**2. JWT with HTTP-only cookies:**

```jsx
// app/api/login/route.js
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { email, password } = await request.json();
  
  // Verify credentials
  const user = await verifyCredentials(email, password);
  
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  // Create JWT
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret);
  
  // Set HTTP-only cookie
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  });
  
  return Response.json({ success: true });
}
```

**3. Verify JWT in middleware:**

```jsx
// middleware.js
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('session')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Add user to headers
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.userId);
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

**4. Using NextAuth.js (recommended):**

```bash
npm install next-auth
```

```js
// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await verifyUser(credentials.email, credentials.password);
        if (user) {
          return user;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
```

**5. Client-side usage:**

```jsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <button onClick={() => signIn()}>Sign In</button>;
  }
  
  return (
    <div>
      <p>Welcome {session.user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

**6. Server-side usage:**

```jsx
// app/dashboard/page.js
import { getServerSession } from 'next-auth';

export default async function Dashboard() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return <div>Welcome {session.user.email}</div>;
}
```

---

**Q15: Explain the Edge Runtime and when to use it**

**Answer:**

**What is Edge Runtime?**
- Lightweight JavaScript runtime
- Runs on Edge network (globally distributed)
- Subset of Node.js APIs
- Optimized for low latency

**Edge vs Node.js Runtime:**

| Feature | Edge Runtime | Node.js Runtime |
|---------|-------------|-----------------|
| Cold start | ~0ms | ~100ms+ |
| Execution location | Global edge | Centralized servers |
| API compatibility | Limited | Full Node.js |
| Max duration | 30s (Vercel) | No limit |
| Bundle size | 1-4MB | No limit |
| Streaming | Native | Yes |

**When to use Edge:**
- Middleware (always Edge)
- API routes needing low latency
- Geolocation-based responses
- A/B testing
- Bot detection
- Simple data transformations

**When NOT to use Edge:**
- Heavy computations
- Database connections (use connection pooling)
- File system operations
- Node.js-specific packages

**Usage examples:**

**1. Edge API Route:**
```jsx
// app/api/hello/route.js
export const runtime = 'edge';

export async function GET(request) {
  return Response.json({ 
    message: 'Hello from Edge',
    location: request.geo.city 
  });
}
```

**2. Edge-rendered page:**
```jsx
// app/page.js
export const runtime = 'edge';

export default function Page() {
  return <div>Rendered at the edge</div>;
}
```

**3. Geolocation example:**
```jsx
// middleware.js (always Edge)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const country = request.geo.country || 'US';
  const response = NextResponse.next();
  
  response.cookies.set('user-country', country);
  return response;
}
```

**4. Edge with database (using connection pooling):**
```jsx
export const runtime = 'edge';

import { Pool } from '@neondatabase/serverless';

export async function GET() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const { rows } = await pool.query('SELECT * FROM users');
  
  return Response.json(rows);
}
```

**Available APIs in Edge:**
- Fetch API
- Headers, Request, Response
- URL, URLSearchParams
- Web Crypto API
- TextEncoder/TextDecoder
- Streams API

**NOT available:**
- fs (file system)
- child_process
- Native Node.js modules
- Many npm packages

---

**Q16: How do you implement real-time features in Next.js?**

**Answer:**

**1. Server-Sent Events (SSE):**

```jsx
// app/api/events/route.js
export const runtime = 'edge';

export async function GET(request) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        const data = { time: new Date().toISOString() };
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      }, 1000);
      
      // Cleanup
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

```jsx
// Client component
'use client';

import { useEffect, useState } from 'react';

export default function LiveData() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const eventSource = new EventSource('/api/events');
    
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };
    
    return () => eventSource.close();
  }, []);
  
  return <div>Time: {data?.time}</div>;
}
```

**2. WebSockets (with custom server):**

```js
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });
  
  const io = new Server(server);
  
  io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('message', (data) => {
      io.emit('message', data); // Broadcast to all
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  
  server.listen(3000);
});
```

```jsx
// Client component
'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const socketInstance = io();
    
    socketInstance.on('message', (data) => {
      setMessages(prev => [...prev, data]);
    });
    
    setSocket(socketInstance);
    
    return () => socketInstance.disconnect();
  }, []);
  
  const sendMessage = (text) => {
    socket?.emit('message', { text, time: Date.now() });
  };
  
  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg.text}</div>
      ))}
      <button onClick={() => sendMessage('Hello')}>Send</button>
    </div>
  );
}
```

**3. Polling with SWR:**

```jsx
'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function LiveStatus() {
  const { data } = useSWR('/api/status', fetcher, {
    refreshInterval: 1000, // Poll every second
  });
  
  return <div>Status: {data?.status}</div>;
}
```

**4. Using Pusher/Ably (third-party services):**

```jsx
'use client';

import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function RealtimeComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: 'us2'
    });
    
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data) => {
      setData(data);
    });
    
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  
  return <div>{JSON.stringify(data)}</div>;
}
```

---

## 16. Migration Guide (Page Router → App Router)

### 📋 Migration Strategy

**Step-by-step approach:**

1. **Install Next.js 13+**
2. **Create `app/` directory** (coexists with `pages/`)
3. **Migrate incrementally** (route by route)
4. **Update imports and APIs**
5. **Test thoroughly**
6. **Remove `pages/` when complete**

### 🔄 Migration Checklist

#### 1. Routing

**Before (Page Router):**
```
pages/
├── index.js
├── about.js
└── blog/
    └── [slug].js
```

**After (App Router):**
```
app/
├── page.js
├── about/
│   └── page.js
└── blog/
    └── [slug]/
        └── page.js
```

#### 2. Layouts

**Before:**
```jsx
// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

**After:**
```jsx
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>Navigation</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

#### 3. Data Fetching

**Before:**
```jsx
// pages/blog/[slug].js
export default function Post({ post }) {
  return <article>{post.title}</article>;
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post } };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false
  };
}
```

**After:**
```jsx
// app/blog/[slug]/page.js
async function getPost(slug) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 60 } // ISR
  });
  return res.json();
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug
  }));
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.title}</article>;
}
```

#### 4. API Routes

**Before:**
```jsx
// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] });
  }
}
```

**After:**
```jsx
// app/api/users/route.js
export async function GET(request) {
  return Response.json({ users: [] });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ success: true }, { status: 201 });
}
```

#### 5. Head / Metadata

**Before:**
```jsx
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>My Page</title>
        <meta name="description" content="Description" />
      </Head>
      <div>Content</div>
    </>
  );
}
```

**After:**
```jsx
// app/page.js
export const metadata = {
  title: 'My Page',
  description: 'Description',
};

export default function Page() {
  return <div>Content</div>;
}
```

#### 6. Link Component

**Before:**
```jsx
import Link from 'next/link';

<Link href="/about">
  <a>About</a>
</Link>
```

**After:**
```jsx
import Link from 'next/link';

<Link href="/about">About</Link>
```

#### 7. Image Component

**Before:**
```jsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  width={500}
  height={300}
  layout="responsive"
/>
```

**After:**
```jsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  width={500}
  height={300}
  style={{ width: '100%', height: 'auto' }}
/>
```

#### 8. Router

**Before:**
```jsx
import { useRouter } from 'next/router';

const router = useRouter();
const { query, pathname } = router;

router.push('/about');
```

**After:**
```jsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();

router.push('/about');
```

#### 9. Client-side Components

**Before:**
```jsx
// Implicitly client-side
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**After:**
```jsx
'use client'; // Explicitly mark as client

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### ⚠️ Breaking Changes

**1. No more getInitialProps:**
- Use Server Components instead
- Or fetch in `useEffect` for client components

**2. No more `pages/_document.js`:**
- Use root `layout.js`
- Customize `<html>` and `<body>` there

**3. No more `pages/_error.js`:**
- Use `error.js` in each route segment

**4. Different imports:**
```jsx
// Before
import { useRouter } from 'next/router';

// After
import { useRouter } from 'next/navigation';
```

### ✅ Migration Benefits

1. **Better Performance**: Server Components reduce bundle size
2. **Improved DX**: Simplified data fetching
3. **Better Streaming**: Native Suspense support
4. **Nested Layouts**: Built-in layout system
5. **Better Errors**: Granular error boundaries

---

## 17. Version Features Comparison

### 📊 Next.js 13, 14, 15 Major Features

#### Next.js 13 (October 2022)

**🎯 Major Features:**

1. **App Router (Beta)**
   - Server Components by default
   - Nested layouts
   - New routing system

2. **Turbopack (Alpha)**
   - Rust-based bundler
   - Faster than Webpack

3. **next/image improvements**
   - No layout shift by default
   - Easier to use

4. **@next/font**
   - Automatic font optimization
   - Self-hosted fonts

```jsx
// New in 13: Server Components
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data.message}</div>;
}
```

---

#### Next.js 14 (October 2023)

**🎯 Major Features:**

1. **App Router (Stable)**
   - Production-ready
   - Performance improvements

2. **Server Actions (Stable)**
   - Mutations without API routes
   - Progressive enhancement

3. **Partial Prerendering (Preview)**
   - Mix static and dynamic content
   - Fast static shell + dynamic content

4. **Metadata improvements**
   - Better SEO support
   - Viewport in metadata

5. **Turbopack improvements**
   - 53% faster local server startup
   - 94% faster code updates

```jsx
// New in 14: Server Actions
export default function Form() {
  async function createPost(formData) {
    'use server';
    
    const title = formData.get('title');
    await db.posts.create({ title });
  }
  
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}
```

---

#### Next.js 15 (October 2024)

**🎯 Major Features:**

1. **React 19 Support**
   - React Compiler
   - New hooks (useFormStatus, useOptimistic)

2. **Async Request APIs**
   - cookies(), headers(), params, searchParams are now async

3. **Caching Updates**
   - fetch requests no longer cached by default
   - GET Route Handlers no longer cached

4. **Partial Prerendering (Stable)**
   - Static shell + streaming dynamic parts

5. **next/after (Experimental)**
   - Execute code after response is sent

6. **Turbopack Dev (Stable)**
   - Default for local development

7. **Enhanced Forms**
   - Form component with prefetching

```jsx
// New in 15: Async request APIs
export default async function Page({ params, searchParams }) {
  const { slug } = await params; // Now async
  const query = await searchParams; // Now async
  
  const cookieStore = await cookies(); // Now async
  const token = cookieStore.get('token');
  
  return <div>{slug}</div>;
}
```

```jsx
// New in 15: next/after
import { after } from 'next/server';

export async function POST(request) {
  const data = await request.json();
  
  // Respond immediately
  const response = Response.json({ success: true });
  
  // This runs after response is sent
  after(async () => {
    await logAnalytics(data);
    await sendNotification(data);
  });
  
  return response;
}
```

```jsx
// New in 15: Caching changes
// Before (Next.js 14): Cached by default
const data = await fetch('https://api.example.com/data');

// Now (Next.js 15): NOT cached by default
const data = await fetch('https://api.example.com/data');

// To cache explicitly:
const data = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
});
```

---

### 📋 Feature Comparison Table

| Feature | Next.js 13 | Next.js 14 | Next.js 15 |
|---------|------------|------------|------------|
| App Router | Beta | Stable | Stable |
| Server Actions | Alpha | Stable | Stable |
| Partial Prerendering | ❌ | Preview | Stable |
| Turbopack | Alpha | Beta | Stable (dev) |
| React Version | 18 | 18 | 19 |
| Async Request APIs | ❌ | ❌ | ✅ |
| Fetch caching default | Cached | Cached | Not cached |
| next/after | ❌ | ❌ | Experimental |
| Form component | ❌ | ❌ | ✅ |

---

### 🔄 Migration Notes

**13 → 14:**
- No breaking changes
- Enable Turbopack: `next dev --turbo`
- Adopt Server Actions

**14 → 15:**
- Update async request APIs usage
- Review fetch caching (now opt-in)
- Update to React 19
- Test with Turbopack (now default)

**Breaking changes in 15:**
```jsx
// ❌ Before (Next.js 14)
export default function Page({ params, searchParams }) {
  const { slug } = params; // Sync
  return <div>{slug}</div>;
}

// ✅ After (Next.js 15)
export default async function Page({ params, searchParams }) {
  const { slug } = await params; // Async
  return <div>{slug}</div>;
}
```

---

## 18. Quick Reference

### 🚀 Essential Commands

```bash
# Create new app
npx create-next-app@latest

# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run lint

# Analyze bundle
ANALYZE=true npm run build
```

---

### 📁 Project Structure (App Router)

```
my-app/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page

---

