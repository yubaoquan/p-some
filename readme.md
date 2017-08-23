p-some
===

> Wait for a specified number of promises to be fulfilled

Inspired by [sindresorhus/p-some](https://github.com/sindresorhus/p-some)

Usage:
===

Checks 4 websites and logs the 2 fastest.

```
const got = require('got');
const pSome = require('./index');

pSome([
    got.head('github.com').then(() => 'github'),
    got.head('google.com').then(() => 'google'),
    got.head('twitter.com').then(() => 'twitter'),
    got.head('medium.com').then(() => 'medium')
], 2).then(([first, second]) => {
    console.log(first, second);
    //=> 'google twitter'
});
```

pSome(promises, opt)

####promises

Type: `Array`<`Promise`>

####opt
Type: `Object`

##### count

*Required*<br>
Type: `number` *(minimum `1`)*

##### filter

Type: `Function`

Receives the value resolved by the promise. Used to filter out values that doesn't satisfy a condition.
