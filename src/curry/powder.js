import {mergeParamsByTest} from '../placeholder/merge-params'
import {countNonPlaceholders} from '../placeholder/count'
import {toString} from './to-string'

/**
 * manually curried Array.prototype.some
 * @method some
 * @param {function} f - function to pass to [some]
 // * @param {Array} xs - an Array or something with [some] method
 * @returns {boolean} - the result
 * @private
 */
export const some = (f) => (xs) => xs.some(f)

/**
 * The core currying function. You shouldn't import this directly, instead use `curryify`.
 * @method curryPowder
 * @param {function} test - a function which asserts whether a given parameter is a placeholder
 // * @param {function} fn - a function to be curried
 * @returns {function} - a curried function
 * @private
 */
export const curryPowder = (test) => (fn) => {
  const checkPlaceholders = countNonPlaceholders(test)
  const mergeParams = mergeParamsByTest(test)
  const hasSauce = some(test)
  function curried(...args) { // eslint-disable-line fp/no-rest-parameters
    const length = hasSauce(args) ? checkPlaceholders(args) : args.length
    function saucy(...args2) { // eslint-disable-line fp/no-rest-parameters
      return curried.apply(this, mergeParams(args, args2))
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
