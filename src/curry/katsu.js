import {PLACEHOLDER} from '../placeholder/constant'
import fastSome from 'fast.js/array/some'

/**
 * curry a given function so that it takes multiple arguments (or a tuple of arguments)
 * @method curry
 * @param {function} fn - any function
 * @returns {function} - a curried function
 * @public
 * @example
 * import {curry, $} from 'katsu-curry'
 * const divide = curry((a, b) => a / b)
 * const half = divide($, 2)
 * const twoOver = divide(2)
 */
export const curry = (fn) => {
  const test = (x) => x === PLACEHOLDER
  return function curried() {
    const argLength = arguments.length
    const args = new Array(argLength)
    for (let i = 0; i < argLength; ++i) {
      args[i] = arguments[i]
    }
    const countNonPlaceholders = (toCount) => {
      let count = toCount.length
      while (!test(toCount[count])) {
        count--
      }
      return count
    }
    const length = fastSome(args, test) ? countNonPlaceholders(args) : args.length
    return (
      length >= fn.length ?
      fn.apply(this, args) :
      function saucy() { // eslint-disable-line fp/no-rest-parameters
        const arg2Length = arguments.length
        const args2 = new Array(arg2Length)
        for (let j = 0; j < arg2Length; ++j) {
          args2[j] = arguments[j]
        }
        // return curried.apply(this, mergeParamsByTest(test, args, args2))
        return curried.apply(this, args.map(
          (y) => (
            test(y) && args2[0] ?
            args2.shift() : // eslint-disable-line fp/no-mutating-methods
            y
          )
        ).concat(args2))
      }
    )
  }
}
