import {curry} from './curry'
import {pipe} from './fn'
import {merge, length, matchingKeyCount} from './utils'

/**
 * Take some arguments, test them, and then either return a partially applied function or the answer
 * @method curryObjectByCondition
 * @param {function} comparison - function to compare arguments
 * @param {*} x - input
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @public
 * import {curryObjectByCondition} from 'katsu-curry'
 * const expectNArgs = (size, args) => length(args) >= size
 * const curryObjectN = curryObjectByCondition(expectNArgs)
 */
export const curryObjectByCondition = curry(
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

const expectNArgs = (size, args) => length(args) >= size
const expectKArgs = (expected, args) => matchingKeyCount(expected, args) >= length(expected)
const expectKNArgs = ({n, k}, args) => expectKArgs(k, args) || expectNArgs(n, args)

/**
 * Given object with n keys, continually curry until n keys are met
 * @method curryObjectN
 * @param {number} n - total expected keys
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @public
 * @example
 * import {curryObjectN} from 'katsu-curry'
 * const threeKeyProps = curryObjectN(3, Object.keys)
 * threeKeyProps({a: 1, b: 2, c: 3}) // [`a`, `b`, `c`]
 * threeKeyProps({a: 1, b: 2}) // function expecting one more param
 */
export const curryObjectN = curryObjectByCondition(
  expectNArgs
)

/**
 * Given object and expected keys, continually curry until expected keys are met
 * @method curryObjectK
 * @param {Array} expected - expected keys
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @public
 * @example
 * import {curryObjectK} from 'katsu-curry'
 * const abcProps = curryObjectK([`a`, `b`, `c`], ({a, b, c, optional = 1}) => {
 *  return a + b + c / optional
 * })
 * abcProps({a: 1, b: 2, c: 3}) // 6
 * abcProps({a: 1, b: 2}) // function expecting one more param
 * abcProps({a: 1, b: 2, c: 3, optional: 10}) // 0.6
 */
export const curryObjectK = curryObjectByCondition(
  expectKArgs
)

/**
 * Given object and expected keys, continually curry until expected keys are met
 * @method curryObjectKN
 * @param {Object} expected - expected object
 * @param {number} expected.n - minimum expected keys
 * @param {Array} expected.k - expected keys
 * @param {Array} expected - expected object
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @public
 * @example
 * import {curryObjectKN} from 'katsu-curry'
 * const abcProps = curryObjectK([`a`, `b`, `c`], ({a, b, c, optional = 1}) => {
 *  return a + b + c / optional
 * })
 * abcProps({a: 1, b: 2, c: 3}) // 6
 * abcProps({a: 1, b: 2}) // function expecting one more param
 * abcProps({a: 1, b: 2})({c: 3}) // 6
 * abcProps({a: 1, b: 2, c: 3, optional: 10}) // 0.6
 */
export const curryObjectKN = curryObjectByCondition(expectKNArgs)
