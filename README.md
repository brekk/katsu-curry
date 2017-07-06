![curry sviggies](logo)

> 🍛 for everyone

This module gives you the ability to curry functions with custom placeholders, or with object values.

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## PLACEHOLDER

🍛 The default placeholder value

**Examples**

```javascript
import {curry, PLACEHOLDER as $} from 'katsu-curry'
// $ is actually also exported as an alias, for your convenience
const divide = curry((a, b) => a / b)
const half = divide($, 2)
```

## currify

Generate a custom `curry` function given a test function that checks for placeholders

**Parameters**

-   `test` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function that tests for placeholder-iness

**Examples**

```javascript
import {currify} from 'katsu-curry'
const tester = (x) => x === 'butts'
const customCurry = currify(tester)
const divide = customCurry((a, b) => a / b)
const half = divide('butts', 2)
```

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function which can curry other functions

## curry

curry a given function so that it takes multiple arguments (or a tuple of arguments)

**Parameters**

-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** any function

**Examples**

```javascript
import {curry, $} from 'katsu-curry'
const divide = curry((a, b) => a / b)
const half = divide($, 2)
const twoOver = divide(2)
```

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a curried function

## curryObjectByCondition

Take some arguments, test them, and then either return a partially applied function or the answer

**Parameters**

-   `comparison` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function to compare arguments
-   `x` **any** input
-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function to be curried

**Examples**

```javascript
import {curryObjectByCondition} from 'katsu-curry'
const expectNArgs = (size, args) => length(args) >= size
const curryObjectN = curryObjectByCondition(expectNArgs)
```

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** invoked function or partially applied function

## curryObjectN

Given object with n keys, continually curry until n keys are met

**Parameters**

-   `n` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** total expected keys
-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function to be curried

**Examples**

```javascript
import {curryObjectN} from 'katsu-curry'
const threeKeyProps = curryObjectN(3, Object.keys)
threeKeyProps({a: 1, b: 2, c: 3}) // [`a`, `b`, `c`]
threeKeyProps({a: 1, b: 2}) // function expecting one more param
```

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** invoked function or partially applied function

## curryObjectK

Given object and expected keys, continually curry until expected keys are met

**Parameters**

-   `expected` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** expected keys
-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function to be curried

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

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** invoked function or partially applied function

## curryObjectKN

Given object and expected keys, continually curry until expected keys are met

**Parameters**

-   `expected` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** expected object
    -   `expected.n` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** minimum expected keys
    -   `expected.k` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** expected keys
-   `expected` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** expected object
-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function to be curried

**Examples**

```javascript
import {curryObjectKN} from 'katsu-curry'
const abcProps = curryObjectK([`a`, `b`, `c`], ({a, b, c, optional = 1}) => {
 return a + b + c / optional
})
abcProps({a: 1, b: 2, c: 3}) // 6
abcProps({a: 1, b: 2}) // function expecting one more param
abcProps({a: 1, b: 2})({c: 3}) // 6
abcProps({a: 1, b: 2, c: 3, optional: 10}) // 0.6
```

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** invoked function or partially applied function

## I

The identity combinator

**Parameters**

-   `x` **any** anything

**Examples**

```javascript
import {I} from 'katsu-curry'
const five = I(5)
```

Returns **any** x

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

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function which eventually returns x

## pipe

compose functions, left to right

**Parameters**

-   `args` **...[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a list of function arguments

**Examples**

```javascript
pipe(f, g)(a) === g(f(a))
```

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a composed function

## compose

compose functions, right to left

**Parameters**

-   `args` **...[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a list of function arguments

**Examples**

```javascript
compose(f, g)(a) === f(g(a))
```

Returns **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a composed function

[logo]: https://cdn.rawgit.com/brekk/katsu-curry/9e097df0/logo.svg
