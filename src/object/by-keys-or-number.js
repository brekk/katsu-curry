import {curryObjectByCondition} from '@object/by-condition'
import {expectKArgs} from '@object/by-keys'
import {expectNArgs} from '@object/by-number-of-keys'

export const expectKOrNArgs = ({n, k}, args) => expectKArgs(k, args) || expectNArgs(n, args)

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
 * // import {curryObjectKN} from 'katsu-curry/debug'
 * import {curryObjectKN} from 'katsu-curry'
 * const setTheTable = curryObjectKN({
 *   k: [`knives`, `forks`, `spoons`],
 *   n: 4
 * }, ({knives, forks, spoons, drinks = [`wine`]}) => (
 *   `${knives} x ${forks} + ${spoons} + ${drinks}`
 * ))
 * const setTheKnivesAndSpoons = setTheTable({forks: [0,1,2,3]}) // partial-application!
 */
export const curryObjectKN = curryObjectByCondition(
  expectKOrNArgs
)
