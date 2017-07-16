import {length} from '../utils/length'
import {matchingKeyCount} from '../utils/matching-key-count'
import {curryObjectByCondition} from './by-condition'

export const expectKArgs = (expected, args) => matchingKeyCount(expected, args) >= length(expected)

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
