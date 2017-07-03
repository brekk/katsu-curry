import {curry} from './curry'
import {pipe, merge, length, matchingKeyCount} from './utils'

/**
 * Take some arguments, test them, and then either return a partially applied function or the answer
 * @method curryObjectWithComparison
 * @param {function} comparison - function to compare arguments
 * @param {*} x - input
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @private
 */
const curryObjectWithComparison = curry(
  (comparison, x, fn) => function curriedL(args) {
    return (
      comparison(x, args) ?
      fn(args) :
      pipe(
        merge(args),
        curriedL
      )
    )
  }
)

/**
 * Given object with n keys, continually curry until n keys are met
 * @method curryObjectN
 * @param {number} n - total expected keys
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @public
 */
export const curryObjectN = curryObjectWithComparison(
  (size, args) => length(args) >= size
)

/**
 * Given object and expected keys, continually curry until expected keys are met
 * @method curryObjectK
 * @param {Array} expected - expected keys
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @public
 */
export const curryObjectK = curryObjectWithComparison(
  (expected, args) => matchingKeyCount(expected, args) >= length(expected)
)
