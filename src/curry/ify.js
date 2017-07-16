import {curryPowder} from './powder'

/**
 * Generate a custom `curry` function given a test function that checks for placeholders
 * @method currify
 * @param {function} test - a function that tests for placeholder-iness
 * @returns {function} - function which can curry other functions
 * @public
 * @example
 * import {currify} from 'katsu-curry'
 * const tester = (x) => x === 'butts'
 * const customCurry = currify(tester)
 * const divide = customCurry((a, b) => a / b)
 * const half = divide('butts', 2)
 */
export const curryify = (test) => curryPowder(test)
