# @jpwilliams/waitgroup

![npm version](https://img.shields.io/npm/v/@jpwilliams/waitgroup) [![JSR](https://jsr.io/badges/@jpwilliams/waitgroup)](https://jsr.io/@jpwilliams/waitgroup)
 ![Test on
 push](https://github.com/jpwilliams/waitgroup/workflows/Test%20on%20push/badge.svg)
 ![Downloads](https://img.shields.io/npm/dm/@jpwilliams/waitgroup)

A tiny version of Golang's [WaitGroup](https://golang.org/pkg/sync/#WaitGroup).

- Tiny (<1kB)
- Works with <img alt="browsers" title="This package works with browsers." height="16px"
  src="https://jsr.io/logos/browsers.svg" /> <img alt="Deno" title="This package
  works with Deno." height="16px"
  src="https://jsr.io/logos/deno.svg" /> <img alt="Node.js" title="This package
  works with Node.js" height="16px"
  src="https://jsr.io/logos/node.svg" /> <img alt="Cloudflare Workers"
  title="This package works with Cloudflare Workers." height="16px"
  src="https://jsr.io/logos/cloudflare-workers.svg" /> <img alt="Bun"
  title="This package works with Bun." height="16px"
  src="https://jsr.io/logos/bun.svg" />
- Typed
- Zero dependencies 🎉

There are too many package managers 🥲

```sh
# From npm
npm install @jpwilliams/waitgroup
yarn add @jpwilliams/waitgroup
pnpm add @jpwilliams/waitgroup
```

```sh
# From JSR
npx jsr add @jpwilliams/waitgroup
bunx jsr add @jpwilliams/waitgroup
deno add @jpwilliams/waitgroup
yarn dlx jsr add @jpwilliams/waitgroup
pnpm dlx jsr add @jpwilliams/waitgroup
```

```ts
import http from "http";
import { WaitGroup } from "@jpwilliams/waitgroup";

async function main() {
  const wg = new WaitGroup();

  const urls = [
    "http://www.golang.org/",
    "http://www.google.com/",
    "http://www.somestupidname.com/",
  ];

  urls.forEach((url) => {
    // Increment the WaitGroup counter
    wg.add(1);
    // Fetch the URL
    http.get(url, () => {
      // Decrement the counter when the GET is complete
      wg.done();
    });
  });

  // Wait for all HTTP fetches to complete
  await wg.wait();
}

main();
```

For most applications in Node.js, using built-ins like `Promise.all` will work perfectly, but sometimes this can be a really nice abstraction if the promises you have to keep track of are pretty spread out.

See [jpwilliams/waitgroup-deno](https://github.com/jpwilliams/waitgroup-deno)
for a strictly [Deno](https://deno.land/) version, or [@jpwilliams/waitgroup](https://jsr.io/@jpwilliams/waitgroup) on [JSR](https://jsr.io/@jpwilliams/waitgroup).
