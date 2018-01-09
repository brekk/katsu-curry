/*
export {curry} from '@params/curry'
export {curryify} from '@params/ify'
export {remap, remapArray} from '@params/remap'
 */
import {PLACEHOLDER} from '@placeholder/index'
import fastSome from 'fast.js/array/some'
import {remapFunction, remapParameters} from '@params/remap'
import {toString} from './to-string'

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
export const curry = curryify((x) => x === PLACEHOLDER)
export const remapArray = curry(remapParameters)
export const remap = curry(remapFunction)
