![curry sviggies](https://cdn.rawgit.com/brekk/katsu-curry/09c7d12/logo.svg)

> 🍛 for everyone

This module gives you the ability to curry functions with custom placeholders, or with object values.

## What is `curry`?

Currying is a way of modifying a given function which takes multiple arguments into a sequence of unary functions.

```js
import {curry} from 'katsu-curry'
const add = (a, b, c) => a + b + c
// all of these are equivalent
add(1)(2)(3) // 6
add(1, 2)(3) // 6
add(1, 2, 3) // 6
add(1)(2, 3) // 6
// we provide 0 + 1 (as a + b above) and the returning function expects the c value, above
const increment = add(0, 1)
const [x, y, z] = [1, 2, 3].map(increment)
console.log(`x`, x) // 2
console.log(`y`, y) // 3
console.log(`z`, z) // 4
```

# Changelog

-   _0.5.0_ - API changes, added `remap` and `remapArray`
-   _0.4.1_ - streamlined build with `germs`
-   _0.4.0_ - improvements in testing
-   _0.3.1_ - improvements for speed
-   _0.1.1_ - fix exports
-   _0.1.0_ - API changes
-   _0.0.8_ - modularized the codebase
-   _0.0.7_ - .npmignore fixes
-   _0.0.6_ - adjustments to toString functionality (now deprecated)
-   _0.0.4_ - Logo
-   _0.0.3_ - First working release, supports regular currying via `curry` and currying by object via `curryObjectK` and `curryObjectN` and `pipe` / `compose` to allow for easy composition.
-   _0.0.6_ - Added `toString` methods to improve context when debugging
-   _0.1.0_ - Updated API and privatized some existing methods
-   _0.1.1_ - Fix solo exports

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

-   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** total expected keys
-   `fn` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function to be curried

**Examples**

```javascript
import {curryObjectN} from 'katsu-curry'
const threeKeyProps = curryObjectN(3, Object.keys)
threeKeyProps({a: 1, b: 2, c: 3}) // [`a`, `b`, `c`]
threeKeyProps({a: 1, b: 2}) // function expecting one more param
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

## curryObjectKN

Given object and expected keys, continually curry until expected keys are met

**Parameters**

-   `expected` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** expected object
    -   `expected.n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** minimum expected keys
    -   `expected.k` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** expected keys
-   `expected` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** expected object
-   `fn` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function to be curried

**Examples**

```javascript
import {curryObjectKN} from 'katsu-curry'
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
