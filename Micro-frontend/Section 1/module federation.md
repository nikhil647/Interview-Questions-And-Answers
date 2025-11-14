## Module Federation

Module Federation is a Webpack feature that lets multiple independently built and deployed bundles share code at runtime. Instead of shipping every dependency inside one monolithic application, each team can build a _remote_ bundle and another team can consume it from a _container (or host)_, which results in smaller builds and faster deployments.

### Container + Product Example (React + Webpack)

Imagine two applications:

- `container` (shell) loads the shared UI and consumes remote features.
- `product` owns the `ProductCard` UI and exposes it for reuse.

#### `product` bundle (`webpack.config.js`)

```js
new ModuleFederationPlugin({
  name: 'product', // the global name other apps will use when referring to this remote
  filename: 'remoteEntry.js', // the file Webpack emits that describes exposed modules
  exposes: {
    './ProductCard': './src/ProductCard', // maps the public module name to the local file
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react }, // share React, avoid duplicate copies
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
  },
});
```

**Explanation:** once you build `product`, Webpack outputs `dist/remoteEntry.js`. Deploy that file (and the rest of the `product` bundle) to a CDN or server. The host will fetch this `remoteEntry.js` at runtime to understand and load the exposed modules.

#### `container` bundle (`webpack.config.js`)

```js
new ModuleFederationPlugin({
  name: 'container',
  remotes: {
    product: 'product@https://cdn.example.com/product/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
  },
});
```

**Explanation:** the container declares a remote named `product`. Webpack uses the provided URL to download `remoteEntry.js` when the container starts. Shared dependencies again ensure React is deduped between the two apps.

#### Consuming the remote component

```tsx
const ProductCard = React.lazy(() => import('product/ProductCard'));

function ContainerApp() {
  return (
    <React.Suspense fallback="Loading product…">
      <ProductCard />
    </React.Suspense>
  );
}
```

`React.lazy` tells the container to wait until `product/ProductCard` resolves via `remoteEntry.js`. Webpack automatically wires the remote module to the bundle that declared it.

### Runtime Flow (Mermaid)

```mermaid
flowchart LR
  container[Container (shell)]
  product[Product remote]
  container -->|fetch https://cdn.example.com/product/remoteEntry.js| product
  product -->|exports ProductCard| container
  subgraph shared[Shared deps]
    react(React)
    reactDom(ReactDOM)
  end
  container --> shared
  product --> shared
```

`remoteEntry.js` is generated during the remote build and must be hosted where the container can reach it (e.g., `https://cdn.example.com/product/remoteEntry.js`). The container downloads it, resolves the shared modules, and mounts `ProductCard` as if it were local.

### Sharing Dependencies Between Apps

Imagine adding a third repo: `cart`. It exposes features via Module Federation and depends on a helper like `faker` to generate mock cart items. (The container itself never imports `faker`—it only declares the shared dependency so it can reuse whichever remote supplies it.) Without coordinating the shared dependency, each bundle might ship its own `faker`, which bloats downloads and risks version drift.

#### Sharing `faker` between `cart`, `product`, and `container`

```js
// cart webpack.config.js
new ModuleFederationPlugin({
  name: 'cart',
  filename: 'remoteEntry.js',
  exposes: {
    './MiniCart': './src/MiniCart',
  },
  shared: {
    faker: { singleton: true, requiredVersion: deps.faker },
  },
});

// product webpack.config.js
new ModuleFederationPlugin({
  name: 'product',
  filename: 'remoteEntry.js',
  exposes: {
    './ProductCard': './src/ProductCard',
  },
  shared: {
    faker: { singleton: true, requiredVersion: deps.faker },
  },
});

> In each `webpack.config.js` you often import your `package.json` deps (`const deps = require('./package.json').dependencies`). `deps.react` and `deps['react-dom']` simply reference the version strings declared there so Module Federation can validate matching versions before sharing.

// container webpack.config.js
new ModuleFederationPlugin({
  name: 'container',
  remotes: {
    cart: 'cart@https://cdn.example.com/cart/remoteEntry.js',
    product: 'product@https://cdn.example.com/product/remoteEntry.js',
  },
  shared: {
    faker: { singleton: true, eager: true },
  },
});
```

Because `cart` (and other remotes such as `product`) expose the `faker` helper, the container can declare `faker` as a shared singleton without importing it directly. Webpack then tries to load one copy at runtime, and `requiredVersion` (on the provider) plus matching versions in every consuming `package.json` keeps the container from silently pulling in a different release. If the versions don’t line up, two bundles (one per version) might still load, defeating the dedupe and risking inconsistent behavior.

You can decide whether this note belongs alongside the existing example or in a separate one, but capturing the shared dependency story helps spell out how Module Federation keeps deps in sync when multiple remotes (like `product` and `cart`) make use of the same helper libraries.

