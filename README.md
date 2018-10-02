# Query-Stringifier [![Build Status](https://travis-ci.org/joshghent/query-stringifier.svg?branch=master)](https://travis-ci.org/joshghent/query-stringifier) [![npm version](https://badge.fury.io/js/query-stringifier.svg)](https://badge.fury.io/js/query-stringifier) ![devDependencies](https://david-dm.org/joshghent/query-stringifier.svg)
A small library for build query strings

## Install
``` bash
$ npm install query-stringifier
```

## Usage
```js

const qs = require('query-stringifier');

const params = {
    food: 'pizza',
    bar: 'chocolate'
}

qs.stringify(params);
// 'food=pizza&bar=chocolate'

// Also add options!

const options = { prefix: '?' };

qs.stringify(params, options);
// '?food=pizza&bar=chocolate'

// Parse query strings into objects
qs.parse('?food=pizza&bar=chocolate');
// { food: pizza, bar: chocolate }

// Extract query string from url
qs.extract('http://test.com?food=pizza&bar=chocolate');
// food=pizza&bar=chocolate
```

## Tests

```
$ npm test
```

## Documentation

You have a look at the documentation [here](https://joshghent.github.io/query-stringifier/).

If you ever edit the documentation and wants to generate a new version of it just run the command:

```
$ npm run docs
```

Commit your changes and push them to master. Github pages will update the page automatically.

## Issues?
Go [here](https://github.com/joshghent/query-stringifier/issues)


## Contributing

Insterested to help? Just follow our [Contribution Guide](https://github.com/joshghent/query-stringifier/blob/master/CONTRIBUTING.md).