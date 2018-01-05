import {PLACEHOLDER} from '@placeholder/index'
import fastSome from 'fast.js/array/some'
import {toString} from '@params/to-string'

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
  if (typeof fn !== `function`) {
    // eslint-disable-next-line fp/no-throw
    throw new TypeError(`Expected to be given a function to curry!`)
  }
  const test = (x) => x === PLACEHOLDER
  function curried() {
    const argLength = arguments.length
    const args = new Array(argLength)

    /* eslint-disable fp/no-mutation */
    /* eslint-disable fp/no-let */
    /* eslint-disable fp/no-loops */
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
    function saucy() {
      const arg2Length = arguments.length
      const args2 = new Array(arg2Length)
      for (let j = 0; j < arg2Length; ++j) {
        args2[j] = arguments[j]
      }
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
    saucy.toString = toString(fn, args)
    return (
      length >= fn.length ?
        fn.apply(this, args) :
        saucy
    )
  }
  curried.toString = toString(fn)
  return curried
}
