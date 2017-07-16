import {PLACEHOLDER} from '../placeholder/constant'
import {test} from '../placeholder/test'
import {curryify} from './ify'

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
export const curry = curryify(test(PLACEHOLDER))
