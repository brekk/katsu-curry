import {curryObjectByCondition} from './by-condition'
import {expectKArgs} from './by-keys'
import {expectNArgs} from './by-number-of-keys'

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
export const curryObjectKN = curryObjectByCondition(
  ({n, k}, args) => expectKArgs(k, args) || expectNArgs(n, args)
)
