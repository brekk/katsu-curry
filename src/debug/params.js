/*
export {curry} from '@params/curry'
export {curryify} from '@params/ify'
export {remap, remapArray} from '@params/remap'
 */
import {PLACEHOLDER} from '@placeholder/index'
import fastSome from 'fast.js/array/some'
import {remapParameters} from '@params/remap'
import {toString} from './to-string'

/**
 * Pass currify a test which validates placeholders, and it will give you back a function which
 * curries other functions
 * @method curryify
 * @param {function} test - a function which asserts whether a given parameter is a placeholder
 * @returns {function} - a function which curries other functions
 * @public
 */
export const curryify = (test) => (fn) => {
  if (typeof fn !== `function`) {
    // eslint-disable-next-line fp/no-throw
    throw new TypeError(`Expected to be given a function to curry!`)
  }
  function curried() {
    const args = Array.from(arguments)
    const countNonPlaceholders = (toCount) => {
      // eslint-disable-next-line fp/no-let
      let count = toCount.length
      // eslint-disable-next-line fp/no-loops
      while (!test(toCount[count])) {
        // eslint-disable-next-line fp/no-mutation
        count--
      }
      return count
    }
    const length = fastSome(args, test) ? countNonPlaceholders(args) : args.length
    function saucy() {
      const args2 = Array.from(arguments)
      /* eslint-enable fp/no-mutation */
      /* eslint-enable fp/no-let */
      /* eslint-enable fp/no-loops */
      // return curried.apply(this, mergeParamsByTest(test, args, args2))
      return curried.apply(this, args.map(
        (y) => (
          test(y) && args2[0] ?
            args2.shift() : // eslint-disable-line fp/no-mutating-methods
            y
        )
      ).concat(args2))
    }
    // eslint-disable-next-line fp/no-mutation
    saucy.toString = toString(fn, args)
    return (
      length >= fn.length ?
        fn.apply(this, args) :
        saucy
    )
  }
  // eslint-disable-next-line fp/no-mutation
  curried.toString = toString(fn)
  return curried
}

/**
 * curry a given function so that it takes multiple arguments
 * @method curry
 * @param {function} fn - any function
 * @returns {function} - a curried function
 * @public
 * @example
 * import {curry, $} from 'katsu-curry/debug'
 * const divide = curry((a, b) => a / b)
 * const half = divide($, 2)
 * const twoOver = divide(2)
 */
export const curry = curryify((x) => x === PLACEHOLDER)

/**
 * easily remap an array by indices
 * @method remapArray
 * @param {Array} indices - an array of indices to remap
 * @param {Array} arr - an input array
 * @returns {Array} remapped array
 * @public
 * @example
 * import {remapArray} from 'katsu-curry/debug'
 * remapArray([2,1,0], [`up`, `is`, `what`]).join(` `) // "what is up"
 */
export const remapArray = curry(remapParameters)

/**
 * reframe any function with the arguments as you want, plus curry
 * @method remap
 * @param {Array} indices - an array of indices to remap
 * @param {Function} fn - a function
 * @public
 * @example
 * import {remap} from 'katsu-curry/debug'
 * const quaternaryFunction = (a, b, c, d) => ((a + b + c) / d)
 * const quaternaryFunctionLastShuffle = remap([1, 2, 3, 0], quaternaryFunction)
 * quaternaryFunctionLastShuffle(1, 2, 3, 4) === ((2 + 3 + 4) / 1)
 */
export const remap = curry((indices, fn) => {
  const remapArgs = remapArray(indices)
  const curried = curry(fn)
  return function remappedFn() {
    const args = remapArgs(Array.from(arguments))
    return curried.apply(null, args)
  }
})
