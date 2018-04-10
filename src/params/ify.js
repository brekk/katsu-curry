import fastSome from 'fast.js/array/some'

/**
 * Pass currify a test which validates placeholders, and it will give you back a function which
 * curries other functions
 * @method curryify
 * @param {function} test - a function which asserts whether a given parameter is a placeholder
 * @returns {function} - a function which curries other functions
 * @public
 * @example
 * import { curryify } from 'katsu-curry'
 * const test = (x) => x === 3
 * // help me
 * const curry = curryify(test)
 * const addThenDivide = (a, b, c) => a + b / c
 * const theMagicNumber = addThenDivide(3, 2, 1)
 * const two = theMagicNumber(0) // apparently, it's 2
 */
export const curryify = (test) => {
  if (typeof test !== `function`) {
    // eslint-disable-next-line fp/no-throw
    throw new TypeError(`Expected to be given a function to test placeholders!`)
  }
  return (fn) => {
    if (typeof fn !== `function`) {
      // eslint-disable-next-line fp/no-throw
      throw new TypeError(`Expected to be given a function to curry!`)
    }
    return function curried() {
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
      return (
        length >= fn.length ?
        fn.apply(this, args) :
        function saucy() {
          const arg2Length = arguments.length
          const args2 = new Array(arg2Length)
          for (let j = 0; j < arg2Length; ++j) {
            args2[j] = arguments[j]
          }

          /* eslint-enable fp/no-mutation */
          /* eslint-enable fp/no-loops */
          /* eslint-enable fp/no-let */
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
}
