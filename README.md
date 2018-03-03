![curry sviggies](https://cdn.rawgit.com/brekk/katsu-curry/09c7d12/logo.svg)

> 🍛 for everyone

[![Coverage Status](https://coveralls.io/repos/github/brekk/katsu-curry/badge.svg?branch=master)](https://coveralls.io/github/brekk/katsu-curry?branch=master)

This module gives you the ability to curry functions with custom placeholders, or with object values.

## What is `curry`?

Currying is a way of modifying a given function which takes multiple arguments into a sequence of unary functions.

Specifically, in JS, it means that you can manipulate arguments, their order, and other facets of a passed in function.

Here's the barest bones version:

```js
import {curry} from 'katsu-curry'
const add = curry((a, b, c) => a + b + c)
// all of these are equivalent
add(1)(2)(3) // 6
add(1, 2)(3) // 6
add(1, 2, 3) // 6
add(1)(2, 3) // 6
```

(A greater explanation of currying generally can be found  [here](https://drboolean.gitbooks.io/mostly-adequate-guide/ch4.html))

Here's an example of currying being slightly more useful:

```js
// const {curry} = require('katsu-curry')
import {curry} from 'katsu-curry'

const lens = curry((property, fn, obj) => {
  obj[property] = fn(obj[property])
  return obj
})
const increment = (x) => ++x
const hey = {
  brekk: {name: `brekk`, beers: 0},
  you: {name: `you`, beers: 0},
}
[hey.brekk, hey.you].map(lens(`beers`, increment))
console.log(hey.brekk.beers) // 1
```

### Debug mode

Part of the utility of this implementation is the debug mode, available from `katsu-curry/debug`:

```js
// const {curry} = require('katsu-curry/debug')
import {curry} from 'katsu-curry/debug' // identical API!
```

In debug mode, all currying functions (and in addition, all uses of `pipe` / `compose`) are augmented to produce a `.toString` function which is hopefully very helpful:

```js
// const {curry, pipe} = require('katsu-curry/debug')
import {curry, pipe} from 'katsu-curry/debug'
const add = (a, b) => a + b
const divide = (a, b) => b / a
const multiply = (a, b) => b * a
const sum = curry(add)
const over = curry(divide)
const product = curry(multiply)
console.log(sum.toString()) // curry(add)(?,?)
console.log(sum(4).toString()) // curry(add)(4)(?)
const markupCost = pipe(
  sum(2),
  product(1.05)
)
console.log(markupCost.toString()) // pipe(curry(add)(2)(?), curry(multiply)(1.05)(?))
/*
we can see from the toString (which has to be single-line) what our pipe is made of:
pipe(
  curry(add)(2)(?),
  curry(multiply)(1.05)(?)
)
 */
```

This helpfulness comes at the [cost of speed](#benchmark), however. The idea is that you can use the debug mode when trying to ascertain why something is broken or in places where speed is not a concern. See [the benchmark](#benchmark) below.

### Object-style curry

Inspired by [this book](http://fljsbook.com/) and [this library](https://github.com/getify/fpo), you can also use _object-style_ curried functions:

```js
// const {curryObjectK} = require('katsu-curry')
import {curryObjectK} from 'katsu-curry'
const lens = curryObjectK(
  [`prop`, `fn`, `obj`],
  ({prop, fn, obj}) => {
    obj[prop] = fn(obj[prop])
    return obj
  }
)
const increment = (x) => ++x
const hey = {
  brekk: {name: `brekk`, beers: 0},
  you: {name: `you`, beers: 0},
}
[{obj: hey.brekk}, {obj: hey.you}].map(lens({prop: `beers`, fn: increment}))
console.log(hey.brekk.beers) // 1
```

See also the [`curryObjectKN`](#curryobjectkn) and [`curryObjectN`](#curryobjectn) functions in the [API](#api) below.

This library's implementation isn't [as performant](#benchmark) as it could be, but again, it has greater utility in debug mode:

```js
// const {curryObjectK} = require('katsu-curry/debug')
import {curryObjectK} from 'katsu-curry/debug'
// in debug mode, named functions are extra helpful, as anonymous functions are, y'know, anonymous
const _add = (a, b) => a + b
const add = curryObjectK([`a`, `b`], _add)
console.log(add.toString()) // curry(_add)({a:?,b:?})
console.log(add({a: 2}).toString()) // curry(_add)({a:2})({b:?})
console.log(add({a: 2, b: 5})) // 7
// or if we misuse it in the future, the curry acts as a guard
console.log(add({a: 2, c: 100, d: 400, e: 1e3}).toString()) // curry(_add)({a:2})({b:?})
// and toString helps us identify the problem (no "b" param)
```

### Benchmark

There are other implementations of standard curry which may be faster, though this implementation has a fast object-style function:

-   katsu-curry #curryObjectN        x 9,467,349 ops/sec ±5.69% (73 runs sampled)
-   @ibrokethat/curry                x 9,168,538 ops/sec ±6.90% (74 runs sampled)
-   lodash/fp/curry                  x 8,873,327 ops/sec ±4.29% (76 runs sampled)
-   instant-curry                    x 7,059,247 ops/sec ±4.83% (70 runs sampled)
-   ramda/src/curry                  x 6,498,465 ops/sec ±4.62% (71 runs sampled)
-   katsu-curry #curry               x 6,083,741 ops/sec ±6.39% (67 runs sampled)
-   just-curry-it                    x 4,601,812 ops/sec ±4.89% (74 runs sampled)
-   light-curry                      x 3,925,772 ops/sec ±5.05% (71 runs sampled)
-   katsu-curry/debug #curryObjectN  x 3,679,708 ops/sec ±6.08% (73 runs sampled)
-   fjl-curry                        x 3,066,417 ops/sec ±5.52% (70 runs sampled)
-   dead-simple-curry                x 2,823,668 ops/sec ±5.66% (72 runs sampled)
-   bloody-curry                     x 3,174,576 ops/sec ±3.21% (77 runs sampled)
-   curri                            x 2,634,989 ops/sec ±4.64% (77 runs sampled)
-   curry                            x 2,246,712 ops/sec ±5.29% (70 runs sampled)
-   fj-curry                         x 1,834,610 ops/sec ±6.94% (69 runs sampled)
-   curry-d                          x 1,573,489 ops/sec ±6.73% (70 runs sampled)
-   auto-curry                       x 1,343,690 ops/sec ±3.79% (74 runs sampled)
-   katsu-curry #curryObjectK        x 1,159,314 ops/sec ±5.70% (73 runs sampled)
-   katsu-curry/debug #curry         x 867,879 ops/sec ±5.75% (70 runs sampled)
-   @riim/curry                      x 444,138 ops/sec ±7.84% (64 runs sampled)
-   fpo.curryMultiple                x 840,026 ops/sec ±3.42% (76 runs sampled)
-   fpo.curry                        x 945,169 ops/sec ±4.40% (74 runs sampled)
-   katsu-curry/debug #curryObjectK  x 178,968 ops/sec ±5.35% (71 runs sampled)

(See [this file](https://github.com/brekk/katsu-curry/blob/master/src/benchmark.fixture.js) to view the tests, augment or run yourself.)

# Changelog

-   _0.7.0_ - Split out a `debug` version of the codebase which is slower but more useful
-   _0.6.0_ - API changes, fixed publication
-   _0.5.0_ - API changes, added `remap` and `remapArray`
-   _0.4.1_ - streamlined build with `germs`
-   _0.4.0_ - improvements in testing
-   _0.3.1_ - improvements for speed
-   _0.1.1_ - Fix solo exports
-   _0.1.0_ - Updated API and privatized some existing methods
-   _0.0.8_ - modularized the codebase
-   _0.0.7_ - .npmignore fixes
-   _0.0.6_ - adjustments to `toString` functionality (now deprecated)
-   _0.0.4_ - Logo
-   _0.0.3_ - First working release, supports regular currying via `curry` and currying by object via `curryObjectK` and `curryObjectN` and `pipe` / `compose` to allow for easy composition.

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## I

The identity combinator

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {I} from 'katsu-curry'
const five = I(5)
```

Returns **any** x - whatever was given

## K

The constant combinator

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {K} from 'katsu-curry'
const fiveFn = K(5)
const twoFn = K(2)
fiveFn() * twoFn() // 10
```

Returns **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** a function which eventually returns x

## curryObjectN

Given object with n keys, continually curry until n keys are met

**Parameters**

-   `arity`  
-   `fn` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function to be curried
-   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** total expected keys

**Examples**

```javascript
import {curryObjectN} from 'katsu-curry'
const threeKeyProps = curryObjectN(3, Object.keys)
threeKeyProps({a: 1, b: 2, c: 3}) // [`a`, `b`, `c`]
threeKeyProps({a: 1, b: 2}) // function expecting one more param
```

Returns **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** invoked function or partially applied function

## curryObjectKN

Given object and expected keys, continually curry until expected keys are met

**Parameters**

-   `expected` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** expected object
    -   `expected.k` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** expected keys
    -   `expected.n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** minimum expected keys
-   `fn` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function to be curried

**Examples**

```javascript
// import {curryObjectKN} from 'katsu-curry/debug'
import {curryObjectKN} from 'katsu-curry'
const setTheTable = curryObjectKN({
  k: [`knives`, `forks`, `spoons`],
  n: 4
}, ({knives, forks, spoons, drinks = [`wine`]}) => (
  `${knives} x ${forks} + ${spoons} + ${drinks}`
))
const setTheKnivesAndSpoons = setTheTable({forks: [0,1,2,3]}) // partial-application!
```

Returns **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** invoked function or partially applied function

## curryObjectK

Given object and expected keys, continually curry until expected keys are met

**Parameters**

-   `expected` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** expected keys
-   `fn` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function to be curried

**Examples**

```javascript
import {curryObjectK} from 'katsu-curry'
const abcProps = curryObjectK([`a`, `b`, `c`], ({a, b, c, optional = 1}) => {
 return a + b + c / optional
})
abcProps({a: 1, b: 2, c: 3}) // 6
abcProps({a: 1, b: 2}) // function expecting one more param
abcProps({a: 1, b: 2, c: 3, optional: 10}) // 0.6
```

Returns **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** invoked function or partially applied function

## compose

compose functions, right to left

**Examples**

```javascript
import {compose} from 'katsu-curry'
const f = (x) => x * 2
const g = (x) => x / 2
const a = Math.round(Math.random() * 10)
compose(f, g)(a) === f(g(a)) // true
```

Returns **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** a composed function

## pipe

compose functions, left to right

**Examples**

```javascript
import {pipe} from 'katsu-curry'
const f = (x) => x * 2
const g = (x) => x / 2
const a = Math.round(Math.random() * 10)
pipe(f, g)(a) === g(f(a)) // true
```

Returns **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** a composed function

## curry

curry a given function so that it takes multiple arguments (or a tuple of arguments)

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** any function

**Examples**

```javascript
import {curry, $} from 'katsu-curry'
const divide = curry((a, b) => a / b)
const half = divide($, 2)
const twoOver = divide(2)
```

Returns **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** a curried function

## remapArray

easily remap an array by indices

**Parameters**

-   `indices` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of indices to remap
-   `arr` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** an input array

**Examples**

```javascript
import {remapArray} from 'katsu-curry'
remapArray([2,1,0], [`up`, `is`, `what`]).join(` `) // "what is up"
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** remapped array

## remap

reframe any function with the arguments as you want, plus curry

**Parameters**

-   `indices` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of indices to remap
-   `fn` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** a function

**Examples**

```javascript
import {remap} from 'katsu-curry'
const quaternaryFunction = (a, b, c, d) => ((a + b + c) / d)
const quaternaryFunctionLastShuffle = remap([1, 2, 3, 0], quaternaryFunction)
quaternaryFunctionLastShuffle(1, 2, 3, 4) === ((2 + 3 + 4) / 1)
```
