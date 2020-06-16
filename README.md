# @jpwilliams/waitgroup

A tiny version of Golang's [WaitGroup](https://golang.org/pkg/sync/#WaitGroup) with typings, promises, and zero dependencies.

``` sh
npm install --save @jpwilliams/waitgroup
```

``` js
const http = require('http')
const { WaitGroup } = require('@jpwilliams/waitgroup')

async function main () {
	const wg = new WaitGroup()

	const urls = [
		'http://www.golang.org/',
		'http://www.google.com/',
		'http://www.somestupidname.com/'
	]

	urls.forEach((url) => {
		// Increment the WaitGroup counter
		wg.add(1)
		// Fetch the URL
		http.get(url, () => {
			// Decrement the counter when the GET is complete
			wg.done()
		})
	})

	// Wait for all HTTP fetches to complete
	await wg.wait()
}

main()
```

For most applications in Node.js, using built-ins like `Promise.all` will work perfectly, but sometimes this can be a really nice abstraction if the promises you have to keep track of are pretty spread out.

