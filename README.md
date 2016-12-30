# Query-Stringifier [![Build Status](https://travis-ci.org/joshghent/query-stringifier.svg?branch=master)](https://travis-ci.org/joshghent/query-stringifier) [![npm version](https://badge.fury.io/js/query-stringifier.svg)](https://badge.fury.io/js/query-stringifier)
A small library for build query strings

## Install
``` bash
npm install query-stringifier
```

## Usage
```js

const qs = require('query-stringifier');

const params = {
    food: pizza,
    bar: chocolate
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
```

## Issues?
Go [here](https://github.com/joshghent/query-stringifier/issues)