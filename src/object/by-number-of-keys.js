import {length} from '../utils/length'
import {curryObjectByCondition} from './by-condition'

export const expectNArgs = (size, args) => length(args) >= size

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
