import {curryObjectByCondition} from '@object/by-condition'
import {expectKArgs} from '@object/by-keys'
import {expectNArgs} from '@object/by-number-of-keys'

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
 */
export const curryObjectKN = curryObjectByCondition(
  ({n, k}, args) => expectKArgs(k, args) || expectNArgs(n, args)
)
